import React from 'react';
import PropTypes from 'prop-types';
import BigNumber from 'bignumber.js';
import { Card, Col, Row } from 'react-bootstrap';
import { ShieldLock, Wallet2, Speedometer2 } from 'react-bootstrap-icons';
import { useGetApiPrices } from 'store/hooks';
import { getAddress } from 'utils/addressHelpers';
import { formatNumber, getBalanceNumber, getBalanceAmount } from 'utils/formatBalance';
import tokens from 'config/constants/tokens';

const CardsSection = function ({ pools }) {
  const prices = useGetApiPrices();

  const swapTrackerPayPools = pools.filter(pool => pool.stakingToken.symbol === 'SWPT');
  const swapTrackerBalance = swapTrackerPayPools.length ? (swapTrackerPayPools[0]?.userData?.stakingTokenBalance || 0) : 0;
  const formattedEightPayBalance = formatNumber(getBalanceNumber(swapTrackerBalance, tokens.swapTracker.decimals), 0, 0);

  const totalAccountStake = pools.filter(pool => !!pool?.userData?.stakedBalance).reduce((acc, pool) => {
    const stakingTokenAddress = getAddress(pool.stakingToken.address);
    const stakingTokenPrice = prices ? prices[stakingTokenAddress] : 0;
    const accountStake = getBalanceAmount(pool.userData.stakedBalance, pool.stakingToken.decimals);
    return acc.plus(accountStake.multipliedBy(stakingTokenPrice));
  }, new BigNumber(0));
  const formattedTotalAccountStake = formatNumber(totalAccountStake.toNumber(), 2, 2);

  const totalValueLocked = pools.reduce((acc, pool) => {
    const stakingTokenAddress = getAddress(pool.stakingToken.address);
    const stakingTokenPrice = prices ? prices[stakingTokenAddress] : 0;
    const totalStaked = getBalanceAmount(pool.totalStaked || 0, pool.stakingToken.decimals);
    const totalvalue = totalStaked.multipliedBy(stakingTokenPrice);
    return acc.plus(totalvalue);
  }, new BigNumber(0));
  const formattedTotalValueLocked = formatNumber(totalValueLocked.toNumber(), 2, 2);

  return (
    <Row className="d-flex justify-content-between cards-container mt-4">
      <Col md={4} className="card-container">
        <Card className="h-100">
          <Card.Body>
            <div className="d-flex align-items-center h-100">
              <div>
                <div className="card-block-icon balance">
                  <Wallet2 className="card-icon" />
                </div>
              </div>
              <div className="ml-4">
                <div className="card-title">BALANCE</div>
                <div className="card-value">{formattedEightPayBalance} SWPT</div>
              </div>
            </div>
          </Card.Body>
        </Card>
      </Col>

      <Col md={4} className="card-container">
        <Card className="h-100">
          <Card.Body>
            <div className="d-flex align-items-center h-100">
              <div>
                <div className="card-block-icon your-stake">
                  <ShieldLock className="card-icon" />
                </div>
              </div>
              <div className="ml-4">
                <div className="card-title">YOUR STAKE</div>
                <div className="card-value">${formattedTotalAccountStake}</div>
              </div>
            </div>
          </Card.Body>
        </Card>
      </Col>

      <Col md={4} className="card-container">
        <Card className="h-100">
          <Card.Body>
            <div className="d-flex align-items-center h-100">
              <div>
                <div className="card-block-icon total-staked">
                  <Speedometer2 className="card-icon" />
                </div>
              </div>
              <div className="ml-4">
                <div className="card-title">TOTAL VALUE LOCKED</div>
                <div className="card-value">${formattedTotalValueLocked}</div>
              </div>
            </div>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

CardsSection.propTypes = {
  pools: PropTypes.array,
};

export default CardsSection;
