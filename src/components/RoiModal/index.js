import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Table } from 'react-bootstrap';
import { BoxArrowUpRight } from 'react-bootstrap-icons';
import { tokenEarnedPerThousandDollarsCompounding, getRoi } from 'utils/compoundApyHelpers';

const RoiModal = function ({
  show,
  onHide,
  apr,
  stakingTokenAddress,
  stakingTokenSymbol,
  earningTokenSymbol,
  earningTokenPrice,
}) {
  const compoundFrequency = 1;
  const performanceFee = 0;

  const oneThousandDollarsWorthOfToken = 1000 / earningTokenPrice;

  const tokenEarnedPerThousand1D = tokenEarnedPerThousandDollarsCompounding({
    days: 1,
    apr: apr,
    tokenPrice: earningTokenPrice,
    compoundFrequency,
    performanceFee,
  });

  const tokenEarnedPerThousand7D = tokenEarnedPerThousandDollarsCompounding({
    days: 7,
    apr: apr,
    tokenPrice: earningTokenPrice,
    compoundFrequency,
    performanceFee,
  });

  const tokenEarnedPerThousand30D = tokenEarnedPerThousandDollarsCompounding({
    days: 30,
    apr: apr,
    tokenPrice: earningTokenPrice,
    compoundFrequency,
    performanceFee,
  });

  const tokenEarnedPerThousand365D = tokenEarnedPerThousandDollarsCompounding({
    days: 365,
    apr: apr,
    tokenPrice: earningTokenPrice,
    compoundFrequency,
    performanceFee,
  });

  const roiPer1D = getRoi({
    amountEarned: tokenEarnedPerThousand1D,
    amountInvested: oneThousandDollarsWorthOfToken,
  }).toFixed(2);

  const roiPer7D = getRoi({
    amountEarned: tokenEarnedPerThousand7D,
    amountInvested: oneThousandDollarsWorthOfToken,
  }).toFixed(2);

  const roiPer30D = getRoi({
    amountEarned: tokenEarnedPerThousand30D,
    amountInvested: oneThousandDollarsWorthOfToken,
  }).toFixed(2);

  const roiPer365D = getRoi({
    amountEarned: tokenEarnedPerThousand365D,
    amountInvested: oneThousandDollarsWorthOfToken,
  }).toFixed(2);

  const exchangeUrl = `https://exchange.pancakeswap.finance/#/swap?outputCurrency=${stakingTokenAddress}`;

  return (
    <Modal className="modal-roi" show={show} onHide={onHide} animation={false} centered>
      <Modal.Header closeButton>
        <Modal.Title>ROI</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Table borderless className="text-right">
          <thead className="text-primary font-12">
            <tr>
              <th>TIMEFRAME</th>
              <th>ROI</th>
              <th>{earningTokenSymbol} PER $1000</th>
            </tr>
          </thead>
          <tbody className="text-value font-medium bold">
            <tr>
              <td>1d</td>
              <td>{roiPer1D}%</td>
              <td>{tokenEarnedPerThousand1D}</td>
            </tr>
            <tr>
              <td>7d</td>
              <td>{roiPer7D}%</td>
              <td>{tokenEarnedPerThousand7D}</td>
            </tr>
            <tr>
              <td>30d</td>
              <td>{roiPer30D}%</td>
              <td>{tokenEarnedPerThousand30D}</td>
            </tr>
            <tr>
              <td>365d(APY)</td>
              <td>{roiPer365D}%</td>
              <td>{tokenEarnedPerThousand365D}</td>
            </tr>
          </tbody>
        </Table>
        <p className="font-medium font-12 m-0">
          Calculated based on current rates. Compounding {compoundFrequency}x daily.
          Rates are estimates provided for your convenience only, and by no means represent guaranteed returns.
        </p>
      </Modal.Body>
      <Modal.Footer className="d-flex justify-content-center">
        <a className="d-flex align-items-center bold" href={exchangeUrl} target="_blank" rel="noreferrer">
          <span>GET {stakingTokenSymbol}</span>
          <BoxArrowUpRight className="ml-2" />
        </a>
      </Modal.Footer>
    </Modal>
  );
};

RoiModal.propTypes = {
  show: PropTypes.bool,
  onHide: PropTypes.func,
  apr: PropTypes.number,
  stakingTokenSymbol: PropTypes.string,
  stakingTokenAddress: PropTypes.string,
  earningTokenPrice: PropTypes.number,
  earningTokenSymbol: PropTypes.string,
};

export default RoiModal;
