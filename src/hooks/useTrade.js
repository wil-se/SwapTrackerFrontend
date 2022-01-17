import {callPost} from 'utils/swapTrackerServiceConnection'
import { getBep20Contract } from 'utils/contractHelpers';
import {getBusdOut} from 'utils/getBusdOut' 
import TradeModalSettings from 'components/TradeModalSettings';

const useTrade = () => {

    const setTrade = async (tradeTx,path) => {
        let tradeEvent = tradeTx.events.Swap.returnValues
        let contractTokenIn = getBep20Contract(path[0])
        let contractTokenOut = getBep20Contract(path[path.length -1])

        let decimalsTokenIn = await contractTokenIn.methods.decimals().call()
        let decimalsTokenOut = await contractTokenOut.methods.decimals().call()
        let amoutInBusd = await getBusdOut(path[0],tradeEvent?.amountIn,parseInt(decimalsTokenIn))
        let amountOutBusd = await getBusdOut(path[path.length -1],tradeEvent?.amountOutMin,parseInt(decimalsTokenOut))
        console.log(amoutInBusd,amountOutBusd,tradeEvent)
        let tradeFormatted = {
            txId: tradeTx?.transactionHash,
            user: tradeTx?.from,
            tokenFrom:path[0],
            tokenTo:path[path.length -1],
            amountIn:tradeEvent?.amountIn,
            amountOutMin:tradeEvent?.amountOutMin,
            amountSwapped:tradeEvent?.amountSwapped,
            priceFrom:amoutInBusd,
            priceTo:amountOutBusd,
            status:tradeTx?.status,
            timestamp:new Date()
        }
        
        console.log("vediamo ", tradeFormatted)
        callPost("insertOrUpdateTrade",tradeFormatted)

    }

    const getTrades = (account) => {
        let trades = []
        callPost("getTrades",{account:account}).then((resp)=>
        {
            trades = trades?.data?.data;
        })

        return trades;
    }

    return {setTrade,getTrades}
}

export default useTrade
