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

export default tokens;
