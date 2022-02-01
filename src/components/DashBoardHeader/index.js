import React, { useState,useEffect } from 'react'
import PropTypes from 'prop-types';
import { Card, Row, Col } from 'react-bootstrap';
import wallet from 'assets/icons/wallet.svg'
import profit from 'assets/icons/profit.svg'
import door from 'assets/icons/door.svg'


const DashBoardHeader = ({currentBalance,profitOrLoss,openTradeValue}) => {
    const [plPercNegative,setPlPercNegative] = useState()
    const [plPercPositive,setPlPercPositive] = useState()
    
    useEffect(()=>{
        let profitOrLossFixed = profitOrLoss.toFixed(3)
      Math.sign(profitOrLoss) === -1 
      ? 
      setPlPercNegative(`${profitOrLossFixed.toString().substring(0,1)} € ${profitOrLossFixed.toString().substring(1,profitOrLossFixed.toString().length)}`) 
      : 
      setPlPercPositive(`+ € ${profitOrLossFixed.toString()}`)
    
    },[profitOrLoss,currentBalance,openTradeValue])

    return (
        <Row className="py-3">
           <Col md={12} lg={4} className="mb-2 mb-lg-0">
                <Card className="header-card d-flex justify-content-between">
                    <div className="header-card-container">
                        <Col className="header-card-info" md={8}>
                            <h3 className="header-card-title mb-0">CURRENT BALANCE</h3>
                            <span className="header-card-value text-nowrap">€ {currentBalance.toFixed(2)}</span>
                        </Col>
                        <Col md={4}>
                            <div className="header-icon-circle">
                                <img  src={wallet}/>
                            </div>
                        </Col>
                    </div>
                </Card>
           </Col> 
           <Col md={12} lg={4} className="mb-2 mb-lg-0">
                <Card className="header-card">
                <div className="header-card-container">
                        <Col className="header-card-info" md={8}> 
                            <h3 className="header-card-title">PROFIT (24H P/L)</h3>
                            {!plPercNegative ? 
                                <span className="header-card-value mb-0 text-success text-nowrap">{plPercPositive}</span>
                                :
                                <span className="header-card-value text-danger text-nowrap">{plPercNegative}</span>
                            }
                        </Col>
                        <Col md={4}>
                            <div className="header-icon-circle">
                                <img  src={profit}/>
                            </div>
                        </Col>
                    </div>
                </Card>
           </Col> 
           <Col md={12} lg={4} className="mb-2 mb-lg-0">
                <Card className="header-card">
                    <div className="header-card-container">
                        <Col className="header-card-info" md={8}>
                            <h3 className="header-card-title mb-0 text-nowrap">OPEN TRADES VALUE</h3>
                            <span className="header-card-value text-nowrap">€ {openTradeValue}</span>
                        </Col>
                        <Col md={4}>
                            <div className="header-icon-circle">
                                <img  src={door}/>
                            </div>
                        </Col>
                    </div>
                </Card>
           </Col> 
        </Row>
    )
}

DashBoardHeader.propTypes = {
    openTradeValue: PropTypes.string,
    currentBalance: PropTypes.number,
    profitOrLoss: PropTypes.number
};

export default DashBoardHeader
