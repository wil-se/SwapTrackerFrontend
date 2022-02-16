import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import BigNumber from 'bignumber.js';


const initialState = {
  name: "USD",
  values: {},
  decimals: 2
};

export const fetchFiatPrices = async () => {
  const response = await fetch(`${process.env.REACT_APP_SERVICE_URL}/data/getFiats`);
  const data = await response.json();
  
  return {
    data: data,
  };
};

export const fiatSlice = createSlice({
  name: 'fiats',
  initialState,
  reducers: {
    setFiatName: (state, action) => {
      state.name = action.payload;
    },
    setFiatValues: (state, action) => {
      state.values = action.payload;
    },
    setFiatSymbol: (state, action) => {
      state.symbol = action.payload;
    },
    setFiatDecimals: (state, action) => {
      state.decimals = action.payload;
    }
    
  },
});

export const { setFiatName, setFiatValues, setFiatSymbol, setFiatDecimals } = fiatSlice.actions


export default fiatSlice.reducer;
