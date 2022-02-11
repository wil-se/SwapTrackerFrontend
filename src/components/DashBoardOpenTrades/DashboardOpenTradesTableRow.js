import React,{useState, useEffect} from 'react'
import * as CryptoIcons from 'assets/icons';
import PropTypes from 'prop-types';
import { Row, Col, Button } from 'react-bootstrap';
import {useNavigate} from 'react-router-dom'

const greyText = {color: "#8DA0B0", fontSize: 11}
const DashboardOpenTradesTableRow = ({tokenSymbol,tokenSymbolIn,tokenName,pl,pl_perc,currentPrice,currentValue,openAt,amountIn,amountOut,priceTo,tokenFrom,tokenTo,fiatValue,fiatSymbol}) => {
    let navigation = useNavigate()

    const closeTrade = (tokenIn,tokenOut) => {
      navigation('/trade',{state:{tokenIn:tokenIn,tokenOut:tokenOut}})
    }

    return (
        <Row className="d-flex align-items-center justify-content-center pt-3">
          <Col className="text-center dashboard-token-col">
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
            <div >
            {tokenSymbol}
            </div>
          </Col>
          <Col className="text-center ">
            {tokenName}
          </Col>
          <Col className="text-center">
            <p className="mb-0">{`${fiatSymbol} ${(Number(currentValue)*fiatValue).toFixed(3)}`}</p>
            <span style={greyText}>{amountIn} {tokenSymbolIn} | {amountOut} {tokenSymbol}</span>
          </Col>
          <Col className="text-center">
            <p className="mb-0">{`${fiatSymbol} ${(Number(openAt)*fiatValue).toFixed(3)}`}</p>
            <span style={greyText}>{amountOut} {tokenSymbol} @{priceTo}</span>
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
            <Button style={{fontSize: 12, paddingTop: 5, paddingBottom: 5}} onClick={()=>closeTrade(tokenFrom,tokenTo)}>
              CLOSE TRADE
            </Button>
          </Col>
        </Row>
    )
}


DashboardOpenTradesTableRow.propTypes = {
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
    fiatValue: PropTypes.number,
    fiatSymbol: PropTypes.string
};

export default DashboardOpenTradesTableRow
