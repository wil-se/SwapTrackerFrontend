import axios from "axios"
import {BNB,BUSD,SWPT,WETH} from 'config'
export const getPancakeTokenList = async () => {
    let tokenList = await axios.get("https://tokens.pancakeswap.finance/pancakeswap-top-100.json")
    tokenList = tokenList?.data?.tokens
    BNB.logoURI = BNB.projectLink;
    tokenList.push(BNB,BUSD,SWPT,WETH)
    return tokenList
}