import React, { useState,useEffect } from 'react'
import { Card, Row, Col } from 'react-bootstrap';
import addressAvatarBig from '../../assets/icons/addressAvatarBig.png';
import { Doughnut } from 'react-chartjs-2';
import * as CryptoIcons from '../../assets/icons';
import {walletDistribution,getWalletTVL} from 'utils/walletHelpers'
import useWeb3 from 'hooks/useWeb3';
import useAuthService from 'hooks/useAuthService'
import { Chart as ChartJS, Legend,Tooltip } from 'chart.js';
import { useWeb3React } from '@web3-react/core';
import '../../style/WalletOverview.scss'
import { WalletOverviewCoinInfo } from 'components/WalletOverviewCoinInfo';
import * as CoingeckoTokens from '../../config/constants/coingeckoTokens';
import { WalletOverviewOtherInfo } from 'components/WalletOverviewOtherInfo'; 
import { useGetFiatName, useGetFiatValues, useGetFiatSymbol } from 'store/hooks';
import BigNumber from 'bignumber.js';
import Skeleton from 'react-loading-skeleton';
import { useGetFiatDecimals } from 'store/hooks';



const CoinGecko = require('coingecko-api');
const CoinGeckoClient = new CoinGecko();


export function WalletOverview(){
  ChartJS.register(    
    Tooltip,
    Legend
  )
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

  const [price, setPrice] = useState(0);
  
  const [chartData, setChartData] = useState({})
  const [options,] = useState(
    {
      cutout: 70,
      //percentageInnerCutout: 10,
      plugins:{
        legend: {
          display: false
        },
        tooltip: {
          enabled: true,
          
          backgroundColor:"white",
          borderColor:"black",
          borderWidth:1,
          bodyColor:"black",
          titleColor:"black",
          titleFont:{family:"Avenir Next",weight:'bold'},
          bodyFont:{family:"Avenir Next",weight:'bold'},
          cornerRadius:10,
        },
      },
      responsive: true,
      maintainAspectRatio: true,
  })

  const getWlltTVL = async ()=>{
    let wlltTVL = await getWalletTVL(user,web3,chainId);
    let data = await CoinGeckoClient.coins.fetch('binancecoin', {});
    let bnbPrice = data.data.market_data.current_price.usd;
    let bnbAmount = wlltTVL / bnbPrice;
    return [wlltTVL, bnbAmount];   

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

        let coingeckoId, data;

        try{
          coingeckoId = CoingeckoTokens.default[value[3].toLowerCase()];
          data = await CoinGeckoClient.coins.fetch(coingeckoId, {}).catch(console.log);
        }catch(err){
          console.log(err);
        }
         

        if(count === 0) {setCoin0({symbol: value[3].toUpperCase(), perc: value[0].toFixed(3), name: data.data.name ?? value[3]}); other = other-Number(value[0])}
        if(count === 1) {setCoin1({symbol: value[3].toUpperCase(), perc: value[0].toFixed(3), name: data.data.name ?? value[3]}); other = other-Number(value[0])}
        if(count === 2) {setCoin2({symbol: value[3].toUpperCase(), perc: value[0].toFixed(3), name: data.data.name ?? value[3]}); other = other-Number(value[0])}
        if(count === 3) {setCoin3({symbol: value[3].toUpperCase(), perc: value[0].toFixed(3), name: data.data.name ?? value[3]}); other = other-Number(value[0])}
        if(count === 4) {setCoin4({symbol: value[3].toUpperCase(), perc: value[0].toFixed(3), name: data.data.name ?? value[3]}); other = other-Number(value[0])}
        count++;
    }

    setOther(other.toFixed(3));

    setChartData({
        labels: cLabels,
        datasets: [
          {
            animation: false,
            label: '#',
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


  const currentName = useGetFiatName();
  //console.log("CURRENT FIAT NAME ", currentName);

  const currentValues = useGetFiatValues();
  //console.log("Values: ", currentValues);

  const currentSymbol = useGetFiatSymbol();
  //console.log("Symbol: ", currentSymbol);

  const currentDecimals = useGetFiatDecimals();

  useEffect(() => {

    if(user && chainId){
      setAddress(user.address);
      getWlltTVL().then( ([tvl, tvlAsBNB]) => {
        setWalletTVL(tvl);
        setWalletTVLBNB(tvlAsBNB);
      });
      
      wlltDist()
    }

    console.log("FIAT Price length: %s", currentValues.length);

    if(!currentValues){
      setPrice(1);
    }

    for(let i=0; i<currentValues.length; i++){
      if(currentValues[i]['currency'] == currentName){
        setPrice(Number(currentValues[i]['rate']));
      }
    }
  }, [user,walletTVL, currentValues, currentName])

  
  return(
    <Row className="mb-2">
      <Col md={12}>
        <Card className="wallet-overview-card w-100 mb-2 pl-2 pr-2 pt-0 pb-0">
          <Card.Body className="pr-4 pl-4 pb-8">
              <Row className="justify-content-start">
                  <Col xs={12} md={3} style={{borderColor: "#ABC2D6"}} className="border-right border-md-1 border-0 pr-4" >
                      <div>
                      <Row className="addressSection align-items-center ml-0 mb-3 pt-3 pb-3 border-bottom border-1 pt-4" style={{borderColor: "#ABC2D6"}}>
                          <Col xs={12} md={4} className="pr-0" >
                            <img src={addressAvatarBig} className="avatar"/>
                          </Col>
                          <Col xs={12} md={8} className="pr-0" >
                          <div style={{fontSize: 24, fontWeight: 900,}}>
                              {getShrunkWalletAddress(address)}
                          </div>
                          <div style={{fontSize: 11, fontWeight: 100, color: "#8DA0B0"}}>
                              {getShrunkWalletAddress(address)}
                          </div>
                          </Col>
                      </Row>
                      <Row className="pl-4 mt-3">
                          <h6 style={{fontStyle: "normal", fontWeight: 800, fontSize: 14, color: "#8DA0B0"}}>CURRENT BALANCE</h6>
                      </Row>
                      <Row className="pl-4">
                          <h1 style={{fontSize: 48, fontWeight: 900}}> {currentSymbol} {(walletTVL*(price > 0 ? price : 1)).toFixed(currentDecimals)} </h1>
                      </Row>
                      <Row className="pl-4">
                          <h6 style={{fontSize: 12, color: "#8DA0B0", fontWeight: 800}}>{walletTVLBNB.toFixed(4)} BNB</h6>
                      </Row>
                      </div>
                  </Col>

                  <Col xs={12} md={4} lg={3} className="d-flex align-items-center justify-content-center">
                  {
                    Object.keys(chartData).length === 0 ?
                    <Skeleton width="160px" height="160px" style={{borderRadius:90}}/> :
                    <Doughnut options={options} data={chartData}/>
                  }
                      
                  </Col>

                  <Col xs={12} md={5} className="d-flex flex-column align-items-center justify-content-center">
                    <div>
                      <Row>
                        <Col className="m-2">
                          {
                            coin0.symbol !== "" ?
                          <WalletOverviewCoinInfo coin={coin0} /> :
                            ""
                          }
                          
                        </Col>
                        <Col className="m-2">
                          {
                            coin1.symbol !== "" ?
                          <WalletOverviewCoinInfo coin={coin1} /> :
                          ""
                          }
                        </Col>
                      </Row>
                      <Row>
                          <Col className="m-2">
                            {
                              coin2.symbol !== "" ?
                            <WalletOverviewCoinInfo coin={coin2} /> :
                            ""
                            }
                          </Col>
                          <Col className="m-2">
                            {
                              coin3.symbol !== "" ?
                            <WalletOverviewCoinInfo coin={coin3} /> :
                            ""
                            }
                          </Col>
                      </Row>
                      <Row>
                          <Col className="m-2">
                            {
                              coin4.symbol !== "" ?
                            <WalletOverviewCoinInfo coin={coin4} /> :
                            ""
                            }
                          </Col>
                            {
                              Number(other) === 0 ?
                              "" :
                          <Col className="m-2" style={{border: "1px solid #ACD8E6", borderRadius: 10}}>
                              <WalletOverviewOtherInfo otherPerc={other} />
                          </Col>
                            }
                      </Row>
                    </div>
                  </Col>
            </Row>
          </Card.Body>
        </Card>
      </Col>
      
    </Row>
  )  
}