import { InjectedConnector } from '@web3-react/injected-connector';
import { AbstractConnector } from "@web3-react/abstract-connector";
import { WalletConnectConnector } from '@web3-react/walletconnect-connector'
import getNodeUrl from './getRpcUrl';

const POLLING_INTERVAL = 12000
const chainId = parseInt(process.env.REACT_APP_CHAIN_ID, 10);
const rpcUrl = getNodeUrl();

const injected = new InjectedConnector({ supportedChainIds: [chainId] });

const wc_opts = {
  rpc: { [chainId]: rpcUrl },
  qrcode: true,
  pollingInterval: POLLING_INTERVAL,
  network: 'binance',
  chainId: chainId,
};

const walletconnect = new WalletConnectConnector(wc_opts)

export const ConnectorNames = {
  INJECTED: 'injected',
  WalletConnect: 'walletconnect'
};

export const connectorLocalStorageKey = "connectorIdv2";

export const connectorsByName = {
  [ConnectorNames.INJECTED]: injected,
  [ConnectorNames.WalletConnect]: walletconnect
};

export const getLibrary = provider => provider;
