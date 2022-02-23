import React, { useEffect, useState } from 'react';
import { Container, Row,Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
//icons
import logoGrande from '../../assets/icons/logoGrandeSidebar.png';
import addressAvatar from '../../assets/icons/addressAvatar.png';
import logOutIcon from '../../assets/icons/logOutIcon.png';
import * as Icon from 'react-bootstrap-icons';
//icons
import { useWeb3React } from '@web3-react/core';
import useAuth from 'hooks/useAuth';
import useEagerConnect from 'hooks/useEagerConnect';
import { useFacebookPixel } from 'hooks/useFacebookPixel';
import { useGoogleAnalytics } from 'hooks/useGoogleAnalytics';
import useAuthService from 'hooks/useAuthService';
import TierSection from './TierSection';
import { useSwapTrackerMediator } from 'hooks/useContract';
import {useNavigate} from 'react-router-dom'
import {getTier} from 'utils/walletHelpers'
import { useLocation } from "react-router-dom";


const SideBar = () => {
    useEagerConnect();
    useGoogleAnalytics();
   
    
    const {logout} = useAuth()
    const {createOrUpdateUser,tier,account} = useAuthService()
    const [leftMobile,setLeftMobile] = useState()
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
                        <Col className="sidebar-hamburger-icon" onClick={closeSideBar}>
                            <Icon.XLg size={25} color="black"/>
                        </Col>
                    :
                        <Col className="sidebar-hamburger-icon" onClick={closeSideBar}>
                            <Icon.List size={25} color="black"/>
                        </Col>
                    }
                </Row>
            <Container fluid className="sidebar-container" style={{left:leftMobile}}>
                <div className="sidebar">
                    <Row className="logo align-items-center">
                        <img src="images/logo.svg" alt="logo" />
                    </Row>

                    <Row className="mt-5">
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
                            {/* <img src={addressAvatar}/>     */}
                            <div className="address">
                            {getShrunkWalletAddress(account)}
                            </div>
                            </>
                            }
                        </Row>
                        <Row className="tierSection my-2 text-center">
                            {console.log("tierr", tier)}
                            <TierSection tier={tier}/>
                        </Row>    
                        <hr className=" address-under-line "/>
                        <Row className="logoutSection" onClick={logout}>
                            <img src={logOutIcon}/>
                            <div className="logout-text"> Log Out </div>
                        </Row>
                        <Row className="pt-5">
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

export default SideBar;
