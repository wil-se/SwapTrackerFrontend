import React from 'react'
import DashBoardOpenTradesTableHeader from './DashBoardOpenTradesTableHeader'
import DashboardOpenTradesTableRow from './DashboardOpenTradesTableRow'
import PropTypes from 'prop-types';
import Skeleton from 'react-loading-skeleton';
import {  Row,Table } from 'react-bootstrap';

const DashBoardOpenTradesTable = ({openedTrades, fiatSymbol,fiatValue}) => {
    
    return (
        <div className="table-responsive">
        <Table className="mx-3 mx-md-5 dashboard-table">
            <thead >
            <DashBoardOpenTradesTableHeader/>
            </thead>

            {openedTrades.length < 1 ?
            <tbody >
            <tr className="text-center on-center">
            <Skeleton width="100%" height="32px" />
            </tr>
            <tr className="text-center on-center">
            <Skeleton width="100%" height="32px" />
            </tr >
            <tr className="text-center on-center">
            <Skeleton width="100%" height="32px" />
            </tr>
            <tr className="text-center on-center">
            <Skeleton width="100%" height="32px" />
            </tr>

            </tbody>
            :
            <tbody>
            {

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
                        tokenTo={trade.tokenTo}
                        fiatValue={fiatValue}
                        fiatSymbol={fiatSymbol}/>
                        )
                    })
                }    
            </tbody>
        }
        </Table>
    </div>
    )
}

DashBoardOpenTradesTable.propTypes = {
    openedTrades: PropTypes.array,
    fiatSymbol: PropTypes.string,
    fiatValue: PropTypes.number,
};

export default DashBoardOpenTradesTable
