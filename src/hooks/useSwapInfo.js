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
import {BNB,WBNB} from 'config'
import {useWBNBContract} from 'hooks/useContract'
import BigNumber from 'bignumber.js';
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
    
    outputCurrency !== undefined && inputCurrency?.symbol !== BNB.symbol && outputCurrency?.symbol !== BNB.symbol && inputCurrency?.symbol !== WBNB.symbol && outputCurrency?.symbol !== WBNB.symbol
    ? path.push(inputCurrency.address,mainnetTokens.wbnb.address,outputCurrency?.address) 
    : path.push(inputCurrency.address,outputCurrency?.address) 


    const getPath = (inputCurrency,outputCurrency) =>{
      let currPath = []
      outputCurrency !== undefined && inputCurrency?.symbol !== BNB.symbol && outputCurrency?.symbol !== BNB.symbol && inputCurrency?.symbol !== WBNB.symbol && outputCurrency?.symbol !== WBNB.symbol
      ? currPath.push(inputCurrency.address,mainnetTokens.wbnb.address,outputCurrency?.address) 
      : currPath.push(inputCurrency.address,outputCurrency?.address) 
   
      return currPath
    }

    const getBalance = async (tokenIn,account,erc20Contract,web3) => {
      console.log(tokenIn,account,erc20Contract,web3)
      let balance = 0;
      if(tokenIn && account && erc20Contract && web3){
        if(tokenIn.symbol === BNB.symbol){
          balance = await web3.eth.getBalance(account)
          balance = new BigNumber(balance).shiftedBy(-1*18).toNumber()        }
        else {
          let decimals = await erc20Contract.methods.decimals().call()
          balance = await erc20Contract.methods.balanceOf(account).call()
          balance = new BigNumber(balance).shiftedBy(-1*parseInt(decimals)).toNumber()
        }
      }
      console.log("u balance" , balance)
      return balance
    }

    return {path,getPath,getBalance};
    
    
}

export const useWrap = (inputCurrency,outputCurrency) => {
  const wbnbContract = useWBNBContract()
  let isWrap = false;
  ((inputCurrency?.symbol === BNB.symbol && outputCurrency?.symbol === WBNB.symbol) || (inputCurrency?.symbol === WBNB.symbol && outputCurrency?.symbol === BNB.symbol)) 
  ? isWrap = true 
  : isWrap = false

  const wrap = async (amountIn,account) => {
    let amountInFormatted = new BigNumber(amountIn).shiftedBy(18)
    await wbnbContract.methods.deposit().send({from:account,value:amountInFormatted.toString()})
  }

  const unWrap =  async (amountIn,account) => {
    let amountInFormatted = new BigNumber(amountIn).shiftedBy(18)
    await wbnbContract.methods.withdraw(amountInFormatted.toString()).send({from:account})
  }


  return {wrap,unWrap,isWrap}
}