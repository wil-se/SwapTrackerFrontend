import web3NoAccount from 'utils/web3';
import { poolsConfig } from 'config/constants';
import { getAddress } from 'utils/addressHelpers';

import bep20Abi from 'config/abi/erc20.json';
import lpTokenABI from 'config/abi/lpToken.json';
import StakePoolABI from 'config/abi/StakePool.json';
import PancakeRouterAbi from 'config/abi/pancakeRouter.json';
import PancakePairAbi from 'config/abi/pancakePair.json';
import SwapTrackerMediatorAbi from 'config/abi/swapTrackerMediator.json';
import WbnbABI from 'config/abi/wbnb.json'

export const getContract = (abi, address, web3) => {
  const _web3 = web3 ?? web3NoAccount;
  return new _web3.eth.Contract(abi, address);
};

export const getBep20Contract = (address, web3) => getContract(bep20Abi, address, web3);

export const getLpTokenContract = (address, web3) => getContract(lpTokenABI, address, web3);

export const getStakePoolContract = (id, web3) => {
  const config = poolsConfig.find(pool => pool.poolId === id);
  return getContract(StakePoolABI, getAddress(config.contractAddress), web3);
};

export const getPancakeRouter = (address,web3) => getContract(PancakeRouterAbi,address,web3);

export const getPancakePair = (address) => getContract(PancakePairAbi,address);

export const getSwapTrackerMediator = (address,web3) => getContract(SwapTrackerMediatorAbi,address,web3);

export const getWBNBContract = (address,web3) => getContract(WbnbABI,address,web3)