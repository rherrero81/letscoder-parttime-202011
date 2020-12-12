import React, { useState, useEffect, useContext, useRef } from "react";
import Chart from 'chart.js'
/* import { Chart } from 'react-financial-charts' */
import PropTypes from "prop-types";
import logic from "../../../logic/index.js"
import chartlogic from '../../../logic/config-chartjs.js'
import cloneDeep from 'lodash/cloneDeep'

export default function Charts(props) {
 
    const chartRef = useRef(null);
    const [cchart, setChart] = useState(null);
   

    useEffect(() => {
        if (props.order)
            logic.retrieveForexValues(props.token, props.order.symbol).then(res => {
               if (res.candles)  
               {
               if(cchart)
                   cchart.destroy();
                setChart(new Chart(chartRef.current.getContext("2d"), chartlogic.configChart(chartlogic.reduceCandles(res.candles),props.order)));                    
               }                                                         
                
               });           
    }, [props.order])

    return (
        <div className={props.className}><br /><br />
            <canvas id="myChart" ref={chartRef} />
        </div>
    );

}