import React, { useState,useEffect } from 'react'
import MainContainer from 'components/MainContainer'
import { Card, Row, Col, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { propTypes } from 'react-bootstrap/esm/Image';
import * as CryptoIcons from '../../assets/icons';
import {useNavigate} from 'react-router-dom'
const greyText = {color: "#8DA0B0", fontSize: 11}


export function HistoryRow({
  tokenSymbol,
  tokenSymbolIn,
  tokenName,
  pl,
  pl_perc,
  currentPrice,
  currentValue,
  openAt,
  amountIn,
  amountOut,
  priceTo,
  tokenFrom,
  tokenTo,
  openDate,
  closedDate,
  fiatSymbol,
  fiatValue
}){
    
  let navigation = useNavigate()
  
  const closeTrade = (tokenIn,tokenOut) => {
    navigation('/trade',{state:{tokenIn:tokenIn,tokenOut:tokenOut}})
  }
   
  return(
    <>
    <tr className="">
          <th className="text-center history-token-col">
            {CryptoIcons.default['_'+tokenSymbol.toLowerCase()] 
              ?
              <div className="history-token-icon">
                <img className="img-fluid" src={CryptoIcons.default['_'+tokenSymbol.toLowerCase()]} style={{width: 25, height: 25}} />
              </div>
              :
              <div className="history-token-icon">
                <img className="img-fluid " src={CryptoIcons.default['_generic']} style={{width: 25, height: 25}} />
              </div>
              
            }
            <div className="history-token-symbol">
            {tokenSymbol}
            </div>
          </th>

          <th className="text-center on-center">
            {tokenName}
          </th>

          <th className="text-center">
            <p className="mb-0">{`${fiatSymbol} ${(Number(currentValue)*fiatValue).toFixed(3)}`}</p>
            <div className="greyText">{amountIn.toFixed(7)} {tokenSymbolIn} | {amountOut.toFixed(7)} {tokenSymbol}</div>
          </th>

          <th className="text-center">
            <p className="mb-0">{`${fiatSymbol} ${(priceTo*fiatValue).toFixed(7)}`}</p>
            <div className="greyText">{amountOut.toFixed(7)} {tokenSymbol} @{priceTo.toFixed(7)}</div>
          </th>

          <th className="text-center">
            <p className="mb-0">{`${fiatSymbol} ${(currentPrice*fiatValue) > 1 ? (currentPrice*fiatValue).toFixed(4) : (currentPrice*fiatValue).toFixed(7)}`}</p>
            <div className="greyText">{amountIn.toFixed(7)} {tokenSymbolIn} | {amountOut.toFixed(7)} {tokenSymbol}</div>
          </th>

          <th className="text-center on-center">
            {Math.sign(pl) === -1 ? 
                <div className="history-pl-negative ">
                  {`${Number(pl).toFixed(4).toString().substring(0,1)} ${fiatSymbol} ${(fiatValue*Number(pl)).toFixed(4).toString().substring(1,pl.toString().length)}`}
                </div>
              :
                <div className="history-pl-positive">
                  {`+ ${fiatSymbol} ${(fiatValue*Number(pl)).toFixed(4).toString()}`}
                </div>
            }
          </th>

          <th className="text-center on-center">
            {Math.sign(pl_perc)=== -1?
              <div className="history-pl-negative">
                {pl_perc.toFixed(3)}%
              </div>
              :
              <div className="history-pl-positive">
                {pl_perc.toFixed(3)}%
              </div>
          
            }
          </th>

          <th className="text-center on-center">
            {openDate}
          </th>

          <th className="text-center on-center">
            {closedDate}
          </th>
          
          <th className="text-center">
            <Button style={{fontSize: 12, paddingTop: 5, paddingBottom: 5}} onClick={()=>closeTrade(tokenFrom,tokenTo)}>
                  CLOSE TRADE
            </Button>
          </th>
    </tr>
    </>
  )
}

HistoryRow.propTypes = {
  tokenSymbol: PropTypes.string,
  tokenSymbolIn: PropTypes.string,
  tokenName: PropTypes.string,
  currentValue: PropTypes.number,
  openAt: PropTypes.number,
  currentPrice: PropTypes.number,
  pl: PropTypes.number,
  pl_perc: PropTypes.number,
  openDate: PropTypes.string,
  closedDate: PropTypes.string,
  amountIn: PropTypes.number,
  amountOut: PropTypes.number,
  priceTo: PropTypes.number,
  tokenFrom: PropTypes.string,
  tokenTo: PropTypes.string,
  fiatSymbol: PropTypes.string,
  fiatValue: PropTypes.number
};