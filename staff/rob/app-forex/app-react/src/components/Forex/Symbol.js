import React, { useState, useEffect, useContext, useRef } from "react";
import PropTypes from "prop-types";
import logic from "app-logic"
import cloneDeep from 'lodash/cloneDeep'

/* export default class Login extends React.Component { */
export default function Symbol(props) {


	return (

		<div  >
			<label>Symbol {props.symbol.symbol}</label> <br />
			<label>Type {props.symbol.categoryName}</label> <br />
			<label>Description {props.symbol.description}</label> <br />
			<label class={props.symbol.high_color} >High {props.symbol.high} {props.symbol.currency}</label> <br />
			<label class={props.order?.cmd%2==0?'label--highlight':''}   >Ask {props.symbol.ask} {props.symbol.currency}</label> <br />
			<label class={props.order?.cmd%2!==0?'label--highlight':''}   >Bid {props.symbol.bid} {props.symbol.currency}</label> <br />
			<label class={props.symbol.low_color} >Low {props.symbol.low} {props.symbol.currency}</label> <br />
			<label>Time {props.symbol.timeString}</label>
		 
		<label >{props.symbol.ldate} {props.symbol.literal} </label>
		</div>



	);

}
