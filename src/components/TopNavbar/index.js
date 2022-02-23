import React, { useState,useEffect } from 'react'
import { Dropdown, Row, Col, Button } from 'react-bootstrap';
import * as CurrenciesIcons from '../../assets/icons/currencies';
import { DropdownItemCurrency } from '../DropdownItemCurrency';
import BscLogo from '../../assets/icons/BSC.svg'
import EthLogo from '../../assets/icons/ETHEREUM.svg'
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
import useAuth from 'hooks/useAuth';
import { fetchFiatPrices } from 'store/fiat';
import { result } from 'lodash';
import useAuthService from 'hooks/useAuthService';


const TopNavbar = function () {
  const [currency, setCurrency] = useState("USD");
  const [symbol, setSymbol] = useState("$");

  const [network, setNetwork] = useState("BSC");
  const [modalShow, setModalShow] = useState(false);
  const [values, setValues] = useState({});
  const [decimals, setDecimals] = useState(2)
  
  const { slowRefresh, fastRefresh } = useRefresh();
  const {logout} = useAuth()
  const { walletConnectLogout } = useWalletConnectAuth();

  
  const handleCurrencyClick = (name, symbol) => {
    setCurrency(name);
    setSymbol(symbol);
  }
  const {account, connected} = useAuthService();

  
  const getPrices = async () => { 
    const data = await fetchFiatPrices();
    setValues(data.data.data);
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
    console.log("account", account);
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
      <nav className="navbar navbar-expand-md  cripto_nav pr-0 fixed-top py-3" style={{backgroundColor:"#EEF3F4"}}>
        
        <Row className="d-flex flex-row-reverse w-100 mr-2">
        
        {
          (connected) ?
          
          <Dropdown className="ml-2" alignRight>
            <Dropdown.Toggle variant="currency" style={{borderRadius: 10, height: 45}}>
            <label className="text-muted my-auto mx-3">{getShrunkWalletAddress(account)}</label>
            </Dropdown.Toggle>
            <Dropdown.Menu className="dropdownmenucurrencies" style={{ borderRadius: 10 }}>
                <Dropdown.Item onClick={() => {logout(); walletConnectLogout();}} className="align-items-right"><span>Logout</span></Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          :           
          <Button className="ml-2" variant="primary" onClick={() => setModalShow(true)}>Connect Wallet</Button>
        }

          <Dropdown className="mx-2">
            <Dropdown.Toggle variant="currency" style={{height: 45}}>
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
                <DropdownItemCurrency onClickHandler={handleCurrencyClick} name={"ETH"} symbol={"ETH"}/>
                <DropdownItemCurrency onClickHandler={handleCurrencyClick} name={"AUD"} symbol={"$"}/>
                <DropdownItemCurrency onClickHandler={handleCurrencyClick} name={"NOK"} symbol={"kr"}/>
                <DropdownItemCurrency onClickHandler={handleCurrencyClick} name={"SGD"} symbol={"$"}/>
                <DropdownItemCurrency onClickHandler={handleCurrencyClick} name={"BTC"} symbol={"BTC"}/>
              </Row>
            </Dropdown.Menu>
          </Dropdown>

          <Dropdown className="mr-2" alignRight>
            <Dropdown.Toggle variant="currency" style={{borderRadius: 10, height: 45}}>
              <img className="img-fluid mr-1" src={BscLogo} /> <span className="mr-4">{network}</span>
            </Dropdown.Toggle>
            <Dropdown.Menu className="dropdownmenucurrencies" style={{ width: 100, borderRadius: 10 }}>
              <Dropdown.Item onClick={() => {}} className="text-center">
                <img className="img-fluid mr-1" src={BscLogo} />
                <span className="font-weight-bold mr-4">BSC</span>
              </Dropdown.Item>
              <Dropdown.Item disabled onClick={() => {}} className="text-center">
                <img className="img-fluid mr-1" src={EthLogo} />
                <span className="font-weight-bold mr-4">ETH</span>
              </Dropdown.Item>
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
