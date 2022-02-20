import React,{useState, useEffect} from 'react'
import * as CryptoIcons from 'assets/icons';
import PropTypes from 'prop-types';
import { Row, th, Button } from 'react-bootstrap';
import {useNavigate} from 'react-router-dom'
import {num_format} from 'utils/walletHelpers';
import { num_locale_format } from 'utils/walletHelpers';


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
  fiatSymbol,
  currentDecimals
}) => {
    let navigation = useNavigate()
    const closeTrade = (tokenIn,tokenOut,amIn,amOut) => {
      navigation('/trade',{state:{tokenIn:tokenIn,tokenOut:tokenOut,amountIn:amIn,amountOut:amOut}})
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
            <p className="mb-0">{`${fiatSymbol} ${num_locale_format(currentValue*fiatValue, currentDecimals, currentDecimals)}`}</p>
            <div className="greyText">{num_locale_format(amountOut, 7, 7)} {tokenSymbol}</div>
          </th>

          <th className="text-center">
            <p className="mb-0">{`${fiatSymbol} ${num_locale_format((priceTo*fiatValue),currentDecimals,currentDecimals)}`}</p>
            <div className="greyText">{num_locale_format(amountOut, 7, 7)}</div>
          </th>
          
          <th className="text-center">
            <p className="mb-0">{`${fiatSymbol} ${num_locale_format((Number(currentPrice)*fiatValue),currentDecimals,currentDecimals)}`}</p>
            <div className="greyText">{num_locale_format(amountIn, 7, 7)} {tokenSymbolIn} | {num_locale_format(amountOut, 7, 7)} {tokenSymbol}</div>
          </th>

          <th className="text-center on-center">
            {Math.sign(pl) === -1 ? 
              <div className="dashboard-pl-negative ">
                {`${Number(pl).toFixed(6).toString().substring(0,1)} ${fiatSymbol} ${num_locale_format(fiatValue*Number(pl),currentDecimals,currentDecimals).toString().substring(1,pl.toString().length)}`}
              </div>
              :
              <div className="dashboard-pl-positive">
                {`+ ${fiatSymbol} ${num_locale_format(fiatValue*Number(pl),currentDecimals,currentDecimals)}`}
              </div>
            }
          </th>

          <th className="text-center on-center">
            {Math.sign(pl_perc)=== -1?
              <div className="dashboard-pl-negative">
                {num_locale_format(Number(pl_perc),currentDecimals,currentDecimals) }%
              </div>
              :
              <div className="dashboard-pl-positive">
                {num_locale_format(Number(pl_perc),currentDecimals,currentDecimals) }%
              </div>
          
            }
          </th>

          <th className="text-center on-center">
            <Button style={{fontSize: 12, paddingTop: 5, paddingBottom: 5}} onClick={()=>closeTrade(tokenFrom,tokenTo,amountIn,amountOut)}>
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
    fiatSymbol: PropTypes.string,
    currentDecimals: PropTypes.number
};

export default DashboardOpenTradesTableRow
