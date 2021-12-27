import poolsConfig from 'config/constants/pools';
import StakePoolABI from 'config/abi/StakePool.json';
import BigNumber from 'bignumber.js';
import multicall from 'utils/multicall';
import { getAddress } from 'utils/addressHelpers';

export const fetchPoolsBlockLimits = async () => {
  const callsStartBlock = poolsConfig.map(poolConfig => ({
    address: getAddress(poolConfig.contractAddress),
    name: 'startBlock',
  }));

  const callsEndBlock = poolsConfig.map(poolConfig => ({
    address: getAddress(poolConfig.contractAddress),
    name: 'endBlock',
  }));

  const starts = await multicall(StakePoolABI, callsStartBlock);
  const ends = await multicall(StakePoolABI, callsEndBlock);

  return poolsConfig.map((pool, index) => ({
    poolId: pool.poolId,
    startBlock: new BigNumber(starts[index]).toNumber(),
    endBlock: new BigNumber(ends[index]).toNumber(),
  }));
};

export const fetchPoolsTotalStaking = async () => {
  const calls = poolsConfig.map(poolConfig => ({
    address: getAddress(poolConfig.contractAddress),
    name: 'totalStakedTokens',
  }));

  const totalStaked = await multicall(StakePoolABI, calls);

  return poolsConfig.map((pool, index) => ({
    poolId: pool.poolId,
    totalStaked: new BigNumber(totalStaked[index]).toJSON(),
  }));
};

export const fetchPoolsRewardPerBlock = async () => {
  const calls = poolsConfig.map(poolConfig => ({
    address: getAddress(poolConfig.contractAddress),
    name: 'rewardPerBlock',
  }));

  const rewards = await multicall(StakePoolABI, calls);

  return poolsConfig.map((pool, index) => ({
    poolId: pool.poolId,
    rewardPerBlock: new BigNumber(rewards[index]).toJSON(),
  }));
};
