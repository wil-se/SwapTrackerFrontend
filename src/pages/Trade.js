import React, { useEffect } from 'react'
import { useWeb3React } from '@web3-react/core';
import MainContainer from 'components/MainContainer';
import {callPost} from 'utils/swapTrackerServiceConnection'
import { Button } from 'react-bootstrap';

const Trade = () => {
    const { account } = useWeb3React();
    const user = {
        address:account,
        tier:1,
        lastLogin:new Date(),
        tokenList:{
            1:["0xebed4ff9fe34413db8fc8294556bbd1528a4daca","0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2"],
            56:["0x1114F26FDd0dAef284BAe4943Baa14473036c124","0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c"]
        }

    }

    const swap = () => {
        let resp = callPost("createUser",user);
        console.log("veidmao ", resp)
    }

    return (
        <MainContainer>
            <Button onClick={swap}>Swap</Button>
        </MainContainer>
    )
}

export default Trade
