import React, { useState,useEffect } from 'react'
import { Dropdown, Row, Col, Button } from 'react-bootstrap';
import * as CurrenciesIcons from '../../assets/icons/currencies';
import { DropdownItemCurrency } from '../DropdownItemCurrency';
import BscLogo from '../../assets/icons/BSC.png'
import { WalletModal } from 'components/WalletModal';
import { useWeb3React } from '@web3-react/core';
import WalletConnect from "@walletconnect/client";
import QRCodeModal from "@walletconnect/qrcode-modal";
import { ConnectorNames, connectorsByName } from 'utils/web3React';
import useWalletConnectAuth from 'hooks/useWalletConnectAuth'
import useRefresh from 'hooks/useRefresh';


const TopNavbar = function () {
  const { slowRefresh } = useRefresh();
  const [currency, setCurrency] = useState("USD");
  const [network, setNetwork] = useState("BSC");
  const [modalShow, setModalShow] = useState(false);
  const [walletButtonText, setWalletButtonText] = useState("Connect")

  const handleCurrencyClick = (symbol) => {
    setCurrency(symbol);
  }
  
  const { active, deactivate } = useWeb3React()
  const { connector } = useWalletConnectAuth()
  
  
  const disconnect = () => {
    if (connector.connected) {
      connector.killSession()
    }
  }

  useEffect(() => {
    if(connector.connected){
      setWalletButtonText("Disconnect")
    } else if (active) {
      setWalletButtonText("Connected")
    }
  }, [active]);



  return (
    <div id="sticky-wrapper" className="sticky-wrapper">
      <nav className="navbar navbar-expand-md bg-faded cripto_nav">
        
        <Row className="pr-4 d-flex flex-row-reverse w-100">
        <Button className="ml-3" variant="primary" onClick={() => connector.connected || active ? disconnect() : setModalShow(true)}>{walletButtonText} </Button>

          <Dropdown className="ml-3">
            <Dropdown.Toggle variant="currency" style={{borderRadius: 10, }}>
            <img className="img-fluid mr-1" src={CurrenciesIcons.default[currency]} /> <span className="mr-4">{currency}</span>
            </Dropdown.Toggle>
            <Dropdown.Menu className="dropdownmenucurrencies" style={{ width: 550, borderRadius: 10 }}>
              <Row>
                <DropdownItemCurrency onClickHandler={handleCurrencyClick} symbol={"USD"} />
                <DropdownItemCurrency onClickHandler={handleCurrencyClick} symbol={"EUR"} />
                <DropdownItemCurrency onClickHandler={handleCurrencyClick} symbol={"CNY"} />
                <DropdownItemCurrency onClickHandler={handleCurrencyClick} symbol={"INR"} />
                <DropdownItemCurrency onClickHandler={handleCurrencyClick} symbol={"CAD"} />
                <DropdownItemCurrency onClickHandler={handleCurrencyClick} symbol={"GBP"} />
                <DropdownItemCurrency onClickHandler={handleCurrencyClick} symbol={"JPY"} />
                <DropdownItemCurrency onClickHandler={handleCurrencyClick} symbol={"RUB"} />
                <DropdownItemCurrency onClickHandler={handleCurrencyClick} symbol={"MXN"} />
                <DropdownItemCurrency onClickHandler={handleCurrencyClick} symbol={"CHF"} />
                <DropdownItemCurrency onClickHandler={handleCurrencyClick} symbol={"KRW"} />
                <DropdownItemCurrency onClickHandler={handleCurrencyClick} symbol={"TRY"} />
                <DropdownItemCurrency onClickHandler={handleCurrencyClick} symbol={"BRL"} />
                <DropdownItemCurrency onClickHandler={handleCurrencyClick} symbol={"SEK"} />
                <DropdownItemCurrency onClickHandler={handleCurrencyClick} symbol={"HKD"} />
                <DropdownItemCurrency onClickHandler={handleCurrencyClick} symbol={"ETH"} />
                <DropdownItemCurrency onClickHandler={handleCurrencyClick} symbol={"AUD"} />
                <DropdownItemCurrency onClickHandler={handleCurrencyClick} symbol={"NOK"} />
                <DropdownItemCurrency onClickHandler={handleCurrencyClick} symbol={"SGD"} />
                <DropdownItemCurrency onClickHandler={handleCurrencyClick} symbol={"BTC"} />
              </Row>
            </Dropdown.Menu>
          </Dropdown>

          <Dropdown className="float-right">
            <Dropdown.Toggle variant="currency" style={{borderRadius: 10, }}>
              <img className="img-fluid mr-1" src={BscLogo} /> <span className="mr-4">{network}</span>
            </Dropdown.Toggle>
            <Dropdown.Menu className="dropdownmenucurrencies" style={{ width: 100, borderRadius: 10 }}>
              <Dropdown.Item onClick={() => console.log("CHANGE NETWORK")} className="align-items-center"><img className="img-fluid mr-1" src={BscLogo} /><span className="font-weight-bold mr-4">BSC</span></Dropdown.Item>
              <Dropdown.Item onClick={() => console.log("CHANGE NETWORK")} className="align-items-center"><img className="img-fluid mr-1" src={CurrenciesIcons.default['ETH']} /><span className="font-weight-bold mr-4">ETH</span></Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        
        </Row>
      </nav>

      <WalletModal show={modalShow} onHide={() => setModalShow(false)}></WalletModal>
    
    </div>
  );
};

export default TopNavbar;
