import React from 'react'
import DashBoardOpenTradesTableHeader from './DashBoardOpenTradesTableHeader'
import DashboardOpenTradesTableRow from './DashboardOpenTradesTableRow'
import PropTypes from 'prop-types';
import {getTradeRows} from 'utils/dashboardHelpers'
const DashBoardOpenTradesTable = ({openedTrades}) => {
    
    return (
        <div>
            <DashBoardOpenTradesTableHeader/>
            {openedTrades?.map((trade,key)=>{
                return (
                    <DashboardOpenTradesTableRow 
                        key={key} 
                        tokenSymbol={trade.tokenSymbol} 
                        tokenName={trade.tokenName}
                        tokenSymbolIn={trade.tokenSymbolIn}
                        amountOut={trade.amountOut}
                        amountIn={trade.amountIn}
                        currentPrice={trade.currentPrice} 
                        openAt={trade.openAt}
                        priceTo={trade.priceTo}
                        currentValue={trade.currentValue} 
                        pl={trade.pl} 
                        pl_perc={trade.pl_perc} />
                )
            })}
        </div>
    )
}

DashBoardOpenTradesTable.propTypes = {
    openedTrades: PropTypes.array,
};

export default DashBoardOpenTradesTable
