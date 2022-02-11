import * as CryptoIcons from '../../assets/icons';
import React, { useState,useEffect } from 'react'
import PropTypes from 'prop-types';
import { Card, Row, Col } from 'react-bootstrap';


export function WalletOverviewOtherInfo(props){
  return(
    <div>
      <Row className="align-items-center justify-content-between">
        <Col xs={6} className="mt-1">
          <a style={{fontSize: 14, fontWeight: 800}}>OTHER</a>
        </Col>
        <Col className="mt-1 d-flext text-right pr-2">
          <span className="align-items-center" style={{fontSize: 14, fontWeight: 800}}>{props.otherPerc} %</span>
        </Col>
      </Row>
    </div>


  )
}


WalletOverviewOtherInfo.propTypes = {
  otherPerc: PropTypes.any,
};
