import axios from "axios"
import {BNB,BUSD,SWPT,WETH,USDT,WBNB} from 'config'
export const getPancakeTokenList = async () => {
    let tokenList = await axios.get("https://tokens.pancakeswap.finance/pancakeswap-top-100.json")
    tokenList = tokenList?.data?.tokens
    BNB.logoURI = BNB.projectLink;
    WBNB.logoURI = WBNB.projectLink;
    tokenList.unshift(BNB,BUSD,USDT,SWPT,WETH,WBNB)
    return tokenList
}