import axios from "axios"

export const getPancakeTokenList = async () => {
    return await axios.get("https://tokens.pancakeswap.finance/pancakeswap-top-100.json")
}