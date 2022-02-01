import React, { useState,useEffect } from 'react'
import MainContainer from 'components/MainContainer'
import { Button } from 'react-bootstrap';
import useAuthService from 'hooks/useAuthService'
import useWeb3 from 'hooks/useWeb3';
import {walletDistribution,getWalletTVL} from 'utils/walletHelpers'
import { Card, Row, Col } from 'react-bootstrap';
import { useWeb3React } from '@web3-react/core';
import "./WalletStyles.css"
// import { WalletChart } from 'components/Wallet/WalletChart';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import * as CryptoIcons from '../assets/icons';
import { WalletOverview } from 'components/WalletOverview';
import { CoinInfoList } from 'components/CoinInfoList';
import { useLocation } from 'react-router';


ChartJS.register(ArcElement, Tooltip)


const Wallet = () => {
    const {aia} = useLocation()
    console.log("vediamo ", aia)
    return (
        <MainContainer>
            <Row>
                <Col xs={12}>
                    <h1 className="subheader-title">Wallet</h1>
                </Col> 
            </Row>
            <WalletOverview />
            <CoinInfoList />
        </MainContainer>
    )
}

export default Wallet
