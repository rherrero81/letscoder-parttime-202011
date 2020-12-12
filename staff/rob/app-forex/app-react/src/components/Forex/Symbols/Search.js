import React, { useState, useEffect, useContext, useRef } from "react";
import PropTypes from "prop-types";
import logic from "../../../logic/index.js"
import cloneDeep from 'lodash/cloneDeep'
import Symbol from './Symbol.js'
import Signals from '../Signals/Signals.js'
import Operation from '../../../logic/models/Forex/Operation.js';
/* export default class Login extends React.Component { */
export default function Search(props) {

    const info = useRef(null);
    const signals = useRef(null);

    let [symbol, setSymbol] = useState({});
    let [symbols, setSymbols] = useState({ list: [], listBAK: [] });

    const handlerHide = (el) => {
        if (el.current.style.display == 'none')
            el.current.style.display = 'block'
        else
            el.current.style.display = 'none';
    };

    const handlerOrder = (symbol, cmd) => {
        symbol.cmd = cmd;
        symbol.order = -1;
        symbol.type=0;
        symbol.sl = cmd == 0 ? symbol.low : symbol.high;
        symbol.tp = cmd == 0 ? symbol.high : symbol.low;
        symbol.price = symbol.bid;
        symbol.volume = 0.1;
        props.refreshOperator(cloneDeep(symbol));
    }

    const handlerSearch = (event) => {
        //event.target.value
        const newlist = symbols.listBAK.filter(c => c.description.toUpperCase().indexOf(event.target.value.toUpperCase()) != -1);
        setSymbols({ list: newlist, listBAK: symbols.listBAK })
        setSymbol(newlist[0]);
        props.refreshSymbol(newlist[0]);
    }

    const handlerSelect = (event) => {
        setSymbol(symbols.list.filter(c => c.symbol == event.target.value)[0]);
        props.refreshSymbol(symbols.list.filter(c => c.symbol == event.target.value)[0]);
    }



    useEffect(() => {

        logic.retrieveForexSymbols(props.token).then(c => {

            if (c.returnData && c.returnData.length > 0) {
                setSymbols({ list: c.returnData, listBAK: c.returnData });
                setSymbol(c.returnData[0]);
                props.refreshSymbol(c.returnData[0]);
                info.current.style.display = 'none';
                signals.current.style.display = 'none';  
            }
        })
    }, [])



    return (

        <div className={props.className}>
            <br /><br />
            <input placeholder="Search a figure... " type="search " onChange={handlerSearch} />
            
            <br /> <select class="select " onChange={handlerSelect}  >
                {symbols.list.map(el =>
                    <option class={el.visible} value={el.symbol} object={el} >{el.description}  <label class={el.high_color}></label> {el.bid} {el.currency} </option>
                )
                }

            </select>
             <button onClick={()=>handlerHide(info)} >Info</button><button onClick={()=>handlerHide(signals)}  >Signals</button> 
            <br />
            
            <button onClick={() => handlerOrder(symbol, 0)} >Buy</button> <button onClick={() => handlerOrder(symbol, 1)}  >Sell</button> 
            <div>
                
            </div>
            <Symbol symbol={symbol} info={info}></Symbol>
            <Signals token={props.token} symbol={symbol} signals={signals} ></Signals> 

        </div>

    );

}