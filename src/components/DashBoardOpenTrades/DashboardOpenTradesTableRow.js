import React from 'react'
import * as CryptoIcons from 'assets/icons';
import PropTypes from 'prop-types';
import { Row, Col, Button } from 'react-bootstrap';
const greyText = {color: "#8DA0B0", fontSize: 11}
const DashboardOpenTradesTableRow = ({tokenSymbol,tokenSymbolIn,tokenName,pl,pl_perc,currentPrice,currentValue,openAt,amountIn,amountOut,priceTo}) => {
    return (
        <Row style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            paddingTop: 15,
        }}>
              <Col className="text-center">
              <img className="img-fluid ml-0 mr-2" src={CryptoIcons.default['_'+tokenSymbol.toLowerCase()]} style={{width: 25, height: 25}} />
                {tokenSymbol}
              </Col>
              <Col className="text-center">
                {tokenName}
              </Col>
              <Col className="text-center">
                <p className="mb-0">${currentValue}</p>
                <span style={greyText}>{amountIn} {tokenSymbolIn} | {amountOut} {tokenSymbol}</span>
              </Col>
              <Col className="text-center">
                <p className="mb-0">${openAt}</p>
                <span style={greyText}>{amountIn} {tokenSymbolIn} @${priceTo}</span>
              </Col>
              <Col className="text-center">
                <p className="mb-0">${currentPrice}</p>
                <span style={greyText}>{amountIn} {tokenSymbolIn} | {amountOut} {tokenSymbol}</span>
              </Col>
              <Col className="text-center">
                {pl}
              </Col>
              <Col className="text-center">
                {pl_perc}%
              </Col>
              <Col className="text-center">
                <Button style={{fontSize: 12, paddingTop: 5, paddingBottom: 5}}>CLOSE TRADE</Button>
              </Col>
            </Row>
    )
}


DashboardOpenTradesTableRow.propTypes = {
    tokenSymbol: PropTypes.string,
    tokenSymbolIn: PropTypes.string,
    tokenName: PropTypes.string,
    currentValue: PropTypes.number,
    openAt: PropTypes.string,
    currentPrice: PropTypes.number,
    pl: PropTypes.number,
    pl_perc: PropTypes.number,
    openDate: PropTypes.string,
    closedDate: PropTypes.string,
    amountIn: PropTypes.number,
    amountOut: PropTypes.number,
    priceTo: PropTypes.number
};

export default DashboardOpenTradesTableRow
