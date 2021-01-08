import React, { useState, useEffect, useContext, useRef } from "react";
import PropTypes from "prop-types";
import { makeStyles } from '@material-ui/core/styles';
import "./Home.css";
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import FlipCard from '../UI/FlipCard';
import logic from "app-logic"
import cloneDeep from 'lodash/cloneDeep'
import Symbol from './Symbol.js'
import Signals from './Signals.js'

import iLogo from '../../static/images/cards/search.jpg'
import "./Home.css";

/* export default class Login extends React.Component { */
const useStyles = makeStyles({
	root: {
		maxWidth: 345,
	},
});
export default function Search(props) {
	const classes = useStyles();

	let [withSymbol, setwithSymbol] = useState(false)
	let [withSignal, setwithSignal] = useState(false)
	let [isBack, setIsBack] = useState(false)
	let [symbol, setSymbol] = useState({});
	let [symbols, setSymbols] = useState({ list: [], listBAK: [] });
	let [updateDate, setupdateDate] = useState('');
	const [typeInfo, setTypeInfo] = React.useState('');
	const [typeOp, setTypeOp] = React.useState('');


	const handlerHide = (el) => {
		if (el.current.style.display == 'none')
			el.current.style.display = 'block'
		else
			el.current.style.display = 'none';
	};

	const convertToOp = (symbol, cmd) => {
		symbol.cmd = cmd;
		symbol.offset = 0;
		symbol.order = 0;
		symbol.type = 0;
		symbol.sl = cmd == 0 ? symbol.low : symbol.high;
		symbol.tp = cmd == 0 ? symbol.high : symbol.low;
		symbol.price = cmd == 0 ? symbol.ask : symbol.bid;
		symbol.volume = 0.1;
		return symbol;
	}

	const handlerOrder = (symbol, cmd) => {		
		props.refreshOperator(cloneDeep(convertToOp(symbol, cmd)));
	}

	const handlerSearch = (event) => {
		//event.target.value
		const newlist = symbols.listBAK.filter(c => c.description.toUpperCase().indexOf(event.target.value.toUpperCase()) != -1);
	 

		setSymbols({ list: newlist, listBAK: symbols.listBAK })
		if(newlist.length>0)
		{
		setSymbol(newlist[0]);
	 
		setwithSymbol(true);setwithSignal(false); setTypeInfo(0); 
		props.refreshOperator(cloneDeep(convertToOp(newlist[0]), 0));
		}
	}

	const handlerSelect = (event) => {
		let op = symbols.list.filter(c => c.symbol == event.target.value)[0];
		setSymbol(op);
		setwithSymbol(true);setwithSignal(false); setTypeInfo(0); 
		props.refreshOperator(cloneDeep(convertToOp(op), 0));
	}

	useEffect(() => {
		if(props.order)
		{
		setTypeOp(props.order.cmd)
		setSymbol(symbols.list.find(d => d.symbol == props.order.symbol));
		setwithSymbol(true);setwithSignal(false); setTypeInfo(0); 
		}

	}, [props.order])


	useEffect(() => {

		if (props.token)
			logic.retrieveForexSymbols(props.token).then(c => {

				if (c.returnData) 
				if(c.returnData.length > 0) {
					setupdateDate(new Date(c.time.UTCTimestamp).toLocaleTimeString());
					setSymbols({ list: c.returnData, listBAK: c.returnData });
					if (!props.order) {

						setSymbol(c.returnData[0]);
						props.refreshOperator(cloneDeep(convertToOp(c.returnData[0]), 0));
					} else setSymbol(c.returnData.find(d => d.symbol == props.order.symbol))


				}
			})
	}, [props.token])



	return ( < div className = { props.className } >
		<FlipCard className = { classes.root }
		iLogo = { iLogo }
		updateDate = { updateDate }
		hideCard = { props.hideCard }
		idCard = { props.idCard }
		cards = { props.cards } >
		<div class = "front" >
		<input class = "headSearch"
		placeholder = "Search a figure... "
		type = "search "
		onChange = { handlerSearch }
		/>
	 
		< select class = "selectSearch "
		onChange = { handlerSelect } > 
			{
			symbols.list.map(el => {
				if (symbol && el.symbol == symbol.symbol)
					return <option selected class = { el.visible }	value = { el.symbol }	object = { el } >
                            { el.description }   {el.bid} {el.currency} 
                            </option >
					else
					return <option class = { el.visible }		value = { el.symbol }		object = { el } >
                            { el.description }   {el.bid} {el.currency}
                            </option >
			})
		}

		</select>

			<ToggleButtonGroup className="searchButton" value={typeOp} Exlusive aria-label="text alignment" >
			<ToggleButton value={0} onClick={() => {handlerOrder(symbol,0);setTypeOp(0) }} aria-label="left aligned">
				Buy 
			</ToggleButton>			
			<ToggleButton value={1} onClick={() => {handlerOrder(symbol,1);setTypeOp(1)}} aria-label="right aligned">
					Sell
			</ToggleButton>
			</ToggleButtonGroup>

			<ToggleButtonGroup  className="searchButton"   value={typeInfo} exclusive aria-label="text alignment" >
				<ToggleButton value={0} aria-label="left aligned" onClick = { ()=> { setwithSymbol(true);setwithSignal(false); setTypeInfo(0) }} >
					Info
			</ToggleButton>
			{ symbol.categoryName=='FX' &&		<ToggleButton value={1} aria-label="right aligned"onClick = { ()=> { setwithSignal(true); setwithSymbol(false); setTypeInfo(1) }} >
				Signals
			</ToggleButton>}
			</ToggleButtonGroup>
		<br/>

		{ withSignal && <Signals setRemoveOrderParam={props.setRemoveOrderParam} order={props.order}  token={props.token} symbol={symbol} refreshOperator={props.refreshOperator}></Signals>}
		{ withSymbol && <Symbol order={props.order} symbol={symbol}></Symbol> }
		</div>
		<div class = "back" >Search Info </div>
		</FlipCard > 
		</div >

	);

}
