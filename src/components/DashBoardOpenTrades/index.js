import React,{useEffect} from 'react'
import PropTypes from 'prop-types';
import { Card, Row, Col } from 'react-bootstrap';
import DashBoardOpenTradesHeader from './DashBoardOpenTradesHeader';
import DashBoardOpenTradesTable from './DashBoardOpenTradesTable';


const DashBoardOpenTrades = ({openedTrades}) => {
    
   
    return (
        <Card className="d-flex w-100">
            <DashBoardOpenTradesHeader/>
            <DashBoardOpenTradesTable openedTrades={openedTrades}/>
        </Card>
    )
}

DashBoardOpenTrades.propTypes = {
    openedTrades: PropTypes.array,
};

export default DashBoardOpenTrades
