import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import BigNumber from 'bignumber.js';
import { Button, Modal } from 'react-bootstrap';
import { ArrowRepeat } from 'react-bootstrap-icons';
import { useClaimReward } from 'hooks/useClaimReward';
import { formatNumber, getBalanceNumber } from 'utils/formatBalance';

const StakeModal = function ({ pool, earningTokenPrice, show, onHide }) {
  const { poolId, earningToken, userData } = pool;

  const { onReward } = useClaimReward(poolId);

  const [pendingTx, setPendingTx] = useState(false);

  const pendingReward = new BigNumber(userData?.pendingReward ? userData.pendingReward : 0);
  const formattedPendingReward = formatNumber(getBalanceNumber(pendingReward, earningToken.decimals), 4, 4);
  const dollarPendingReward = formatNumber(
    getBalanceNumber(pendingReward.multipliedBy(earningTokenPrice), earningToken.decimals),
  );

  const handleConfirm = useCallback(async () => {
    setPendingTx(true);

    try {
      await onReward();
      onHide();
    } catch (err) {
      console.error(err);
    }

    setPendingTx(false);
  }, [onHide, onReward]);

  return (
    <Modal className="modal-claim" size="sm" show={show} onHide={onHide} animation={false} centered>
      <Modal.Header closeButton>
        <Modal.Title>
          {earningToken.symbol} Claim
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="d-flex justify-content-between align-items-center bold">
          <div>Claiming:</div>
          <div className="d-flex flex-column align-items-end">
            <div className="text-value font-medium">
              {formattedPendingReward} {earningToken.symbol}
            </div>
            <div className="text-value font-medium font-12">
              ~${dollarPendingReward} USD
            </div>
          </div>
        </div>

        <div className="mt-4 mb-2">
          <Button className="w-100" onClick={handleConfirm} disabled={pendingTx}>
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
  earningTokenPrice: PropTypes.number,
};

export default StakeModal;
