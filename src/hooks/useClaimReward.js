import { useCallback } from 'react';
import { useWeb3React } from '@web3-react/core';
import { useAppDispatch } from 'store';
import { updateUserBalance, updateUserPendingReward } from 'store/actions';
import { claimReward } from 'utils/callHelpers';
import { useStakePool } from './useContract';

export const useClaimReward = poolId => {
  const dispatch = useAppDispatch();
  const { account } = useWeb3React();
  const stakePoolContract = useStakePool(poolId);

  const handleClaimReward = useCallback(async () => {
    await claimReward(stakePoolContract, account);

    dispatch(updateUserPendingReward(poolId, account));
    dispatch(updateUserBalance(poolId, account));
  }, [account, dispatch, stakePoolContract, poolId]);

  return { onReward: handleClaimReward };
};
