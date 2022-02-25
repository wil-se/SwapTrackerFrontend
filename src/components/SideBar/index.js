import React, { useEffect, useState} from 'react';
import { Container, Row,Col,Dropdown,Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
//icons
import logoGrande from '../../assets/icons/logoGrandeSidebar.png';
import logOutIcon from '../../assets/icons/logOutIcon.png';
import * as Icon from 'react-bootstrap-icons';
import BscLogo from '../../assets/icons/BSC.svg'
import EthLogo from '../../assets/icons/ETHEREUM.svg'
import * as CurrenciesIcons from '../../assets/icons/currencies';
//icons
import { useWeb3React } from '@web3-react/core';
import { WalletModal } from 'components/WalletModal';
import useAuth from 'hooks/useAuth';
import useEagerConnect from 'hooks/useEagerConnect';
import { useFacebookPixel } from 'hooks/useFacebookPixel';
import { useGoogleAnalytics } from 'hooks/useGoogleAnalytics';
import useAuthService from 'hooks/useAuthService';
import TierSection from './TierSection';
import { DropdownItemCurrency } from '../DropdownItemCurrency';
import { useLocation } from "react-router-dom";
import useRefresh from 'hooks/useRefresh';
import PropTypes from 'prop-types';

const SideBar = ({currency,network,handleCurrencyClick}) => {
    useEagerConnect();
    useGoogleAnalytics();
    const [leftMobile,setLeftMobile] = useState()
    const [modalShow, setModalShow] = useState(false);
    const { account } = useWeb3React();
    const {logout} = useAuth()
    const {createOrUpdateUser,tier} = useAuthService()
    const pixel = useFacebookPixel();
    const ga = useGoogleAnalytics();


    const getShrunkWalletAddress = (addr) => {
        return (addr && `${addr.substring(0,4)}.....${addr.substring(addr.length-11)}`)
    }

  

    const location = useLocation();
    const { pathname } = location;
    const splitLocation = pathname.split("/");

    useEffect(() =>{
        pixel.track('ViewContent', { content_name: window.location.pathname });
        ga.send({ hitType: "pageview", page: window.location.pathname });
        (async ()=>{
            if(account){ 
                let user = {address:account && account.toLowerCase(),lastLogin:new Date()}
                createOrUpdateUser(user)
            }
        })()
        
    },[account])

    

    const closeSideBar = () => {
        if(window.innerWidth > 790) return;
        leftMobile === "0" ? setLeftMobile("-100%") : setLeftMobile("0") 
    }

  
    return (
        <>
            <Row>
                {leftMobile === "0"
                ?
                    <Col xs={2} className="sidebar-hamburger-icon" onClick={closeSideBar}>
                        <Icon.XLg size={25} color="#B6D7E4"/>
                    </Col>
                :
                    <Col xs={2} className="sidebar-hamburger-icon" onClick={closeSideBar}>
                        <Icon.List size={25} color="#B6D7E4"/>
                    </Col>
                }
            </Row>
            <Container fluid className="sidebar-container" style={{left:leftMobile}}>
                <div className="sidebar">
                    <Row className="logo align-items-center">
                        <img src="images/logo.svg" alt="logo" />
                    </Row>

                    <div className="toggle-currencies-mobile">
                        {account &&
                        <Row className="ml-4 mb-2 d-md-none">
                            <h1 className="currency-title">account</h1>
                        </Row>
                        }
                        <Row className="ml-4 mb-2 d-md-none">
                            {account ?
                            <>
                            <div className="address-mobile">
                            {getShrunkWalletAddress(account)}
                            </div>
                            </>
                            :
                            <>
                            <Button className=" nav-link" variant="primary" onClick={() => setModalShow(true)}>Connect Wallet</Button>
                            <WalletModal show={modalShow} onHide={() => setModalShow(false)}></WalletModal>
                            </>
                            }
                        </Row>
                        <Row className="tier-section-mobile ml-4 mb-4 d-md-none">
                            <TierSection tier={tier}/>
                        </Row>
                        <Row className="ml-4 d-md-none">
                            <h1 className="currency-title">currency</h1>
                        </Row>
                        <Row className=" d-md-none">
                            <Dropdown className="nav-link" >
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
                        </Row>
                        <Row className=" d-md-none">
                            <Dropdown className=" nav-link">
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
                        </Row>
                    </div>

                    <Row>
                        <hr className="logo-under-line "/>
                    </Row>
                    <div className="menu">
                        <Row className="menu-item my-2" onClick={closeSideBar}>
                            <Link to="/" className={splitLocation[1] === "" ? "link active-link" : "link"}>
                                <Icon.HouseDoor className="text-primary" />
                                Dashboard
                            </Link>
                        </Row>
                        <Row className="menu-item my-2" onClick={closeSideBar}>
                            <Link to="wallet" className={splitLocation[1] === "wallet" ? "link active-link" : "link"}>
                                <Icon.CreditCard2Back className="text-primary"/>
                                Wallet
                            </Link>
                        </Row>
                        <Row className="menu-item my-2" onClick={closeSideBar}>
                            <Link to="history" className={splitLocation[1] === "history" ? "link active-link" : "link"}>
                                <Icon.ClockHistory className="text-primary" />
                                History
                            </Link>
                        </Row>
                        <Row className="menu-item my-2" onClick={closeSideBar}>
                            <Link to="trade" className={splitLocation[1] === "trade" ? "link active-link" : "link"}>
                                <Icon.CurrencyExchange className="text-primary"/>
                                Trade
                            </Link>
                        </Row>
                        <Row className="menu-item my-2" onClick={closeSideBar}>
                            <Link to="staking" className={splitLocation[1] === "staking" ? "link active-link" : "link"}>
                                <Icon.Stack className="text-primary" />
                                Staking
                            </Link>
                        </Row>
                        <Row className="menu-item my-2" onClick={closeSideBar}>
                            <Link to="tiers" className={splitLocation[1] === "tiers" ? "link active-link" : "link"}>
                                <Icon.LightningCharge className="text-primary" />
                                Tiers
                            </Link>
                        </Row>
                    </div>

                    <Row className="logoBig">
                        <img src={logoGrande} alt="logo"/>
                    </Row>

                    <Container className="footer">
                        <Row className="addressSection">
                            {account &&
                            <>
                         
                            <div className="address">
                            {getShrunkWalletAddress(account)}
                            </div>
                            </>
                            }
                        </Row>
                        <Row className="tierSection my-2 text-center">
                            <TierSection tier={tier}/>
                        </Row>    
                        <hr className=" address-under-line "/>
                        {
                            account
                            ? <Row className="logoutSection" onClick={logout}>
                                <img src={logOutIcon}/>
                                <div className="logout-text"> Log Out </div>
                            </Row>
                            : <></>
                        }
                        
                        <Row className="report-bug">
                            <Col xs={12} className="text-center">
                                <a className="text-muted" href="https://forms.gle/VJ9SdErGY36JXx4c6" rel="noreferrer" target="_blank">Report a bug</a>
                            </Col>
                        </Row>
                    </Container>

                    </div>
                
            </Container>
        </>
    );
}

SideBar.propTypes = {
    values: PropTypes.object,
    symbol: PropTypes.string,
    currency: PropTypes.string,
    handleCurrencyClick: PropTypes.func,
    network: PropTypes.string

};

export default SideBar;
