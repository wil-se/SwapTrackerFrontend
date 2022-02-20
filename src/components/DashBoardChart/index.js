import React,{useState, useEffect} from 'react'
import {Row, Col} from 'react-bootstrap';
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
  
const DashBoardChart = ({tier,account}) => {
    const { user, profitOrLossOverview } = useAuthService()
    const [selectedDayRangeFormatted,setSelectedDayRangeFormatted] = useState("")
    const [selectedDayRange, setSelectedDayRange] = useState(defaultValue);  
    const [labelList,setLabelList] = useState([])
    const [dataList,setDataList] = useState([])

    const getDataForChart = () => {
      let dateFilterArray;
      if(selectedDayRange){ dateFilterArray = getDatesFromRange(selectedDayRange) } 
      let labelList = []
      let dataList = []
     console.log("allora", profitOrLossOverview)
      if(profitOrLossOverview && profitOrLossOverview.length !== 0 && account){ 
        try{
          profitOrLossOverview.map((singleBalanceOverview)=>{
            let date = new Date(Object.keys(singleBalanceOverview))
            if(selectedDayRange === defaultValue){
              let label = `${MONTH_LABELS_CHART[date.getMonth()+1]} ${date.getDate()}` 
              labelList.push(label)
              dataList.push(singleBalanceOverview[Object.keys(singleBalanceOverview)])
              
              return;
            }
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
        } catch(e){
          console.log(e);
        }
        
        labelList.unshift("0")
        dataList.unshift("0")
        setLabelList(labelList)
        setDataList(dataList)
      }
      else{

        setLabelList(labelList)
        setDataList(dataList)
      }
      
      
    }
    
    useEffect(()=>{
      console.log("parto qui?")
      if(tier === 1000){
        return;
      }
      else if(tier !== 1000 && selectedDayRange === defaultValue && user){
        console.log("entro qui?", user)

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
      
      },[selectedDayRange, user,tier,account])
     
     



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
                <Row className="dashboard-card-header mb-2">
                  <Col md={6} lg={6} xs={12}>
                    <h3 className="dashboard-card-chart-title ml-2">Trades overview </h3>
                  </Col>
                  <Col md={6} lg={6} xs={12} className="justify-content-end d-flex">
                  <a style={{cursor: 'pointer'}}>

                        <DatePicker
                            colorPrimary="#b6d7e4"
                            colorPrimaryLight="#1297a1"
                            value={selectedDayRange}
                            onChange={setSelectedDayRange}
                            renderInput={dateRangeOutput}
                        />
                  </a>
                  </Col>
                </Row>
                <Row>
                  {labelList.length>0 && dataList.length >0
                    ?
                    <DashBoardLineChart  labelList={labelList} dataList={dataList}/> 
                    :
                    <div className="dashboard-card-chart-no-data">
                      <h1>No data chart</h1>
                    </div>
                  
                  }
                </Row>
            
            </div>
        </div>
    )
}

DashBoardChart.propTypes = {
  tier: PropTypes.number,
  account: PropTypes.string
};




export default DashBoardChart
