import {callPost} from 'utils/swapTrackerServiceConnection'
import { getBep20Contract } from 'utils/contractHelpers';
import {getBusdOut} from 'utils/getBusdOut' 
import TradeModalSettings from 'components/TradeModalSettings';
import BigNumber from 'bignumber.js';

const useTrade = () => {

    const setTrade = async (tradeTx,path) => {
        console.log("vediamo cosa entra ", tradeTx,path)
        let tradeEvent = tradeTx.events.Swap.returnValues
        let contractTokenIn = getBep20Contract(path[0])
        let contractTokenOut = getBep20Contract(path[path.length -1])
        console.log(tradeEvent?.amountIn,tradeEvent?.amountOutMin)
        let decimalsTokenIn = await contractTokenIn.methods.decimals().call()
        let decimalsTokenOut = await contractTokenOut.methods.decimals().call()
        let amountInFormatted = new BigNumber(tradeEvent?.amountIn).shiftedBy(-1*parseInt(decimalsTokenIn)).toNumber().toFixed(parseInt(decimalsTokenIn))
        let amountSwapped = new BigNumber(tradeEvent?.amountOutMin).shiftedBy(-1*parseInt(decimalsTokenOut)).toNumber().toFixed(parseInt(decimalsTokenOut))
        let amoutInBusd = await getBusdOut(path[0],amountInFormatted,parseInt(decimalsTokenIn))
        let amountOutBusd = await getBusdOut(path[path.length -1],amountSwapped,parseInt(decimalsTokenOut))
        let amountInBusdFormatted = new BigNumber(amoutInBusd).shiftedBy(-1*18).toNumber().toFixed(parseInt(decimalsTokenIn))
        let amountOutBusdFormatted = new BigNumber(amountOutBusd).shiftedBy(-1*18).toNumber().toFixed(parseInt(decimalsTokenOut))

       
        let tradeFormatted = {
            txId: tradeTx?.transactionHash,
            user: tradeTx?.from,
            tokenFrom:path[0],
            tokenTo:path[path.length -1],
            amountIn:amountInFormatted,
            amountOut:amountSwapped,
            priceFrom:amountInBusdFormatted,
            priceTo:amountOutBusdFormatted,
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
            trades = resp?.data?.data;
        })

        return trades;
    }

    return {setTrade,getTrades}
}

export default useTrade
