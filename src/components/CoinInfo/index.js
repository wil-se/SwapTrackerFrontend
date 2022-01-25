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


export function CoinInfo(props) {
  const [holding, setHolding] = useState(0);
  const [price, setPrice] = useState(0);
  const [priceVariation, setPriceVariation] = useState(0);
  const [name, setName] = useState("Loading..")
  
  const coingeckoId = CoingeckoTokens.default[props.symbol.toLowerCase()];

  const getCoingeckoStats = async ()=>{
    console.log("vediamo ", props.symbol.toLowerCase())
    let data = await CoinGeckoClient.coins.fetch(coingeckoId, {});
    setPrice(data.data.market_data?.current_price.usd || 0);
    setPriceVariation(data.data.market_data?.price_change_percentage_24h || 0);
    setName(data.data.name)
  }

  useEffect(() => {
    getCoingeckoStats();
  }, [])

  return(
    <Card className="wallet-overview-card" style={{marginBottom: 20}}>
      <Card.Body>
        <Row>

          <Col md={2} xs={4} className="pt-2">
              {
                CryptoIcons.default['_'+props.symbol.toLowerCase()] === undefined ?
                <img className="img-fluid" src={CryptoIcons.default['_generic']} style={{width: 60, height: 60, marginLeft: 15}} />
                : <img className="img-fluid" src={CryptoIcons.default['_'+props.symbol.toLowerCase()]} style={{width: 60, height: 60, marginLeft: 15}} />
              }
          </Col>
            
          <Col md={4} className="pt-3">
            <span className="d-block text-decoration-none text-uppercase" style={{color: "#8DA0B0", fontSize: 11}}>holdings</span>
            <span className="d-block text-decoration-none text-dark" style={{fontSize: 24, fontWeight: 900}}>$ {props.holdingValue.toFixed(2)}</span>
          </Col>

          <Col className="pt-4" md={3}>
            <span className="d-block text-uppercase" style={{color: "#8DA0B0", fontSize: 11}}>0 {props.symbol}<br></br>0 {props.symbol}</span>
          </Col>
             

          <Col md={3} className="pt-3">
            <Button><a style={{fontSize: 12, color: "#FBFFFF"}}>TRADE NOW</a></Button>
          </Col>
             

        </Row>

        <Row className="justify-content-end">

        <Col md={2}><p className="font-weight-bold text-center pt-2 mb-0"> {props.symbol.toUpperCase()} </p></Col>
      
        <Col md={4}>
          <span className="text-decoration-none" style={{color: "#8DA0B0", fontSize: 11}}>CURRENT PRICE</span>
            <h5 className="mb-0 pt-0" style={{fontSize: 24, fontWeight: 900}}>$ {price}</h5> 
            <span style={{color: "#8DA0B0", fontSize: 11}}>0 {props.symbol} | 0 {props.symbol}</span>
        </Col>
        
        <Col md={3} className="border-left border-1">
          <span style={{color: "#8DA0B0", fontSize: 11}}>24H VARIATION</span>
          <PriceVariation priceVariation={Number(priceVariation.toFixed(2))} />
        </Col>
        
        <Col md={3}>
        </Col>
          
        </Row>


      </Card.Body>
    </Card>
  )
}

CoinInfo.propTypes = {
  holdingValue: PropTypes.number,
  symbol: PropTypes.string,
};
