import React, { useState,useEffect } from 'react'
import { Card, Row, Col } from 'react-bootstrap';
import addressAvatarBig from '../../assets/icons/addressAvatarBig.png';
import { Doughnut } from 'react-chartjs-2';
import * as CryptoIcons from '../../assets/icons';
import {walletDistribution,getWalletTVL} from 'utils/walletHelpers'
import useWeb3 from 'hooks/useWeb3';
import useAuthService from 'hooks/useAuthService'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { useWeb3React } from '@web3-react/core';
import { Button } from 'react-bootstrap';
import { useGetApiPrice } from 'store/hooks'
import PropTypes from 'prop-types';
import * as CoingeckoTokens from '../../config/constants/coingeckoTokens';
const CoinGecko = require('coingecko-api');
const CoinGeckoClient = new CoinGecko();
import '../../style/WalletOverview.scss'
import { PriceVariation } from '../PriceVariation'
import {useNavigate} from 'react-router-dom'
import ArrowExpandModal from '../../assets/icons/expand.png'
import { useGetFiatName, useGetFiatValues, useGetFiatSymbol } from 'store/hooks';
import TradingViewWidget, { Themes } from 'react-tradingview-widget';


export function CoinInfo(props) {
  
  const [holding, setHolding] = useState(0);
  const [price, setPrice] = useState(0);
  const [priceBNB, setPriceBNB] = useState(0);
  const [priceVariation, setPriceVariation] = useState(0);
  const [name, setName] = useState("Loading..")
  
  const [value, setValue] = useState(0);

  const coingeckoId = CoingeckoTokens.default[props.symbol.toLowerCase()];

  const getCoingeckoStats = async ()=>{
    
    let data = await CoinGeckoClient.coins.fetch(coingeckoId, {});
    setPrice(data.data.market_data?.current_price.usd || 0);
    setPriceVariation(data.data.market_data?.price_change_percentage_24h || 0);
    setName(data.data.name)
    let bnb = await CoinGeckoClient.coins.fetch('binancecoin', {});
    setPriceBNB(bnb.data.market_data.current_price.usd)
  }

  const currentName = useGetFiatName();
  // console.log("CURRENT FIAT NAMEwwwwwwww ", currentName);

  const currentValues = useGetFiatValues();
  // console.log("Values: ", currentValues);

  const currentSymbol = useGetFiatSymbol();


  useEffect(() => {
    getCoingeckoStats();
    for(let i=0; i<currentValues.length; i++){
      if(currentValues[i]['currency'] == currentName){
        setValue(Number(currentValues[i]['rate']));
      }
    }
  }, [currentName, currentValues, currentSymbol])

  const closeTrade = (tokenIn,tokenOut) => {
    /*navigation('/trade',{state:{tokenIn:tokenIn,tokenOut:tokenOut}})*/
  }

  return(
      <Card className="wallet-overview-card" style={{marginBottom: 20}}>
        <Card.Body>
          <Row>
            <Col md={2} xs={6} className="pt-2 text-center">
                {
                  CryptoIcons.default['_'+props.symbol.toLowerCase()] === undefined ?
                  <img className="img-fluid" src={CryptoIcons.default['_generic']} style={{width: 60, height: 60}} />
                  : <img className="img-fluid" src={CryptoIcons.default['_'+props.symbol.toLowerCase()]} style={{width: 60, height: 60}} />
                }
                <p className="font-weight-bold text-center pt-2 mb-0 text-nowrap"> {props.symbol.toUpperCase()} </p>
            </Col>
              
            <Col md={4} xs={6} className="pt-3">
              <span className="d-block text-decoration-none text-uppercase" style={{color: "#8DA0B0", fontSize: 11}}>holdings</span>
              <span className="d-block text-decoration-none text-dark" style={{fontSize: 24, fontWeight: 900}}>{currentSymbol} {(props.holdingValue*value).toFixed(2)}</span>
              <span className="text-decoration-none" style={{color: "#8DA0B0", fontSize: 11}}>CURRENT PRICE</span>
              <h5 className="mb-0 pt-0" style={{fontSize: 24, fontWeight: 900}}>{currentSymbol} {(price*value).toFixed(2)}</h5> 
            </Col>

            <Col md={3} xs={6} className="border-left border-1 pt-3 text-center text-md-left">
              <span className="d-block text-decoration-none text-uppercase" style={{color: "#8DA0B0", fontSize: 11}}>{props.symbol}</span>
              <span className="d-block text-decoration-none text-dark" style={{fontSize: 24, fontWeight: 900}}> {props.holding.toFixed(4)}</span> 
              <span style={{color: "#8DA0B0", fontSize: 11}}>24H VARIATION</span>
              <PriceVariation priceVariation={Number(priceVariation.toFixed(2))} />
            </Col>
            <Col md={3} xs={6} className="pt-3 align-items-md-start align-items-center">
              
                <Button style={{fontSize: 12, paddingTop: 5, paddingBottom: 5, marginBottom: 15}} onClick={()=>closeTrade('token_from','token_to')}>
                  CLOSE TRADE
                </Button>

<div style={{position: "relative"}}>
                <TradingViewWidget
        symbol={props.symbol.toUpperCase()+"USD"}
        // theme={Themes.DARK}
        locale="en"
        hide_top_toolbar={true}
        hide_legend={true}
        allow_symbol_change={false}
        hide_side_toolbar={true}
        style={2}
        width={120}
        height={80}
      />
      
                <a style={{position: "absolute", left: 0, top: 0, width: 20, height: 20, backgroundColor: "#FFFFFF"}} onClick={() => {props.setModalShowFunction(true);props.setChartKeyFunction(prev => prev + 1);props.setCurrentSymbol(props.symbol);}}>
                  <img style={{zIndex:9999, width: 20, height: 20, cursor: "pointer", marginRight: 10}} src={ArrowExpandModal}></img>
                </a>
</div>
            </Col>
          </Row>
        </Card.Body>
      </Card>

  )
}

CoinInfo.propTypes = {
  holdingValue: PropTypes.number,
  symbol: PropTypes.string,
  setModalShowFunction: PropTypes.any,
  holding: PropTypes.number,
  setChartKeyFunction: PropTypes.func,
  setCurrentSymbol :PropTypes.func,
};
