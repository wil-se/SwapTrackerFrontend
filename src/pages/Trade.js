import React, { useEffect } from 'react'
import { useWeb3React } from '@web3-react/core';
import {callPost} from 'utils/swapTrackerServiceConnection'
import useWeb3 from 'hooks/useWeb3';

import MainContainer from 'components/MainContainer';
import TradeCard from 'components/TradeCard';

const Trade = () => {
    const {chainId} = useWeb3()
    const { account } = useWeb3React(); 
    const user = {
        address:account,
        chainId:chainId,
        tokenList:{
            1:["0xebed4ff9fe34413db8fc8294556bbd1528a4daca","0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2"],
            56:["0x1114F26FDd0dAef284BAe4943Baa14473036c124","0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bD0950"]
        }

    }

    const swap = () => {
        console.log("vediamo ", chainId)
       callPost("updateUserTokenList",user).then(resp=>{console.log(resp)});
        
    }

    return (
        <MainContainer>
            <h1 className="subheader-title">Trade</h1>
            <TradeCard/>
        </MainContainer>
    )
}

export default Trade
