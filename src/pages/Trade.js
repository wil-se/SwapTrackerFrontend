import React from 'react'
import {  Row, Col } from 'react-bootstrap';
import MainContainer from 'components/MainContainer';
import TradeCard from 'components/TradeCard';


const Trade = () => {

    
    return (
        <MainContainer>
            <>
                <Row>
                    <Col md={12} lg={12} xs={12} className="justify-content-start">
                        <h1 className="subheader-title">Trade</h1>
                    </Col>
                </Row>
                <TradeCard />
            </>
        </MainContainer>
    )
}

export default Trade
