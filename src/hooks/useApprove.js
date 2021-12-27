import { useCallback } from 'react';
import { useWeb3React } from '@web3-react/core';
import { useAppDispatch } from 'store';
import { updateUserAllowance } from 'store/actions';
import { approve } from 'utils/callHelpers';
import { useStakePool } from './useContract';

export const useApprove = (tokenContract, poolId) => {
  const dispatch = useAppDispatch();
  const { account } = useWeb3React();
  const stakePoolContract = useStakePool(poolId);

  const handleApprove = useCallback(async () => {
    try {
      const tx = await approve(tokenContract, stakePoolContract.options.address, account);
      dispatch(updateUserAllowance(poolId, account));
      return tx;
    } catch (e) {
      return false;
    }
  }, [account, dispatch, tokenContract, stakePoolContract, poolId]);

  return { onApprove: handleApprove };
};
