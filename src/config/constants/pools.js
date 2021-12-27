import tokens from './tokens';

const pools = [
  {
    poolId: 0,
    stakingToken: tokens.swapTracker,
    earningToken: tokens.swapTracker,
    contractAddress: {
      56: '0xCF5cE6604a086954A9c9E0FDd39924FA8718204A',
    },
    sortOrder: 1,
    isFinished: false,
  },
  {
    poolId: 1,
    stakingToken: tokens.lp,
    earningToken: tokens.swapTracker,
    contractAddress: {
      56: '0x57235bEBdD946Dc67Fc748b454bb29158C971Dfb',
    },
    sortOrder: 2,
    isFinished: false,
  },
];

export default pools;
