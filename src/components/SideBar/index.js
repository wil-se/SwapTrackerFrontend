import React, { useEffect, useState } from 'react'
import  {Container,Row} from 'react-bootstrap';
import {Link} from 'react-router-dom';
//icons
import logoGrande from '../../assets/icons/logoGrandeSidebar.png';
import addressAvatar from '../../assets/icons/addressAvatar.png';
import tierPro from '../../assets/icons/tierPro.png';
import logOutIcon from '../../assets/icons/logOutIcon.png';
import * as Icon from 'react-bootstrap-icons'
//icons
import { useWeb3React } from '@web3-react/core';
import useAuth from 'hooks/useAuth';

const SideBar = () => {
    const { account } = useWeb3React();
    const {logout} = useAuth()
    const [tiers,setTiers] = useState(0);

    const sideBarRows = [
        {title:"Dashboard",id:"dashboard", icon:require('../../assets/icons/logOutIcon.png')},
        {title:"Wallet",id:"wallet"},
        {title:"History",id:"history"},
        {title:"Trade",id:"trade"},
        {title:"Stacking",id:"stacking"},
        {title:"Tiers",id:"tiers"}
    ];
    const getShrunkWalletAddress = (addr) => {
        return (addr && `${addr.substring(0,4)}.....${addr.substring(addr.length-11)}`)
    }
    

    useEffect(()=>{

        
    },[])

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
                    <Link to="dashboard" className="link">
                        <Icon.HouseDoor/>
                        Dashboard
                    </Link>
                </Row>
                <Row className="menu-item">
                    <Link to="wallet" className="link">
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
                    <Link to="stacking" className="link">
                        <Icon.Stack/>
                        Stacking
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
                    <img src={tierPro}/>
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
