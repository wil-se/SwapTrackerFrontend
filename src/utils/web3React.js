import { InjectedConnector } from '@web3-react/injected-connector';
import WalletConnectProvider from "@walletconnect/web3-provider";
import getRpcUrl from 'utils/getRpcUrl';
import { Web3Provider } from '@ethersproject/providers'

const RPC_URL = getRpcUrl();
const chainId = parseInt(process.env.REACT_APP_CHAIN_ID, 10);
const POLLING_INTERVAL = 12000
const injected = new InjectedConnector({ supportedChainIds: [chainId] });

const walletconnect = new WalletConnectProvider({
  rpc: { [chainId]: RPC_URL },
  qrcode: true,
  pollingInterval: POLLING_INTERVAL,
})

export const ConnectorNames = {
  INJECTED: 'injected',
  WalletConnect: 'walletconnect'
};

export const connectorsByName = {
  [ConnectorNames.INJECTED]: injected,
  [ConnectorNames.WalletConnect]: walletconnect,
};

export const getLibrary = (provider) => {
  const library = new Web3Provider(provider)
  console.log("library::: ", library)
  library.pollingInterval = POLLING_INTERVAL
  return library
}
