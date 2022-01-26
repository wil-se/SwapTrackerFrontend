import {callPost} from './swapTrackerServiceConnection'
import {getBalanceOverview} from 'utils/walletHelpers'
import {getBep20Contract} from 'utils/contractHelpers'
import {getBusdOut} from  'utils/getBusdOut'
import BigNumber from 'bignumber.js'
import {MONTH_LABELS_CHART} from 'config/'

export const getDashboardData = async (account) => {
    console.log("vediamo l'account ", account)
    let dashboardData = await callPost("getDashBoardData",{address:account}).catch((e)=>{console.log(e)})
    console.log(dashboardData?.data?.data)
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
  /*while (currentDate <= new Date(endDate)) {
    dateArray.push(new Date(currentDate));
    // Use UTC date to prevent problems with time zones and DST
    currentDate.setUTCDate(currentDate.getUTCDate() + steps);
  }*/

  return dateArray;
}

export const getDataForChart = (user,selectedDayRange) => {
  let dateFilterArray;
  if(selectedDayRange){ dateFilterArray = getDatesFromRange(selectedDayRange) } 
  let labelList = []
  let dataList = []
  console.log("ma quindi ", user)
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
  return {labelList,dataList}
}

export const setNewBalanceOverview = async (user,profitOrLoss) => {
    console.log("arriva ", profitOrLoss)
    let balanceOverview = {[new Date()]:profitOrLoss}

    callPost("createOrUpdateBalanceOverview",{address:user?.address,singleBalanceOverview:balanceOverview}).then((resp,err)=>{
        console.log(resp,err)
    })
}

export const getTradeRows = async (openedTrades) => {
  let tradeRows = []
  openedTrades?.map(async (openedTrade)=> {
    let tradeRow = {}
    const tokenContractOut = getBep20Contract(openedTrade.tokenTo)
    const tokenContractIn = getBep20Contract(openedTrade.tokenFrom)
    let decimalsOut = await tokenContractOut.methods.decimals().call()
    let decimalsIn = await tokenContractIn.methods.decimals().call()
    tradeRow.txId = openedTrade.txId;
    tradeRow.tokenSymbol = await tokenContractOut.methods.symbol().call()
    tradeRow.tokenSymbolIn = await tokenContractIn.methods.symbol().call()
    tradeRow.tokenName = await tokenContractOut.methods.name().call()
    tradeRow.amountOut = new BigNumber(openedTrade.amountOut).shiftedBy(-1*parseInt(decimalsOut)).toNumber().toFixed(2)
    tradeRow.amountIn = new BigNumber(openedTrade.amountIn).shiftedBy(-1*parseInt(decimalsIn)).toNumber().toFixed(2)
    tradeRow.currentPrice = await getBusdOut(tokenContractOut._address,1,decimalsOut)
    tradeRow.currentPrice = new BigNumber(tradeRow.currentPrice).shiftedBy(-1*18).toNumber().toFixed(2)
    tradeRow.currentValue = await getBusdOut(tokenContractOut._address,openedTrade.amountOut,decimalsOut)
    tradeRow.currentValue = new BigNumber(tradeRow.currentValue).shiftedBy(-1*18).toNumber().toFixed(2)
    tradeRow.openAt = openedTrade.amountOut * openedTrade.priceTo
    tradeRow.openAt = new BigNumber(tradeRow.openAt).shiftedBy(-1*18).toNumber().toFixed(2)
    tradeRow.priceTo = new BigNumber(openedTrade.priceTo).toNumber().toFixed(2)
    tradeRow.pl = new BigNumber(tradeRow.currentValue - tradeRow.currentPrice).toNumber().toFixed(2) 
    tradeRow.pl_perc = ((tradeRow.pl - (tradeRow.amountOut * tradeRow.priceTo))/(tradeRow.amountOut * tradeRow.priceTo))*100


    tradeRows.push(tradeRow)
  })
  
    return tradeRows;
}