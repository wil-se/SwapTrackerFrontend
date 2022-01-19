import React, { useState,useEffect } from 'react'
import MainContainer from 'components/MainContainer'
import { Card, Row, Col, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { propTypes } from 'react-bootstrap/esm/Image';
import * as CryptoIcons from '../../assets/icons';

const greyText = {color: "#8DA0B0", fontSize: 11}


export function HistoryRow(props){
  
  return(
    <>
    <Row style={{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 15,
}}>
      <Col className="text-center">
      <img className="img-fluid ml-0 mr-2" src={CryptoIcons.default['_'+props.tokenSymbol.toLowerCase()]} style={{width: 25, height: 25}} />
        {props.tokenSymbol}
      </Col>
      <Col className="text-center">
        {props.tokenName}
      </Col>
      <Col className="text-center">
        <p className="mb-0">$88.000</p>
        <span style={greyText}>133 BNB | 2 BTC</span>
      </Col>
      <Col className="text-center">
        <p className="mb-0">$26.000</p>
        <span style={greyText}>133 BNB | 2 BTC</span>
      </Col>
      <Col className="text-center">
        <p className="mb-0">$88.000</p>
        <span style={greyText}>133 BNB | 2 BTC</span>
      </Col>
      <Col className="text-center">
        {props.pl}
      </Col>
      <Col className="text-center">
        {props.pl_perc}%
      </Col>
      <Col className="text-center">
        {props.openDate}
      </Col>
      <Col className="text-center">
        {props.closedDate}
      </Col>
      <Col className="text-center">
        <Button style={{fontSize: 12, paddingTop: 5, paddingBottom: 5}}>CLOSE TRADE</Button>
      </Col>
    </Row>
    </>
  )
}

HistoryRow.propTypes = {
  tokenSymbol: PropTypes.string,
  tokenName: PropTypes.string,
  currentValue: PropTypes.number,
  openAt: PropTypes.string,
  currenPrice: PropTypes.number,
  pl: PropTypes.number,
  pl_perc: PropTypes.number,
  openDate: PropTypes.string,
  closedDate: PropTypes.string,
};
