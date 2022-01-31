import {getBep20Contract} from 'utils/contractHelpers'
import {getBusdOut} from  'utils/getBusdOut'
import BigNumber from 'bignumber.js'



export const getHistoryRows = async (address) => {
  let historyRows = []
  // openedTrades?.map(async ()=> {
  //   let tradeRow = {}
  //   const tokenContractOut = getBep20Contract(openedTrade.tokenTo)
  //   const tokenContractIn = getBep20Contract(openedTrade.tokenFrom)
  //   let decimalsOut = await tokenContractOut.methods.decimals().call()
  //   let currentValueUnshifted = await getBusdOut(tokenContractOut._address,openedTrade.amountOut,decimalsOut)
  //   let currentPriceUnshifted = await getBusdOut(tokenContractOut._address,1,decimalsOut)
  //   tradeRow.txId = openedTrade.txId;
  //   tradeRow.tokenSymbol = await tokenContractOut.methods.symbol().call()
  //   tradeRow.tokenSymbolIn = await tokenContractIn.methods.symbol().call()
  //   tradeRow.tokenName = await tokenContractOut.methods.name().call()
  //   tradeRow.amountOut = new BigNumber(openedTrade.amountOut).toNumber().toFixed(5)
  //   tradeRow.amountIn = new BigNumber(openedTrade.amountIn).toNumber().toFixed(5)
  //   tradeRow.currentPrice = new BigNumber(currentPriceUnshifted).shiftedBy(-1*18).toNumber().toFixed(2)
  //   tradeRow.currentValue = new BigNumber(currentValueUnshifted).shiftedBy(-1*18).toNumber()
  //   tradeRow.openAt = (openedTrade.amountOut * openedTrade.priceTo).toFixed(2)
  //   tradeRow.priceTo = Number(openedTrade.priceTo).toFixed(2)
  //   tradeRow.pl = new BigNumber(openedTrade.amountOut * openedTrade.priceTo).minus(currentValueUnshifted).shiftedBy(-1*18).toNumber().toFixed(2) 
  //   tradeRow.pl_perc = ((Number(tradeRow.currentValue) - Number(tradeRow.openAt))/Number(tradeRow.openAt)*100).toFixed(2)
  //   tradeRows.push(tradeRow)

  // })
  
    return historyRows;
}