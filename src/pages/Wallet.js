import React, {useLayoutEffect,useEffect } from 'react'
import MainContainer from 'components/MainContainer'
import {Row,Col } from 'react-bootstrap';
import "./WalletStyles.css"
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { WalletOverview } from 'components/WalletOverview';
import { CoinInfoList } from 'components/CoinInfoList';
import { useWeb3React } from '@web3-react/core';
import useAuthService from 'hooks/useAuthService';


ChartJS.register(ArcElement, Tooltip)


const Wallet = () => {
    const {setTierWithRedirect} = useAuthService()
    const { account } = useWeb3React();

   
    useLayoutEffect(()=>{(async()=>{ await setTierWithRedirect(account)})()},[account])

    useEffect(()=>{(async()=>{ await setTierWithRedirect(account)})()},[account])

    return (
        <MainContainer>
        <>
            <Row>
                <Col xs={12}>
                    <h1 className="subheader-title">Wallet</h1>
                </Col> 
            </Row>
            <WalletOverview />
            <CoinInfoList />
        </>
        </MainContainer>
    )
}

export default Wallet
