import React, { useState,useEffect } from 'react'
import { Dropdown, Row, Button } from 'react-bootstrap';
import * as CurrenciesIcons from '../../assets/icons/currencies';
import { DropdownItemCurrency } from '../DropdownItemCurrency';
import BscLogo from '../../assets/icons/BSC.svg'
import EthLogo from '../../assets/icons/ETHEREUM.svg'
import { WalletModal } from 'components/WalletModal';
import { useWeb3React } from '@web3-react/core';
import {Link} from 'react-router-dom';
import useWalletConnectAuth from 'hooks/useWalletConnectAuth'
import useRefresh from 'hooks/useRefresh';

import { useSetFiatSymbol, useSetFiatName, useSetFiatValues, useSetFiatDecimals } from 'store/hooks';
import SideBar from 'components/SideBar';
import useAuth from 'hooks/useAuth';
import { fetchFiatPrices } from 'store/fiat';


const TopNavbar = function () {
  const [currency, setCurrency] = useState("USD");
  const [symbol, setSymbol] = useState("$");

  const [network, setNetwork] = useState("BSC");
  const [modalShow, setModalShow] = useState(false);
  const [values, setValues] = useState({});
  const [decimals, setDecimals] = useState(2)
  
  const { slowRefresh, fastRefresh } = useRefresh();
  const {logout} = useAuth()


  const handleCurrencyClick = (name, symbol) => {
    setCurrency(name);
    setSymbol(symbol);
  }
  
  const { active, account } = useWeb3React()
  const { connector } = useWalletConnectAuth()

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
      <nav className="navbar navbar-expand-md cripto_nav pr-0 fixed-top py-3" >

        <Link className="navbar-brand mx-auto d-block d-md-none" to="/">
          <img src="images/logo.svg" width="150"  alt="logo" />
        </Link>

  

        <div className="collapse navbar-collapse" id="navbarNavDropdown">

          <ul className="navbar-nav ml-auto">

            <li className="nav-item dropdown">
              <Dropdown className="mt-2 mt-md-0 nav-link" alignRight>
                <Dropdown.Toggle variant="currency" style={{borderRadius: 10, height: 45}}>
                  <img className="img-fluid mr-1" src={BscLogo} /> <span className="mr-4">{network}</span>
                </Dropdown.Toggle>
                <Dropdown.Menu className="dropdownmenu" style={{ width: 100, borderRadius: 10 }}>
                  <Dropdown.Item onClick={() => {}} className="text-center">
                    <img className="img-fluid mr-1" src={BscLogo} />
                    <span className="font-weight-bold mr-4">BSC</span>
                  </Dropdown.Item>
                  <Dropdown.Header className="text-center" style={{fontSize: 10}}>Coming Soon</Dropdown.Header>
                  <Dropdown.Item disabled onClick={() => {}} className="text-center">
                      <img className="img-fluid mr-1" src={EthLogo} />
                      <span className="font-weight-bold mr-4">ETH</span>
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown> 
            </li>
            
            <li className="nav-item">
              <Dropdown className=" mt-2 mt-md-0 nav-link">
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
            </li>

            <li className="nav-item mr-2 d-flex align-items-center">
            {
              (connector.connected || active) ?
              
              <Dropdown className="nav-link" alignRight>
                <Dropdown.Toggle variant="currency" style={{borderRadius: 10, height: 45}}>
                <label className="text-muted my-auto mx-3">{getShrunkWalletAddress(account)}</label>
                </Dropdown.Toggle>
                <Dropdown.Menu className="dropdownmenu" style={{ borderRadius: 10 }}>
                    <Dropdown.Item onClick={logout} className="align-items-right"><span>Logout</span></Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>

              :           
              <Button className="mr-2 ml-2 nav-link" variant="primary" onClick={() => setModalShow(true)}>Connect Wallet</Button>
            }
            </li>

            

          </ul>
        </div>

      </nav>
      <SideBar values={values} currency={currency} symbol={symbol} handleCurrencyClick={handleCurrencyClick} network={network} />

      <WalletModal show={modalShow} onHide={() => setModalShow(false)}></WalletModal>
    
    </div>
  );
};

export default TopNavbar;
