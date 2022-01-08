import React, { useState,useEffect } from 'react'
import MainContainer from 'components/MainContainer'
import { Button } from 'react-bootstrap';
import useAuthService from 'hooks/useAuthService'
import useWeb3 from 'hooks/useWeb3';
import {walletDistribution,getWalletTVL} from 'utils/walletHelpers'
import { Card, Row, Col } from 'react-bootstrap';
import { useWeb3React } from '@web3-react/core';
import addressAvatarBig from '../assets/icons/addressAvatarBig.png';
import "./WalletStyles.css"
import { WalletChart } from 'components/Wallet/WalletChart';


const Wallet = () => {
    const [walletTVL,setWalletTVL] = useState(0)
    const [walletDistributions,setWalletDistributions] = useState({})
    
    const {chainId,web3} = useWeb3()
    const {user} = useAuthService()
    const wlltDist = async ()=>{let wlltDist =  await walletDistribution(user,walletTVL,web3,chainId); setWalletDistributions(wlltDist)}
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
        <MainContainer>
        <div>
            <Row>

            <Card style={{width: "100%", marginBottom: 20}}>
                <Card.Body>    
                    <Row>
                        <Col>
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
                            <WalletChart></WalletChart>
                        </Col>
                        
                        <Col>
                            <Row> 
                                <Col>A</Col>
                                <Col>B</Col>
                            </Row>
                            <Row>
                                <Col>A</Col>
                                <Col>B</Col>
                            </Row>
                            <Row>
                                <Col>A</Col>
                                <Col>B</Col>
                            </Row>
                        </Col>
                        
                    </Row>
                </Card.Body>
            </Card>
            </Row>

                <Row>
                    <Col xs={6}>
                        <Card style={{width: "100%"}}>
                            <Card.Body>
                            eeeeeeeeeeee
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col xs={6}>
                        <Card style={{width: "100%"}}>
                            <Card.Body>
                            aaaaaaaaaaaa
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>

                </div>
        </MainContainer>
    )
}

export default Wallet
