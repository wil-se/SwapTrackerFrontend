
import WalletConnect from "@walletconnect/client";
import QRCodeModal from "@walletconnect/qrcode-modal";
import { useWeb3React, UnsupportedChainIdError,handleAccountsChanged } from '@web3-react/core';
import { useCallback, useEffect, useRef } from 'react';


const connector = new WalletConnect({
  bridge: "https://bridge.walletconnect.org", // Required
  qrcodeModal: QRCodeModal,
});


const useWalletConnectAuth = () => {
  const { activate, deactivate } = useWeb3React();
  

  const walletConnectLogin = useCallback(() =>{
    console.log("logging in");
    console.log(connector);
    activate(connector, async error => {
       // Check if connection is already established
       console.log(connector);
       if (!connector.connected) {
          // create new session
          console.log("newsession");
          connector.createSession();
          console.log("new session ok");
        }
      
        // Subscribe to connection events
        connector.on("connect", (error, payload) => {
          if (error) {
            throw error;
          }
        
          // Get provided accounts and chainId
          const { accounts, chainId } = payload.params[0];
        });
      
        connector.on("session_update", (error, payload) => {
          if (error) {
            throw error;
          }
        
          // Get updated accounts and chainId
          const { accounts, chainId } = payload.params[0];
        });
      
        connector.on("disconnect", (error, payload) => {
          if (error) {
          throw error;
        }
      })
    })
  })

  const walletConnectLogout = useCallback(() => deactivate(), [deactivate]);


  return { walletConnectLogin, walletConnectLogout }
}

export default useWalletConnectAuth;