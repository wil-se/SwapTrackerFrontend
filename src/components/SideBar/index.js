import React, { useEffect, useState } from 'react';
import { Container, Row,TabContainer } from 'react-bootstrap';
import { Link } from 'react-router-dom';
//icons
import logoGrande from '../../assets/icons/logoGrandeSidebar.png';
import addressAvatar from '../../assets/icons/addressAvatar.png';
import tierPro from '../../assets/icons/tierPro.png';
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

const SideBar = () => {
    useEagerConnect();
    useGoogleAnalytics();
    const navigation = useNavigate();
    const { account } = useWeb3React();
    const {logout} = useAuth()
   const swapTrackerMediator = useSwapTrackerMediator()
    const {createOrUpdateUser} = useAuthService()
    const [tier,setTier] = useState();
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
                let tid = await swapTrackerMediator.methods.getTierFee(account).call()
                if(Number(tid) === 1000){
                    navigation('/tiers')
                }
                setTier(Number(tid))
            }
        })()
        
    },[account])
  
    return (
        <Container fluid className="sidebar-container">
            <div className="sidebar">
            <Row className="logo align-items-center">
                <img src="images/logo.svg" alt="logo" />
            </Row>
            <Row className="mt-5">
            <hr className="logo-under-line "/>

            </Row>
            <div className="menu">
                <Row className="menu-item">
                    <Link to="dashboard" className="link" >
                        <Icon.HouseDoor/>
                        Dashboard
                    </Link>
                </Row>
                <Row className="menu-item">
                    <Link to="wallet" className="link" state={{aia:"ciaoo"}} >
                        <Icon.CreditCard2Back/>
                        Wallet
                    </Link>
                </Row>
                <Row className="menu-item">
                    <Link to="history" className="link">
                        <Icon.ClockHistory/>
                        History
                    </Link>
                </Row>
                <Row className="menu-item">
                    <Link to="trade" className="link">
                        <Icon.CurrencyExchange/>
                        Trade
                    </Link>
                </Row>
                <Row className="menu-item">
                    <Link to="staking" className="link">
                        <Icon.Stack/>
                        Staking
                    </Link>
                </Row>
                <Row className="menu-item">
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
    );
}

export default SideBar;
