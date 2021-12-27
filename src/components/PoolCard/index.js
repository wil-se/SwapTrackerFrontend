import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { BSC_BASE_URL } from 'config';
import BigNumber from 'bignumber.js';
import { useWeb3React } from '@web3-react/core';
import { Button, Card, OverlayTrigger, Tooltip } from 'react-bootstrap';
import {
  ArrowRepeat,
  BoxArrowUpRight,
  ChevronDown,
  ChevronUp,
  Dash,
  FileSpreadsheet,
  Plus,
  Stopwatch,
} from 'react-bootstrap-icons';
import Skeleton from 'react-loading-skeleton';
import useAuth from 'hooks/useAuth';
import useModal from 'hooks/useModal';
import { useERC20 } from 'hooks/useContract';
import { useApprove } from 'hooks/useApprove';
import usePrice from 'hooks/usePrice';
import useBlockCountdown from 'hooks/useBlockCountdown';
import { useBlock } from 'store/hooks';
import RoiModal from 'components/RoiModal';
import StakeModal from 'components/StakeModal';
import ClaimModal from 'components/ClaimModal';
import InsufficientBalanceModal from 'components/InsufficientBalanceModal';
import { getAddress } from 'utils/addressHelpers';
import { getPoolApr } from 'utils/apr';
import { getBalanceNumber, formatNumber } from 'utils/formatBalance';
import getTimePeriods from 'utils/getTimePeriods';
import formatTimePeriod from 'utils/formatTimePeriod';
import { tokenEarnedPerThousandDollarsCompounding, getRoi } from 'utils/compoundApyHelpers';

