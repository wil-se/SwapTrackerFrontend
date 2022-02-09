import { useEffect,useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'store';
import { fetchPrices } from './prices';
import { fetchPoolsPublicDataAsync, fetchPoolsUserDataAsync, setBlock } from './actions';
import useRefresh from 'hooks/useRefresh';
import { getWeb3NoAccount } from 'utils/web3';
import { setFiatSymbol, setFiatName, fetchFiatPrices, setFiatValues } from './fiat';

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

export const useSetFiatName = (name) => {
  const dispatch = useAppDispatch();
  dispatch(setFiatName(name));
};

export const useSetFiatValues = (values) => {
  const dispatch = useAppDispatch();
  dispatch(setFiatValues(values));
};

export const useSetFiatSymbol = (symbol) => {
  const dispatch = useAppDispatch();
  dispatch(setFiatSymbol(symbol));
};

export const useGetFiatSymbol = () => {
  const symbols = useSelector(store => store.fiats.symbol);
  return symbols;
};

export const useGetFiatValues = () => {
  const values = useSelector(store => store.fiats.values);
  return values;
};

export const useGetFiatName = () => {
  const symbol = useSelector(store => store.fiats.name);
  return symbol;
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

function toCallKey(call) {
  
  return `${call.address}-${call.callData}`
}

function parseCallKey(callKey) {
  const pcs = callKey.split('-')
  return {
    address: pcs[0],
    callData: pcs[1],
  }
}

export const useCallsData = (calls,options) => {
  const chainId = 56
  const serializedCallKeys = useMemo(
    () =>
      JSON.stringify(
        calls
          ?.map(toCallKey)
          ?.sort() ?? [],
      ),
    [calls],
  )

  useEffect(() => {
    const callKeys = JSON.parse(serializedCallKeys)
    if (!chainId || callKeys.length === 0) return undefined
    const calls = callKeys.map((key) => parseCallKey(key))
    
  }, [chainId, options, serializedCallKeys])

  return useMemo(
    () =>
      calls.map((call) => {
        if (!chainId || !call) return null;
        let result;
        let data
        if (result?.data && result?.data !== '0x') {
          // eslint-disable-next-line prefer-destructuring
          data = result.data
        }

        return { valid: true, data, blockNumber: result?.blockNumber }
      }),
    [calls, chainId],
  )



}

export function toCallState(
  callResult,
  contractInterface,
  fragment,
  latestBlockNumber
) {
  if (!callResult) return;
  const { valid, data, blockNumber } = callResult
  if (!valid) return;
  if (valid && !blockNumber) return;
  if (!contractInterface || !fragment || !latestBlockNumber) return;
  const success = data && data.length > 2
  const syncing = (blockNumber ?? 0) < latestBlockNumber
  let result;
  if (success && data) {
    try {
      result = contractInterface.decodeFunctionResult(fragment, data)
    } catch (error) {
      console.debug('Result data parsing failed', fragment, data)
      return {
        valid: true,
        loading: false,
        error: true,
        syncing,
        result,
      }
    }
  }
  return {
    valid: true,
    loading: false,
    syncing,
    result,
    error: !success,
  }
}