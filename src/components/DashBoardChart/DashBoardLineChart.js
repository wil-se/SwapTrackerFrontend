import React, {useRef} from 'react'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js'
import {Line} from 'react-chartjs-2'
import PropTypes from 'prop-types';
 
const DashBoardLineChart = ({labelList,dataList}) => {
    const chartRef = useRef(null)
    ChartJS.register(
        CategoryScale,
        LinearScale,
        PointElement,
        LineElement,
        Title,
        Tooltip,
        Legend
      )
    
    const data = {
        labels: labelList,
        datasets: [
          {
            lineTension: 0.1,
            borderColor: '#b6d7e4',
            borderWidth:3,
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(75,192,192,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: dataList,
          }
        ]
      };
      
      const lineOptions = {
        aspectRatio:2,  
        maintainAspectRatio:false,
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                enabled: true,
                displayColors:false,
                backgroundColor:"white",
                borderColor:"black",
                borderWidth:1,
                bodyColor:"black",
                titleColor:"black",
                titleFont:{family:"Avenir Next"},
                bodyFont:{family:"Avenir Next"},
                cornerRadius:10,
                
            },

        },
        scales: {
          x: {
            grid: {
              display: true,
              borderDash:[10],
              lineWidth:2,

            },
          },
          y:{
            // stacked: true,
            grid: {
              display: false,
              drawBorder: false,
              
            },
            ticks: {
              beginAtZero: true,
            },
          }
        },
      }; 
    
    return (
        <div style={{width:"100%", height:"315px"}}>
            <Line data={data} options={lineOptions} ref={chartRef}/>
        </div>
    )
}

DashBoardLineChart.propTypes = {
    labelList: PropTypes.array,
    dataList: PropTypes.array,
};

export default DashBoardLineChart
