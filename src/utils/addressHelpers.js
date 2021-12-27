import addresses from 'config/constants/contracts';

export const getAddress = address => address[process.env.REACT_APP_CHAIN_ID];

export const getMulticallAddress = () => getAddress(addresses.multiCall);
