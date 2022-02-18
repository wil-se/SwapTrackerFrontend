import React, { useState,useEffect } from 'react'
import PropTypes from 'prop-types';
import { Card, Row, Col } from 'react-bootstrap';
import wallet from 'assets/icons/wallet.svg'
import profit from 'assets/icons/profit.svg'
import door from 'assets/icons/door.svg'
import Skeleton from 'react-loading-skeleton';
import {formatNumber } from 'utils/formatBalance';


const DashBoardHeader = ({currentBalance,profitOrLoss,openTradeValue,fiatSymbol,fiatValue}) => {
    const [plPerc,setPlPerc] = useState()
    const [classNames,setClassNames] = useState("header-card-value text-nowrap")
    
    useEffect(()=>{

        let profitOrLossFixed = (profitOrLoss*fiatValue).toFixed(3);
        Math.sign(profitOrLoss) === -1 
        ? 
            (
                setPlPerc(`${profitOrLossFixed.toString().substring(0,1)} ${fiatSymbol} ${profitOrLossFixed.toString().substring(1,profitOrLossFixed.toString().length)}`), 
                setClassNames(`${classNames} text-danger`))
        : 
            (
                setPlPerc(`+ ${fiatSymbol} ${profitOrLossFixed.toString()}`),
                setClassNames(`${classNames} text-success`)
            )
    },[
        profitOrLoss,
        currentBalance,
        openTradeValue
    ])

    return (
        <Row className="py-3">
           <Col md={12} lg={4} className="mb-2 mb-lg-0">
                <Card className="header-card d-flex justify-content-between">
                    <div className="header-card-container">
                        <Col className="header-card-info" md={8}>
                            <h3 className="header-card-title mb-0 text-nowrap">CURRENT BALANCE</h3>
                            {!currentBalance || currentBalance < 0 || isNaN(currentBalance) ?
                            <Skeleton width="82px" height="32px" />
                            :
                            <span className="header-card-value text-nowrap">{fiatSymbol} {Number(currentBalance*fiatValue).toFixed(2)}</span>
                            }
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
                            <h3 className="header-card-title mb-0">PROFIT (24H P/L)</h3>
                            {!plPerc || String(plPerc).includes('0.000') ?
                                <Skeleton width="82px" height="32px" />
                                :
                                <span className={classNames}>{plPerc}</span>
                                
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
                            {!openTradeValue ?
                                <Skeleton width="82px" height="32px" />
                                :
                                <span className="header-card-value text-nowrap">{fiatSymbol} {formatNumber(openTradeValue*fiatValue,2,3)}</span>
                            }
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
    profitOrLoss: PropTypes.number,
    fiatSymbol:PropTypes.string,
    fiatValue:PropTypes.number
};

export default DashBoardHeader
