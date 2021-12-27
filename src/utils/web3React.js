import { InjectedConnector } from '@web3-react/injected-connector';

const chainId = parseInt(process.env.REACT_APP_CHAIN_ID, 10);

const injected = new InjectedConnector({ supportedChainIds: [chainId] });

export const ConnectorNames = {
  INJECTED: 'injected',
};

export const connectorsByName = {
  [ConnectorNames.INJECTED]: injected,
};

export const getLibrary = provider => provider;
