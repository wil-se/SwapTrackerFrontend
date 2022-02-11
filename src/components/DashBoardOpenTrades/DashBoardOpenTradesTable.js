import React from 'react'
import DashBoardOpenTradesTableHeader from './DashBoardOpenTradesTableHeader'
import DashboardOpenTradesTableRow from './DashboardOpenTradesTableRow'
import PropTypes from 'prop-types';
import Skeleton from 'react-loading-skeleton';
import {  Row } from 'react-bootstrap';

const DashBoardOpenTradesTable = ({openedTrades, fiatSymbol,fiatValue}) => {
    console.log(fiatSymbol,fiatValue)
    return (
        <div className="mx-3 mx-md-5">
            <DashBoardOpenTradesTableHeader/>

            {openedTrades.length < 1 ?
            <>
            <Row>
            <Skeleton width="100%" height="32px" />
            </Row>
            <Row>
            <Skeleton width="100%" height="32px" />
            </Row>
            <Row>
            <Skeleton width="100%" height="32px" />
            </Row>
            <Row>
            <Skeleton width="100%" height="32px" />
            </Row>

            </>
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
                        tokenTo={trade.tokenTo}
                        fiatValue={fiatValue}
                        fiatSymbol={fiatSymbol}/>
                )
            })}
        </div>
    )
}

DashBoardOpenTradesTable.propTypes = {
    openedTrades: PropTypes.array,
    fiatSymbol: PropTypes.string,
    fiatValue: PropTypes.number,
};

export default DashBoardOpenTradesTable
