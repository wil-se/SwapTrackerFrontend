import React from 'react';
import PropTypes from 'prop-types';
import { Web3ReactProvider } from '@web3-react/core';
import { Provider } from 'react-redux';
import { getLibrary } from 'utils/web3React';
import { ModalContextProvider } from 'contexts/ModalContext';
import { RefreshContextProvider } from 'contexts/RefreshContext';
import store from 'store';

const Providers = ({ children }) => (
  <Web3ReactProvider getLibrary={getLibrary}>
    <Provider store={store}>
      <ModalContextProvider>
        <RefreshContextProvider>
          {children}
        </RefreshContextProvider>
      </ModalContextProvider>
    </Provider>
  </Web3ReactProvider>
);

export default Providers;

Providers.propTypes = {
  children: PropTypes.element,
};
