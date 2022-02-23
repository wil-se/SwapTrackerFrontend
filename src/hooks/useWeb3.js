import { useEffect, useState, useRef } from 'react';
import Web3 from 'web3';
import { useWeb3React } from '@web3-react/core';
import { getWeb3NoAccount,getWeb3WalletConnect } from 'utils/web3';
import useWalletConnectAuth from './useWalletConnectAuth';

const useWeb3 = () => {
  const { library } = useWeb3React();
  const {connector} = useWalletConnectAuth()
  const refEth = useRef(library);
 
  const [web3, setweb3] = useState(getWeb3NoAccount());
  const [chainId,setChainId] = useState()
  const getChainId = async () => {
    let chainId = await web3.eth.getChainId();
    setChainId(chainId)
  }
  useEffect(() => {
    if (library !== refEth.current) {
      console.log("useEff library ", library)
      setweb3(library ? new Web3(library) :getWeb3WalletConnect());
      refEth.current = library;
    }
    getChainId()
  }, [library,connector.connected]);

  return {web3,chainId};
};

export default useWeb3;
