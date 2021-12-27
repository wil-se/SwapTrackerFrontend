import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import BigNumber from 'bignumber.js';
import { Button, Form, Modal } from 'react-bootstrap';
import { ArrowRepeat } from 'react-bootstrap-icons';
import { useStake } from 'hooks/useStake';
import { useUnstake } from 'hooks/useUnstake';
import { formatNumber, getBalanceNumber, getFullDisplayBalance } from 'utils/formatBalance';

const StakeModal = function ({ pool, action, stakingMax, stakingTokenPrice, show, onHide }) {
  const { poolId, stakingToken } = pool;

  const { onStake } = useStake(poolId);
  const { onUnstake } = useUnstake(poolId);

  const [stakeAmount, setStakeAmount] = useState('');
  const [pendingTx, setPendingTx] = useState(false);

  const balance = getBalanceNumber(stakingMax, stakingToken.decimals);
  const usdStakeAmount = formatNumber(new BigNumber(stakeAmount || 0).times(stakingTokenPrice).toNumber(), 2, 2);

  const handleChangePercent = stakePercent => {
    const amountToStake = getFullDisplayBalance(
      stakingMax.dividedBy(100).multipliedBy(stakePercent),
      stakingToken.decimals,
      stakingToken.decimals,
    );
    console.log('amountToStake:', amountToStake, amountToStake.toString());
    setStakeAmount(amountToStake);
  };

  const handleClickOnConfirm = useCallback(async () => {
    setPendingTx(true);

    try {
      if (action === 'deposit') {
        await onStake(stakeAmount, stakingToken.decimals);
      } else {
        await onUnstake(stakeAmount, stakingToken.decimals);
      }

      onHide();
    } catch (err) {
      console.error(err);
    }

    setPendingTx(false);
  }, [action, onHide, onStake, onUnstake, stakeAmount, stakingToken.decimals]);

  return (
    <Modal className="modal-stake" show={show} onHide={onHide} animation={false} centered>
      <Modal.Header closeButton>
        <Modal.Title>
          {action === 'deposit' ? 'Stake' : 'Unstake'}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="d-flex justify-content-between align-items-center bold">
          <div>
            {action === 'deposit' ? 'Deposit:' : 'Withdraw:'}
          </div>
          <div className="stake-token d-flex align-items-center">
            <div>{stakingToken.symbol}</div>
            <div className="ml-1" width="24px" height="24px">
              <img src={`/images/tokens/${stakingToken.symbol}.png`} width="24px" height="24px" alt="icon" />
            </div>
          </div>
        </div>

        <div className="mt-1">
          <div className="p-2" style={{ border: '1px solid #ddd' }}>
            <Form>
              <Form.Control
                className="border-none text-value font-medium bold"
                value={stakeAmount}
                placeholder="0.00"
                type="number"
                step="any"
                onChange={e => setStakeAmount(e.target.value)}
              />
            </Form>
            <div className="text-right text-value font-medium font-14">
              {`~${usdStakeAmount} USD`}
            </div>
          </div>
        </div>

        <div className="text-right text-value font-medium font-12">
          <span>Balance:</span>{' '}
          <span>{balance}</span>
        </div>

        <div className="d-flex justify-content-between mt-3">
          <Button className="btn-percentage" onClick={() => handleChangePercent(25)}>25%</Button>
          <Button className="btn-percentage" onClick={() => handleChangePercent(50)}>50%</Button>
          <Button className="btn-percentage" onClick={() => handleChangePercent(75)}>75%</Button>
          <Button className="btn-percentage" onClick={() => handleChangePercent(100)}>100%</Button>
        </div>

        <div className="mt-4 mb-2">
          <Button className="w-100" onClick={handleClickOnConfirm} disabled={pendingTx || parseFloat(stakeAmount) === 0}>
            {!pendingTx ? 'Confirm' : 'Confirming'}
            {pendingTx && (<ArrowRepeat className="icon rotate ml-2" />)}
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

StakeModal.propTypes = {
  show: PropTypes.bool,
  onHide: PropTypes.func,
  pool: PropTypes.object,
  action: PropTypes.string,
  stakingMax: PropTypes.object,
  stakingTokenPrice: PropTypes.number,
};

export default StakeModal;
