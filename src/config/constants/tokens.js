import { ChainId, Token } from '@pancakeswap/sdk'
const { MAINNET, TESTNET } = ChainId

const tokens = {
  wBnb: {
    symbol: 'WBNB',
    address: {
      56: '0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c',
    },
    cgId:'WBNB',
    decimals: 18,
    isLP: false,
    pair: null,
  },
  swapTracker: {
    symbol: 'SWPT',
    address: {
      56: '0x01832e3346fd3a0d38ca589d836bd78d1de7030c',
    },
    cgId:'swaptracker',
    decimals: 18,
    isLP: false,
    pair: null,
  },
  lp: {
    symbol: 'SWPT-BNB-LP',
    address: {
      56: '0x7469d42c186e56f0a8a3dbc357a94837a5e5b472',
    },
    decimals: 18,
    cgId:'',
    isLP: true,
    pair: {
      token1: '0x01832e3346fd3a0d38ca589d836bd78d1de7030c',
      token2: '0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c',
    },
  },
};



export const mainnetTokens = {
  wbnb: new Token(
    MAINNET,
    '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c',
    18,
    'WBNB',
    'Wrapped BNB',
    'https://www.binance.com/',
  ),
  busd: new Token(
    MAINNET,
    '0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56',
    18,
    'BUSD',
    'Binance USD',
    'https://www.paxos.com/busd/',
  ),
  usdt: new Token(
    MAINNET,
    '0x55d398326f99059fF775485246999027B3197955',
    18,
    'USDT',
    'Tether USD',
    'https://tether.to/',
  ),
  btcb: new Token(
    MAINNET,
    '0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c',
    18,
    'BTCB',
    'Binance BTC',
    'https://bitcoin.org/',
  ),
  ust: new Token(
    MAINNET,
    '0x23396cF899Ca06c4472205fC903bDB4de249D6fC',
    18,
    'UST',
    'Wrapped UST Token',
    'https://mirror.finance/',
  ),
  eth: new Token(
    MAINNET,
    '0x2170Ed0880ac9A755fd29B2688956BD959F933F8',
    18,
    'ETH',
    'Binance-Peg Ethereum Token',
    'https://ethereum.org/en/',
  ),
  usdc: new Token(
    MAINNET,
    '0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d',
    18,
    'USDC',
    'Binance-Peg USD Coin',
    'https://www.centre.io/usdc',
  ),
  cake: new Token(
    MAINNET,
    '0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82',
    18,
    'CAKE',
    'PancakeSwap Token',
    'https://pancakeswap.finance/',
  ),
}

export const testnetTokens = {
  wbnb: new Token(
    TESTNET,
    '0x094616F0BdFB0b526bD735Bf66Eca0Ad254ca81F',
    18,
    'WBNB',
    'Wrapped BNB',
    'https://www.binance.com/',
  ),
  cake: new Token(
    TESTNET,
    '0xa35062141Fa33BCA92Ce69FeD37D0E8908868AAe',
    18,
    'CAKE',
    'PancakeSwap Token',
    'https://pancakeswap.finance/',
  ),
  busd: new Token(
    TESTNET,
    '0xeD24FC36d5Ee211Ea25A80239Fb8C4Cfd80f12Ee',
    18,
    'BUSD',
    'Binance USD',
    'https://www.paxos.com/busd/',
  ),
}



export default tokens;