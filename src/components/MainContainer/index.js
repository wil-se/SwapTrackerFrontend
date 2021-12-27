import React from 'react';
import PropTypes from 'prop-types';
import { Container } from 'react-bootstrap';

const MainContainer = function ({ children }) {
  return (
    <Container className="main-container">
      <Container className="content">
        {children}
      </Container>
    </Container>
  );
};

MainContainer.propTypes = {
  children: PropTypes.element,
};

export default MainContainer;
