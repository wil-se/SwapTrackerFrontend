import {callPost} from 'utils/swapTrackerServiceConnection'
import { getBep20Contract } from 'utils/contractHelpers';
import {getBusdOut} from 'utils/getBusdOut' 
import TradeModalSettings from 'components/TradeModalSettings';
import BigNumber from 'bignumber.js';
import useWeb3 from 'hooks/useWeb3';

const useTrade = () => {
    const {chainId} = useWeb3()
    const setTrade = async (tradeTx,path) => {
        let tradeEvent = tradeTx.events.Swap.returnValues
        let contractTokenIn = getBep20Contract(path[0])
        let contractTokenOut = getBep20Contract(path[path.length -1])
        let decimalsTokenIn = await contractTokenIn.methods.decimals().call()
        let decimalsTokenOut = await contractTokenOut.methods.decimals().call()
        let amountInFormatted = new BigNumber(tradeEvent?.amountIn).shiftedBy(-1*parseInt(decimalsTokenIn)).toNumber().toFixed(parseInt(decimalsTokenIn))
        let amountSwapped = new BigNumber(tradeEvent?.amountOutMin).shiftedBy(-1*parseInt(decimalsTokenOut)).toNumber().toFixed(parseInt(decimalsTokenOut))
        let priceTokenIn = await getBusdOut(path[0],1,parseInt(decimalsTokenIn))
        let priceTokenOut = await getBusdOut(path[path.length -1],1,parseInt(decimalsTokenOut))
        let priceTokenInBusdFormatted = new BigNumber(priceTokenIn).shiftedBy(-1*18).toNumber().toFixed(parseInt(decimalsTokenIn))
        let priceTokenOutBusdFormatted = new BigNumber(priceTokenOut).shiftedBy(-1*18).toNumber().toFixed(parseInt(decimalsTokenOut))

       
        let tradeFormatted = {
            txId: tradeTx?.transactionHash,
            user: tradeTx?.from,
            tokenFrom:path[0],
            tokenTo:path[path.length -1],
            amountIn:amountInFormatted,
            amountOut:amountSwapped,
            priceFrom:priceTokenInBusdFormatted,
            priceTo:priceTokenOutBusdFormatted,
            status:0,
            timestamp:new Date()
        }
        console.log("vediamo il trade ", tradeFormatted)
        /*let tradeFormatted = {
            txId:"0xdc470930d37270fd651eceaf01d1985b0cbf4105479ce8a733eff1b1012c4a3d",
            user:"0x80952d9ad8397be49de07d13b2bc7c4c6e91df2a",
            tokenFrom:"0xAC51066d7bEC65Dc4589368da368b212745d63E8",
            tokenTo:"0xa1faa113cbE53436Df28FF0aEe54275c13B40975",
            amountIn:"0.042570",
            amountOut:"0.810051905794681448",
            priceFrom:"0.428778",
            priceTo:"0.426636572381244861",
            status:0,
            timestamp:"2022-01-18T17:09:11.937Z"
        }*/
        //console.log("allora ", tradeFormatted)
        callPost("insertOrUpdateTrade",tradeFormatted)
        
        //console.log("vediamo ",JSON.stringify(tradeFormatted) )

        const user = {
            address:tradeTx?.from,
            chainId:chainId,
            tokenList:{[chainId]:path}
    
        }

        callPost("updateUserTokenList",user).then(resp=>{console.log(resp)});

    }

    const getTrades = async (account) => {
        let trades = {};
        trades = await callPost("getTrades",{address:account});
        return trades.data.data;
    }

    return {setTrade,getTrades}
}

export default useTrade
