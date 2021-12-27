import { useDispatch } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import blockReducer from './block';
import poolsReducer from './pools';
import pricesReducer from './prices';

const store = configureStore({
  reducer: {
    block: blockReducer,
    pools: poolsReducer,
    prices: pricesReducer,
  },
});

export const useAppDispatch = () => useDispatch();

export default store;
