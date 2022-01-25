import React from 'react'
import { Card, Row, Col } from 'react-bootstrap';
const DashBoardOpenTradesTableHeader = () => {
    return (
        <div className="dashboard-table-container">
            <Row className="dashboard-table-header">
                <Col  className="history-header text-center">
                TOKEN SYMBOL
                </Col>
                <Col className="history-header text-center">
                TOKEN NAME
                </Col>
                <Col className="history-header text-center">
                CURRENT VALUE
                </Col>
                <Col className="history-header text-center">
                OPEN AT
                </Col>
                <Col className="history-header text-center">
                CURRENT PRICE
                </Col>
                <Col className="history-header text-center">
                P/L
                </Col>
                <Col className="history-header text-center">
                P/L %
                </Col>
                <Col>

                </Col>
            </Row>
            <hr/>
        </div>
    )
}

export default DashBoardOpenTradesTableHeader
