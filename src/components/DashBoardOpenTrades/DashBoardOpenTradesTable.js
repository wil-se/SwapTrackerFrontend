import React from 'react'
import DashBoardOpenTradesTableHeader from './DashBoardOpenTradesTableHeader'
import DashboardOpenTradesTableRow from './DashboardOpenTradesTableRow'
import PropTypes from 'prop-types';
import {getTradeRows} from 'utils/dashboardHelpers'
const DashBoardOpenTradesTable = ({openedTrades}) => {
    
    return (
        <div>
            <DashBoardOpenTradesTableHeader/>
            {openedTrades?.map((trade)=>{
                return (
                    <DashboardOpenTradesTableRow key={trade.txId} tokenSymbol="ETH" tokenName="Ethereum" pl="1500" pl_perc="10" />
                )
            })}
        </div>
    )
}

DashBoardOpenTradesTable.propTypes = {
    openedTrades: PropTypes.array,
};

export default DashBoardOpenTradesTable
