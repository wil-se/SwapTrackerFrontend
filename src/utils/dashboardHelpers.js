import {callPost} from './swapTrackerServiceConnection'
import {getBalanceOverview} from 'utils/walletHelpers'
import {getBep20Contract} from 'utils/contractHelpers'

export const getDashboardData = async (account) => {
    console.log("vediamo l'account ", account)
    let dashboardData = await callPost("getDashBoardData",{address:account}).catch((e)=>{console.log(e)})
    return dashboardData?.data?.data;
    
}

export const getDatesFromRange = (startDate,endDate,steps=1) => {
    const dateArray = [];
    let currentDate = new Date(startDate);

  while (currentDate <= new Date(endDate)) {
    dateArray.push(new Date(currentDate));
    // Use UTC date to prevent problems with time zones and DST
    currentDate.setUTCDate(currentDate.getUTCDate() + steps);
  }

  return dateArray;
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
  openedTrades?.map((openedTrade)=> {
    const tokenContract = getBep20Contract(openedTrade.tokenTo)

  })
  
    return tradeRows;
}