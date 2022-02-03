import React, { useLayoutEffect } from 'react'

import MainContainer from 'components/MainContainer';
import TradeCard from 'components/TradeCard';
import { useSwapTrackerMediator } from 'hooks/useContract';
import {useNavigate} from 'react-router-dom'
import {getTier} from 'utils/walletHelpers'
import { useWeb3React } from '@web3-react/core';

const Trade = () => {
    const navigation = useNavigate();
    const { account } = useWeb3React();
    const swapTrackerMediator = useSwapTrackerMediator();

    useLayoutEffect(()=>{
        (async()=>{
            if(account){
                await getTier(swapTrackerMediator,navigation,account)
            }
        })()
    },[account])
    
    return (
        <MainContainer>
            <h1 className="subheader-title">Trade</h1>
            <TradeCard/>
        </MainContainer>
    )
}

export default Trade
