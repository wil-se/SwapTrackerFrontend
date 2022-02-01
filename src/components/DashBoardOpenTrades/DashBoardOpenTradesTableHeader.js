import React from 'react'
import { Table, Row, Col } from 'react-bootstrap';
const DashBoardOpenTradesTableHeader = () => {
    return (
        <div className="dashboard-table-container pb-2">
            <Row className="d-flex align-items-center justify-content-center">
                <Col className="history-header font-weight-bold text-center">
                    TOKEN SYMBOL
                </Col>
                <Col className="history-header font-weight-bold text-center">
                TOKEN NAME
                </Col>
                <Col className="history-header font-weight-bold text-center">
                CURRENT VALUE
                </Col>
                <Col className="history-header font-weight-bold text-center">
                OPEN AT
                </Col>
                <Col className="history-header font-weight-bold text-center">
                CURRENT PRICE
                </Col>
                <Col className="history-header font-weight-bold text-center">
                P/L
                </Col>
                <Col className="history-header font-weight-bold text-center">
                P/L %
                </Col>
                <Col>

                </Col>
            </Row>
            <Row className="justify-content-center pb-2">
                <Col>
                    <hr />
                </Col>
            </Row>
        </div>
    )
}

export default DashBoardOpenTradesTableHeader
