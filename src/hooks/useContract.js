import { useMemo } from 'react';
import useWeb3 from 'hooks/useWeb3';
import { getWBNBContract, getBep20Contract, getLpTokenContract, getStakePoolContract,getPancakeRouter,getPancakePair,getSwapTrackerMediator } from 'utils/contractHelpers';

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
  return useMemo(() => getPancakeRouter(process.env.REACT_APP_PANCAKE_ROUTER.toLowerCase(),web3), [web3]);
}

export const usePancakePair = (address) => {
  const {web3} = useWeb3();
  return useMemo(()=>address && getPancakePair(address,web3), [web3]);
}

export const useSwapTrackerMediator = () => {
  const {web3} = useWeb3();
  console.log("SWMED:: ",process.env.REACT_APP_SWAPTRACKER_MEDIATOR.toLowerCase())
  return useMemo(()=> getSwapTrackerMediator(process.env.REACT_APP_SWAPTRACKER_MEDIATOR.toLowerCase(),web3), [web3]);
}

export const useWBNBContract = () => {
  const {web3} = useWeb3()
  return useMemo(()=>getWBNBContract(process.env.REACT_APP_WBNB.toLowerCase(),web3),[web3])
}
