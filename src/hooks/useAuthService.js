import React, { useState,useEffect } from 'react'
import {callPost} from 'utils/swapTrackerServiceConnection'
import { useWeb3React } from '@web3-react/core';
const useAuthService = () => {
    const {account} = useWeb3React();
    const [user,setUser] = useState()

    useEffect(() => {
       if(account){
           callPost("createOrUpdateUser",{address:account, lastLogin:new Date()}).then((resp)=>{
               setUser(resp.data.data)
           })
       }
    }, [account])

    
    const createOrUpdateUser = (body) => {
        callPost("createOrUpdateUser",body).then((resp)=>{
            console.log("allora ",resp.data.data)
           setUser(resp.data.data)
        });
    }
    const updateUserTokenList = (body) => {
        callPost("updateUserTokenList",body)
    }

    return {user,createOrUpdateUser,updateUserTokenList}
    
}

export default useAuthService
