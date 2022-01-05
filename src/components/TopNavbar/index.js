import React from 'react';
import { Dropdown, Row, Col } from 'react-bootstrap';

const TopNavbar = function () {
  return (
    <div id="sticky-wrapper" className="sticky-wrapper">
      <nav className="navbar navbar-expand-md bg-faded cripto_nav">
        <div className="container">

        {/* <Dropdown>
          <Dropdown.Toggle variant="primary" id="dropdown-basic">
            Dropdown Button
          </Dropdown.Toggle>

          <Dropdown.Menu>
          <Row>
            <Col><Dropdown.Item href="#/action-1">Action</Dropdown.Item></Col>
            <Col><Dropdown.Item href="#/action-2">Another action</Dropdown.Item></Col>
            <Col><Dropdown.Item href="#/action-3">Something else</Dropdown.Item></Col>
          </Row>
          
            
          </Dropdown.Menu>
        </Dropdown> */}
          
        </div>
      </nav>
    </div>
  );
};

export default TopNavbar;
