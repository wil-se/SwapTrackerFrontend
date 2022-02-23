import React, { useState,useEffect } from 'react'
import {callPost,callGet} from 'utils/swapTrackerServiceConnection'
import { useWeb3React } from '@web3-react/core';
import useWalletConnectAuth from 'hooks/useWalletConnectAuth'
import {useNavigate,useLocation} from 'react-router-dom'
import { useSwapTrackerMediator } from 'hooks/useContract';

const useAuthService = () => {
    const {account,active} = useWeb3React();
    const [user,setUser] = useState()
    const [tier,setTier] = useState()
    const [profitOrLossOverview,setProfitOrLossOverview] = useState([])
    const { connector } = useWalletConnectAuth()
    const swapTrackerMediator = useSwapTrackerMediator(); 
    const navigation = useNavigate()
    const location = useLocation()

    const setTierNoRedirect = async (account) => {
        let tid = await swapTrackerMediator.methods.getTierFee(account).call()
        setTier(Number(tid))
    }

    const setTierWithRedirect = async (account) => {
        console.log(account)
        if(account){
            let tid = await swapTrackerMediator.methods.getTierFee(account).call()
            console.log(tid)
                if(Number(tid) === 1000 ){
                    navigation('/tiers')
                }
                return Number(tid)
        }
        else{
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

            } else if(connector.connected) {
                const resp = await callPost("createOrUpdateUser",{address:connector.accounts[0].toLowerCase(), lastLogin:new Date()})
                setUser(resp?.data.data);
                await setTierNoRedirect(connector.accounts[0].toLowerCase())
               
            }
            else{
                setUser(null)
                setTier(1000)
            }
        })()

    }, [account, connector])

    
    const createOrUpdateUser = (body) => {
        callPost("createOrUpdateUser",body).then((resp)=>{
           setUser(resp.data.data)
        });
    }
    const updateUserTokenList = (body) => {
        callPost("updateUserTokenList",body)
    }


    return {user, account: active ? account : connector.accounts[0],createOrUpdateUser,updateUserTokenList,tier,setTierNoRedirect,setTierWithRedirect,profitOrLossOverview}
    
}

export default useAuthService
