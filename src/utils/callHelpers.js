import BigNumber from 'bignumber.js';
import { ethers } from 'ethers';
import { BIG_TEN } from './bigNumber';

export const approve = async (tokenContract, spender, account) => tokenContract.methods
  .approve(spender, ethers.constants.MaxUint256)
  .send({ from: account });

export const deposit = async (stakePoolContract, amount, decimals = 18, account) => stakePoolContract.methods
  .deposit(new BigNumber(amount).times(BIG_TEN.pow(decimals)).toString())
  .send({ from: account, gas: 200000 })
  .on('transactionHash', tx => tx.transactionHash);

export const withdraw = async (stakePoolContract, amount, decimals, account) => stakePoolContract.methods
  .withdraw(new BigNumber(amount).times(BIG_TEN.pow(decimals)).toString())
  .send({ from: account, gas: 200000 })
  .on('transactionHash', tx => tx.transactionHash);

export const claimReward = async (stakePoolContract, account) => stakePoolContract.methods
  .claimReward()
  .send({ from: account, gas: 200000 })
  .on('transactionHash', tx => tx.transactionHash);
