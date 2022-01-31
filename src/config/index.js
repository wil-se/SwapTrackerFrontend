import BigNumber from 'bignumber.js/bignumber';
import {ChainId} from '@pancakeswap/sdk'
import {mainnetTokens,testnetTokens} from 'config/constants/tokens'

export const BSC_BASE_URL = process.env.REACT_APP_CHAIN_BLOCK_EXPLORER_URL_1;
export const BSC_BLOCK_TIME = 3;
export const BLOCKS_PER_YEAR = new BigNumber((60 / BSC_BLOCK_TIME) * 60 * 24 * 365); // 10512000

export const BASES_TO_CHECK_TRADES_AGAINST = {
    [ChainId.MAINNET]: [
        mainnetTokens.wbnb,
        mainnetTokens.cake,
        mainnetTokens.busd,
        mainnetTokens.usdt,
        mainnetTokens.btcb,
        mainnetTokens.ust,
        mainnetTokens.eth,
        mainnetTokens.usdc,
      ],
      [ChainId.TESTNET]: [testnetTokens.wbnb, testnetTokens.cake, testnetTokens.busd],
}

export const ADDITIONAL_BASES = {
    [ChainId.MAINNET]: {},
}

export const CUSTOM_BASES = {
    [ChainId.MAINNET]: {},
}

export const MONTH_LABELS_CHART = {
    1:"Gen",
    2:"Feb",
    3:"Mar",
    4:"Apr",
    5:"May",
    6:"Jun",
    7:"Jul",
    8:"Aug",
    9:"Sep",
    10:"Oct",
    11:"Nov",
    12:"Dic"

}

export const BNB = {decimals:18,name:"BNB",symbol:"BNB",projectLink:"https://s2.coinmarketcap.com/static/img/coins/200x200/1839.png",address:"0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c"}
