import React, { useState,useEffect } from 'react'
import MainContainer from 'components/MainContainer'
import { Card, Row, Col, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { propTypes } from 'react-bootstrap/esm/Image';
import * as CryptoIcons from '../../assets/icons';
import {useNavigate} from 'react-router-dom'
const greyText = {color: "#8DA0B0", fontSize: 11}


export function HistoryRow({tokenSymbol,tokenSymbolIn,tokenName,pl,pl_perc,currentPrice,currentValue,openAt,amountIn,amountOut,priceTo,tokenFrom,tokenTo, openDate, closedDate,fiatSymbol,fiatValue}){
    
    let navigation = useNavigate()
    const closeTrade = (tokenIn,tokenOut) => {
      navigation('/trade',{state:{tokenIn:tokenIn,tokenOut:tokenOut}})
    }


  return(
    <>
    <hr/>    
    <Row style={{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 15,
}}>

      <Col className="text-center">
      {CryptoIcons.default['_'+tokenSymbol.toLowerCase()]  ?
            <img className="img-fluid ml-0 mr-2" src={CryptoIcons.default['_'+tokenSymbol.toLowerCase()]} style={{width: 25, height: 25}} />
        :
            <img className="img-fluid ml-0 mr-2" src={CryptoIcons.default['_generic']} style={{width: 25, height: 25}} />
      }
            {tokenSymbol}
      </Col>
      <Col className="text-center">
        {tokenName}
      </Col>
      <Col className="text-center">
      <p className="mb-0">{`${fiatSymbol} ${(Number(currentValue)*fiatValue).toFixed(3)}`}</p>
        <span style={greyText}>{amountIn} {tokenSymbolIn} | {amountOut} {tokenSymbol}</span>
      </Col>
      <Col className="text-center">
        <p className="mb-0">{`${fiatSymbol} ${(Number(openAt)*fiatValue).toFixed(3)}`}</p>
        <span style={greyText}>{amountOut} {tokenSymbol} | {priceTo}</span>
      </Col>
      <Col className="text-center">
        <p className="mb-0">{`${fiatSymbol} ${(Number(currentPrice)*fiatValue).toFixed(3)}`}</p>
        <span style={greyText}>{amountIn} {tokenSymbolIn} | {amountOut} {tokenSymbol}</span>
      </Col>
      <Col className="text-center">
      {Math.sign(pl) === -1 ? 
              <div className="dashboard-pl-negative">
                {`${Number(pl).toFixed(3).toString().substring(0,1)} ${fiatSymbol} ${(fiatValue*Number(pl)).toFixed(3).toString().substring(1,pl.toString().length)}`}
              </div>
              :
              <div className="dashboard-pl-positive">
                {`+ ${fiatSymbol} ${(fiatValue*Number(pl)).toFixed(3).toString()}`}
              </div>
            }
      </Col>
      <Col className="text-center">
      {Math.sign(pl_perc)=== -1?
              <div className="dashboard-pl-negative">
                {pl_perc}%
              </div>
              :
              <div className="dashboard-pl-positive">
                {pl_perc}%
              </div>
          
            }
      </Col>
      <Col className="text-center">
        {openDate}
      </Col>
      <Col className="text-center">
        {closedDate}
      </Col>
      <Col className="text-center">
        <Button style={{fontSize: 12, paddingTop: 5, paddingBottom: 5}} onClick={()=>closeTrade(tokenFrom,tokenTo)}>
                CLOSE TRADE
        </Button>
      </Col>
    </Row>
    </>
  )
}

HistoryRow.propTypes = {
  tokenSymbol: PropTypes.string,
  tokenSymbolIn: PropTypes.string,
  tokenName: PropTypes.string,
  currentValue: PropTypes.number,
  openAt: PropTypes.string,
  currentPrice: PropTypes.string,
  pl: PropTypes.string,
  pl_perc: PropTypes.string,
  openDate: PropTypes.string,
  closedDate: PropTypes.string,
  amountIn: PropTypes.string,
  amountOut: PropTypes.string,
  priceTo: PropTypes.string,
  tokenFrom: PropTypes.string,
  tokenTo: PropTypes.string,
  fiatSymbol: PropTypes.string,
  fiatValue: PropTypes.number
};