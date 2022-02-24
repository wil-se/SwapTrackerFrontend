import { 
  useCallback,
  useEffect,
  useRef 
} from 'react';
import { 
  useWeb3React,
  UnsupportedChainIdError
} from '@web3-react/core';
import { 
  NoEthereumProviderError,
  UserRejectedRequestError as UserRejectedRequestErrorInjected
} from '@web3-react/injected-connector';
import { 
  ConnectorNames,
  connectorsByName
} from 'utils/web3React';

import { setupNetwork } from 'utils/wallet';
import { useFacebookPixel } from './useFacebookPixel';

import {
  UserRejectedRequestError as UserRejectedRequestErrorWalletConnect,
  WalletConnectConnector,
} from '@web3-react/walletconnect-connector'

const useIsBrowserTabActive = () => {
  const isBrowserTabActiveRef = useRef(true);

  useEffect(() => {
    const onVisibilityChange = () => {
      isBrowserTabActiveRef.current = !document.hidden;
    };

    window.addEventListener('visibilitychange', onVisibilityChange);

    return () => {
      window.removeEventListener('visibilitychange', onVisibilityChange);
    };
  }, []);

  return isBrowserTabActiveRef;
};

const useAuth = () => {

  const { activate, deactivate } = useWeb3React();
  const isBrowserTabActiveRef = useIsBrowserTabActive();
  const pixel = useFacebookPixel();

  const login = useCallback((connectorID) => {
    const connector = connectorsByName[connectorID]
    if(connector){
      activate(connector, async error => {
        if (isBrowserTabActiveRef) {

          if (error instanceof UnsupportedChainIdError) {
            const hasSetup = await setupNetwork();
            if (hasSetup) {
              activate(connector);
            }
          } else if (error instanceof NoEthereumProviderError) {
            alert('Provider Error: No provider was found');
          } else if (
            error instanceof UserRejectedRequestErrorInjected || 
            error instanceof UserRejectedRequestErrorWalletConnect
          ) {
            if (connector instanceof WalletConnectConnector) {
              connector.walletConnectProvider = null
            }
            alert('Authorization Error: Please authorize to access your account');
          } else {
            alert(`ASD ${error.name}: ${error.message}`);
          }
        }
      })
      .then(() => {
        pixel.trackCustom('walled_connected');
      });
    }
  }, [activate, isBrowserTabActiveRef, pixel]);

  const logout = useCallback(() => deactivate(), [deactivate]);
  
  return { login, logout };
};

export default useAuth;
