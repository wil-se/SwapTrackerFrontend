import React,{useState, useEffect} from 'react'
import {Row} from 'react-bootstrap';
import "react-modern-calendar-datepicker/lib/DatePicker.css";
import DatePicker from "react-modern-calendar-datepicker";
import calendar from 'assets/icons/calendar.svg';
import DashBoardLineChart from './DashBoardLineChart';
import PropTypes from 'prop-types';
import {MONTH_LABELS_CHART} from 'config/'
import {getDatesFromRange} from 'utils/dashboardHelpers'
import useAuthService from 'hooks/useAuthService'

const defaultFrom = {
    year: new Date().getFullYear(),
    month: new Date().getMonth()+1,
    day: new Date().getDate()-5,
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
const DashBoardChart = () => {
    const { user } = useAuthService()
    const [selectedDayRangeFormatted,setSelectedDayRangeFormatted] = useState("")
    const [selectedDayRange, setSelectedDayRange] = useState(defaultValue);  
    const [labelList,setLabelList] = useState([])
    const [dataList,setDataList] = useState([])

    const getDataForChart = () => {
      let dateFilterArray;
      if(selectedDayRange){ dateFilterArray = getDatesFromRange(selectedDayRange) } 
      let labelList = []
      let dataList = []
      if(user.balanceOverview){ 
        user.balanceOverview.map((singleBalanceOverview)=>{
          let date = new Date(Object.keys(singleBalanceOverview))
          
          if(dateFilterArray && (date >= dateFilterArray[0] && date <= dateFilterArray[1])){
            let label = `${MONTH_LABELS_CHART[date.getMonth()+1]} ${date.getDate()}` 
            labelList.push(label)
            dataList.push(singleBalanceOverview[Object.keys(singleBalanceOverview)])
      
          }
          else if(!dateFilterArray){
            let label = `${MONTH_LABELS_CHART[date.getMonth()+1]} ${date.getDate()}` 
            labelList.push(label)
            dataList.push(singleBalanceOverview[Object.keys(singleBalanceOverview)])
          }
      
        })
      }
      setLabelList(labelList)
      setDataList(dataList)
      
    }
    
    useEffect(()=>{
      if(selectedDayRange === defaultValue && user){
          getDataForChart()
          return;

        }
        else{
          if(selectedDayRange?.from && selectedDayRange?.to && selectedDayRange !== defaultValue){
            let label = `${MONTH_LABELS_CHART[selectedDayRange?.from.month].toUpperCase()} ${selectedDayRange?.from.day},${selectedDayRange?.from.year.toString().substring(2,4)} - ${MONTH_LABELS_CHART[selectedDayRange?.to.month].toUpperCase()} ${selectedDayRange?.to.day},${selectedDayRange?.to.year.toString().substring(2,4)}`
            setSelectedDayRangeFormatted(label)
            getDataForChart()
          }
        }
      
      },[selectedDayRange, user])
     
     



    const dateRangeOutput = ({ ref }) => (
        <label className="dashboard-date-range-output">
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
        <div className="dashboard-card-container">
            <div className="dashboard-card-subcontainer">
                <Row className="dashboard-card-header">
                    <div className="dashboard-card-chart-title">
                        Trades overview
                    </div>
                    <div>
                        <DatePicker
                            value={selectedDayRange}
                            onChange={setSelectedDayRange}
                            renderInput={dateRangeOutput} // render a custom input
                            shouldHighlightWeekends
                        />
                    </div>
                </Row>
                <Row>
                  <DashBoardLineChart  labelList={labelList} dataList={dataList}/> 
                </Row>
            
            </div>
        </div>
    )
}






export default DashBoardChart
