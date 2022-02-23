import { useEffect, useState, useRef } from 'react';
import Web3 from 'web3';
import { useWeb3React } from '@web3-react/core';
import { getWeb3NoAccount } from 'utils/web3';
import WalletConnectProvider from "@walletconnect/web3-provider";

const provider = new WalletConnectProvider({
  rpc: {
    56: "https://bsc-dataseed.binance.org/",
  },
});

const useWeb3 = () => {
  const { library, active } = useWeb3React();

  const refEth = useRef(library);
  const refEthWc = useRef(provider);
  const [web3, setweb3] = useState(library ? new Web3(library) : provider ? new Web3(provider) : getWeb3NoAccount());
  const [chainId,setChainId] = useState()
  const getChainId = async () => {
    let chainId = await web3.eth.getChainId();
    setChainId(chainId)
  }

  useEffect(() => {
    if (library !== refEth.current) {
      setweb3(library ? new Web3(library) : getWeb3NoAccount());
      refEth.current = library;
    }
    if (provider !== refEthWc.current) {
      setweb3(provider ? new Web3(provider) : getWeb3NoAccount());
      refEthWc.current = provider;
    } 
    getChainId()
  }, [library, provider]);

  return {web3,chainId};
};

export default useWeb3;
