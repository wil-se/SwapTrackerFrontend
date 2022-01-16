import React, { useState,useEffect } from 'react'
import { Dropdown, Row, Col, Button, Modal } from 'react-bootstrap';
import PropTypes from 'prop-types';

export function WalletModal(props){
  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter" className="w-100 pt-4">
          <p className="text-center text-white">Connect Wallet</p>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h5 className="font-weight-bold text-center">Select a wallet to Connect to SwapTracker</h5>
        

      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

WalletModal.propTypes = {
  onHide: PropTypes.func,
};
