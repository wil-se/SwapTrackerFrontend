import BigNumber from 'bignumber.js';
import { getContract } from 'utils/contractHelpers';
import PancakeAbi from 'config/abi/pancakeRouter.json';

const BNB = "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c".toLowerCase()
const BUSD = "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56".toLowerCase()


export async function getBusdOut(tokenAddress, amount,decimals){
    try{
        if(tokenAddress === BUSD) return amount
        var path = [tokenAddress.toLowerCase(),]
        if(tokenAddress.toLowerCase() != BNB) path.push(BNB)
        path.push(BUSD)
        let amountFormatted = new BigNumber(amount).shiftedBy(parseInt(decimals))
        var out = await getContract(PancakeAbi, "0x10ED43C718714eb63d5aA57B78B54704E256024E".toLowerCase())
        .methods.getAmountsOut(amountFormatted.toString(), path).call()
        return out[out.length - 1]
    }catch(err) {
        return 0;
    }
    
}

export async function getRawBusdOut(tokenAddress, amount){
    try{
        if(tokenAddress === BUSD) return amount
        var path = [tokenAddress.toLowerCase(),]
        if(tokenAddress.toLowerCase() != BNB) path.push(BNB)
        path.push(BUSD)
        var out = await getContract(PancakeAbi, "0x10ED43C718714eb63d5aA57B78B54704E256024E".toLowerCase())
        .methods.getAmountsOut(amount, path).call()
        return out[out.length - 1]
    }catch(err) {
        return 0;
    }
}