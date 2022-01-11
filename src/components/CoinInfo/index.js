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



export function CoinInfo(props) {
  const [holding, setHolding] = useState(0);
  const [price, setPrice] = useState(0);
  const [priceVariation, setPriceVariation] = useState(0);
  
  const coingeckoId = CoingeckoTokens.default[props.symbol.toLowerCase()];

  const getCoingeckoStats = async ()=>{
    let data = await CoinGeckoClient.coins.fetch(coingeckoId, {});
    console.log(data);
    setPrice(data.data.market_data.current_price.usd);
    setPriceVariation(data.data.market_data.price_change_24h);
  }

  useEffect(() => {
    console.log(props.holdingValue);
    console.log(props.symbol);
    console.log(coingeckoId);
    getCoingeckoStats();
  }, [])

  return(
    <Card className="wallet-overview-card">
      <Card.Body>
        <Row>
          <Col xs={2}>
            <Row>
              {
                CryptoIcons.default['_'+props.symbol.toLowerCase()] === undefined ?
                <img src={CryptoIcons.default['_generic']} style={{width: 60, height: 60, marginLeft: 15}} />
                : <img src={CryptoIcons.default['_'+props.symbol.toLowerCase()]} style={{width: 60, height: 60, marginLeft: 15}} />
              }
            </Row>
          </Col>
          <Col className="border-right">
            <Row>
              HOLDINGS
            </Row>
            <Row>
              <h4 className="font-weight-bold">$ {props.holdingValue}</h4>
            </Row>
            <Row>
              CURRENT PRICE
            </Row>
            <Row>
              <h5 className="font-weight-bold">$ {price}</h5>
            </Row>
            <Row>
              116 BNB | 2 BTC
            </Row>
          </Col>
          <Col style={{marginLeft: 10}}>
            <Row>
              24H VARIATION
              <br></br>
              <h4 className="font-weight-bold">{priceVariation.toFixed(2)}%</h4>
            </Row>
          </Col>
          <Col>
            <Row>
                <Button>TRADE NOW</Button>
            </Row>
            <Row>
            </Row>
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
