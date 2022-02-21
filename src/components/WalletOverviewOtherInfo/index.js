import * as CryptoIcons from '../../assets/icons';
import React, { useState,useEffect } from 'react'
import PropTypes from 'prop-types';
import { Card, Row, Col } from 'react-bootstrap';


export function WalletOverviewOtherInfo(props){
  return(
<Col xs={12} md={6} className="m-0 mb-3 mb-md-0">
  <div className="mx-2 pr-2 pl-4" style={{border: "1px solid #ACD8E6", borderRadius: 10}}>
    <p className="my-3" style={{fontSize: 14, fontWeight: 600}}>OTHER <span className="float-right" style={{fontSize: 14, fontWeight: 600}}>{props.otherPerc} %</span></p>
  </div>
</Col>
  )
}


WalletOverviewOtherInfo.propTypes = {
  otherPerc: PropTypes.any,
};
