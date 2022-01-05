import React, { useState } from 'react'
import MainContainer from 'components/MainContainer'
import { Button } from 'react-bootstrap';
import useAuthService from 'hooks/useAuthService'
import useWeb3 from 'hooks/useWeb3';
import {walletDistribution,getWalletTVL} from 'utils/walletHelpers'

const Wallet = () => {
    const [walletTVL,setWalletTVL] = useState(0)
    const [walletDistributions,setWalletDistributions] = useState({})
    const {chainId,web3} = useWeb3()
    const {user} = useAuthService()
    const wlltDist = async ()=>{let wlltDist =  await walletDistribution(user,walletTVL,web3,chainId); setWalletDistributions(wlltDist)}
    const getWlltTVL = async ()=>{let wlltTVL = await getWalletTVL(user,web3,chainId); setWalletTVL(wlltTVL)}
 

    return (
        <MainContainer>

           <Button onClick={wlltDist}>Wallet Distribution</Button>
           <Button onClick={getWlltTVL}>TVL</Button>
        </MainContainer>
    )
}

export default Wallet
