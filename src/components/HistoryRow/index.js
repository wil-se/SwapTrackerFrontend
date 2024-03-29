import React, { useState,useEffect } from 'react'
import MainContainer from 'components/MainContainer'
import { Card, Row, Col, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { propTypes } from 'react-bootstrap/esm/Image';
import * as CryptoIcons from '../../assets/icons';
import {useNavigate} from 'react-router-dom'
import {num_format, num_locale_format} from 'utils/walletHelpers'


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
  fiatValue,
  show
}){
    
  let navigation = useNavigate()
  
  const closeTrade = (tokenIn,tokenOut,amIn,amOut) => {
    navigation('/trade',{state:{tokenIn:tokenIn,tokenOut:tokenOut,amountIn:amIn,amountOut:amOut}})
  }


  const row = <>
  <tr>
        <td className="text-center history-token-col ">
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
        </td>

        <td className="text-center on-center">
          {tokenName}
        </td>

        <td className="text-center">
          <p className="mb-0">{`${fiatSymbol} ${(Number(currentValue)*fiatValue).toFixed(3)}`}</p>
          <div className="greyText">{ currentPrice > 10 ? num_format(amountOut, 2, 7) : num_format(amountOut, 2, 3)} {tokenSymbol}</div>
        </td>

        <td className="text-center">
          <p className="mb-0">{`${fiatSymbol} ${(priceTo*fiatValue).toFixed(7)}`}</p>
          <div className="greyText">{ currentPrice > 10 ? num_format(amountOut, 2, 7) : num_format(amountOut, 2, 3)} {tokenSymbol}</div>
        </td>

        <td className="text-center">
          <p className="mb-0">{`${fiatSymbol} ${(currentPrice*fiatValue) > 1 ? (currentPrice*fiatValue).toFixed(4) : (currentPrice*fiatValue).toFixed(7)}`}</p>
          <div className="greyText">{ currentPrice > 10 ? num_format(amountOut, 2, 7) : num_format(amountOut, 2, 3)} {tokenSymbol}</div>
        </td>

        <td className="text-center on-center">
          {Math.sign(pl) === -1 ? 
              <div className="history-pl-negative ">
                {`${Number(pl).toFixed(4).toString().substring(0,1)} ${fiatSymbol} ${(fiatValue*Number(pl)).toFixed(2).toString().substring(1,pl.toString().length)}`}
              </div>
            :
              <div className="history-pl-positive">
                {`+ ${fiatSymbol} ${(fiatValue*Number(pl)).toFixed(4).toString()}`}
              </div>
          }
        </td>

        <td className="text-center on-center">
          {Math.sign(pl_perc)=== -1?
            <div className="history-pl-negative">
              {pl_perc.toFixed(2)}%
            </div>
            :
            <div className="history-pl-positive">
              {pl_perc.toFixed(2)}%
            </div>
        
          }
        </td>

        <td className="text-center on-center">
          {openDate}
        </td>

        <td className="text-center on-center">
          {closedDate}
        </td>
        
        <td className="text-center on-center btn-td">
          {
          closedDate === "-" ? 
            <Button style={{fontSize: 12, paddingTop: 5, paddingBottom: 5}} onClick={()=>closeTrade(tokenFrom,tokenTo,amountIn,amountOut)} className="btn-block">
                  CLOSE TRADE
            </Button>
            :
            <Button style={{fontSize: 12, paddingTop: 5, paddingBottom: 5}} className="btn btn-dark text-white btn-block" disabled>
                  CLOSED
            </Button> 
        }
        </td>
  </tr>
  </>

    return closedDate === "-" ? 
      row :
     show ?
      row :
    ""

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
  fiatValue: PropTypes.number,
  show: PropTypes.bool
};