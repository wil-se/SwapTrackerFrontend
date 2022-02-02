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
import { CoinInfo } from 'components/CoinInfo';



export function CoinInfoList(){
  const { chainId, web3 } = useWeb3()
  const { user } = useAuthService()
  const { account } = useWeb3React();
  
  const [walletDistributions,setWalletDistributions] = useState({})
  const [walletTVL,setWalletTVL] = useState(0)
  const [coinList, setCoinList] = useState([])


  const wlltDist = async ()=>{
    let wlltDist = await walletDistribution(user,walletTVL,web3,chainId);
    setWalletDistributions(wlltDist);

    let wlltDistList = []

    const dst = Object.entries(wlltDist).sort(function(first, second){return second[1][0] - first[1][0]});

    for (let i=0; i<dst.length; i++) {
      wlltDistList.push(
        <Col key={i} xs={12} md={6} className="px-3">
          <CoinInfo key={i} tvl={walletTVL} holdingValue={dst[i][1][1]} symbol={dst[i][1][3]} />
        </Col>
      )
    }

    setCoinList(wlltDistList);

  }


  const getWlltTVL = async ()=>{let wlltTVL = await getWalletTVL(user,web3,chainId); setWalletTVL(wlltTVL)}


  useEffect(() => {
    if(user && chainId){
        getWlltTVL()
        if(walletTVL){
            wlltDist()
        }
    }

  }, [user,walletTVL])
  
  return (
    <Row className="justify-content-between">
      {coinList}
    </Row>
  )
}