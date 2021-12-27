import { createSlice } from '@reduxjs/toolkit';
import poolsConfig from 'config/constants/pools';
import { fetchPoolsBlockLimits, fetchPoolsTotalStaking, fetchPoolsRewardPerBlock } from './fetchPools';
import { fetchPoolsAllowance, fetchUserBalances, fetchUserStakeBalances, fetchUserPendingRewards } from './fetchPoolsUser';

const initialState = { data: [...poolsConfig] };

export const PoolsSlice = createSlice({
  name: 'Pools',
  initialState,
  reducers: {
    setPoolsPublicData: (state, action) => {
      const livePoolsData = action.payload;
      state.data = state.data.map(pool => {
        const livePoolData = livePoolsData.find(entry => entry.poolId === pool.poolId);
        return { ...pool, ...livePoolData };
      });
    },
    setPoolsUserData: (state, action) => {
      const userData = action.payload;
      state.data = state.data.map(pool => {
        const userPoolData = userData.find(entry => entry.poolId === pool.poolId);
        return { ...pool, userData: userPoolData };
      });
    },
    updatePoolsUserData: (state, action) => {
      const { field, value, poolId } = action.payload;
      const index = state.data.findIndex(p => p.poolId === poolId);
      state.data[index] = { ...state.data[index], userData: { ...state.data[index].userData, [field]: value } };
    },
  },
});

// Actions
export const { setPoolsPublicData, setPoolsUserData, updatePoolsUserData } = PoolsSlice.actions;

// Thunks
export const fetchPoolsPublicDataAsync = () => async dispatch => {
  const blockLimits = await fetchPoolsBlockLimits();
  const totalStakings = await fetchPoolsTotalStaking();
  const rewardsPerBlock = await fetchPoolsRewardPerBlock();

  const liveData = poolsConfig.map(pool => {
    const blockLimit = blockLimits.find(entry => entry.poolId === pool.poolId);
    const totalStaking = totalStakings.find(entry => entry.poolId === pool.poolId);
    const rewardPerBlock = rewardsPerBlock.find(entry => entry.poolId === pool.poolId);

    return { ...blockLimit, ...totalStaking, ...rewardPerBlock };
  });

  dispatch(setPoolsPublicData(liveData));
};

export const fetchPoolsUserDataAsync = account => async dispatch => {
  const allowances = await fetchPoolsAllowance(account);
  const stakingTokenBalances = await fetchUserBalances(account);
  const stakedBalances = await fetchUserStakeBalances(account);
  const pendingRewards = await fetchUserPendingRewards(account);

  const userData = poolsConfig.map(pool => ({
    poolId: pool.poolId,
    allowance: allowances[pool.poolId],
    stakingTokenBalance: stakingTokenBalances[pool.poolId],
    stakedBalance: stakedBalances[pool.poolId],
    pendingReward: pendingRewards[pool.poolId],
  }));

  dispatch(setPoolsUserData(userData));
};

export const updateUserAllowance = (poolId, account) => async dispatch => {
  const allowances = await fetchPoolsAllowance(account);
  dispatch(updatePoolsUserData({ poolId, field: 'allowance', value: allowances[poolId] }));
};

export const updateUserBalance = (poolId, account) => async dispatch => {
  const tokenBalances = await fetchUserBalances(account);
  dispatch(updatePoolsUserData({ poolId, field: 'stakingTokenBalance', value: tokenBalances[poolId] }));
};

export const updateUserStakedBalance = (poolId, account) => async dispatch => {
  const stakedBalances = await fetchUserStakeBalances(account);
  dispatch(updatePoolsUserData({ poolId, field: 'stakedBalance', value: stakedBalances[poolId] }));
};

export const updateUserPendingReward = (poolId, account) => async dispatch => {
  const pendingRewards = await fetchUserPendingRewards(account);
  dispatch(updatePoolsUserData({ poolId, field: 'pendingReward', value: pendingRewards[poolId] }));
};

export default PoolsSlice.reducer;
