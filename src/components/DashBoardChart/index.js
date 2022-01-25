import React,{useState,useMemo, useEffect} from 'react'
import { Card, Row, Col } from 'react-bootstrap';
import "react-modern-calendar-datepicker/lib/DatePicker.css";
import DatePicker from "react-modern-calendar-datepicker";
import calendar from 'assets/icons/calendar.svg';
import DashBoardLineChart from './DashBoardLineChart';
import PropTypes from 'prop-types';


const defaultFrom = {
    year: new Date().getFullYear(),
    month: new Date().getMonth()+1,
    day: new Date().getDate()-10,
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
const DashBoardChart = ({labelList,dataList}) => {
    const [selectedDayRangeFormatted,setSelectedDayRangeFormatted] = useState("")


      const [selectedDayRange, setSelectedDayRange] = useState(
        defaultValue
      );

     
     



    const dateRangeOutput = ({ ref }) => (
        <label className="dashboard-date-range-output">
            <img src={calendar}/>
            <input
                readOnly
                ref={ref} // necessary
                placeholder="I'm a custom input"
                value={selectedDayRangeFormatted}
                
            />
          </label>
      )
    return (
        <div className="dashboard-card-container">
            <div className="dashboard-card-subcontainer">
                <Row className="dashboard-card-header">
                    <div className="dashboard-card-chart-title">
                        Closed trades overview
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

DashBoardChart.propTypes = {
  dataList:PropTypes.array,
  labelList:PropTypes.array
};

export default DashBoardChart
