
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
    activate(connector, async error => {
       // Check if connection is already established
       
       if (!connector.connected) {
          // create new session
          connector.createSession();
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


  return { walletConnectLogin, walletConnectLogout, connector }
}

export default useWalletConnectAuth;