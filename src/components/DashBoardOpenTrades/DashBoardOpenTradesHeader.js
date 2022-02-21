import React from 'react'
import infoIcon from '../../assets/icons/infoIcon.svg';
import { Link} from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
const DashBoardOpenTradesHeader = () => {
    return (
        <Row className="dashboard-card-open-trade-header pt-4 pr-2">
            <Col className="dashboard-card-open-trade-title" md={7} lg={5} xs={12}>
                <Col md={9} lg={4} xs={8} className="d-flex">
                    <h1 className="text-nowrap">Open Trades</h1>
                    {/*<img src={infoIcon} /> */ }
                </Col>
                <Col md={3} lg={4} xs={4} className="d-flex">
                    <Link to="/history" className='text-nowrap'> See All </Link>
                </Col>
            </Col>
            <Col className="dashboard-card-open-trade-button d-flex justify-content-center justify-content-md-end pr-2" md={5} lg={4} xs={12}>
                <Link to="/trade" className='text-nowrap'> TRADE NOW </Link>
            </Col>
        </Row>
    )
}

export default DashBoardOpenTradesHeader
