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

const SideBar = () => {
    useEagerConnect();
    useGoogleAnalytics();
    const navigation = useNavigate();
    const { account } = useWeb3React();
    const {logout} = useAuth()
   const swapTrackerMediator = useSwapTrackerMediator()
    const {createOrUpdateUser} = useAuthService()
    const [tier,setTier] = useState();
    const [leftMobile,setLeftMobile] = useState()
    const pixel = useFacebookPixel();
    const ga = useGoogleAnalytics();

    const getShrunkWalletAddress = (addr) => {
        return (addr && `${addr.substring(0,4)}.....${addr.substring(addr.length-11)}`)
    }

    useEffect(() =>{
       
        pixel.track('ViewContent', { content_name: window.location.pathname });
        ga.send({ hitType: "pageview", page: window.location.pathname });
        (async ()=>{
            if(account){ 
                let user = {address:account && account.toLowerCase(),lastLogin:new Date()}
                createOrUpdateUser(user)
                let tid = await getTier(swapTrackerMediator,navigation,account, true)
                console.log("il tier ", tid)
                setTier(tid)
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
                        <Row className="menu-item" onClick={closeSideBar}>
                            <Link to="dashboard" className="link" >
                                <Icon.HouseDoor/>
                                Dashboard
                            </Link>
                        </Row>
                        <Row className="menu-item" onClick={closeSideBar}>
                            <Link to="wallet" className="link">
                                <Icon.CreditCard2Back/>
                                Wallet
                            </Link>
                        </Row>
                        <Row className="menu-item" onClick={closeSideBar}>
                            <Link to="history" className="link">
                                <Icon.ClockHistory/>
                                History
                            </Link>
                        </Row>
                        <Row className="menu-item" onClick={closeSideBar}>
                            <Link to="trade" className="link">
                                <Icon.CurrencyExchange/>
                                Trade
                            </Link>
                        </Row>
                        <Row className="menu-item" onClick={closeSideBar}>
                            <Link to="staking" className="link">
                                <Icon.Stack/>
                                Staking
                            </Link>
                        </Row>
                        <Row className="menu-item" onClick={closeSideBar}>
                            <Link to="tiers" className="link">
                                <Icon.LightningCharge/>
                                Tiers
                            </Link>
                        </Row>
                    </div>

                    <Row className="logoBig">
                        <img src={logoGrande} alt="logo"/>
                    </Row>

                    <Container className="footer">
                        <Row className="addressSection">
                            <img src={addressAvatar}/>    
                            <div className="address">
                            {getShrunkWalletAddress(account)}
                            </div>
                        </Row>
                        <Row className="tierSection">
                            <TierSection tier={tier}/>
                        </Row>    
                        <hr className="address-under-line "/>
                        <Row className="logoutSection" onClick={logout}>
                            <img src={logOutIcon}/>
                            <div className="logout-text">
                                Log Out
                            </div>
                        </Row>
                    </Container>

                    </div>
                
            </Container>
        </>
    );
}

export default SideBar;
