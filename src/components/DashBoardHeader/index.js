import React, { useState } from 'react'
import PropTypes from 'prop-types';
import { Card, Row, Col } from 'react-bootstrap';
import wallet from 'assets/icons/wallet.svg'
import profit from 'assets/icons/profit.svg'
import door from 'assets/icons/door.svg'


const DashBoardHeader = ({currentBalance,profitOrLoss,openTradeValue}) => {
    const [hasNegativeProfit,setHasNegativeProfit] = useState()

    return (
        <Row className="header-card-row">
           <Col>
                <Card className="header-card">
                    <div className="header-card-container">
                        <Col className="header-card-info">
                            
                            <Row className="header-card-title">CURRENT BALANCE</Row>
                            <Row className="header-card-value">€ {currentBalance.toFixed(2)}</Row>
                        </Col>
                        <Col>
                            <div className="header-icon-circle">
                                <img  src={wallet}/>
                            </div>
                        </Col>
                    </div>
                </Card>
           </Col> 
           <Col>
                <Card className="header-card">
                <div className="header-card-container">
                        <Col className="header-card-info">
                            
                            <Row className="header-card-title">PROFIT (24H P/L)</Row>
                            <Row className="header-card-value" style={{color:"#00CC83"}}>+ € {profitOrLoss.toFixed(2)}</Row>
                        </Col>
                        <Col>
                            <div className="header-icon-circle">
                                <img  src={profit}/>
                            </div>
                        </Col>
                    </div>
                </Card>
           </Col> 
           <Col>
                <Card className="header-card">
                    <div className="header-card-container">
                        <Col className="header-card-info">
                        
                            <Row className="header-card-title">OPEN TRADES VALUE</Row>
                            <Row className="header-card-value">€ {openTradeValue}</Row>
                        </Col>
                        <Col>
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
    openTradeValue: PropTypes.number,
    currentBalance: PropTypes.number,
    profitOrLoss: PropTypes.number
};

export default DashBoardHeader
