import * as CryptoIcons from '../../assets/icons';
import React, { useState,useEffect } from 'react'
import PropTypes from 'prop-types';
import { Card, Row, Col } from 'react-bootstrap';

const coinInfoStyle = {
  width: 40,
  height: 40,
  marginRight: 10
}


export function WalletOverviewCoinInfo(props){
  return(
    <div>
    {
        props.coin.symbol === "" ?
          ""
        : CryptoIcons.default['_'+props.coin.symbol.toLowerCase()] === undefined ?
          <div>
            <Row className="addressSection align-items-center">
              <Col xs={2}>
                <img src={CryptoIcons.default['_generic']} style={coinInfoStyle} /> 
              </Col>
              <Col xs={6}>
                <a style={{fontSize: 14, fontWeight: 800}}>{props.coin.symbol}</a><br></br>
                <a style={{fontSize: 12, fontWeight: 400, opacity: 0.5}}>{props.coin.name}</a>
              </Col>
              <Col>
              <Row style={{position: "relative"}}>
              <span style={{position: "absolute", top: 0, fontSize: 14, fontWeight: 800}}>{props.coin.perc} %</span>
              </Row>
              </Col>
              
            </Row>
          </div>
          : 
          <div>
            <Row className="addressSection align-items-center">
              <Col xs={2}>
                <img src={CryptoIcons.default['_'+props.coin.symbol.toLowerCase()]} style={coinInfoStyle} />
              </Col>
              <Col xs={6}>
                <a style={{fontSize: 14, fontWeight: 800}}>{props.coin.symbol}</a><br></br>
                <a style={{fontSize: 12, fontWeight: 400, opacity: 0.5}}>{props.coin.name}</a>
              </Col>
              <Col>
              <Row style={{position: "relative"}}>
              <span style={{position: "absolute", top: 0, fontSize: 14, fontWeight: 800}}>{props.coin.perc} %</span>
              </Row>
              </Col>
              
            </Row>
          </div>
    }
    </div>
  )
}

WalletOverviewCoinInfo.propTypes = {
  coin: PropTypes.any,
};
