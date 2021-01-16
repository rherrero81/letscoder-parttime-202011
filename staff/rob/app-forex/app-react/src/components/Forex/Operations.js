import React, { useState, useEffect, useContext, useReducer, useCallback } from "react";
import PropTypes from "prop-types";
import "./Home.css";

import logic from "app-logic";
import cloneDeep from 'lodash/cloneDeep'
import { makeStyles } from '@material-ui/core/styles';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import FlipCard from '../UI/FlipCard.js';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import iLogo from '../../static/images/cards/operations.jpg'
/* export default class Operations extends React.Component { */
const initialState = { call: true, list_page: [], listLength: 0, list: [], profitSum: 0, profitSumConsolidated: 0, search: '', filter: 1, sort_column: '', sort_dir: 0, page_cur: 0, page_rows: 5 };
const useStyles = makeStyles({
	root: {
		maxWidth: 1000,
	},
});

export default function Operations(props) {
	let [updateDate, setupdateDate] = useState('');
	let [error, setError] = useState(null);
	let [filterType, setFilterType] = useState(null); 

	const classes = useStyles();
	const [orders, setOrders] = useReducer(logic.reduxOperations, initialState);
	var dstar = new Date();
	var dend = new Date();
	dstar.setDate(dend.getDate() - 100);

	useEffect(() => {

		const timer = setInterval(() => {
			setOrders({ type: 'recall' })
		}, 4000);
		return () => {
			clearInterval(timer);
		}
		}, []) 


	const handleChangeSearch = (event) => {
		event.preventDefault();
		setError(null);
		setOrders({ type: 'search', value: event.target.value })
	}

	const handleChangeFilter = (num) => {

		setError(null);
		setFilterType(num);
		setOrders({ type: 'filter', value: num})
	}

	const handleChangePage = (event) => {
		event.preventDefault();
		setError(null);
		setOrders({ type: 'page', value: parseInt(event.target.value) })
	}

	const handledeleteOperator = (el) => {

		logic.unregistrateForexOperation(props.token, new logic.OperationModel(el)).then(c => {
			if (c.order)
				setOrders({ type: 'recall' });
			else setError(c.error);
		});
	}

	const handleSort = (event) => {
		event.preventDefault();
		if (event.target.attributes['value'])
			if (orders.sort_column == event.target.attributes['value'].value) {
				setOrders({ type: 'sort', value: { sort_dir: !orders.sort_dir, sort_column: orders.sort_column } });
			} else {
				setOrders({ type: 'sort', value: { sort_dir: 0, sort_column: event.target.attributes['value'].value } });
			}

	}

	const getValues = (all) => {
		if(all)
		logic.retrieveForexTrade(props.token, '', 0, 0).then((operationsC) => {
			logic.retrieveForexTradeHistorical(props.token, '', dstar.getTime(), dend.getTime()).then((operationsH) => {

				if (operationsC && operationsH)
				{
					setupdateDate(new Date(operationsH.time.UTCTimestamp).toLocaleTimeString());
					setOrders({ type: 'lists', value: { list: [...operationsC.returnData, ...operationsH.returnData] } });
				}

			});
		});
		else 
		logic.retrieveForexTrade(props.token, '', 0, 0).then((operationsC) => {

			setupdateDate(new Date(operationsC.time.UTCTimestamp).toLocaleTimeString());
			if (operationsC )
				setOrders({ type: 'lists_c', value: { list: [...operationsC.returnData ] } });

		}); 
	}

	useEffect(() => {

		if(props.removeOrderParam)
		orders.list.filter(c=> c.cmd==props.removeOrderParam.cmd && c.symbol==props.removeOrderParam.symbol && !c.closed)
		.map(d=>{
			handledeleteOperator(d);
		});

	}, [props.removeOrderParam]);

	useEffect(() => {
		if (props.token && (orders.call || props.refreshOps)) {
			setError(null);
			props.refreshOperations(false);
			setOrders({ type: 'stopcall' });
			getValues(true);

	}
	}, [orders.call, props.refreshOps, props.token]);




	return (

		< div className = { props.className } >
		< FlipCard className = { classes.root }
		iLogo = { iLogo }
		updateDate = { updateDate }
		hideCard = { props.hideCard }
		IdCard = { props.IdCard }
		cards = { props.cards } >
		< div class = "front" >
		< input class = "headSearch"
		placeholder = "Search a symbol..."
		type = "search"
		value = { orders.search }
		onChange = { handleChangeSearch }
		/>


<ToggleButtonGroup className="searchButton" value={filterType} exclusive aria-label="text alignment" >
	<ToggleButton value={1} aria-label="left aligned" onClick = { ()=> { handleChangeFilter(1); }} >
	Just Open
	</ToggleButton>
		<ToggleButton value={2} aria-label="right aligned"onClick = { ()=> {handleChangeFilter(2); }} >
		Just Closed
	</ToggleButton>
	<ToggleButton value={0} aria-label="right aligned"onClick = { ()=> { handleChangeFilter(0); }} >
	All
	</ToggleButton>
	</ToggleButtonGroup>


		<div className="formTable" >
			<div className="formTable-summary">
			< span > Profit: <label className={orders.profitSum_dir?'numberColor'+orders.profitSum_dir.toString():''}>{ orders.profitSum } </label> cur. / { orders.profitSumConsolidated } cons. 
		</span> 

			</div>

		< table className="formTable-table" >
	< thead >
	< th onClick = { handleSort }
	value = 'order' > Order < span > { orders.sort_column == 'order' ? orders.sort_dir == 0 ? '^' : 'v' : '' } </span> </th >
	< th onClick = { handleSort }
	value = 'open_timeString' > OpenDate < span > { orders.sort_column == 'open_timeString' ? orders.sort_dir == 0 ? '^' : 'v' : '' } </span></th >
	< th onClick = { handleSort }
	value = 'symbol' > Symbol < span > { orders.sort_column == 'symbol' ? orders.sort_dir == 0 ? '^' : 'v' : '' } </span> </th >
	< th onClick = { handleSort }
	value = 'cmd' > Op < span > { orders.sort_column == 'cmd' ? orders.sort_dir == 0 ? '^' : 'v' : '' } </span> </th >
	< th onClick = { handleSort }
	value = 'value' > Ini < span > { orders.sort_column == 'value' ? orders.sort_dir == 0 ? '^' : 'v' : '' } </span> </th >
	< th onClick = { handleSort }
	value = 'sl' > SL < span > { orders.sort_column == 'sl' ? orders.sort_dir == 0 ? '^' : 'v' : '' } </span> </th >
	< th onClick = { handleSort }
	value = 'tp' > TP < span > { orders.sort_column == 'tp' ? orders.sort_dir == 0 ? '^' : 'v' : '' } </span> </th >
	< th onClick = { handleSort }
	value = 'close_price' > Last < span > { orders.sort_column == 'close_price' ? orders.sort_dir == 0 ? '^' : 'v' : '' } </span> </th >
	< th onClick = { handleSort }
	value = 'profit' > Profit < span > { orders.sort_column == 'profit' ? orders.sort_dir == 0 ? '^' : 'v' : '' } </span> </th >
	< th > </th> </thead >
		< tbody > {
			orders.list_page.map(el =>
				< tr >
				< td > { el.order } </td> < td > { el.open_timeString } </td > < td > { el.symbol } </td> < td > { logic.OperationModel.prototype.getCMDLabel(el.cmd) } </td >
				< td > { el.open_price } </td> < td > { el.sl } </td > < td > { el.tp } </td> <td > { el.close_price } </td > < td className={el.profit_dir?'numberColor'+el.profit_dir.toString():''} > { el.profit } </td>
					< td > {!el.close_time && < button className='button button--save' onClick = {
					() => props.refreshOperator(el)
					} > Edit </button>} {!el.close_time && < button className='button button--save' onClick = {
					() => handledeleteOperator(el)
				} > Close </button>} </td > </tr>

			)
	} < tr > < td colSpan = "10" > {
		orders.listLength / orders.page_rows > 1 ?
		< div className="formTable-pagging" >
			< button className='button button--save' onClick = { handleChangePage } value = "-1" > Prev. </button> 
			< button className='button button--save' onClick = { handleChangePage } value = "1" > Next. </button>

			<label> Page { orders.page_cur + 1 } / </label>
			{Math.ceil(orders.listLength / orders.page_rows) } 

				<label> of </label> { orders.listLength }
					</div >
	: null
} </td></tr >
</tbody> </table> 
	</div>

{error && <label className="label--error label--error--top">{error.toUpperCase()}</label>}
</div>
<div class="back">Info Operations</div >
</FlipCard> </div>


);

}
