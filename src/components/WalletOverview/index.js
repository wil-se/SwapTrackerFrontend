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
  
  const [walletTVL,setWalletTVL] = useState(0)
  const [chartData, setChartData] = useState({
      labels: [],
      datasets: [
        {
          label: '# of Votes',
          data: [],
        },
      ],
  })

  const getWlltTVL = async ()=>{console.log(user); let wlltTVL = await getWalletTVL(user,web3,chainId); setWalletTVL(wlltTVL)}
    
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
    <Card style={{width: "100%", marginBottom: 20, padding: 15}} className="wallet-overview-card">
      <Card.Body>
          <Row>
                <Col style={{borderRight: "1px solid #ABC2D6", paddingRight: 50}} xs={4}>
                  <Row className="addressSection align-items-center" style={{marginLeft: 0, marginBottom: 30, paddingTop: 30, borderBottom: "1px solid #ABC2D6", paddingBottom: 20}}>
                      <Col style={{paddingRight: 0}} xs={3}>
                      <img src={addressAvatarBig} className="avatar"/>
                      </Col>
                      <Col style={{paddingLeft: 0}}>
                      <div style={{marginLeft: 20, fontSize: 24, fontWeight: 900}}>
                          {getShrunkWalletAddress(address)}
                      </div>
                      <div style={{marginLeft: 20, fontSize: 11, fontWeight: 100, color: "#8DA0B0"}}>
                          {getShrunkWalletAddress(address)}
                      </div>
                      </Col>
                  </Row>
                  <div style={{paddingLeft: 40}}>
                  <Row style={{marginTop: 30}}>
                      <h6 style={{fontStyle: "normal", fontWeight: 800, fontSize: 14, color: "#8DA0B0"}}>CURRENT BALANCE</h6>
                  </Row>

                  <Row>
                      <h1 style={{fontSize: 48, fontWeight: 900}}> $ {walletTVL.toFixed(2)} </h1>
                  </Row>
                  <Row>
                      <h6 style={{fontSize: 12, color: "#8DA0B0", fontWeight: 800}}>234,567.43 BNB</h6>
                  </Row>
                  </div>
              </Col>
              <Col xs={3}>
                  <Doughnut data={chartData} />
              </Col>
              <Col className="d-flex align-items-center justify-content-center">
                  <div style={{width: "100%"}}>
                      <Row> 
                          <Col style={{margin: 10}}>
                              <WalletOverviewCoinInfo coin={coin0} />
                          </Col>
                          <Col style={{margin: 10}}>
                          <WalletOverviewCoinInfo coin={coin1} />
                          </Col>
                      </Row>
                      <Row>
                          <Col style={{margin: 10}}>
                          <WalletOverviewCoinInfo coin={coin2} />
                          </Col>
                          <Col style={{margin: 10}}>
                          <WalletOverviewCoinInfo coin={coin3} />
                          </Col>
                      </Row>
                      <Row>
                          <Col style={{margin: 10}}>
                          <WalletOverviewCoinInfo coin={coin4} />
                          </Col>
                          <Col style={{margin: 10, border: "1px solid #ACD8E6", borderRadius: 10}}>
                                {
                                  coin4.symbol === "" ?
                                  "" :
                                  <WalletOverviewOtherInfo otherPerc={other} />
                                }
                          </Col>
                      </Row>
                  </div>
              </Col>
          </Row>
      </Card.Body>
    </Card>
    </Row>
  )  
}