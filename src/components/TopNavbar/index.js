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
import { setFiatPrice } from 'store/fiat';
import { useSelector } from 'react-redux';
import { useGetFiatSymbol, useSetFiatSymbol, useSetFiatName, useSetFiatValues, useSetFiatDecimals, useGetFiatDecimals } from 'store/hooks';
import SideBar from 'components/SideBar';


const TopNavbar = function () {
  const [currency, setCurrency] = useState("USD");
  const [symbol, setSymbol] = useState("$");

  const [network, setNetwork] = useState("BSC");
  const [modalShow, setModalShow] = useState(false);
  const [values, setValues] = useState({});
  const [decimals, setDecimals] = useState(2)
  
  const { slowRefresh, fastRefresh } = useRefresh();


  const handleCurrencyClick = (name, symbol) => {
    setCurrency(name);
    setSymbol(symbol);
  }
  
  const { active, account } = useWeb3React()
  const { connector } = useWalletConnectAuth()

  const getPrices = async () => {
      const response = await fetch(`${process.env.REACT_APP_SERVICE_URL}data/getFiats`).catch(console.log);
      if(response){
        const data = await response.json();
        setValues(data.data);
      }
  }

  
  
  
  useSetFiatValues(values);
  useSetFiatName(currency);
  useSetFiatSymbol(symbol);
  useSetFiatDecimals(decimals);


  
  
  const getShrunkWalletAddress = (addr) => {
    return (addr && `${addr.substring(0,4)}.....${addr.substring(addr.length-11)}`)
  }

  useEffect(() => {
    getPrices();
  }, [slowRefresh]);

  useEffect(() => {
    if(currency === "ETH" || currency === "BTC"){
      setDecimals(7)
    } else {
      setDecimals(2)
    }
  }, [fastRefresh]);

  return (
    <div id="sticky-wrapper" className="sticky-wrapper">
      <nav className="navbar navbar-expand-md bg-faded cripto_nav">
        
        <Row className="pr-4 d-flex flex-row-reverse w-100">
        
        {
          (connector.connected || active) ?
          <label className="text-muted my-auto ml-3">{getShrunkWalletAddress(account)}</label>:           
          <Button className="ml-3" variant="primary" onClick={() => setModalShow(true)}>Connect Wallet</Button>
        }

          <Dropdown className="ml-3">
            <Dropdown.Toggle variant="currency" style={{borderRadius: 10, }}>
            <img className="img-fluid mr-1" src={CurrenciesIcons.default[currency]} /> <span className="mr-4">{currency}</span>
            </Dropdown.Toggle>
            <Dropdown.Menu className="dropdownmenucurrencies" style={{ width: 550, borderRadius: 10 }}>
              <Row>
                <DropdownItemCurrency onClickHandler={handleCurrencyClick} name={"USD"} symbol={"$"}/>
                <DropdownItemCurrency onClickHandler={handleCurrencyClick} name={"EUR"} symbol={"€"}/>
                <DropdownItemCurrency onClickHandler={handleCurrencyClick} name={"CNY"} symbol={"¥"}/>
                <DropdownItemCurrency onClickHandler={handleCurrencyClick} name={"INR"} symbol={"₹"}/>
                <DropdownItemCurrency onClickHandler={handleCurrencyClick} name={"CAD"} symbol={"$"}/>
                <DropdownItemCurrency onClickHandler={handleCurrencyClick} name={"GBP"} symbol={"£"}/>
                <DropdownItemCurrency onClickHandler={handleCurrencyClick} name={"JPY"} symbol={"¥"}/>
                <DropdownItemCurrency onClickHandler={handleCurrencyClick} name={"RUB"} symbol={"₽"}/>
                <DropdownItemCurrency onClickHandler={handleCurrencyClick} name={"MXN"} symbol={"$"}/>
                <DropdownItemCurrency onClickHandler={handleCurrencyClick} name={"CHF"} symbol={"Fr"}/>
                <DropdownItemCurrency onClickHandler={handleCurrencyClick} name={"KRW"} symbol={"₩"}/>
                <DropdownItemCurrency onClickHandler={handleCurrencyClick} name={"TRY"} symbol={"₺"}/>
                <DropdownItemCurrency onClickHandler={handleCurrencyClick} name={"BRL"} symbol={"R$"}/>
                <DropdownItemCurrency onClickHandler={handleCurrencyClick} name={"SEK"} symbol={"kr"}/>
                <DropdownItemCurrency onClickHandler={handleCurrencyClick} name={"HKD"} symbol={"元"}/>
                <DropdownItemCurrency onClickHandler={handleCurrencyClick} name={"ETH"} symbol={"$"}/>
                <DropdownItemCurrency onClickHandler={handleCurrencyClick} name={"AUD"} symbol={"$"}/>
                <DropdownItemCurrency onClickHandler={handleCurrencyClick} name={"NOK"} symbol={"kr"}/>
                <DropdownItemCurrency onClickHandler={handleCurrencyClick} name={"SGD"} symbol={"$"}/>
                <DropdownItemCurrency onClickHandler={handleCurrencyClick} name={"BTC"} symbol={"BTC"}/>
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
      <SideBar/>

      <WalletModal show={modalShow} onHide={() => setModalShow(false)}></WalletModal>
    
    </div>
  );
};

export default TopNavbar;
