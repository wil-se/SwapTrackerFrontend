import React from 'react'
import { Row, Col, Button, Modal } from 'react-bootstrap';
import PropTypes from 'prop-types';
import MetamaskLogo from '../../assets/icons/METAMASK.png'
import TrustWalletLogo from '../../assets/icons/TRUSTWALLET.png'
import LedgerWalletLogo from '../../assets/icons/LEDGERWALLET.png'
import WalletConnectLogo from '../../assets/icons/WALLETCONNECT.png'

import useAuth from 'hooks/useAuth';
import {ConnectorNames,connectorLocalStorageKey} from 'utils/web3React'



export function WalletModal(props){
  const { login } = useAuth();
  

  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      animation={false}
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter" className="w-100 pt-4">
          <p className="text-center text-white">Connect Wallet</p>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h5 className="font-weight-bold text-center">Select a wallet to Connect to SwapTracker</h5>
        <Row className="ml-4 mr-4">
          <Col xl={6} className="text-center font-weight-bold pt-4 pb-2 pl-md-4" style={{cursor: "pointer"}}><a onClick={() => {
            login(ConnectorNames.INJECTED);
            localStorage.setItem(connectorLocalStorageKey, ConnectorNames.INJECTED);
            props.onHide();
            }}><img className="img-fluid" src={MetamaskLogo} /><p>Metamask</p></a></Col>
          <Col xl={6} className="text-center font-weight-bold pt-4 pb-2 pl-md-3" style={{cursor: "pointer"}}><a onClick={() => {
            login(ConnectorNames.WalletConnect);
            localStorage.setItem(connectorLocalStorageKey, ConnectorNames.WalletConnect);
            props.onHide();
            }}><img className="img-fluid" src={TrustWalletLogo} /><p>Trust Wallet</p></a></Col>
          <Col xl={6} className="text-center font-weight-bold pt-3 pb-2 pl-md-4" style={{cursor: "pointer"}}><a><img className="img-fluid" src={LedgerWalletLogo} /><p>Ledger Wallet</p></a></Col>
          <Col xl={6} className="text-center font-weight-bold pt-3 pb-2 pl-md-3" style={{cursor: "pointer"}}><a onClick={() => {
            login(ConnectorNames.WalletConnect);
            localStorage.setItem(connectorLocalStorageKey, ConnectorNames.WalletConnect);
            props.onHide();
            }}><img className="img-fluid" src={WalletConnectLogo} /><p>WalletConnect</p></a></Col>
        </Row>
        
        <hr/>
        <p className="text-center mt-4 mb-4" style={{color: "#3B434A",}}>Haven&apos;t got a crypto wallet yet?</p>
        <Col className="text-center"><Button className="pl-5 pr-5">Learn How to Connect</Button></Col>
        <p className="text-center mt-2" style={{color: "#0985F1", fontSize: 12}}>What is a wallet?</p>
      </Modal.Body>
      {/* <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer> */}
    </Modal>
  );
}

WalletModal.propTypes = {
  onHide: PropTypes.func,
};
