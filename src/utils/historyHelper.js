import {getBep20Contract} from 'utils/contractHelpers'
import {getBusdOut} from  'utils/getBusdOut'
import BigNumber from 'bignumber.js'
import useTrade from 'hooks/useTrade'
import {WETH,ChainId } from '@pancakeswap/sdk'
import {BNB} from 'config'
import moment from 'moment'


export const getHistoryRows = async (historyTrades) => {
  let wbnb = WETH[ChainId.MAINNET]
  let tradeRows = []
  await Promise.all(  
    historyTrades.map(async (historyTrade)=>{

      let createdAt;
      let createdAtDate = new Date(historyTrade.timestamp)
      let closedDate = historyTrade.closedDate ? new Date(historyTrade.closedDate) : null;
      closedDate = closedDate ? `${closedDate.getDate()}/${closedDate.getMonth()+1}/${closedDate.getFullYear()}` : null;
      createdAt = `${createdAtDate.getDate()}/${createdAtDate.getMonth()+1}/${createdAtDate.getFullYear()}`
      let createdAtForFilter = moment(`${createdAtDate.getDate()}/${createdAtDate.getMonth()}/${createdAtDate.getFullYear()}`).unix()
      let tradeRow = {}
      const tokenContractOut = getBep20Contract(historyTrade.tokenTo)
      const tokenContractIn = getBep20Contract(historyTrade.tokenFrom)
      let decimalsOut = await tokenContractOut.methods.decimals().call()
      let currentValueUnshifted = await getBusdOut(tokenContractOut._address, historyTrade.amountOut, decimalsOut)
      let currentPriceUnshifted = await getBusdOut(tokenContractOut._address,1,decimalsOut)

      tradeRow.txId = historyTrade.txId;
      tradeRow.tokenSymbol = await tokenContractOut.methods.symbol().call()
      tradeRow.tokenSymbol = tradeRow.tokenSymbol === wbnb.symbol ? tradeRow.tokenSymbol = BNB.symbol : tradeRow.tokenSymbol;
      tradeRow.tokenSymbolIn = await tokenContractIn.methods.symbol().call()
      tradeRow.tokenName = await tokenContractOut.methods.name().call()
      tradeRow.tokenName = tradeRow.tokenName === wbnb.name ? tradeRow.tokenName = BNB.name : tradeRow.tokenName
      tradeRow.amountOut = new BigNumber(historyTrade.amountOut).toNumber()
      tradeRow.currentPrice = new BigNumber(currentPriceUnshifted).shiftedBy(-1*decimalsOut).toNumber()
      tradeRow.currentValue = new BigNumber(currentValueUnshifted).shiftedBy(-1*decimalsOut).toNumber()
      tradeRow.amountIn = historyTrade.amountIn
      tradeRow.openAt = historyTrade.openAt
      tradeRow.priceTo = historyTrade.priceTo
      tradeRow.pl = tradeRow.currentValue - tradeRow.openAt
      tradeRow.pl_perc = ((tradeRow.currentValue - historyTrade.openAt) / historyTrade.openAt *100)
      tradeRow.tokenFrom = historyTrade.tokenFrom
      tradeRow.tokenTo = historyTrade.tokenTo
      tradeRow.createdAt = createdAt
      tradeRow.createdAtForFilter = createdAtForFilter
      tradeRow.closedAt = closedDate ? closedDate : "-"
      tradeRows.push(tradeRow)
    
  })
  )

  return tradeRows;
}