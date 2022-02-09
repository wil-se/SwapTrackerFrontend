import { useDispatch } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import blockReducer from './block';
import poolsReducer from './pools';
import pricesReducer from './prices';
import fiatsReducer from './fiat';

const store = configureStore({
  reducer: {
    block: blockReducer,
    pools: poolsReducer,
    prices: pricesReducer,
    fiats: fiatsReducer,
  },
});

export const useAppDispatch = () => useDispatch();

export default store;
