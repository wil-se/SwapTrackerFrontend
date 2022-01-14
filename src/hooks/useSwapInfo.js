import {useMemo} from 'react'
import useWeb3 from 'hooks/useWeb3';
import flatMap from 'lodash/flatMap'
import { ETHER, WETH,Pair,TokenAmount,Token,Trade } from '@pancakeswap/sdk'
import {BASES_TO_CHECK_TRADES_AGAINST,ADDITIONAL_BASES,CUSTOM_BASES} from 'config/index'
import { getPancakePair } from 'utils/contractHelpers';
import {useMultipleContractSingleData} from 'utils/multicall'
import { Interface } from '@ethersproject/abi'
import IUniswapV2PairABI from 'config/abi/IPancakePair.json'
import {mainnetTokens} from 'config/constants/tokens'
//const PAIR_INTERFACE = new Interface(IUniswapV2PairABI)


const wrappedCurrency = (currency,chainId) => {
    return chainId && currency.symbol === ETHER.symbol ? WETH[chainId]: currency;
}



const usePairs = (currencies) => {
    let chainId = 56;
    
    const tokens = useMemo(
      () =>
        currencies.map(([currencyA, currencyB]) => [
          wrappedCurrency(currencyA, chainId),
          wrappedCurrency(currencyB, chainId),
        ]),
      [chainId, currencies],
    )
  
    const pairAddresses = useMemo(
      () =>
        tokens.map(([tokenA, tokenB]) => {
                

          let pairAddr = tokenA && tokenB && !tokenA.equals(tokenB) ? Pair.getAddress(tokenA, tokenB) : undefined;
          console.log("allora??",tokenA,tokenB,pairAddr)
          return pairAddr

            
        }),
      [tokens],
    )
    let pairContract
    
    //pairAddresses.length>0?  pairContract = getPancakePair(pairAddresses) : pairContract =  null;
    
    //const results = useMultipleContractSingleData(pairAddresses, PAIR_INTERFACE, 'getReserves')
    let results;
    return useMemo(() => {
      pairAddresses
    }, [tokens])
  }

const useAllCommonPair = (currencyA,currencyB)=>{
    
    let chainId = 56;
    const [tokenA,tokenB] = [wrappedCurrency(currencyA,chainId),wrappedCurrency(currencyB,chainId)];
    const bases = useMemo(()=> {
        const common = BASES_TO_CHECK_TRADES_AGAINST[chainId] ?? []
        const additionalA = tokenA ? ADDITIONAL_BASES[chainId]?.[tokenA.address] ?? [] : []
        const additionalB = tokenB ? ADDITIONAL_BASES[chainId]?.[tokenB.address] ?? [] : []

        return [...common, ...additionalA, ...additionalB]
    },[chainId,tokenA,tokenB])
    const basePairs = useMemo(
        () => flatMap(bases, (base) => bases.map((otherBase) => [base, otherBase])),
        [bases],
    )
    const allPairCombinations = useMemo(
        () =>
            tokenA && tokenB
                ? [
                     // the direct pair
                    [tokenA, tokenB],
                    // token A against all bases
                    ...bases.map((base) => [tokenA, base]),
                    // token B against all bases
                    ...bases.map((base) => [tokenB, base]),
                    // each base against all bases
                    ...basePairs,
                   ]
                   .filter((tokens) => Boolean(tokens[0] && tokens[1]))
                   .filter(([t0, t1]) => t0.address !== t1.address)
                   .filter(([tokenA_, tokenB_]) => {
                     if (!chainId) return true
                     const customBases = CUSTOM_BASES[chainId]
       
                     const customBasesA = customBases?.[tokenA_.address]
                     const customBasesB = customBases?.[tokenB_.address]
       
                     if (!customBasesA && !customBasesB) return true
       
                     if (customBasesA && !customBasesA.find((base) => tokenB_.equals(base))) return false
                     if (customBasesB && !customBasesB.find((base) => tokenA_.equals(base))) return false
       
                     return true
                   })
               : [],
        [tokenA, tokenB, bases, basePairs, chainId],
    )
    const allPairs = usePairs(allPairCombinations)
    return useMemo(
        () =>{

          allPairs
        },
        [allPairs],
      )

    
}

const useTradeExactIn = (inputCurrency,outputCurrency) => {
    let allPairs = useAllCommonPair(inputCurrency,outputCurrency);
    
}

export const useSwapInfo = (inputCurrency,outputCurrency) => {
    let path = [];

    outputCurrency !== undefined && inputCurrency.symbol !== "BNB" ? path.push(inputCurrency.address,mainnetTokens.wbnb.address,outputCurrency.address) : path.push(inputCurrency.address,outputCurrency?.address);
    
    return path;
    
    
}