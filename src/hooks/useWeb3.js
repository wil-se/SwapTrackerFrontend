import { useEffect, useState, useRef } from 'react';
import Web3 from 'web3';
import { useWeb3React } from '@web3-react/core';
import { getWeb3NoAccount } from 'utils/web3';

const useWeb3 = () => {
  const { library } = useWeb3React();
  const refEth = useRef(library);
  const [web3, setweb3] = useState(library ? new Web3(library) : getWeb3NoAccount());
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
    getChainId()
  }, [library]);

  return {web3,chainId};
};

export default useWeb3;
