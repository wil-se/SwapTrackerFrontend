import React, { useState,useEffect } from 'react'
import {callPost,callGet} from 'utils/swapTrackerServiceConnection'
import { useWeb3React } from '@web3-react/core';
import useWalletConnectAuth from 'hooks/useWalletConnectAuth'
import {useNavigate,useLocation} from 'react-router-dom'
import { useSwapTrackerMediator } from 'hooks/useContract';

const useAuthService = () => {
    const {account} = useWeb3React();
    const [user,setUser] = useState()
    const [tier,setTier] = useState()
    const [profitOrLossOverview,setProfitOrLossOverview] = useState([])
    //const { connector } = useWalletConnectAuth()
    const swapTrackerMediator = useSwapTrackerMediator(); 
    const navigation = useNavigate()
    const location = useLocation()

    const setTierNoRedirect = async (account) => {
        let tid = await swapTrackerMediator.methods.getTierFee(account).call()
        setTier(Number(tid))
    }

    const setTierWithRedirect = async (account) => {
        if(account){
            let tid = await swapTrackerMediator.methods.getTierFee(account).call()
            console.log("Tier: ",tid)
            if(Number(tid) >= 1000 ){
                navigation('/tiers',{state:{noTier:true}})
            }else{
                return Number(tid)
            }
        }else{
            navigation('/tiers',{state:{noTier:true}})
        }
    }

    const checkTierRedirect = async (tierFee) => {
        if(Number(tierFee) >= 1000 ){
            navigation('/tiers')
        }
    }
   
    const getProfitsLosses = async (address) => {
       
        const profLossList = await callGet("getProfitsLosses",address.toLowerCase())
      
        setProfitOrLossOverview(profLossList?.data.data)
    }

    useEffect(() => {
        (async()=>{

            if(account){
                await getProfitsLosses(account)
                const resp = await callPost("createOrUpdateUser",{address:account.toLowerCase(), lastLogin:new Date()})
                setUser(resp?.data.data)
                await setTierNoRedirect(account)
                
               
                //setProfitOrLossOverview(respProfOrLoss?.data.data)

            } /*else if(connector.connected) {
                const resp = await callPost("createOrUpdateUser",{address:connector._accounts[0].toLowerCase(), lastLogin:new Date()})
                setUser(resp?.data.data);
                await setTierNoRedirect(connector._accounts[0].toLowerCase())
               
            }*/
            else{
                setUser(null)
                setTier(1000)
            }
        })()

    }, [account/*, connector*/])

    
    const createOrUpdateUser = (body) => {
        callPost("createOrUpdateUser",body).then((resp)=>{
           setUser(resp.data.data)
        });
    }

    const updateUserTokenList = (body) => {
        callPost("updateUserTokenList",body)
    }

    return {
        user,
        createOrUpdateUser,
        updateUserTokenList,
        tier,
        setTierNoRedirect,
        setTierWithRedirect,
        profitOrLossOverview
    }
    
}

export default useAuthService
