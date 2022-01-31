import React, { useState,useEffect } from 'react'
import MainContainer from 'components/MainContainer'
import { Card, Row, Col } from 'react-bootstrap';
import { HistoryRow } from 'components/HistoryRow';
import useAuthService from 'hooks/useAuthService'
import useTrade from 'hooks/useTrade';
import getHistoryRows from 'utils/historyHelper';



const History = () => {
  const { user } = useAuthService();
  const { getTrades } = useTrade();
  
  const [trades, setTrades] = useState([])
  const getTradesRow = async (address)=>{console.log(address); let trades = await getTrades(address); setTrades(trades); console.log(trades);}


  useEffect(() => {
    if(user){
      console.log(user);
      getTradesRow(user['address']);
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
            <hr/>
            <HistoryRow
              tokenSymbol={"BTC"}
              tokenName={"Bitcoin"}
              currentValue={42000}
              openAt={"13/12/21"}
              currenPrice={42000}
              pl={31000}
              pl_perc={70}
              openDate={"21/10/2020"}
              closedDate={"-"}
            />
            <hr/>
            <HistoryRow
              tokenSymbol={"BTC"}
              tokenName={"Bitcoin"}
              currentValue={42000}
              openAt={"13/12/21"}
              currenPrice={42000}
              pl={31000}
              pl_perc={70}
              openDate={"21/10/2020"}
              closedDate={"-"}
            />
            <hr/>
            <HistoryRow
              tokenSymbol={"BTC"}
              tokenName={"Bitcoin"}
              currentValue={42000}
              openAt={"13/12/21"}
              currenPrice={42000}
              pl={31000}
              pl_perc={70}
              openDate={"21/10/2020"}
              closedDate={"-"}
            />
          </Card>
        </Row>
        
          </>
        </MainContainer>
    )
}

export default History

