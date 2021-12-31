import { useMemo } from 'react';
import useWeb3 from 'hooks/useWeb3';
import { getBep20Contract, getLpTokenContract, getStakePoolContract } from 'utils/contractHelpers';

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
