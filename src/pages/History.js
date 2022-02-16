import React, { useState,useEffect,useLayoutEffect } from 'react'
import MainContainer from 'components/MainContainer'
import { Card, Row, Col,Table } from 'react-bootstrap';
import { HistoryRow } from 'components/HistoryRow';
import useAuthService from 'hooks/useAuthService'
import useTrade from 'hooks/useTrade';
import {getHistoryRows} from 'utils/historyHelper';
import { useSwapTrackerMediator } from 'hooks/useContract';
import {useNavigate} from 'react-router-dom'
import {getTier} from 'utils/walletHelpers'
import { useWeb3React } from '@web3-react/core';
import { useGetFiatName, useGetFiatValues, useGetFiatSymbol } from 'store/hooks';
import calendar from 'assets/icons/calendar.svg';
import "react-modern-calendar-datepicker/lib/DatePicker.css";
import DatePicker from "react-modern-calendar-datepicker";
import {MONTH_LABELS_CHART} from 'config/'
import moment from 'moment'
import Skeleton from 'react-loading-skeleton';


const defaultFrom = {
  year: new Date().getFullYear(),
  month: new Date().getMonth(),
  day: new Date().getDate(),
};
const defaultTo = {
  year: new Date().getFullYear(),
  month: new Date().getMonth()+1,
  day: new Date().getDate(),
};
const defaultValue = {
  from: defaultFrom,
  to: defaultTo,
};




const History = () => {
  const { user } = useAuthService();
  const { getTrades } = useTrade();
  const [selectedDayRangeFormatted,setSelectedDayRangeFormatted] = useState("")
  const [selectedDayRange, setSelectedDayRange] = useState(defaultValue);  
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
        setTradesRows(rData)

      })();
    }
  }, [user,currentName, currentSymbol])

  useEffect(()=>{
    if(selectedDayRange?.from && selectedDayRange?.to && selectedDayRange !== defaultValue){
      let label = `${MONTH_LABELS_CHART[selectedDayRange?.from.month].toUpperCase()} ${selectedDayRange?.from.day},${selectedDayRange?.from.year.toString().substring(2,4)} - ${MONTH_LABELS_CHART[selectedDayRange?.to.month].toUpperCase()} ${selectedDayRange?.to.day},${selectedDayRange?.to.year.toString().substring(2,4)}`
      let dateFrom = `${selectedDayRange?.from.day}/${selectedDayRange?.from.month}/${selectedDayRange?.from.year}`
      let dateTo = `${selectedDayRange?.to.day}/${selectedDayRange?.to.month}/${selectedDayRange?.to.year}`
      selectedDayRange.from.month = selectedDayRange.from.month -1 
      selectedDayRange.to.month = selectedDayRange.to.month -1 
      let dateFromMoment = moment(selectedDayRange.from).unix()
      let dateToMoment = moment(selectedDayRange.to).unix()
      setSelectedDayRangeFormatted(label)
      setTradesRows(
        tradesRows.filter((trade)=>{
          console.log(trade.createdAtForFilter, dateFromMoment, dateToMoment)
          return(
            trade.createdAtForFilter >= dateFromMoment && trade.createdAtForFilter <= dateToMoment
          )    
        })

      )
    }
  },[selectedDayRange])
  
  const dateRangeOutput = ({ ref }) => (
    <label className="history-date-range-output">
        <img src={calendar}/>
        <input
            readOnly
            ref={ref} // necessary
            placeholder="Insert range date"
            value={selectedDayRangeFormatted}
            
        />
      </label>
  )

    return (
        <MainContainer>
        <>
        <Row class="d-flex ">
          <Col md={12} lg={12} xs={12} className="justify-content-start">
          <h1 className="subheader-title">History</h1>
              <DatePicker
                value={selectedDayRange}
                onChange={setSelectedDayRange}
                renderInput={dateRangeOutput} // render a custom input
                shouldHighlightWeekends
              />
          </Col>
          
         
        </Row>
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
            {tradesRows.length < 1 && selectedDayRange === defaultValue ?
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
                <tr className="text-center on-center justify-between" >
                    <Skeleton duration="5" width="310px" height="32px" /> <Skeleton width="960px" height="32px" /> <Skeleton width="240px" height="32px"/>
                </tr >
                <tr className="text-center on-center justify-between">
                    <Skeleton duration="5" width="310px" height="32px" /> <Skeleton width="960px" height="32px" /> <Skeleton width="240px" height="32px"/>
                </tr >
                <tr className="text-center on-center justify-between">
                    <Skeleton duration="5" width="310px" height="32px" /> <Skeleton width="960px" height="32px" /> <Skeleton width="240px" height="32px"/>
                </tr >
                <tr className="text-center on-center justify-between">
                    <Skeleton duration="5" width="310px" height="32px" /> <Skeleton width="960px" height="32px" /> <Skeleton width="240px" height="32px"/>
                </tr >
                <tr className="text-center on-center justify-between" >
                    <Skeleton duration="5" width="310px" height="32px" /> <Skeleton width="960px" height="32px" /> <Skeleton width="240px" height="32px"/>
                </tr >

              </tbody>
              : tradesRows.length < 1 && selectedDayRange !== defaultValue ? 
              <tbody>
                <div className="dashboard-card-chart-no-data">
                      <h4>No trades for this period</h4>
                </div>
              </tbody>
              :
              <tbody>
                {
                  tradesRows.map((trade)=>{
                    return (
                      <HistoryRow key={trade.txId}
                          openDate={trade?.createdAt}
                          closedDate={trade?.closedAt}
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
                          fiatSymbol={currentSymbol}
                          fiatValue={value}
                        />
                    )
                  })
                }
              </tbody>
            }
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

