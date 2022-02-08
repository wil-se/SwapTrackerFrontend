import {callPost} from './swapTrackerServiceConnection'
import {getBep20Contract} from 'utils/contractHelpers'
import {getBusdOut} from  'utils/getBusdOut'
import BigNumber from 'bignumber.js'
import {MONTH_LABELS_CHART} from 'config/'
import {WETH,ChainId } from '@pancakeswap/sdk'
import {BNB} from 'config'
export const getDashboardData = async (account) => {
    let dashboardData = await callPost("getDashBoardData",{address:account}).catch((e)=>{console.log(e)})
    return dashboardData?.data?.data;
    
}

export const getDatesFromRange = (selectedDayRange,steps=1) => {
    let {from,to} = selectedDayRange;
    let startDate = `${from.year}/${from.month}/${from.day}`
    let endDate = `${to.year}/${to.month}/${to.day}`
    const dateArray = [];
    let currentDate = new Date(startDate);
    endDate = new Date(endDate)
    dateArray.push(currentDate,endDate)
  

  return dateArray;
}

export const getDataForChart = (user,selectedDayRange) => {
  let dateFilterArray;
  if(selectedDayRange){ dateFilterArray = getDatesFromRange(selectedDayRange) } 
  let labelList = []
  let dataList = []
  if(user.balanceOverview || Array(user.balanceOverview).length > 0){ 
    user.balanceOverview.map((singleBalanceOverview)=>{
      let date = new Date(Object.keys(singleBalanceOverview))
      if(dateFilterArray && dateFilterArray.includes(date)){
        let label = `${MONTH_LABELS_CHART[date.getMonth()+1]} ${date.getDate()}` 
        labelList.push(label)
        dataList.push(singleBalanceOverview[Object.keys(singleBalanceOverview)])
  
      }
      else{
        let label = `${MONTH_LABELS_CHART[date.getMonth()+1]} ${date.getDate()}` 
        labelList.push(label)
        dataList.push(singleBalanceOverview[Object.keys(singleBalanceOverview)])
      }

    })
  }
  

  return {labelList,dataList}
}

export const setNewBalanceOverview = async (user,profitOrLoss) => {
    let balanceOverview = {[new Date()]:profitOrLoss}

    await callPost("createOrUpdateBalanceOverview",{address:user?.address,singleBalanceOverview:balanceOverview})
}

export const getTradeRows = async (openedTrades) => {
  let wbnb = WETH[ChainId.MAINNET]
  let tradeRows = []
  await Promise.all(
      openedTrades?.map(async (openedTrade)=> {
        let tradeRow = {}
        const tokenContractOut = getBep20Contract(openedTrade.tokenTo)
        const tokenContractIn = getBep20Contract(openedTrade.tokenFrom)
        let decimalsOut = await tokenContractOut.methods.decimals().call()
        let currentValueUnshifted = await getBusdOut(tokenContractOut._address,openedTrade.amountOut,decimalsOut)
        let currentPriceUnshifted = await getBusdOut(tokenContractOut._address,1,decimalsOut)
        tradeRow.txId = openedTrade.txId;
        tradeRow.tokenSymbol = await tokenContractOut.methods.symbol().call()
        tradeRow.tokenSymbol = tradeRow.tokenSymbol === wbnb.symbol ? tradeRow.tokenSymbol = BNB.symbol : tradeRow.tokenSymbol;
        tradeRow.tokenSymbolIn = await tokenContractIn.methods.symbol().call()
        tradeRow.tokenSymbolIn = tradeRow.tokenSymbolIn === wbnb.symbol ? tradeRow.tokenSymbolIn = BNB.symbol : tradeRow.tokenSymbolIn
        tradeRow.tokenName = await tokenContractOut.methods.name().call()
        tradeRow.tokenName = tradeRow.tokenName === wbnb.name ? tradeRow.tokenName = BNB.name : tradeRow.tokenName
        tradeRow.amountOut = new BigNumber(openedTrade.amountOut).toNumber().toFixed(5)
        tradeRow.amountIn = new BigNumber(openedTrade.amountIn).toNumber().toFixed(5)
        tradeRow.currentPrice = new BigNumber(currentPriceUnshifted).shiftedBy(-1*18).toNumber().toFixed(2)
        tradeRow.currentValue = new BigNumber(currentValueUnshifted).shiftedBy(-1*18).toNumber()
        tradeRow.openAt = (openedTrade.amountOut * openedTrade.priceTo).toFixed(3)
        tradeRow.priceTo = Number(openedTrade.priceTo).toFixed(3)
        tradeRow.pl = new BigNumber(Number(tradeRow.currentValue)).minus(Number(tradeRow.openAt)).toNumber() 
        tradeRow.pl_perc = ((Number(tradeRow.currentValue) - Number(tradeRow.openAt))/Number(tradeRow.openAt)*100).toFixed(2)
        tradeRow.tokenFrom = openedTrade.tokenFrom
        tradeRow.tokenTo = openedTrade.tokenTo
        tradeRows.push(tradeRow)

      })
  )
    return tradeRows;
}