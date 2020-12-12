import React, { useState, useEffect, useContext, useRef } from "react";
import PropTypes from "prop-types";
import logic from "../../../logic/index.js"
import cloneDeep from 'lodash/cloneDeep'
import Operation from '../../../logic/models/Forex/Operation.js';
/* export default class Login extends React.Component { */
export default function Symbol(props) {

 
    return (
        <div ref={props.info} >
            <div class="symboltemplate ">
                <label>Symbol {props.symbol.symbol}</label>  <br />
                <label>Type {props.symbol.categoryName}</label>  <br />
                <label>Description {props.symbol.description}</label>  <br />
                <label class={props.symbol.high_color} >High {props.symbol.high} {props.symbol.currency}</label>  <br />
                <label class={props.symbol.ask_color} >Ask {props.symbol.ask} {props.symbol.currency}</label>  <br />
                <label class={props.symbol.bid_color} >Bid {props.symbol.bid} {props.symbol.currency}</label>  <br />
                <label class={props.symbol.low_color} >Low {props.symbol.low} {props.symbol.currency}</label>  <br />
                <label>Time {props.symbol.timeString}</label>
            </div>
            <br />
            <label >{props.symbol.ldate} {props.symbol.literal} </label>
        </div>
 
    );

}