import React, { useState,useEffect } from 'react'
import MainContainer from 'components/MainContainer'
import { Button } from 'react-bootstrap';
import "./WalletStyles.css"
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { WalletOverview } from 'components/WalletOverview';
import { CoinInfoList } from 'components/CoinInfoList';



ChartJS.register(ArcElement, Tooltip)


const Wallet = () => {
    return (
        <MainContainer>
            <div >
            <h1 className="subheader-title" style={{marginLeft: -15}}>Wallet</h1>
                <WalletOverview />
                <CoinInfoList />
            </div>
        </MainContainer>
    )
}

export default Wallet
