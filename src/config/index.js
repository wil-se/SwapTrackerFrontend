import BigNumber from 'bignumber.js/bignumber';
import {ChainId} from '@pancakeswap/sdk'
import {mainnetTokens,testnetTokens} from 'config/constants/tokens'
import * as CryptoIcons from 'assets/icons';

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
export const BUSD = {decimals:18,name:"Binance USD",symbol:"BUSD",logoURI:CryptoIcons.default['_busd'], address:"0xe9e7cea3dedca5984780bafc599bd69add087d56"}
export const SWPT = {decimals:18,name:"Swaptracker",symbol:"SWPT",logoURI:CryptoIcons.default['_swpt'],address:"0x01832e3346fd3a0d38ca589d836bd78d1de7030c"}
export const WETH = {decimals:18,name:"Wrapped Ethereum",symbol:"WETH",logoURI:CryptoIcons.default['_eth'],address:"0x1bC13131a9EFa06dd25dB9B024fbD9606a93c5B3"}