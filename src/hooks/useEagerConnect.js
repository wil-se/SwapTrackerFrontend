import { useEffect, useState } from 'react';
import { ConnectorNames, connectorsByName } from 'utils/web3React';
import useAuth from 'hooks/useAuth';

const connector = connectorsByName[ConnectorNames.INJECTED];

const useEagerConnect = () => {
  const { login } = useAuth();

  const [tried, setTried] = useState(false);

  useEffect(() => {
    if (!tried) {
      connector.isAuthorized().then(isAuthorized => {
        if (isAuthorized) {
          login();
        }
      });
      setTried(true);
    }
  }, [login, tried]);
};

export default useEagerConnect;
