import React,{useState, useLayoutEffect} from 'react'
import TradeMainCard from './TradeMainCard'
import { useSwapTrackerMediator } from 'hooks/useContract';
import { useWeb3React } from '@web3-react/core';

const TradeCard = () => {
    const [tier,setTier] = useState(0)
    const { account } = useWeb3React();
    const swapTrackerMediator = useSwapTrackerMediator();

    useLayoutEffect(()=>{
        (async()=>{
            if(account){
                let tid = await swapTrackerMediator.methods.getTierFee(account).call()
                setTier(Number(tid))
            }
        })()
    },[account])

     return (
        <div className="d-flex justify-content-center"> 
            <TradeMainCard tier={tier}/>
        </div>
    )
}

export default TradeCard;



