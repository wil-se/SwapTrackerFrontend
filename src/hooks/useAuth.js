import { useCallback, useEffect, useRef } from 'react';
import { useWeb3React, UnsupportedChainIdError,handleAccountsChanged } from '@web3-react/core';
import { NoEthereumProviderError, UserRejectedRequestError } from '@web3-react/injected-connector';
import { ConnectorNames, connectorsByName } from 'utils/web3React';
import { setupNetwork } from 'utils/wallet';
import { useFacebookPixel } from './useFacebookPixel';

const connector = connectorsByName[ConnectorNames.INJECTED];

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

  const login = useCallback(() => {
    activate(connector, async error => {
      
      if (isBrowserTabActiveRef) {
        if (error instanceof UnsupportedChainIdError) {
          const hasSetup = await setupNetwork();
          if (hasSetup) {
            activate(connector);
          }
        } else if (error instanceof NoEthereumProviderError) {
          alert('Provider Error: No provider was found');
        } else if (error instanceof UserRejectedRequestError) {
          alert('Authorization Error: Please authorize to access your account');
        } else {
          alert(`${error.name}: ${error.message}`);
        }
      }
    })
    .then(() => {
   
      pixel.trackCustom('walled_connected');
    });

  }, [activate, isBrowserTabActiveRef, pixel]);

  const logout = useCallback(() => deactivate(), [deactivate]);

  return { login, logout };
};

export default useAuth;
