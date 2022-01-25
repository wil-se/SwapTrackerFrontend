import React,{useEffect} from 'react'
import PropTypes from 'prop-types';
import { Card, Row, Col } from 'react-bootstrap';
import DashBoardOpenTradesHeader from './DashBoardOpenTradesHeader';
import DashBoardOpenTradesTable from './DashBoardOpenTradesTable';


const DashBoardOpenTrades = ({openedTrades}) => {
    
   
    return (
        <Card className="dashboard-card-open-trade-container">
            <div className="dashboard-card-open-trade-subcontainer">
                <DashBoardOpenTradesHeader/>
                <DashBoardOpenTradesTable openedTrades={openedTrades}/>
            </div>
        </Card>
    )
}

DashBoardOpenTrades.propTypes = {
    openedTrades: PropTypes.array,
};

export default DashBoardOpenTrades