const Pool = function ({ pool }) {
  const { poolId, startBlock, endBlock, rewardPerBlock, stakingToken, earningToken, totalStaked, userData } = pool;

  const { account } = useWeb3React();
  const { login } = useAuth();
  const { currentBlock } = useBlock();

  const isStarted = currentBlock ? startBlock <= currentBlock : false;
  const isFinished = pool.isFinished || parseInt(endBlock) < currentBlock;
  const decimalRewardPerBlock = getBalanceNumber(rewardPerBlock, stakingToken.decimals);

  const countdown = formatTimePeriod(getTimePeriods(useBlockCountdown(startBlock)));

  const [requestedApproval, setRequestedApproval] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  const isLoading = account && (!userData || !currentBlock);

  const contractAddress = getAddress(pool.contractAddress);
  const stakingTokenAddress = getAddress(stakingToken.address);
  const earningTokenAddress = getAddress(earningToken.address);
  const stakingTokenPrice = usePrice(stakingTokenAddress);
  const earningTokenPrice = usePrice(earningTokenAddress);
  const aprLoaded = !!totalStaked && !!stakingTokenPrice && !!earningTokenPrice;

  const stakingTokenBalance = new BigNumber(userData?.stakingTokenBalance ? userData.stakingTokenBalance : 0);
  const allowance = new BigNumber(userData?.allowance ? userData.allowance : 0);
  const needsApproval = !allowance.gt(0);
  const stakedBalance = new BigNumber(userData?.stakedBalance ? userData.stakedBalance : 0);
  const hasStaked = stakedBalance.gt(0);
  const pendingReward = new BigNumber(userData?.pendingReward ? userData.pendingReward : 0);
  const hasPendingReward = stakedBalance.gt(0);

  const bscBlockLink = `${BSC_BASE_URL}/block/${endBlock}`;
  const bscContractLink = `${BSC_BASE_URL}/address/${contractAddress}`;
  const exchangeLink = !stakingToken.isLP ?
    `https://pancakeswap.finance/swap?outputCurrency=${stakingTokenAddress}` :
    `https://pancakeswap.finance/add/BNB/${stakingToken.pair.token2}`;

  const apr = getPoolApr(
    stakingTokenPrice,
    earningTokenPrice,
    getBalanceNumber(totalStaked, stakingToken.decimals),
    parseFloat(decimalRewardPerBlock),
  );

  const oneThousandDollarsWorthOfToken = 1000 / earningTokenPrice;
  const tokenEarnedPerThousand365D = tokenEarnedPerThousandDollarsCompounding({
    days: 365,
    apr: apr,
    tokenPrice: earningTokenPrice,
    compoundFrequency: 1,
    performanceFee: 0,
  });

  const apy = getRoi({
    amountEarned: tokenEarnedPerThousand365D,
    amountInvested: oneThousandDollarsWorthOfToken,
  }).toFixed(2);

  const formattedStakeBalance = formatNumber(getBalanceNumber(stakedBalance, stakingToken.decimals), 4, 4);
  const dollarStakedBalance = formatNumber(
    getBalanceNumber(stakedBalance.multipliedBy(stakingTokenPrice), stakingToken.decimals),
  );
  const formattedPendingReward = formatNumber(getBalanceNumber(pendingReward, earningToken.decimals), 4, 4);
  const dollarPendingReward = formatNumber(
    getBalanceNumber(pendingReward.multipliedBy(earningTokenPrice), earningToken.decimals),
  );
  const formattedTotalStake = formatNumber(getBalanceNumber(totalStaked, stakingToken.decimals), 0, 0);
  const totalValueLocked = getBalanceNumber(totalStaked, stakingToken.decimals) * stakingTokenPrice;

  const stakingTokenContract = useERC20(stakingTokenAddress);
  const { onApprove } = useApprove(stakingTokenContract, poolId);

  const [openModal, onHide] = useModal();

  const openRoiModal = () => openModal(
    <RoiModal
      apr={apr}
      stakingTokenAddress={stakingTokenAddress}
      stakingTokenSymbol={stakingToken.symbol}
      earningTokenAddress={earningTokenAddress}
      earningTokenSymbol={earningToken.symbol}
      earningTokenPrice={earningTokenPrice}
      show
      onHide={onHide}
    />,
  );

  const openInsufficientBalanceModal = () => openModal(
    <InsufficientBalanceModal
      tokenSymbol={stakingToken.symbol}
      tokenAddress={stakingTokenAddress}
      show
      onHide={onHide}
    />,
  );

  const openStakeModal = () => openModal(
    <StakeModal
      pool={pool}
      action={'deposit'}
      stakingMax={stakingTokenBalance}
      stakingTokenPrice={stakingTokenPrice}
      show
      onHide={onHide}
    />,
  );

  const openUnstakeModal = () => openModal(
    <StakeModal
      pool={pool}
      action={'withdraw'}
      stakingMax={stakedBalance}
      stakingTokenPrice={stakingTokenPrice}
      show
      onHide={onHide}
    />,
  );

  const openClaimModal = () => openModal(
    <ClaimModal
      pool={pool}
      earningTokenPrice={earningTokenPrice}
      show
      onHide={onHide}
    />,
  );

  const handleApprove = useCallback(async () => {
    setRequestedApproval(true);

    try {
      await onApprove();
    } catch (err) {
      console.error(err);
    }

    setRequestedApproval(false);
  }, [onApprove]);

  return (
    <Card className="pool">
      <Card.Header>
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <h4>Earn {earningToken.symbol}</h4>
            <h6 className="m-0">Stake {stakingToken.symbol}</h6>
          </div>
          <div>
            <img src={`/images/pools/${poolId}.png`} width="36" height="36" alt="icon" />
          </div>
        </div>
      </Card.Header>
      <Card.Body>
        <div className="d-flex justify-content-between align-items-center">
          <OverlayTrigger
            placement="top"
            overlay={
              <Tooltip id="tooltip">
                Calculated based on current rates and assuming you manually compound daily.
                This pool does not auto-coumpound.
              </Tooltip>
            }
          >
            <div className="font-medium apy">APY:</div>
          </OverlayTrigger>
          {!apr && !aprLoaded ? (
            <Skeleton width="82px" height="32px" />
          ) : (
            <div className="d-flex justify-content-center align-items-center row-apr">
              <Button variant="icon" className="btn-apr" onClick={openRoiModal} disabled={!apr}>
                <FileSpreadsheet />
              </Button>
              <div className="text-value font-medium bold">
                <span>{apy ? apy : '- '}%</span>
              </div>
            </div>
          )}
        </div>

        <div className="d-flex justify-content-between align-items-center row-tvl">
          <div className="font-12 font-medium">TVL:</div>
          {!totalValueLocked || isNaN(totalValueLocked) ? (
            <Skeleton width="82px" height="16px" />
          ) : (
            <div className="d-flex justify-content-center align-items-center">
              <div className="text-value font-12 font-medium">
                <span>${formatNumber(totalValueLocked, 2, 2)}</span>
              </div>
            </div>
          )}
        </div>

        {!account && (
          <>
            <div className="d-flex justify-content-start mt-2">
              <span className="text-secondary bold font-12">START EARNING</span>
            </div>
            <div className="d-flex justify-content-center mt-2">
              <Button className="w-100 btn-primary" onClick={login}>
                <span>Unlock Wallet</span>
              </Button>
            </div>
          </>
        )}

        {account && (
          <>
            <div className="d-flex justify-content-start font-12 bold mt-3">
              <div className="text-primary">{earningToken.symbol}</div>
              <div className="text-secondary ml-1">EARNED</div>
            </div>

            <div className="d-flex justify-content-between align-items-center mt-1">
              {isLoading ? (
                <Skeleton width="80px" height="38px" />
              ) : (
                <div className="d-flex flex-column">
                  <div className={`${hasPendingReward ? 'text-value' : 'text-disabled'} font-medium bold`}>
                    {hasPendingReward ? formattedPendingReward : '0'}
                  </div>
                  <div className={`${hasPendingReward ? 'text-value' : 'text-disabled'} font-medium font-12`}>
                    {`~${hasPendingReward ? dollarPendingReward : 0} USD`}
                  </div>
                </div>
              )}
              <div>
                <Button className="btn-claim" onClick={openClaimModal} disabled={!hasPendingReward}>
                  <span>Claim</span>
                </Button>
              </div>
            </div>

            <div className="d-flex justify-content-start font-12 bold mt-4">
              <div className={`${hasStaked ? 'text-primary' : 'text-secondary'}`}>
                {hasStaked ? stakingToken.symbol : 'STAKE'}{' '}
              </div>
              <div className={`${hasStaked ? 'text-secondary' : 'text-primary'} ml-1`}>
                {hasStaked ? 'STAKED' : stakingToken.symbol}
              </div>
            </div>

            {isLoading ? (
              <Skeleton width="100%" height="42px" />
            ) : (
              <>
                {!isStarted ? (
                  <Button className="w-100 mt-2" disabled>Opens in {countdown}</Button>
                ) : (
                  <>
                    {needsApproval && (
                      <div className="d-flex justify-content-center mt-2">
                        <Button className="w-100" onClick={handleApprove} disabled={requestedApproval}>
                          <span>{!requestedApproval ? 'Enable' : 'Enabling'}</span>
                          {requestedApproval && (<ArrowRepeat className="icon rotate ml-2" />)}
                        </Button>
                      </div>
                    )}

                    {!needsApproval && (
                      <div className="d-flex justify-content-between align-items-center mt-1">
                        <div className="d-flex flex-column">
                          <div className={`${hasStaked ? 'text-value' : 'text-disabled'} font-medium bold`}>
                            {formattedStakeBalance}
                          </div>
                          <div className={`${hasStaked ? 'text-value' : 'text-disabled'} font-medium font-12`}>
                            {`~${dollarStakedBalance || 0} USD`}
                          </div>
                        </div>
                        <div>
                          <Button
                            variant="secondary"
                            className="btn-stake"
                            onClick={stakingTokenBalance.gt(0) ? openStakeModal : openInsufficientBalanceModal}
                            disabled={isFinished}
                          >
                            <Plus />
                          </Button>
                          <Button
                            variant="secondary"
                            className="btn-stake ml-1"
                            onClick={openUnstakeModal}
                          >
                            <Dash />
                          </Button>
                        </div>
                      </div>
                    )}
                  </>
                )}
              </>
            )}
          </>
        )}
      </Card.Body>

      <Card.Footer>
        <div className="d-flex justify-content-center align-items-center">
          <Button variant="transparent" className="btn-details" onClick={() => setShowDetails(!showDetails)}>
            {!showDetails ? 'Details' : 'Hide'}
            {!showDetails ? <ChevronDown className="ml-2" /> : <ChevronUp className="ml-2" />}
          </Button>
        </div>

        {showDetails && (
          <>
            <div className="d-flex justify-content-between align-items-center font-14">
              <div>Total staked:</div>
              <div>{formattedTotalStake} {stakingToken.symbol}</div>
            </div>
            <div className="d-flex justify-content-between align-items-center font-14">
              <div>Reward per block:</div>
              <div>{decimalRewardPerBlock} {earningToken.symbol}</div>
            </div>
            {isStarted && !isFinished && (
              <div className="d-flex justify-content-between align-items-center font-14">
                <div>End:</div>
                <div>
                  <Button variant="transparent ">
                    <a className="d-flex align-items-center bsc-link" href={bscBlockLink} target="_blank" rel="noreferrer">
                      <span>{endBlock - currentBlock} blocks</span>
                      <Stopwatch className="icon ml-2" />
                    </a>
                  </Button>
                </div>
              </div>
            )}
            {isFinished && (
              <div className="d-flex justify-content-between align-items-center font-14">
                <div>Status:</div>
                <div>Finished</div>
              </div>
            )}
            <div className="text-right">
              <Button variant="transparent ">
                <a className="d-flex align-items-center bsc-link" href={bscContractLink} target="_blank" rel="noreferrer">
                  <span>View contract</span>
                  <BoxArrowUpRight className="icon ml-2" />
                </a>
              </Button>
            </div>
            <div className="text-right">
              <Button variant="transparent ">
                <a className="d-flex align-items-center bsc-link" href={exchangeLink} target="_blank" rel="noreferrer">
                  <span>Get {stakingToken.symbol}</span>
                  <img className="rounded-circle ml-2" src="/images/pancakeswap-bg.png" width="20" />
                </a>
              </Button>
            </div>
          </>
        )}
      </Card.Footer>
    </Card>
  );
};

Pool.propTypes = {
  pool: PropTypes.object,
};

export default Pool;
