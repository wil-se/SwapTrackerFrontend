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
  
  const wlltDist = async ()=>{
    let wlltDist = await walletDistribution(user,walletTVL,web3,chainId);
    setWalletDistributions(wlltDist);
    console.log(wlltDist);
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
      <Row>
      <Col xs={6} style={{paddingLeft: 0, paddingRight: 8}}>
          <CoinInfo holdingValue={1000} symbol={"ADA"} />
      </Col>
      <Col xs={6} style={{paddingRight: 0, paddingLeft: 8}}>
          <Card style={{width: "100%"}}>
              <Card.Body>
              aaaaaaaaaaaa
              </Card.Body>
          </Card>
      </Col>
  </Row>

  )
}