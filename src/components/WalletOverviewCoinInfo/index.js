import * as CryptoIcons from '../../assets/icons';
import React, { useState,useEffect } from 'react'
import PropTypes from 'prop-types';
import { Card, Row, Col } from 'react-bootstrap';
import Skeleton from 'react-loading-skeleton';

const coinInfoStyle = {
  width: '40px',
  height: 'auto'
}

const coinBorder = {border: "1px solid #ACD8E6", borderRadius: 10}


export function WalletOverviewCoinInfo(props){
  const { innerWidth: width, innerHeight: height } = window;
  return(
    <Col xs={6} className="m-0" style={coinBorder}>
    <div className='py-2 pr-2'>
    {
        props.coin.symbol === "" ?
          <Skeleton width={width < 400 ? 100 : 220} height="40px"/>
        : CryptoIcons.default['_'+props.coin.symbol.toLowerCase()] === undefined ?
            <Row className="addressSection align-items-center">
              <Col xs={2} className="mr-3">
                <img src={CryptoIcons.default['_generic']} style={coinInfoStyle} /> 
              </Col>
              <Col xs={5}>
                <p className="mb-0 text-nowrap" style={{fontSize: 14, fontWeight: 800}}>{props.coin.symbol}</p>
                <p className="mb-0 text-nowrap" style={{fontSize: 12, fontWeight: 400, opacity: 0.5}}>{props.coin.name}</p>
              </Col>
              <Col xs={4} className="text-right pr-0">
                <span className="text-nowrap" style={{fontSize: 14, fontWeight: 800}}>{props.coin.perc} %</span>
              </Col>
            </Row>
          : 
            <Row className="addressSection align-items-center">
              <Col xs={2} className="mr-3">
                <img src={CryptoIcons.default['_'+props.coin.symbol.toLowerCase()]} style={coinInfoStyle} />
              </Col>
              <Col xs={5}>
                <p className="mb-0 text-nowrap" style={{fontSize: 14, fontWeight: 800}}>{props.coin.symbol}</p>
                <p className="mb-0 text-nowrap" style={{fontSize: 12, fontWeight: 400, opacity: 0.5}}>{props.coin.name}</p>
              </Col>
              <Col className="pr-0 text-right">
                <span className="text-nowrap" style={{fontSize: 14, fontWeight: 800}}>{props.coin.perc} %</span>
              </Col>
            </Row>
    }
    </div>
    </Col>
  )
}

WalletOverviewCoinInfo.propTypes = {
  coin: PropTypes.any,
};
