import React from 'react'
import DashBoardOpenTradesTableHeader from './DashBoardOpenTradesTableHeader'
import DashboardOpenTradesTableRow from './DashboardOpenTradesTableRow'
import PropTypes from 'prop-types';
import Skeleton from 'react-loading-skeleton';

const DashBoardOpenTradesTable = ({openedTrades, openedTradesLength}) => {
    
    return (
        <div className="mx-3 mx-md-5">
            <DashBoardOpenTradesTableHeader/>

            {openedTrades.length < openedTradesLength ?

            <Skeleton width="1000px" height="32px" />
            :
            openedTrades?.map((trade,key)=>{
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
                        pl_perc={trade.pl_perc} 
                        tokenFrom={trade.tokenFrom}
                        tokenTo={trade.tokenTo}/>
                )
            })}
        </div>
    )
}

DashBoardOpenTradesTable.propTypes = {
    openedTrades: PropTypes.array,
    openedTradesLength: PropTypes.number
};

export default DashBoardOpenTradesTable
