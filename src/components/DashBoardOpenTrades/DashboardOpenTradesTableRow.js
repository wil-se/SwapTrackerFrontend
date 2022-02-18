import React,{useState, useEffect} from 'react'
import * as CryptoIcons from 'assets/icons';
import PropTypes from 'prop-types';
import { Row, th, Button } from 'react-bootstrap';
import {useNavigate} from 'react-router-dom'
import {num_format} from 'utils/walletHelpers';


const DashboardOpenTradesTableRow = ({
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
  fiatValue,
  fiatSymbol
}) => {
    let navigation = useNavigate()
    const closeTrade = (tokenIn,tokenOut) => {
      navigation('/trade',{state:{tokenIn:tokenIn,tokenOut:tokenOut}})
    }

    return (
        <tr >

          <th className="text-center dashboard-token-col">
            {CryptoIcons.default['_'+tokenSymbol.toLowerCase()] 
              ?
              <div className="dashboard-token-icon">
                <img className="img-fluid" src={CryptoIcons.default['_'+tokenSymbol.toLowerCase()]} style={{width: 25, height: 25}} />
              </div>
              :
              <div className="dashboard-token-icon">
                <img className="img-fluid " src={CryptoIcons.default['_generic']} style={{width: 25, height: 25}} />
              </div>
              
            }
            <div className="dashboard-token-symbol">
            {tokenSymbol}
            </div>
          </th>

          <th className="text-center on-center">
            {tokenName}
          </th>

          <th className="text-center">
            <p className="mb-0">{`${fiatSymbol} ${num_format(currentValue*fiatValue, 2, 5)}`}</p>
            <div className="greyText">{amountIn} {tokenSymbolIn} | {amountOut.toFixed(7)} {tokenSymbol}</div>
          </th>

          <th className="text-center">
            <p className="mb-0">{`${fiatSymbol} ${num_format(priceTo)}`}</p>
            <div className="greyText">{num_format(amountOut)} {tokenSymbol} @{Number(priceTo).toFixed(7)}</div>
          </th>
          
          <th className="text-center">
            <p className="mb-0">{`${fiatSymbol} ${(Number(currentPrice)*fiatValue).toFixed(7)}`}</p>
            <div className="greyText">{amountIn} {tokenSymbolIn} | {amountOut.toFixed(7)} {tokenSymbol}</div>
          </th>

          <th className="text-center on-center">
            {Math.sign(pl) === -1 ? 
              <div className="dashboard-pl-negative ">
                {`${Number(pl).toFixed(6).toString().substring(0,1)} ${fiatSymbol} ${(fiatValue*Number(pl)).toFixed(6).toString().substring(1,pl.toString().length)}`}
              </div>
              :
              <div className="dashboard-pl-positive">
                {`+ ${fiatSymbol} ${(fiatValue*Number(pl)).toFixed(6).toString()}`}
              </div>
            }
          </th>

          <th className="text-center on-center">
            {Math.sign(pl_perc)=== -1?
              <div className="dashboard-pl-negative">
                {Number(pl_perc).toFixed(4)}%
              </div>
              :
              <div className="dashboard-pl-positive">
                {Number(pl_perc).toFixed(4)}%
              </div>
          
            }
          </th>

          <th className="text-center on-center">
            <Button style={{fontSize: 12, paddingTop: 5, paddingBottom: 5}} onClick={()=>closeTrade(tokenFrom,tokenTo)}>
              CLOSE TRADE
            </Button>
          </th>
        </tr>
    )
}


DashboardOpenTradesTableRow.propTypes = {
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
    fiatValue: PropTypes.number,
    fiatSymbol: PropTypes.string
};

export default DashboardOpenTradesTableRow
