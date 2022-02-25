import React, { useState,useEffect } from 'react'
import PropTypes from 'prop-types';
import { Card, Row, Col } from 'react-bootstrap';
import wallet from 'assets/icons/wallet.svg'
import profit from 'assets/icons/profit.svg'
import door from 'assets/icons/door.svg'
import Skeleton from 'react-loading-skeleton';

import { num_locale_format } from 'utils/walletHelpers';


const DashBoardHeader = ({currentBalance,profitOrLoss,openTradeValue,fiatSymbol,fiatValue,currentDecimals}) => {
    const [plPerc,setPlPerc] = useState()
    const [classNames,setClassNames] = useState("header-card-value text-nowrap")
    
    useEffect(()=>{
        let profitOrLossFixed = (profitOrLoss*fiatValue);
        Math.sign(profitOrLoss) === -1 
        ? 
            (
                setPlPerc(`${profitOrLossFixed.toString().substring(0,1)} ${fiatSymbol} ${num_locale_format(profitOrLossFixed.toString().substring(1,profitOrLossFixed.toString().length),currentDecimals,currentDecimals) }`), 
                setClassNames(`${classNames} text-danger`))
        : 
            (
                setPlPerc(`+ ${fiatSymbol} ${num_locale_format(profitOrLossFixed.toString(),currentDecimals,currentDecimals) }`),
                setClassNames(`${classNames} text-success`)
            )
    },[
        profitOrLoss,
        currentBalance,
        openTradeValue
    ])

    return (
        <Row className="py-2">
           <Col md={12} lg={4} className="mb-2 mb-lg-0">
                <Card className="header-card d-flex justify-content-between">
                    <div className="header-card-container">
                        <Col className="header-card-info" md={8}>
                            <h3 className="header-card-title mb-0 text-nowrap">CURRENT BALANCE</h3>
                            {!currentBalance || currentBalance < 0 || isNaN(currentBalance) ?
                            <Skeleton width="82px" height="32px" />
                            :
                            <span className="header-card-value text-nowrap">{fiatSymbol} {num_locale_format(Number(currentBalance*fiatValue),currentDecimals,currentDecimals) }</span>
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
                            <h3 className="header-card-title mb-0 text-nowrap">PROFIT (24H P/L)</h3>
                            {!profitOrLoss ?
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
                            {openTradeValue == null ?
                                <Skeleton width="82px" height="32px" />
                                :
                                <span className="header-card-value text-nowrap">{fiatSymbol} {num_locale_format((openTradeValue*fiatValue),currentDecimals,currentDecimals)}</span>
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
    openTradeValue: PropTypes.number,
    currentBalance: PropTypes.number,
    profitOrLoss: PropTypes.number,
    fiatSymbol:PropTypes.string,
    fiatValue: PropTypes.number,
    currentDecimals: PropTypes.number
};

export default DashBoardHeader
