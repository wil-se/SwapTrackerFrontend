import React from 'react';
import PropTypes from 'prop-types';
import { Button, Modal } from 'react-bootstrap';
import { BoxArrowUpRight } from 'react-bootstrap-icons';

const InsufficientBalanceModal = function ({ tokenAddress, tokenSymbol, show, onHide }) {
  const buyLink = `https://exchange.pancakeswap.finance/#/swap?outputCurrency=${tokenAddress}`;

  return (
    <Modal className="modal-insufficient-balance" show={show} onHide={onHide} animation={false} centered>
      <Modal.Header closeButton>
        <Modal.Title>{tokenSymbol} required</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="bold text-primary">Insufficient {tokenSymbol} balance</p>
        <p className="font-medium">
          You&apos;ll need {tokenSymbol} to stake in this pool!<br />
          Buy some {tokenSymbol}, or make sure your {tokenSymbol} isn&apos;t in another pool or LP.
        </p>
        <Button variant="primary" className="d-flex justify-content-center w-100">
          <a className="d-flex align-items-center" href={buyLink} target="_blank" rel="noreferrer">
            <span>Buy {tokenSymbol}</span>
            <BoxArrowUpRight className="icon ml-2" />
          </a>
        </Button>
      </Modal.Body>
    </Modal>
  );
};

InsufficientBalanceModal.propTypes = {
  show: PropTypes.bool,
  onHide: PropTypes.func,
  tokenAddress: PropTypes.string,
  tokenSymbol: PropTypes.string,
};

export default InsufficientBalanceModal;
