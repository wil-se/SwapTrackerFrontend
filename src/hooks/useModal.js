import React, { useCallback } from 'react';
import { ModalContext } from 'contexts/ModalContext';

const useModal = () => {
  const { setModal } = React.useContext(ModalContext);
  const onHide = useCallback(() => setModal(), [setModal]);

  return [setModal, onHide];
};

export default useModal;
