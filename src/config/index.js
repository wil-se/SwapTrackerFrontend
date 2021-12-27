import BigNumber from 'bignumber.js/bignumber';

export const BSC_BASE_URL = process.env.REACT_APP_CHAIN_BLOCK_EXPLORER_URL_1;
export const BSC_BLOCK_TIME = 3;
export const BLOCKS_PER_YEAR = new BigNumber((60 / BSC_BLOCK_TIME) * 60 * 24 * 365); // 10512000
