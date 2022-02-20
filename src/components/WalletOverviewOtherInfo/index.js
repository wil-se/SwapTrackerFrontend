import * as CryptoIcons from '../../assets/icons';
import React, { useState,useEffect } from 'react'
import PropTypes from 'prop-types';
import { Card, Row, Col } from 'react-bootstrap';


export function WalletOverviewOtherInfo(props){
  return(
<Col xs={6} className="m-0 p-1">
<Col  style={{border: "1px solid #ACD8E6", borderRadius: 10}}>
<Col className="mt-1">
          <a style={{fontSize: 14, fontWeight: 800}}>OTHER</a>
        </Col>
        <Col className="mt-1 d-flext text-right pr-2">
          <span className="align-items-center" style={{fontSize: 14, fontWeight: 800}}>{props.otherPerc} %</span>
        </Col>
</Col>
</Col>
  )
}


WalletOverviewOtherInfo.propTypes = {
  otherPerc: PropTypes.any,
};
