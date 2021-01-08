import React, { useState, useEffect, useContext, useRef,useReducer } from "react";
import PropTypes from "prop-types";
import logic from "app-logic"
import cloneDeep from 'lodash/cloneDeep'
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Fab from '@material-ui/core/Fab';
import BuildIcon from '@material-ui/icons/Build';
import CircularProgress from '@material-ui/core/CircularProgress';
/* export default class Login extends React.Component { */
const initialState = { call: true, list_page: [],listLength:0, list: [], profitSum: 0, profitSumConsolidated: 0, search: '', filter: 1, sort_column: '', sort_dir: 0, page_cur: 0, page_rows: 5 };

export default function Signals(props) {
	const [loading, setLoading] = React.useState(true); 
	const [signals, setSignals] = useReducer(logic.reduxOperations, initialState);
	const [signalsall, setSignalsall] =React.useState([]);
	const [typeOp, setTypeOp] = React.useState('EMA');
	const [periodOp, setPeriodOp] = React.useState('1d'); 
	const [mediaSummary, setmediaSummary] = React.useState({summary:'', crossSMA:-1,crossEMA:-1})

	useEffect(()=>{

		setSignals({type:'list',value:{list:signalsall.filter(c=> c.type==typeOp)}})
		},[,typeOp,signalsall]) 

	useEffect(()=>{

	if(props.symbol.symbol)
	{
		setLoading(true);
	logic.retrieveForexSignalsSymbols(props.token, props.symbol.symbol).then(signalsymbols => {
		if(signalsymbols.length>0)
		logic.retrieveForexSignals(props.token, signalsymbols[0].symbol,periodOp,props.symbol.bid).then(res => {
			setSignalsall(res.list);
			setmediaSummary(res.summary);
			setLoading(false);
		})

		}); 
	}
	},[props.symbol?.symbol,periodOp])


	const handleSort = (event) => {
		event.preventDefault();
		if( event.target.attributes['value']) 
		if (signals.sort_column == event.target.attributes['value'].value) {
			setSignals({ type: 'sort', value: { sort_dir: !signals.sort_dir, sort_column: signals.sort_column } });
		} else {
			setSignals({ type: 'sort', value: { sort_dir: 0, sort_column: event.target.attributes['value'].value } });
		}

	}

	const handlerActions=(event)=>
		{
			console.log(event.target.value);
			let op=cloneDeep(props.order)
			let symbol=props.symbol.symbol;
			let cmd=-1;
			switch (event.target.value) {
				case 1:
					cmd=mediaSummary.crossSMA==1?0:mediaSummary.crossSMA==0?1:-1;
					props.setRemoveOrderParam({cmd:cmd,symbol:symbol}); 
					break;
						case 2: 

							op.cmd=mediaSummary.crossSMA;
							op.autoOp='SMA';
							props.refreshOperator(op)
					break;
						case 3: 
							cmd=mediaSummary.crossEMA==1?0:mediaSummary.crossEMA==0?1:-1;
							props.setRemoveOrderParam({cmd:cmd,symbol:symbol}); 
					break;
						case 4: 

						op.cmd=mediaSummary.crossEMA;
						op.autoOp='EMA';
						props.refreshOperator(op)
					break;

				default:
					break;
			}

		}

	return (
	<div ref={props.signals} >
		{loading && <CircularProgress className="progress" />}
		{ signalsall.length==0 && 'No Signals for symbol'}
		{ signalsall.length>0 &&
		<div>

	<Select value={typeOp} onChange={(event)=> setTypeOp(event.target.value)} >
		<MenuItem value={'SMA'}>SMA</MenuItem>
		<MenuItem value={'EMA'}>EMA </MenuItem>
		<MenuItem value={'PivotC'}>Pivot Classic </MenuItem>
		<MenuItem value={'PivotF'}>Pivot Fibonacci </MenuItem>
		<MenuItem value={'PivotCa'}>Pivot Camarilla </MenuItem>
		<MenuItem value={'PivotW'}>Pivot Woodie </MenuItem>
		<MenuItem value={'PivotD'}>Pivot Demark </MenuItem>
	</Select>

	<Select value={periodOp} onChange={(event)=> setPeriodOp(event.target.value)}> 

		<MenuItem value={'1m'}>1 min</MenuItem>
		<MenuItem value={'5m'}>5 min</MenuItem>
		<MenuItem value={'15m'}>15 min</MenuItem>
		<MenuItem value={'1h'}>1 hour</MenuItem>
		<MenuItem value={'2h'}>2 hour</MenuItem>
		<MenuItem value={'4h'}>4 hour</MenuItem> 
		<MenuItem value={'1d'}>1 day</MenuItem>
		<MenuItem value={'1w'}>1 week </MenuItem>
		<MenuItem value={'month'}>1 month </MenuItem>

	</Select>


		<table>
		<thead>
		<th onClick={handleSort} value='name' > Ind <span>{signals.sort_column == 'name' ? signals.sort_dir == 0 ? '^' : 'v' : ''}</span> </th> 
			<th onClick={handleSort} value='cmd' > Op <span>{signals.sort_column == 'cmd' ? signals.sort_dir == 0 ? '^' : 'v' : ''}</span> </th> 
			{ (typeOp=='SMA' || typeOp=='EMA')&& <th onClick={handleSort} value='price' > Value <span>{signals.sort_column == 'value' ? signals.sort_dir == 0 ? '^' : 'v' : ''}</span> </th>}
			{ typeOp.indexOf('Pivot')!=-1 && <th onClick={handleSort} value='sl' > SL <span>{signals.sort_column == 'sl' ? signals.sort_dir == 0 ? '^' : 'v' : ''}</span> </th>}
			{ typeOp.indexOf('Pivot')!=-1 && <th onClick={handleSort} value='tp' > TP <span>{signals.sort_column == 'tp' ? signals.sort_dir == 0 ? '^' : 'v' : ''}</span> </th> }
			<th> </th>
		</thead>
		<tbody>
			{
				signals.list.map(el => 
				<tr>
					<td> {el.name} </td> 
					<td> {el.cmd==1?'Sell':'Buy'} </td> 
					{ (typeOp=='SMA' || typeOp=='EMA')&& <td> {el.price} </td>}
					{ typeOp.indexOf('Pivot')!=-1 && <td> {el.sl} </td>}
					{ typeOp.indexOf('Pivot')!=-1 &&<td> {el.tp} </td>}

					<td >
					{ !el.close_time && <button className="button button--save " onClick={() => props.refreshOperator(el)} > Apply </button>} 
					</td >
				</tr>

				)
			}

		</tbody>
		</table>
{ (typeOp=='SMA' || typeOp=='EMA')&& <label><b>Media Summary :</b> {mediaSummary.summaryMA } </label> }
{typeOp.indexOf('Pivot')!=-1&&<label><b>Pivot Summary :</b> {mediaSummary.summaryP } </label> }

{
typeOp=='SMA' && mediaSummary.crossSMA!==-1 &&

<div className="contAddWidget">

<Fab size="small" color={'lightgrey'} aria-label="add" >
	<BuildIcon />
</Fab>
	<Select onChange={handlerActions} >
		<MenuItem value={1}>Close open positions wrong of SMA : {props.symbol.symbol} {mediaSummary.crossSMA==0?' Sell':mediaSummary.crossSMA==1?' Buy':''}</MenuItem>
		<MenuItem value={2}>Open position handeled by SMA : {props.symbol.symbol} {mediaSummary.crossSMA==0?' Buy':mediaSummary.crossSMA==1?' Sell':''} </MenuItem>
	</Select>
		</div>
}

{
typeOp=='EMA' && mediaSummary.crossEMA!==-1 &&
<div className="contAddWidget">

<Fab size="small" color={'lightgrey'} aria-label="add" >
	<BuildIcon />
</Fab>
	<Select onChange={handlerActions} >
		<MenuItem value={3}>Close open positions wrong way of EMA : [ {props.symbol.symbol} {mediaSummary.crossEMA==0?' Sell':mediaSummary.crossEMA==1?' Buy':''} ]</MenuItem>
		<MenuItem value={4}>Open position handeled by EMA : [{props.symbol.symbol} {mediaSummary.crossEMA==0?' Buy':mediaSummary.crossEMA==1?' Sell':''} ]</MenuItem> 
	</Select>
		</div>
}


</div> }
	</div>
);

}
