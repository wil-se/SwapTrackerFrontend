import {useMemo} from 'react'
import { Interface } from '@ethersproject/abi';
import { getWeb3NoAccount } from 'utils/web3';
import MultiCallAbi from 'config/abi/Multicall.json';
import { getMulticallAddress } from 'utils/addressHelpers';
import {useCallsData,toCallState} from 'store/hooks'
import {useBlock} from 'store/hooks'


const multicall = async (abi, calls) => {
  const web3 = getWeb3NoAccount();
  const multi = new web3.eth.Contract(MultiCallAbi, getMulticallAddress());
  const itf = new Interface(abi);

  const calldata = calls.map(call => [call.address.toLowerCase(), itf.encodeFunctionData(call.name, call.params)]);
  const { returnData } = await multi.methods.aggregate(calldata).call();
  const res = returnData.map((call, i) => itf.decodeFunctionResult(calls[i].name, call));

  return res;
};

export function useMultipleContractSingleData(
  addresses,
  contractInterface,
  methodName,
  callInputs,
  options,
) {
  const fragment = useMemo(() => contractInterface.getFunction(methodName), [contractInterface, methodName])
  const callData = useMemo(
    () =>
      fragment
        ? contractInterface.encodeFunctionData(fragment, callInputs)
        : undefined,
    [callInputs, contractInterface, fragment],
  )

  const calls = useMemo(
    () =>
      fragment && addresses && addresses.length > 0 && callData
        ? addresses.map((address) => {
            return address && callData
              ? {
                  address,
                  callData,
                }
              : undefined
          })
        : [],
    [addresses, callData, fragment],
  )

  const results = useCallsData(calls, options)

  const { currentBlock } = useBlock()

  return useMemo(() => {
    return results.map((result) => toCallState(result, contractInterface, fragment, currentBlock))
  }, [fragment, results, contractInterface, currentBlock])
}





export default multicall;
