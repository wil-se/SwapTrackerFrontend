import React, { useState,useEffect } from 'react'
import MainContainer from 'components/MainContainer'
import { Card, Row, Col } from 'react-bootstrap';

const Wallet = () => {
    return (
        <MainContainer>
          <h1 className="subheader-title">Tiers</h1>
          <p>Unlock one of the tiers to start using SwapTracker</p>
          <Row>
            <Col>
              <Card className="text-center" style={{padding: 25}}>
                <div style={{marginLeft: 85, marginRight: 85}}>
                  <h4 className="font-weight-bold">STARTER</h4>
                  <p className="font-weight-bold">Must hold 1.000.000 SWPT in your connected wallet</p>
                </div>
                <hr/>
                <div style={{marginLeft: 100, marginRight: 100}}>
                  <p className="font-weight-bold">All features available 1% transaction fee</p>
                </div>
              </Card>
            </Col>
            <Col>
              <Card className="text-center" style={{padding: 25}}>
                <div style={{marginLeft: 85, marginRight: 85}}>
                  <h4 className="font-weight-bold">ADVANCED</h4>
                  <p className="font-weight-bold">Must hold 5.000.000 SWPT in your connected wallet</p>
                </div>
                <hr/>
                <div style={{marginLeft: 100, marginRight: 100}}>
                  <p className="font-weight-bold">All features available 0.5% transaction fee</p>
                </div>
              </Card>
            </Col>
            <Col>
              <Card className="text-center" style={{padding: 25}}>
              <div style={{marginLeft: 85, marginRight: 85}}>
                  <h4 className="font-weight-bold">PRO</h4>
                  <p className="font-weight-bold">Must hold 10.000.000 SWPT in your connected wallet</p>
                </div>
                <hr/>
                <div style={{marginLeft: 100, marginRight: 100}}>
                  <p className="font-weight-bold">All features available 0% transaction fee</p>
                </div>
              </Card>
            </Col>
          </Row>
        </MainContainer>
    )
}

export default Wallet
