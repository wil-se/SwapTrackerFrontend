import {getBep20Contract} from 'utils/contractHelpers'
import {getBusdOut} from  'utils/getBusdOut'
import BigNumber from 'bignumber.js'
import useTrade from 'hooks/useTrade'
import {WETH,ChainId } from '@pancakeswap/sdk'
import {BNB} from 'config'



export const getHistoryRows = async (historyTrades) => {
  let wbnb = WETH[ChainId.MAINNET]
  let tradeRows = []
  
  for(let i = 0; i < historyTrades.length; i++){
    let historyTrade = historyTrades[i]
    let tradeRow = {}
    const tokenContractOut = getBep20Contract(historyTrade.tokenTo)
    const tokenContractIn = getBep20Contract(historyTrade.tokenFrom)
    let decimalsOut = await tokenContractOut.methods.decimals().call()
    let currentValueUnshifted = await getBusdOut(tokenContractOut._address,historyTrade.amountOut,decimalsOut)
    let currentPriceUnshifted = await getBusdOut(tokenContractOut._address,1,decimalsOut)
    tradeRow.txId = historyTrade.txId;
    tradeRow.tokenSymbol = await tokenContractOut.methods.symbol().call()
    tradeRow.tokenSymbol = tradeRow.tokenSymbol === wbnb.symbol ? tradeRow.tokenSymbol = BNB.symbol : tradeRow.tokenSymbol;
    tradeRow.tokenSymbolIn = await tokenContractIn.methods.symbol().call()
    tradeRow.tokenName = await tokenContractOut.methods.name().call()
    tradeRow.tokenName = tradeRow.tokenName === wbnb.name ? tradeRow.tokenName = BNB.name : tradeRow.tokenName
    tradeRow.amountOut = new BigNumber(historyTrade.amountOut).toNumber().toFixed(5)
    tradeRow.amountIn = new BigNumber(historyTrade.amountIn).toNumber().toFixed(5)
    tradeRow.currentPrice = new BigNumber(currentPriceUnshifted).shiftedBy(-1*18).toNumber().toFixed(2)
    tradeRow.currentValue = new BigNumber(currentValueUnshifted).shiftedBy(-1*18).toNumber()
    tradeRow.openAt = (historyTrade.amountOut * historyTrade.priceTo).toFixed(2)
    tradeRow.priceTo = Number(historyTrade.priceTo).toFixed(2)
    tradeRow.pl = new BigNumber(historyTrade.amountOut * historyTrade.priceTo).minus(currentValueUnshifted).shiftedBy(-1*18).toNumber().toFixed(2) 
    tradeRow.pl_perc = ((Number(tradeRow.currentValue) - Number(tradeRow.openAt))/Number(tradeRow.openAt)*100).toFixed(2)
    tradeRow.tokenFrom = historyTrade.tokenFrom
    tradeRow.tokenTo = historyTrade.tokenTo
    tradeRow.createdAt = "-"
    tradeRow.closedAt = "-"
    tradeRows.push(tradeRow)  
  }

  return tradeRows;
}