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


ChartJS.register(ArcElement, Tooltip)


const Wallet = () => {
    return (
        <MainContainer>
            <h1 className="subheader-title">Wallet</h1>
            <div>
                <WalletOverview />
                <CoinInfoList />
            </div>
        </MainContainer>
    )
}

export default Wallet
