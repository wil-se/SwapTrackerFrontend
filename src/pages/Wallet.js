import React, {useLayoutEffect } from 'react'
import MainContainer from 'components/MainContainer'
import {Row,Col } from 'react-bootstrap';
import "./WalletStyles.css"
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { WalletOverview } from 'components/WalletOverview';
import { CoinInfoList } from 'components/CoinInfoList';
import { useSwapTrackerMediator } from 'hooks/useContract';
import {useNavigate} from 'react-router-dom'
import {getTier} from 'utils/walletHelpers'
import { useWeb3React } from '@web3-react/core';



ChartJS.register(ArcElement, Tooltip)


const Wallet = () => {
    const navigation = useNavigate();
    const swapTrackerMediator = useSwapTrackerMediator(); 
    const { account } = useWeb3React();

    useLayoutEffect(()=>{
        (async()=>{
            if(account){
                await getTier(swapTrackerMediator,navigation,account)
            }
        })()
    },[account])

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
