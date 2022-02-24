import React from 'react'
import DashBoardOpenTradesTableHeader from './DashBoardOpenTradesTableHeader'
import DashboardOpenTradesTableRow from './DashboardOpenTradesTableRow'
import PropTypes from 'prop-types';
import Skeleton from 'react-loading-skeleton';
import {  Row,Table } from 'react-bootstrap';

const DashBoardOpenTradesTable = ({openedTrades, fiatSymbol,fiatValue,tradeFinded,currentDecimals}) => {
    
    return (
        <div className="table-responsive dashboard-table" >
        <Table >
            <thead >
            <DashBoardOpenTradesTableHeader/>
            </thead>

            {!openedTrades ?
             <tbody >
                <tr className="text-center on-center justify-between">
                    <Skeleton duration="5" width="310px" height="32px" /> <Skeleton width="960px" height="32px" /> <Skeleton width="240px" height="32px"/>
                </tr >
                <tr className="text-center on-center justify-between">
                    <Skeleton duration="5" width="310px" height="32px" /> <Skeleton width="960px" height="32px" /> <Skeleton width="240px" height="32px"/>
                </tr >
                <tr className="text-center on-center justify-between">
                    <Skeleton duration="5" width="310px" height="32px" /> <Skeleton width="960px" height="32px" /> <Skeleton width="240px" height="32px"/>
                </tr >
                <tr className="text-center on-center" >
                    <Skeleton duration="5" width="310px" height="32px" /> <Skeleton width="960px" height="32px" /> <Skeleton width="240px" height="32px"/>
                </tr >
            </tbody>
            : openedTrades.length < 1 ?
            
            <tbody>
                <div className="dashboard-card-chart-no-data">
                    <h4>No open trades</h4>
                </div>
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
                        fiatSymbol={fiatSymbol}
                        currentDecimals={currentDecimals}
                        />
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
    tradeFinded: PropTypes.bool,
    currentDecimals: PropTypes.number,
};

export default DashBoardOpenTradesTable
