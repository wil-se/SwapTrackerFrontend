import { useCallback, useEffect, useState } from 'react';
import BigNumber from 'bignumber.js';
import useRefresh from 'hooks/useRefresh';
import { getBalanceAmount } from 'utils/formatBalance';
import { useLPToken } from './useContract';
import { useGetApiPrice } from 'store/hooks';
import tokens from 'config/constants/tokens';

const usePrice = tokenAddress => {
  const { slowRefresh } = useRefresh();

  const token = Object.values(tokens).find(e => e.address[process.env.REACT_APP_CHAIN_ID] === tokenAddress);

  const tokenContract = useLPToken(tokenAddress);

  const [token1Reserve, setToken1Reserve] = useState();
  const [token2Reserve, setToken2Reserve] = useState();
  const [totalSupply, setTotalSupply] = useState();
  const [lpPrice, setLpPrice] = useState();

  const apiPrice = useGetApiPrice(tokenAddress);
  const token1Price = useGetApiPrice(token.isLP ? token.pair.token1 : '');
  const token2Price = useGetApiPrice(token.isLP ? token.pair.token2 : '');

  const loadData = useCallback(async () => {
    const reserves = await tokenContract.methods.getReserves().call();
    const totalSupply = await tokenContract.methods.totalSupply().call();
    setToken1Reserve(getBalanceAmount(reserves[0]).toNumber());
    setToken2Reserve(getBalanceAmount(reserves[1]).toNumber());
    setTotalSupply(getBalanceAmount(totalSupply).toNumber());
  }, [tokenContract]);

  useEffect(() => {
    if (token.isLP) {
      loadData();
    }
  }, [loadData, slowRefresh, token, tokenAddress]);

  useEffect(() => {
    if (totalSupply) {
      const totalLiquidityValue = (token1Reserve * token1Price) + (token2Reserve * token2Price);
      const lpPrice = new BigNumber(totalLiquidityValue).dividedBy(totalSupply).toNumber();
      setLpPrice(lpPrice);
    }
  }, [token1Price, token2Price, totalSupply, token1Reserve, token2Reserve]);

  return !token.isLP ? apiPrice : lpPrice;
};

export default usePrice;
