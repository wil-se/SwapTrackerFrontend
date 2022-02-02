import React, { useState,useEffect } from 'react'
import MainContainer from 'components/MainContainer'
import { Card, Row, Col } from 'react-bootstrap';
import { HistoryRow } from 'components/HistoryRow';
import useAuthService from 'hooks/useAuthService'
import useTrade from 'hooks/useTrade';
import {getHistoryRows} from 'utils/historyHelper';
import useAuth from 'hooks/useAuth';
import {getTradeRows} from 'utils/dashboardHelpers';


const History = () => {
  const { user } = useAuthService();
  const { getTrades } = useTrade();
  
  const [tradesRows, setTradesRows] = useState([])
  
  const getTradesData = async (address)=>{
    if(!address) return
    let trds = await getTrades(address);
    return trds;
  }

  const getHistoryRowsData = async (trds) => {
    let rowsData = await getHistoryRows(trds);
    return rowsData;
  }

  useEffect(() => {
    if(user){
      (async () => {
        let tData = await getTradesData(user['address']);
        let rData = await getHistoryRowsData(tData);
        let rows = [];
        for(let i=0; i<rData.length; i++){
          rows.push(
            <HistoryRow key={i}
              tokenSymbol={rData[i].tokenSymbol} 
              tokenName={rData[i].tokenName}
              tokenSymbolIn={rData[i].tokenSymbolIn}
              amountOut={rData[i].amountOut}
              amountIn={rData[i].amountIn}
              currentPrice={rData[i].currentPrice} 
              openAt={rData[i].openAt}
              priceTo={rData[i].priceTo}
              currentValue={rData[i].currentValue} 
              pl={rData[i].pl} 
              pl_perc={rData[i].pl_perc} 
              tokenFrom={rData[i].tokenFrom}
              tokenTo={rData[i].tokenTo}
            />);
        }
        
        setTradesRows(rows);
      })();
    }
  }, [user])


    return (
        <MainContainer>
        <>
        <Row><h1 className="subheader-title">History</h1></Row>
        <Row>
          <Card className="wallet-overview-card" style={{width: "100%", marginBottom: 20, padding: 40}}>
            <Row style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <Col  className="history-header text-center">
                TOKEN SYMBOL
              </Col>
              <Col className="history-header text-center">
                TOKEN NAME
              </Col>
              <Col className="history-header text-center">
                CURRENT VALUE
              </Col>
              <Col className="history-header text-center">
                OPEN AT
              </Col>
              <Col className="history-header text-center">
                CURRENT PRICE
              </Col>
              <Col className="history-header text-center">
                P/L
              </Col>
              <Col className="history-header text-center">
                P/L %
              </Col>
              <Col className="history-header text-center">
                OPEN DATE
              </Col>
              <Col className="history-header text-center">
                CLOSED DATE
              </Col>
              <Col>

              </Col>
            </Row>
              {tradesRows}
          </Card>
        </Row>
        
          </>
        </MainContainer>
    )
}

export default History

