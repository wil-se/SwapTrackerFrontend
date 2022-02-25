import React from 'react'
import PropTypes from 'prop-types';
import { Card, Row, Col } from 'react-bootstrap';
import DashBoardOpenTradesHeader from './DashBoardOpenTradesHeader';
import DashBoardOpenTradesTable from './DashBoardOpenTradesTable';
import {Link} from 'react-router-dom';

const DashBoardOpenTrades = ({openedTrades,fiatSymbol,fiatValue,currentDecimals}) => {
    
   
    return (
        <Card className="d-flex w-100 dashboard-card pb-2">
            <DashBoardOpenTradesHeader/>
            <DashBoardOpenTradesTable openedTrades={openedTrades} fiatSymbol={fiatSymbol} fiatValue={fiatValue} currentDecimals={currentDecimals}/>
            <Col className="dashboard-card-open-trade-button-mobile d-md-none d-flex justify-content-center pl-4 pl-md-0 pr-md-2 mt-4" md={5} lg={4} xs={12}>
                <Link to="/trade" className='text-nowrap'> TRADE NOW </Link>
            </Col>
        </Card>
    )
}

DashBoardOpenTrades.propTypes = {
    openedTrades: PropTypes.array,
    fiatSymbol: PropTypes.string,
    fiatValue: PropTypes.number,
    currentDecimals: PropTypes.number
};

export default DashBoardOpenTrades
