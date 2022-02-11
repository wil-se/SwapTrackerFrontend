import React, { useState,useEffect,useLayoutEffect } from 'react'
import MainContainer from 'components/MainContainer'
import { Card, Row, Col,Table } from 'react-bootstrap';
import { HistoryRow } from 'components/HistoryRow';
import useAuthService from 'hooks/useAuthService'
import useTrade from 'hooks/useTrade';
import {getHistoryRows} from 'utils/historyHelper';
import useAuth from 'hooks/useAuth';
import {getTradeRows} from 'utils/dashboardHelpers';
import { useSwapTrackerMediator } from 'hooks/useContract';
import {useNavigate} from 'react-router-dom'
import {getTier} from 'utils/walletHelpers'
import { useWeb3React } from '@web3-react/core';
import { useGetFiatName, useGetFiatValues, useGetFiatSymbol } from 'store/hooks';
const History = () => {
  const { user } = useAuthService();
  const { getTrades } = useTrade();
  
  const [tradesRows, setTradesRows] = useState([])
  const [value, setValue] = useState(0);
  const currentName = useGetFiatName();
  const currentValues = useGetFiatValues();
  const currentSymbol = useGetFiatSymbol();

  
  const getTradesData = async (address)=>{
    if(!address) return
    let trds = await getTrades(address);
    return trds;
  }

  const getHistoryRowsData = async (trds) => {
    let rowsData = await getHistoryRows(trds);
    return rowsData;
  }

  const navigation = useNavigate();
  const swapTrackerMediator = useSwapTrackerMediator(); 
  const { account } = useWeb3React();


  useLayoutEffect(()=>{
      (async()=>{
          if(account){
              await getTier(swapTrackerMediator,navigation,account)
              
          }
      })()
  },[account])

  useEffect(() => {
    let val = 0
    for(let i=0; i<currentValues.length; i++){
      if(currentValues[i]['currency'] == currentName){
        val = Number(currentValues[i]['rate']);
        setValue(Number(currentValues[i]['rate']))
      }
    }
    if(user){
      (async () => {
        let tData = await getTradesData(user['address']);
        let rData = await getHistoryRowsData(tData);
        let rows = [];
        for(let i=0; i<rData.length; i++){
          rows.push(
            <HistoryRow key={i}
              openDate={rData[i]?.createdAt}
              closedDate={rData[i]?.closedAt}
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
              fiatSymbol={currentSymbol}
              fiatValue={val}
            />);
        }
        
        setTradesRows(rows);
      })();
    }
  }, [user,currentName, currentSymbol])
  


    return (
        <MainContainer>
        <>
        <Row><h1 className="subheader-title">History</h1></Row>
        <Row>
        <Col md={12} lg={12} xs={12}>

          <Card className="d-flex w-100 history-card">
            <div className="table-responsive">
             <Table className="mx-3 mx-md-5 history-table">
               <thead>
                <tr>

                  <th  className=" text-center">
                    TOKEN SYMBOL
                  </th>
                  <th className=" text-center">
                    TOKEN NAME
                  </th>
                  <th className=" text-center">
                    CURRENT VALUE
                  </th>
                  <th className=" text-center">
                    OPEN AT
                  </th>
                  <th className=" text-center">
                    CURRENT PRICE
                  </th>
                  <th className=" text-center">
                    P/L
                  </th>
                  <th className=" text-center">
                    P/L %
                  </th>
                  <th className=" text-center">
                    OPEN DATE
                  </th>
                  <th className=" text-center">
                    CLOSED DATE
                  </th>
                  <th  className=" text-center">
                    {"  "}
                  </th>
                </tr>
            </thead>
              <tbody>
                {tradesRows}
              </tbody>
              </Table> 
            </div>
          </Card>
        </Col>
        </Row>
        
          </>
        </MainContainer>
    )
}

export default History

