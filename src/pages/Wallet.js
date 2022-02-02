import React, { useState,useEffect } from 'react'
import MainContainer from 'components/MainContainer'
import { Button,Row,Col } from 'react-bootstrap';
import "./WalletStyles.css"
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { WalletOverview } from 'components/WalletOverview';
import { CoinInfoList } from 'components/CoinInfoList';



ChartJS.register(ArcElement, Tooltip)


const Wallet = () => {
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
