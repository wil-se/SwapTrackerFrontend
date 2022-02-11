import React,{useEffect} from 'react'
import PropTypes from 'prop-types';
import { Card, Row, Col } from 'react-bootstrap';
import DashBoardOpenTradesHeader from './DashBoardOpenTradesHeader';
import DashBoardOpenTradesTable from './DashBoardOpenTradesTable';


const DashBoardOpenTrades = ({openedTrades,fiatSymbol,fiatValue}) => {
    
   
    return (
        <Card className="d-flex w-100">
            <DashBoardOpenTradesHeader/>
            <DashBoardOpenTradesTable openedTrades={openedTrades} fiatSymbol={fiatSymbol} fiatValue={fiatValue}/>
        </Card>
    )
}

DashBoardOpenTrades.propTypes = {
    openedTrades: PropTypes.array,
    fiatSymbol: PropTypes.string,
    fiatValue: PropTypes.number
};

export default DashBoardOpenTrades
