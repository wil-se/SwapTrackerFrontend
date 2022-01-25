import React from 'react'
import * as CryptoIcons from 'assets/icons';
import PropTypes from 'prop-types';
import { Row, Col, Button } from 'react-bootstrap';
const greyText = {color: "#8DA0B0", fontSize: 11}
const DashboardOpenTradesTableRow = ({tokenSymbol,tokenName,pl,pl_perc}) => {
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
                <p className="mb-0">$88.000</p>
                <span style={greyText}>133 BNB | 2 BTC</span>
              </Col>
              <Col className="text-center">
                <p className="mb-0">$26.000</p>
                <span style={greyText}>133 BNB | 2 BTC</span>
              </Col>
              <Col className="text-center">
                <p className="mb-0">$88.000</p>
                <span style={greyText}>133 BNB | 2 BTC</span>
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
    tokenName: PropTypes.string,
    currentValue: PropTypes.number,
    openAt: PropTypes.string,
    currenPrice: PropTypes.number,
    pl: PropTypes.number,
    pl_perc: PropTypes.number,
    openDate: PropTypes.string,
    closedDate: PropTypes.string,
};

export default DashboardOpenTradesTableRow
