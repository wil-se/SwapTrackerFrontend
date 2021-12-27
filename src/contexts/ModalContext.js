import React, { useState } from 'react';
import PropTypes from 'prop-types';

const ModalContext = React.createContext();

const ModalContextProvider = ({ children }) => {
  const [modal, setModal] = useState();

  return (
    <ModalContext.Provider value={{ setModal }}>
      {children}
      {modal}
    </ModalContext.Provider>
  );
};

ModalContextProvider.propTypes = {
  children: PropTypes.element,
};

export { ModalContext, ModalContextProvider };
