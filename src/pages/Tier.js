import React, { useState,useEffect } from 'react'
import MainContainer from 'components/MainContainer'
import { Card, Row, Col } from 'react-bootstrap';
import Stack0 from '../assets/icons/stack0.png';
import Stack1 from '../assets/icons/stack1.png';
import Stack2 from '../assets/icons/stack2.png';
import {useSwapTrackerMediator} from 'hooks/useContract'
import { useWeb3React } from '@web3-react/core';

const Wallet = () => {
  const { account } = useWeb3React();
    const swapTrackerMediator = useSwapTrackerMediator()
    const [isStarted,setIsStarted] = useState(false)
    const [isAdvanced,setIsAdvanced] = useState(false)
    const [isPro,setIsPro] = useState(false)
    
    useEffect(()=>{
      (async ()=>{
        let tid = await swapTrackerMediator.methods.getTierFee(account).call().catch((e)=>console.log(e))
        tid = Number(tid)
        !tid || tid === 1000 ?
        null
        : tid === 10 ?
        setIsStarted(true)
        : tid === 5 ?
        setIsAdvanced(true)
        :
        setIsPro(true)
      })()
    },[])

    return (
        <MainContainer>
        <>
          <h1 className="subheader-title">Tiers</h1>
          <p style={{color: "#8DA0B0", fontWeight: 800}}>Unlock one of the tiers to start using SwapTracker</p>
          <Row style={{paddingLeft: 100, paddingRight: 100, paddingTop: 50}}>
            <Col md={4}>
              <Card className={`text-center card-no-border ${isStarted ? "tier-card-active" : ""}`} style={{padding: 25}}>
                <div style={{marginLeft: 70, marginRight: 70}}>
                  <h4 className="font-weight-bold">STARTER</h4>
                  <Row style={{marginTop: 30}}><Col><img src={Stack0} /></Col></Row>
                  <Row style={{marginTop: -14, visibility: 'hidden'}}><Col><img src={Stack1} /></Col></Row>
                  <Row style={{marginBottom: 10, marginTop: -14, visibility: 'hidden'}}><Col><img src={Stack2} /></Col></Row>
                  <p className="font-weight-bold">Must hold 1.000.000 SWPT in your connected wallet</p>
                </div>
                <hr/>
                <div style={{marginLeft: 90, marginRight: 90, marginTop: 30}}>
                  <p className="font-weight-bold">All features available 1% transaction fee</p>
                </div>
              </Card>
            </Col>
            <Col md={4}>
              <Card className={`text-center card-no-border ${isAdvanced ? "tier-card-active" : ""}`} style={{padding: 25}}>
                <div style={{marginLeft: 70, marginRight: 70}}>
                  <h4 className="font-weight-bold">ADVANCED</h4>
                  <Row style={{marginTop: 30}}><Col><img src={Stack0} /></Col></Row>
                  <Row style={{marginTop: -14}}><Col><img src={Stack1} /></Col></Row>
                  <Row style={{marginBottom: 10, marginTop: -14, visibility: 'hidden'}}><Col><img src={Stack2} /></Col></Row>
                  <p className="font-weight-bold">Must hold 5.000.000 SWPT in your connected wallet</p>
                </div>
                <hr/>
                <div style={{marginLeft: 90, marginRight: 90, marginTop: 30}}>
                  <p className="font-weight-bold">All features available 0.5% transaction fee</p>
                </div>
              </Card>
            </Col>
            <Col md={4}>
              <Card className={`text-center card-no-border ${isPro ? "tier-card-active" : ""}`} style={{padding: 25}}>
              <div style={{marginLeft: 65, marginRight: 65}}>
                  <h4 className="font-weight-bold">PRO</h4>
                  <Row style={{marginTop: 30}}><Col><img src={Stack0} /></Col></Row>
                  <Row style={{marginTop: -14}}><Col><img src={Stack1} /></Col></Row>
                  <Row style={{marginBottom: 10, marginTop: -14}}><Col><img src={Stack2} /></Col></Row>
                  <p className="font-weight-bold">Must hold 10.000.000 SWPT in your connected wallet</p>
                </div>
                <hr/>
                <div style={{marginLeft: 90, marginRight: 90, marginTop: 30}}>
                  <p className="font-weight-bold">All features available 0% transaction fee</p>
                </div>
              </Card>
            </Col>
          </Row>
          </>
        </MainContainer>
    )
}

export default Wallet
