import { useEffect, useState } from 'react';
import { ConnectorNames, connectorsByName, connectorLocalStorageKey } from 'utils/web3React';
import useAuth from 'hooks/useAuth';

const connector = connectorsByName[ConnectorNames.INJECTED];

const useEagerConnect = () => {
  const { login } = useAuth();

  useEffect(() => {
    const connectorId = window.localStorage.getItem(connectorLocalStorageKey);
      login(connectorId);
  }, [login]);
};

export default useEagerConnect;
