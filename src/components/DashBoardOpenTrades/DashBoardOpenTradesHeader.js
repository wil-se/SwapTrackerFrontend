import React from 'react'
import infoIcon from '../../assets/icons/infoIcon.svg';
import { Link } from 'react-router-dom';
import { Card, Row, Col } from 'react-bootstrap';
const DashBoardOpenTradesHeader = () => {
    return (
        <Row className="dashboard-card-open-trade-header">
        <Col className="dashboard-card-open-trade-title">
            <h1>
                Open Trades
            </h1>
            <img src={infoIcon} />
            <Link to="/history">
                See All
            </Link>
        </Col>
        <Col></Col>
        <Col className="dashboard-card-open-trade-button">
            <Link to="/trade">
                TRADE NOW
            </Link>
        </Col>
    </Row>
    )
}

export default DashBoardOpenTradesHeader
