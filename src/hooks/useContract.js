import { useMemo } from 'react';
import useWeb3 from 'hooks/useWeb3';
import { getBep20Contract, getLpTokenContract, getStakePoolContract,getPancakeRouter,getPancakePair,getSwapTrackerMediator } from 'utils/contractHelpers';

export const useStakePool = poolId => {
  const {web3} = useWeb3();
  return useMemo(() => getStakePoolContract(poolId, web3), [poolId, web3]);
};

export const useERC20 = address => {
  const {web3}= useWeb3();
  return useMemo(() => getBep20Contract(address, web3), [address, web3]);
};

export const useLPToken = address => {
  const {web3} = useWeb3();
  return useMemo(() => getLpTokenContract(address, web3), [address, web3]);
};

export const usePancakeRouter = () => {
  const {web3} = useWeb3();
  return useMemo(() => getPancakeRouter("0x10ED43C718714eb63d5aA57B78B54704E256024E".toLowerCase(),web3), [web3]);
}

export const usePancakePair = (address) => {
  const {web3} = useWeb3();
  return useMemo(()=>address && getPancakePair(address,web3), [web3]);
}

export const useSwapTrackerMediator = () => {
  const {web3} = useWeb3();
  return useMemo(()=> getSwapTrackerMediator("0xc246084Ea460960b33f5C7e5Bfbb1569B17c0ac5".toLowerCase(),web3), [web3]);
}
