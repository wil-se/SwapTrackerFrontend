import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import BigNumber from 'bignumber.js';
import { API_PRICES } from 'config/constants/endpoints';
import multicall from 'utils/multicall';
import LPTokenABI from 'config/abi/lpToken.json';
import tokens from 'config/constants/tokens';
import { getAddress } from 'utils/addressHelpers';
import { getBalanceAmount } from 'utils/formatBalance';

const notLpTokens = Object.values(tokens).filter(token => !token.isLP);
const lpTokens = Object.values(tokens).filter(token => token.isLP);

const notLpTokenIds = notLpTokens.map(token => token.symbol).join();

const cgIds = notLpTokens.map(token => token.cgId ).join();

const initialState = {
  isLoading: false,
  lastUpdated: null,
  data: null,
};

export const fetchPrices = createAsyncThunk('prices/fetch', async () => {
  const response = await fetch(`${API_PRICES}?ids=${cgIds}&vs_currencies=usd`);
  const data = await response.json();

  
  const apiPrices = Object.keys(data).reduce((acc, cgId) => {
    const token = Object.values(tokens).find(token => token.cgId.toLowerCase() === cgId);
    const tokenAddress = token.address[process.env.REACT_APP_CHAIN_ID];

    return {
      ...acc,
      [tokenAddress]: data[cgId].usd,
    };
  }, {});

  const callsGetReserves = lpTokens.map(lpToken => ({
    address: getAddress(lpToken.address),
    name: 'getReserves',
  }));

  const callsTotalSupply = lpTokens.map(lpToken => ({
    address: getAddress(lpToken.address),
    name: 'totalSupply',
  }));

  const reserves = await multicall(LPTokenABI, callsGetReserves);
  const totalSupplies = await multicall(LPTokenABI, callsTotalSupply);

  const lpPrices = {};

  for (let i = 0; i < lpTokens.length; i++) {
    const totalSupply = getBalanceAmount(totalSupplies[i]).toNumber();
    const token1Reserve = getBalanceAmount(reserves[i][0].toString()).toNumber();
    const token2Reserve = getBalanceAmount(reserves[i][1].toString()).toNumber();
    const token1Price = apiPrices[lpTokens[i].pair.token1];
    const token2Price = apiPrices[lpTokens[i].pair.token2];
    const totalLiquidityValue = (token1Reserve * token1Price) + (token2Reserve * token2Price);
    lpPrices[getAddress(lpTokens[i].address)] = new BigNumber(totalLiquidityValue).dividedBy(totalSupply).toNumber();
  }

  return {
    updatedAt: Math.floor(Date.now() / 1000),
    data: { ...apiPrices, ...lpPrices },
  };
});

export const pricesSlice = createSlice({
  name: 'prices',
  initialState,
  extraReducers: builder => {
    builder
      .addCase(fetchPrices.pending, state => {
        state.isLoading = true;
      })
      .addCase(fetchPrices.fulfilled, (state, action) => {
        state.isLoading = false;
        state.lastUpdated = action.payload.updatedAt;
        state.data = action.payload.data;
      });
  },
});

export default pricesSlice.reducer;
