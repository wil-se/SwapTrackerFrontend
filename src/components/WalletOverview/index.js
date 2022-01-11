
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


export function WalletOverview(){
  const { chainId, web3 } = useWeb3()
  const { user } = useAuthService()
  const { account } = useWeb3React();

  const getShrunkWalletAddress = (addr) => {
    return (addr && `${addr.substring(0,4)}.....${addr.substring(addr.length-11)}`)
  }

  const [coin0, setCoin0] = useState({symbol: "", perc: ""})
  const [coin1, setCoin1] = useState({symbol: "", perc: ""})
  const [coin2, setCoin2] = useState({symbol: "", perc: ""})
  const [coin3, setCoin3] = useState({symbol: "", perc: ""})
  const [coin4, setCoin4] = useState({symbol: "", perc: ""})
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

  const getWlltTVL = async ()=>{let wlltTVL = await getWalletTVL(user,web3,chainId); setWalletTVL(wlltTVL)}
    
  const wlltDist = async ()=>{
    let wlltDist = await walletDistribution(user,walletTVL,web3,chainId);
    const cLabels = [];
    const cData = [];
    let count = 0;
    for (const [key, value] of Object.entries(wlltDist).sort(function(first, second){return second[1][0] - first[1][0];})) {
        cLabels.push(value[3].toUpperCase());
        cData.push(value[0]);
        if(count === 0) {setCoin0({symbol: value[3].toUpperCase(), perc: value[0].toFixed(2)})}
        if(count === 1) {setCoin1({symbol: value[3].toUpperCase(), perc: value[0].toFixed(2)})}
        if(count === 2) {setCoin2({symbol: value[3].toUpperCase(), perc: value[0].toFixed(2)})}
        if(count === 3) {setCoin3({symbol: value[3].toUpperCase(), perc: value[0].toFixed(2)})}
        if(count === 4) {setCoin4({symbol: value[3].toUpperCase(), perc: value[0].toFixed(2)})}
        count++;
    }

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
            borderWidth: 0,
            offset: 20,
            radius: 80,
          },
        ],
    })  
  }

  useEffect(() => {
    if(user && chainId){
        getWlltTVL()
        if(walletTVL){
            wlltDist()
        }
    }
  }, [user,walletTVL])

  
  return(
    <Row>
    <Card style={{width: "100%", marginBottom: 20}}>
      <Card.Body>    
          <Row>
              <Col className="border-right">
                  <Row className="addressSection align-items-center" style={{marginLeft: 5}}>
                      <img src={addressAvatarBig} className="avatar"/>
                      <div className="address font-weight-bold" style={{marginLeft: 20, fontSize: 20}}>
                          {getShrunkWalletAddress(account)}
                      </div>
                  </Row>
                  <hr/>
                  <Row style={{marginLeft: 5}} className="secondary">
                      CURRENT BALANCE
                  </Row>

                  <Row style={{marginLeft: 5}}>
                      <h1 className="font-weight-bold"> $ {walletTVL.toFixed(2)} </h1>
                  </Row>
                  <Row style={{marginLeft: 5}}>
                      234,567.43 BNB
                  </Row>
              </Col>
              <Col xs={3}>
                  <Doughnut data={chartData} />
              </Col>
              <Col className="d-flex align-items-center justify-content-center">
                  <div style={{width: "100%"}}>
                      <Row> 
                          <Col style={{margin: 10}}>
                              {
                                  coin0.symbol === "" ? ""
                                  : CryptoIcons.default['_'+coin0.symbol.toLowerCase()] === undefined ?
                                  <div><img src={CryptoIcons.default['_generic']} style={{width: 40, height: 40, marginRight: 10}} /> {coin0.symbol} {coin0.perc}%</div>
                                  : <div><img src={CryptoIcons.default['_'+coin0.symbol.toLowerCase()]} style={{width: 40, height: 40, marginRight: 10}} /> {coin0.symbol} {coin0.perc}%</div>
                              }
                          </Col>
                          <Col style={{margin: 10}}>
                              {
                                  coin1.symbol === "" ? ""
                                  : CryptoIcons.default['_'+coin1.symbol.toLowerCase()] === undefined ?
                                  <div><img src={CryptoIcons.default['_generic']} style={{width: 40, height: 40, marginRight: 10}} /> {coin1.symbol} {coin1.perc}%</div>
                                  : <div><img src={CryptoIcons.default['_'+coin1.symbol.toLowerCase()]} style={{width: 40, height: 40, marginRight: 10}} /> {coin1.symbol} {coin1.perc}%</div>
                              }
                          </Col>
                      </Row>
                      <Row>
                          <Col style={{margin: 10}}>
                              {
                                  coin2.symbol === "" ? ""
                                  : CryptoIcons.default['_'+coin2.symbol.toLowerCase()] === undefined ?
                                  <div><img src={CryptoIcons.default['_generic']} style={{width: 40, height: 40, marginRight: 10}} /> {coin2.symbol} {coin2.perc}%</div>
                                  : <div><img src={CryptoIcons.default['_'+coin2.symbol.toLowerCase()]} style={{width: 40, height: 40, marginRight: 10}} /> {coin2.symbol} {coin2.perc}%</div>
                              }
                          </Col>
                          <Col style={{margin: 10}}>
                              {
                                  coin3.symbol === "" ? ""
                                  : CryptoIcons.default['_'+coin3.symbol.toLowerCase()] === undefined ?
                                  <div><img src={CryptoIcons.default['_generic']} style={{width: 40, height: 40, marginRight: 10}} /> {coin3.symbol} {coin3.perc}%</div>
                                  : <div><img src={CryptoIcons.default['_'+coin3.symbol.toLowerCase()]} style={{width: 40, height: 40, marginRight: 10}} /> {coin3.symbol} {coin3.perc}%</div>
                              }
                          </Col>
                      </Row>
                      <Row>
                          <Col style={{margin: 10}}>
                              {
                                  coin4.symbol === "" ? ""
                                  : CryptoIcons.default['_'+coin4.symbol.toLowerCase()] === undefined ?
                                  <div><img src={CryptoIcons.default['_generic']} style={{width: 40, height: 40, marginRight: 10}} /> {coin4.symbol} {coin4.perc}%</div>
                                  : <div><img src={CryptoIcons.default['_'+coin4.symbol.toLowerCase()]} style={{width: 40, height: 40, marginRight: 10}} /> {coin4.symbol} {coin4.perc}%</div>
                              }
                          </Col>
                          <Col style={{margin: 10}}>
                              {
                                  coin4.symbol === "" ? "" : "OTHER"
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