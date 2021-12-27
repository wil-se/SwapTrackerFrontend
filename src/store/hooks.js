import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'store';
import { fetchPrices } from './prices';
import { fetchPoolsPublicDataAsync, fetchPoolsUserDataAsync, setBlock } from './actions';
import useRefresh from 'hooks/useRefresh';
import { getWeb3NoAccount } from 'utils/web3';

export const useBlock = () => useSelector(store => store.block);

export const useFetchPublicData = () => {
  const dispatch = useAppDispatch();
  const { slowRefresh } = useRefresh();

  useEffect(() => {
    dispatch(fetchPoolsPublicDataAsync());
  }, [dispatch, slowRefresh]);

  useEffect(() => {
    const web3 = getWeb3NoAccount();
    const interval = setInterval(async () => {
      const blockNumber = await web3.eth.getBlockNumber();
      dispatch(setBlock(blockNumber));
    }, 6000);

    return () => clearInterval(interval);
  }, [dispatch]);
};

export const useFetchPriceList = () => {
  const { slowRefresh } = useRefresh();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchPrices());
  }, [dispatch, slowRefresh]);
};

export const useGetApiPrices = () => {
  const prices = useSelector(store => store.prices.data);
  return prices;
};

export const useGetApiPrice = address => {
  const prices = useGetApiPrices();

  if (!prices) {
    return null;
  }

  return prices[address.toLowerCase()];
};

export const usePools = account => {
  const { fastRefresh } = useRefresh();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (account) {
      dispatch(fetchPoolsUserDataAsync(account));
    }
  }, [account, dispatch, fastRefresh]);

  const pools = useSelector(store => store.pools.data);

  return pools;
};
