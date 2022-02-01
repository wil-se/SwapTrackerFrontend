import * as CryptoIcons from '../../assets/icons';
import React, { useState,useEffect } from 'react'
import PropTypes from 'prop-types';
import { Card, Row, Col } from 'react-bootstrap';

const coinInfoStyle = {
  width: '40px',
  height: 'auto'
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
              <Col xs={2} className="mr-3">
                <img src={CryptoIcons.default['_generic']} style={coinInfoStyle} /> 
              </Col>
              <Col xs={5}>
                <p className="mb-0 text-nowrap" style={{fontSize: 14, fontWeight: 800}}>{props.coin.symbol}</p>
                <p className="mb-0 text-nowrap" style={{fontSize: 12, fontWeight: 400, opacity: 0.5}}>{props.coin.name}</p>
              </Col>
              <Col xs={4} className="text-right">
                <span className="text-nowrap" style={{fontSize: 14, fontWeight: 800}}>{props.coin.perc} %</span>
              </Col>
            </Row>
          </div>
          : 
          <div>
            <Row className="addressSection align-items-center">
              <Col xs={2} className="mr-3">
                <img src={CryptoIcons.default['_'+props.coin.symbol.toLowerCase()]} style={coinInfoStyle} />
              </Col>
              <Col xs={5}>
                <p className="mb-0 text-nowrap" style={{fontSize: 14, fontWeight: 800}}>{props.coin.symbol}</p>
                <p className="mb-0 text-nowrap" style={{fontSize: 12, fontWeight: 400, opacity: 0.5}}>{props.coin.name}</p>
              </Col>
              <Col>
                <span className="text-nowrap" style={{fontSize: 14, fontWeight: 800}}>{props.coin.perc} %</span>
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
