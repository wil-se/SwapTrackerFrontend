import React from 'react';
import PropTypes from 'prop-types';
import { Container } from 'react-bootstrap';

const MainContainer = function ({ children }) {
  return (
    <div className="container-fluid main-container pt-5 pt-md-0">
        {children}
    </div>
  );
};

MainContainer.propTypes = {
  children: PropTypes.element,
};

export default MainContainer;
