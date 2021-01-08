import React, { useState, useEffect, useContext, useRef } from "react";
import Chart from 'chart.js'
import { makeStyles } from '@material-ui/core/styles';
/* import { Chart } from 'react-financial-charts' */
import PropTypes from "prop-types";


import cloneDeep from 'lodash/cloneDeep'
import 'chartjs-plugin-dragdata'
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import iLogo from '../../static/images/cards/charts.jpg';
import FlipCard from '../UI/FlipCard.js';


import logic from "app-logic"

const useStyles = makeStyles({
    root: {
        maxWidth: 1000,
    },
});

export default function Charts(props) {
    let [updateDate, setupdateDate] = useState('');
    const classes = useStyles();
    const chartRef = useRef(null);
    const [cchart, setChart] = useState(null);
    const [chart_config, setChart_config] = useState(null);
    const [period, setPeriod] = useState(5);
    const [refresh, setRefresh] = useState([]);

const handlerChangePeriod=(event)=>
{
    setPeriod(parseInt(event.target.value))  
}

const checkLimitsLines=(conf)=>
{
    let res=cloneDeep(conf);
    if(props.order.cmd==undefined)
    res.data.datasets=res.data.datasets.filter(c=>c.label!=='Line Sl' && c.label!=='Line TP' && c.label!=='Line Price'  );
    else{
        if(props.order.sl==0)
        res.data.datasets=res.data.datasets.filter(c=>c.label!=='Line Sl'  );

        if(props.order.tp==0)
        res.data.datasets=res.data.datasets.filter(c=>c.label!=='Line TP'  );
    }

    return res;
}

    const handlerChangeLimits = (sl, tp, price) => {
        let neworder = cloneDeep(props.order)
        if (sl)
            neworder.sl = sl;

        if (tp)
            neworder.tp = tp;

        if (price)
            neworder.price = price;

        props.refreshOperator(neworder);
    }
    const getValues=()=>
    {
       /*  if (cchart)
        {
      
        cchart.destroy();      
       
        }
 */

        logic.retrieveForexValues(props.token, props.order.symbol,period).then(res => {

            if (res.candles) {

                setRefresh(res.candles);
             
                if (chartRef.current) {
                    let newcchart=null;
                    let conf=logic.chartlogic.configChart(logic.chartlogic.reduceCandles(res.candles,res.digits), props.order, handlerChangeLimits);
                    setChart_config(cloneDeep(conf));


                   let current_conf= checkLimitsLines(conf);

                   
                    if(cchart)
                    {
                        newcchart=cchart;
                    
                        newcchart.data= current_conf.data;
                        newcchart.config=conf;
                        newcchart.update(); 


                    }else
                    {
                        newcchart = new Chart(chartRef.current.getContext("2d"), current_conf);
                    }
                    newcchart.order = props.order;
                    setChart(newcchart);
                    
                }

            }

        });

    }

    useEffect(() => {
        if (props.order) {
            if (cchart && cchart.order.symbol == props.order.symbol) {
                let current_conf=  checkLimitsLines(chart_config);
                cchart.data= current_conf.data;
                cchart.config=current_conf;
     
                if(props.order.cmd!==undefined)
                logic.chartlogic.changeLimits(cchart.config.data.datasets, props.order)
                cchart.update();
            } else getValues();
           

        }
    }, [props.order])

    
    useEffect(() => {
        if (props.order?.symbol)
        getValues(); 
    },[period]);

    return ( 
        <div className = { props.className } >
                < FlipCard className = { classes.root }
                iLogo = { iLogo }
                updateDate = { updateDate }
                hideCard = { props.hideCard }
                idCard = { props.idCard }
                cards = { props.cards } >
                <div class = "front" > 
                {refresh.length > 0 && < canvas id = "myChart"       ref = { chartRef }  />}
                <select className="headSearch" 		onChange = { handlerChangePeriod }>
                     <option value={5}>5 Minutes</option>
                    <option value={15}>15 minutes</option>
                    <option value={30}>30 minutes</option>
                    <option value={60}>1 hour</option>
                    <option value={240}>4 hours</option>
                    <option value={1440}>1 day</option>
                    <option value={10080}>1 Week</option>
                    <option value={43200}>1 Month</option>
                </select>
                </div>  <div class = "back" > Chart Info </div> </ FlipCard >
         </div>
        );
    }