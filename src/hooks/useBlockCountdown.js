import { useEffect, useRef, useState } from 'react';
import { BSC_BLOCK_TIME } from 'config';
import { getWeb3NoAccount } from 'utils/web3';

const useBlockCountdown = blockNumber => {
  const timer = useRef(null);
  const [secondsRemaining, setSecondsRemaining] = useState(0);

  useEffect(() => {
    const startCountdown = async () => {
      const web3 = getWeb3NoAccount();
      const currentBlock = await web3.eth.getBlockNumber();

      if (blockNumber > currentBlock) {
        setSecondsRemaining((blockNumber - currentBlock) * BSC_BLOCK_TIME);

        if (timer.current) {
          clearInterval(timer.current);
        }

        timer.current = setInterval(() => {
          setSecondsRemaining(prevSecondsRemaining => {
            if (prevSecondsRemaining === 1) {
              clearInterval(timer.current);
            }

            return prevSecondsRemaining - 1;
          });
        }, 1000);
      }
    };

    startCountdown();

    return () => {
      clearInterval(timer.current);
    };
  }, [setSecondsRemaining, blockNumber, timer]);

  return secondsRemaining;
};

export default useBlockCountdown;
