import { useCallback } from 'react';
import { useWeb3React } from '@web3-react/core';
import { useAppDispatch } from 'store';
import { updateUserStakedBalance, updateUserBalance, updateUserPendingReward } from 'store/actions';
import { withdraw } from 'utils/callHelpers';
import { useStakePool } from './useContract';

export const useUnstake = poolId => {
  const dispatch = useAppDispatch();
  const { account } = useWeb3React();
  const stakePoolContract = useStakePool(poolId);

  const handleUnstake = useCallback(
    async (amount, decimals) => {
      await withdraw(stakePoolContract, amount, decimals, account);

      dispatch(updateUserStakedBalance(poolId, account));
      dispatch(updateUserBalance(poolId, account));
      dispatch(updateUserPendingReward(poolId, account));
    },
    [account, dispatch, poolId, stakePoolContract],
  );

  return { onUnstake: handleUnstake };
};

export default useUnstake;
