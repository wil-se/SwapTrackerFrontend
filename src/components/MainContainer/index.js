import React from 'react';
import PropTypes from 'prop-types';
import { Container } from 'react-bootstrap';

const MainContainer = function ({ children }) {
  return (
    <Container className="main-container" style={{marginLeft: 320}}>
      <Container className="content" style={{minWidth: 1500}}>
        {children}
      </Container>
    </Container>
  );
};

MainContainer.propTypes = {
  children: PropTypes.element,
};

export default MainContainer;
