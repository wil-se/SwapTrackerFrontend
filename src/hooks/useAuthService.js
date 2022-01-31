import React, { useState,useEffect } from 'react'
import {callPost} from 'utils/swapTrackerServiceConnection'
import { useWeb3React } from '@web3-react/core';
import useWalletConnectAuth from 'hooks/useWalletConnectAuth'


const useAuthService = () => {
    const {account} = useWeb3React();
    const [user,setUser] = useState()
    const { connector } = useWalletConnectAuth()


    useEffect(() => {
       if(account){
           callPost("createOrUpdateUser",{address:account.toLowerCase(), lastLogin:new Date()}).then((resp)=>{
               setUser(resp.data.data)
           })
       } else if(connector.connected) {
            callPost("createOrUpdateUser",{address:connector._accounts[0].toLowerCase(), lastLogin:new Date()}).then((resp)=>{
                setUser(resp.data.data);
            })
            // console.log(user)
       }
    }, [account, connector])

    
    const createOrUpdateUser = (body) => {
        callPost("createOrUpdateUser",body).then((resp)=>{
           setUser(resp.data.data)
        });
    }
    const updateUserTokenList = (body) => {
        callPost("updateUserTokenList",body)
    }

    return {user,createOrUpdateUser,updateUserTokenList}
    
}

export default useAuthService
