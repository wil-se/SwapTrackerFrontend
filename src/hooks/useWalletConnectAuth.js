
import { useWeb3React, UnsupportedChainIdError,handleAccountsChanged } from '@web3-react/core';
import { useCallback, useEffect, useRef } from 'react';
import { ConnectorNames, connectorsByName } from 'utils/web3React';

const connector = connectorsByName[ConnectorNames.WalletConnect];

const useWalletConnectAuth = () => {
  const { activate, deactivate } = useWeb3React();
  
  const walletConnectLogin = useCallback(() =>{
    connector.enable()
    activate(connector, async error => {
       // Check if connection is already established
       if (!connector.connected) {
          // create new session
          
           activate(connector);
        }
      
        // Subscribe to connection events
        connector.on("connect", (error, payload) => {
          if (error) {
            throw error;
          }
        
          // Get provided accounts and chainId
          const { accounts, chainId } = payload.params[0];
          console.log(accounts, chainId)
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