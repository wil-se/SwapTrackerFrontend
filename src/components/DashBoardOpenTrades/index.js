import React,{useEffect} from 'react'
import PropTypes from 'prop-types';
import { Card, Row, Col } from 'react-bootstrap';
import DashBoardOpenTradesHeader from './DashBoardOpenTradesHeader';
import DashBoardOpenTradesTable from './DashBoardOpenTradesTable';


const DashBoardOpenTrades = ({openedTrades,fiatSymbol,fiatValue,currentDecimals}) => {
    
   
    return (
        <Card className="d-flex w-100 dashboard-card">
            <DashBoardOpenTradesHeader/>
            <DashBoardOpenTradesTable openedTrades={openedTrades} fiatSymbol={fiatSymbol} fiatValue={fiatValue} currentDecimals={currentDecimals}/>
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
