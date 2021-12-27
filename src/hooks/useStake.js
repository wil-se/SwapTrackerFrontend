import { useCallback } from 'react';
import { useWeb3React } from '@web3-react/core';
import { useAppDispatch } from 'store';
import { updateUserStakedBalance, updateUserBalance } from 'store/actions';
import { deposit } from 'utils/callHelpers';
import { useStakePool } from './useContract';
import { useFacebookPixel } from './useFacebookPixel';

export const useStake = poolId => {
  const dispatch = useAppDispatch();
  const { account } = useWeb3React();
  const stakePoolContract = useStakePool(poolId);
  const pixel = useFacebookPixel();

  const handleStake = useCallback(
    async (amount, decimals) => {
      await deposit(stakePoolContract, amount, decimals, account);
      pixel.trackCustom((poolId === 0 ? 'SWPT_staked' : 'SWPT_BNB_LP_staked'), {currency: "USD", value: amount});
      dispatch(updateUserStakedBalance(poolId, account));
      dispatch(updateUserBalance(poolId, account));
    },
    [account, dispatch, poolId, stakePoolContract]//, pixel],
  );

  return { onStake: handleStake };
};

export default useStake;
