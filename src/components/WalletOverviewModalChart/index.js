import React, { useState,useEffect } from 'react'
import { Dropdown, Row, Col, Button, Modal } from 'react-bootstrap';
import PropTypes from 'prop-types';
import MetamaskLogo from '../../assets/icons/METAMASK.png'
import TrustWalletLogo from '../../assets/icons/TRUSTWALLET.png'
import LedgerWalletLogo from '../../assets/icons/LEDGERWALLET.png'
import WalletConnectLogo from '../../assets/icons/WALLETCONNECT.png'
import { height } from 'dom-helpers';
import useAuth from 'hooks/useAuth';
import TradingViewWidget, { Themes } from 'react-tradingview-widget';
import useWalletConnectAuth from 'hooks/useWalletConnectAuth'


export function WalletOverviewModalChart(props){
  const { login } = useAuth();
  const { walletConnectLogin, walletConnectLogout } = useWalletConnectAuth();

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      animation={false}
    >
      <Modal.Header closeButton>
        {/* <Modal.Title id="contained-modal-title-vcenter" className="w-100 pt-4">
          <p className="text-center text-white">Connect Wallet</p>
        </Modal.Title> */}
      </Modal.Header>
      <Modal.Body style={{height: 500}}>

      <TradingViewWidget
        symbol="NASDAQ:AAPL"
        // theme={Themes.DARK}
        locale="en"
        autosize
      />
       
      </Modal.Body>
      {/* <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer> */}
    </Modal>
  );
}

WalletOverviewModalChart.propTypes = {
  onHide: PropTypes.func,
};
