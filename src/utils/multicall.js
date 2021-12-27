import { Interface } from '@ethersproject/abi';
import { getWeb3NoAccount } from 'utils/web3';
import MultiCallAbi from 'config/abi/Multicall.json';
import { getMulticallAddress } from 'utils/addressHelpers';

const multicall = async (abi, calls) => {
  const web3 = getWeb3NoAccount();
  const multi = new web3.eth.Contract(MultiCallAbi, getMulticallAddress());
  const itf = new Interface(abi);

  const calldata = calls.map(call => [call.address.toLowerCase(), itf.encodeFunctionData(call.name, call.params)]);
  const { returnData } = await multi.methods.aggregate(calldata).call();
  const res = returnData.map((call, i) => itf.decodeFunctionResult(calls[i].name, call));

  return res;
};

export default multicall;
