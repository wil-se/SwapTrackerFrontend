import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import BigNumber from 'bignumber.js';


const CoinGecko = require('coingecko-api');
const CoinGeckoClient = new CoinGecko();


const initialState = {
  name: "USD",
  values: {},
  decimals: 2
};

export const fetchFiatPrices = async () => {

    const response = await fetch(`${process.env.REACT_APP_SERVICE_URL}data/getFiats`).catch(console.log);
    if(response){
      const data = await response.json();
      if(data){
        let ethdata = await CoinGeckoClient.coins.fetch('ethereum', {});  
        if (ethdata){
          data.data['19'] = {currency: "ETH", rate: 1/ethdata.data.market_data.current_price.usd};
          return {
            data: data,
          }
        }
      } else {
        return {
          data: {},
        }
      }
    }
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
