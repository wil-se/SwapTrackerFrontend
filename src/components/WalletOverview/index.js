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
import '../../style/WalletOverview.scss'
import { WalletOverviewCoinInfo } from 'components/WalletOverviewCoinInfo';
import * as CoingeckoTokens from '../../config/constants/coingeckoTokens';
import { WalletOverviewOtherInfo } from 'components/WalletOverviewOtherInfo'; 

const CoinGecko = require('coingecko-api');
const CoinGeckoClient = new CoinGecko();


export function WalletOverview(){
  const { chainId, web3 } = useWeb3()
  const { user } = useAuthService()
  const { account } = useWeb3React();
  const [address, setAddress] = useState("0x")

  const getShrunkWalletAddress = (addr) => {
    return (addr && `${addr.substring(0,4)}.....${addr.substring(addr.length-11)}`)
  }

  const [coin0, setCoin0] = useState({symbol: "", name: "", perc: ""})
  const [coin1, setCoin1] = useState({symbol: "", name: "", perc: ""})
  const [coin2, setCoin2] = useState({symbol: "", name: "", perc: ""})
  const [coin3, setCoin3] = useState({symbol: "", name: "", perc: ""})
  const [coin4, setCoin4] = useState({symbol: "", name: "", perc: ""})
  const [other, setOther] = useState(0)
  
  const [walletTVL,setWalletTVL] = useState(0);
  const [walletTVLBNB,setWalletTVLBNB] = useState(0);
  
  const [chartData, setChartData] = useState({
      labels: [],
      datasets: [
        {
          label: '# of Votes',
          data: [],
        },
      ],
  })


  const getWlltTVL = async ()=>{
    console.log(user);
    let wlltTVL = await getWalletTVL(user,web3,chainId);
    setWalletTVL(wlltTVL);
    
    let data = await CoinGeckoClient.coins.fetch('binancecoin', {});
    let bnbAmount = wlltTVL / data.data.market_data.current_price.usd;
    console.log(bnbAmount);
    setWalletTVLBNB(bnbAmount);
  }
    
  const wlltDist = async ()=>{
    let wlltDist = await walletDistribution(user,walletTVL,web3,chainId);
    const cLabels = [];
    const cData = [];
    let count = 0;
    let other = 100;
    
    for (const [key, value] of Object.entries(wlltDist).sort(function(first, second){return second[1][0] - first[1][0];})) {
        cLabels.push(value[3].toUpperCase());
        cData.push(value[0]);
        let coingeckoId = CoingeckoTokens.default[value[3].toLowerCase()];
        let data = await CoinGeckoClient.coins.fetch(coingeckoId, {});

        if(count === 0) {setCoin0({symbol: value[3].toUpperCase(), perc: value[0].toFixed(2), name: data.data.name}); other = other-Number(value[0])}
        if(count === 1) {setCoin1({symbol: value[3].toUpperCase(), perc: value[0].toFixed(2), name: data.data.name}); other = other-Number(value[0])}
        if(count === 2) {setCoin2({symbol: value[3].toUpperCase(), perc: value[0].toFixed(2), name: data.data.name}); other = other-Number(value[0])}
        if(count === 3) {setCoin3({symbol: value[3].toUpperCase(), perc: value[0].toFixed(2), name: data.data.name}); other = other-Number(value[0])}
        if(count === 4) {setCoin4({symbol: value[3].toUpperCase(), perc: value[0].toFixed(2), name: data.data.name}); other = other-Number(value[0])}
        count++;
    }

    setOther(other.toFixed(2));

    setChartData({
        labels: cLabels,
        datasets: [
          {
            animation: false,
            label: '# of Votes',
            data: cData,
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 1,
            offset: 20,
            radius: 100,
            cutout: 90,
          },
        ],
    })  
  }

  useEffect(() => {
    if(user && chainId){
      getWlltTVL()
      wlltDist()
      setAddress(user.address);
    }
  }, [user,walletTVL])

  
  return(
    <Row>
      <Col md={12}>
        <Card className="wallet-overview-card w-100 mb-2 p-2">
          <Card.Body>
              <Row className="justify-content-between">
                  <Col style={{borderColor: "#ABC2D6"}} className="border-right border-md-1 border-0 pr-4" xs={12} md={4}>
                      <Row className="addressSection align-items-center ml-0 mb-3 pt-3 pb-2 border-bottom border-1" style={{borderColor: "#ABC2D6"}}>
                          <Col className="pr-0" xs={3}>
                            <img src={addressAvatarBig} className="avatar"/>
                          </Col>
                          <Col className="pr-0">
                          <div className="ml-2" style={{fontSize: 24, fontWeight: 900}}>
                              {getShrunkWalletAddress(address)}
                          </div>
                          <div className="ml-2" style={{fontSize: 11, fontWeight: 100, color: "#8DA0B0"}}>
                              {getShrunkWalletAddress(address)}
                          </div>
                          </Col>
                      </Row>
                      <Row className="pl-4 mt-3">
                          <h6 style={{fontStyle: "normal", fontWeight: 800, fontSize: 14, color: "#8DA0B0"}}>CURRENT BALANCE</h6>
                      </Row>
                      <Row className="pl-4">
                          <h1 style={{fontSize: 48, fontWeight: 900}}> $ {walletTVL.toFixed(2)} </h1>
                      </Row>
                      <Row className="pl-4">
                          <h6 style={{fontSize: 12, color: "#8DA0B0", fontWeight: 800}}>{walletTVLBNB.toFixed(4)} BNB</h6>
                      </Row>
                  </Col>
                  <Col xs={12} md={3} className="d-flex">
                      <Doughnut options={{
                        responsive: true,
                        maintainAspectRatio: true,
                      }} data={chartData} />
                  </Col>
                  <Col xs={10} md={5} className="flex-column align-items-center justify-content-center">
                      <Row>
                        <Col className="m-1">
                          <WalletOverviewCoinInfo coin={coin0} />
                        </Col>
                        <Col className="m-1">
                          <WalletOverviewCoinInfo coin={coin1} />
                        </Col>
                      </Row>
                      <Row>
                          <Col className="m-1">
                            <WalletOverviewCoinInfo coin={coin2} />
                          </Col>
                          <Col className="m-1">
                            <WalletOverviewCoinInfo coin={coin3} />
                          </Col>
                      </Row>
                      <Row>
                          <Col className="m-1">
                            <WalletOverviewCoinInfo coin={coin4} />
                          </Col>
                          <Col className="m-1" style={{border: "1px solid #ACD8E6", borderRadius: 10}}>
                            {
                              coin4.symbol === "" ?
                              "" :
                              <WalletOverviewOtherInfo otherPerc={other} />
                            }
                          </Col>
                      </Row>
                  </Col>
              </Row>
          </Card.Body>
        </Card>
      </Col>
      
    </Row>
  )  
}