import poolsConfig from 'config/constants/pools';
import StakePoolABI from 'config/abi/StakePool.json';
import erc20ABI from 'config/abi/erc20.json';
import multicall from 'utils/multicall';
import { getAddress } from 'utils/addressHelpers';
import BigNumber from 'bignumber.js';

export const fetchPoolsAllowance = async account => {
  const calls = poolsConfig.map(pool => ({
    address: getAddress(pool.stakingToken.address),
    name: 'allowance',
    params: [account, getAddress(pool.contractAddress)],
  }));

  const allowances = await multicall(erc20ABI, calls);

  return poolsConfig.reduce((acc, pool, i) => ({ ...acc, [pool.poolId]: new BigNumber(allowances[i]).toJSON() }), {});
};

export const fetchUserBalances = async account => {
  const calls = poolsConfig.map(pool => ({
    address: getAddress(pool.stakingToken.address),
    name: 'balanceOf',
    params: [account],
  }));

  const balances = await multicall(erc20ABI, calls);

  return poolsConfig.reduce((acc, pool, i) => ({ ...acc, [pool.poolId]: new BigNumber(balances[i]).toJSON() }), {});
};

export const fetchUserStakeBalances = async account => {
  const calls = poolsConfig.map(pool => ({
    address: getAddress(pool.contractAddress),
    name: 'usersInfo',
    params: [account],
  }));

  const userInfo = await multicall(StakePoolABI, calls);

  return poolsConfig.reduce((acc, pool, i) => ({ ...acc, [pool.poolId]: new BigNumber(userInfo[i].amount._hex).toJSON() }), {});
};

export const fetchUserPendingRewards = async account => {
  const calls = poolsConfig.map(pool => ({
    address: getAddress(pool.contractAddress),
    name: 'getPendingReward',
    params: [account],
  }));

  const res = await multicall(StakePoolABI, calls);

  return poolsConfig.reduce((acc, pool, index) => ({ ...acc, [pool.poolId]: new BigNumber(res[index]).toJSON() }), {});
};
