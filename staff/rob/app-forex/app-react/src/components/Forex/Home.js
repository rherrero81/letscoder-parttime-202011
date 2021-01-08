import React, { useState, useEffect, useCallback, useRef } from "react";
import PropTypes from "prop-types";

import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';

import Login from '../Login/Login';
import SignIn from '../SignIn/SignIn';
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import update from 'immutability-helper'
import cloneDeep from 'lodash/cloneDeep'

import Card from '../UI/Card.js'

import "./Home.css";
import logic from "app-logic";
export default function Home(props) {

	let [addWidget, setaddWidget] = useState(null);
	let [order, setOrder] = useState(null);
	let [refreshOps, setrefreshOperations] = useState(false);

	let [removeOrderParam, setRemoveOrderParam] = useState();
	let [cards, setCards] = useState([])
	let refAdd = useRef(null)

	const handlerRefreshOperatation = (neworder) => {

		if (!neworder.symbol)
			neworder.symbol = order.symbol
				setOrder(neworder);
	 
	}

	const handlerRefreshOperations = (val) => {

		setrefreshOperations(val);

		 

	}

	const moveCard = useCallback(
		(dragIndex, hoverIndex) => {
			const dragCard = cards[dragIndex]
			if(hoverIndex==0)
			setCards(
				update(cards, {
					$splice: [
						[dragIndex, 1],
						[hoverIndex, 0],
					],
				}),
			); else
			setCards(
				update(cards, {
					$splice: [
						[dragIndex, 1],
						[hoverIndex, 0,dragCard],
					],
				}),
			) 

			logic.configWidgetsUser(props.token,cards.map(c=> c.type))

		}, [cards],
	)

	const addCardsType = (type,newcards)=>{
	switch (type) {
		case 1:
			newcards.push({
				id: newcards.length+1,
				type:type,
				className: "colSpan4"

			});
			break;
		case 2:
			newcards.push({
				id: newcards.length+1,
				type:type,
				className: "colSpan8"
			});
			break;
		case 3:
			newcards.push({
				id: newcards.length+1,
				type:type,
				className: "colSpan8"

			});
			break;
		case 4:
		 
				newcards.push({
					id: newcards.length+1,
					type:type,
					className: "colSpan4"

				});
			break;
		default:
			break;
		}


		return newcards; 
		}

		const handleChangeCards = (event) => {
			let newcards = cloneDeep(cards);
			addCardsType(event.target.value,newcards);


			setCards(newcards);
			logic.configWidgetsUser(props.token,newcards.map(c=> c.type))
		}


	const renderCard = (card, index) => {
		return (< Card key={card.id}
			index={index}
			id={card.id}
			type={card.type}
			body={card.body}
			moveCard={moveCard}
			className={card.className}
			token={props.token} 
			order={order}
			refreshOps={refreshOps} 
			refreshOperations={handlerRefreshOperations} 
			refreshOperator={handlerRefreshOperatation}
			removeOrderParam={removeOrderParam}
			setRemoveOrderParam={setRemoveOrderParam}
		/>
		)
	}


	useEffect(() => {
		let newcards = [];
		if (props.token) {
			if (cards.length == 0)
			{

				newcards.push({
					id: 0,
					type:0,
					className: "" 
				});

				if( props.config)
				props.config.forEach(etype=>{
					addCardsType(etype,newcards);
				}) 

				setCards(newcards);

			} 



		}


	}, [props.token, order]);



	return (
		< div className="container--flex--row" >

			<DndProvider backend={HTML5Backend}>
				<div style={{ width: '100%', display: 'contents' }} > {cards.map((card, i) => renderCard(card, i))} </div>
			</DndProvider>


			<div className="contAddWidget">
				<Fab size="small" color={'lightgrey'} aria-label="add" >
					<AddIcon />
				</Fab>
				<Select ref={refAdd} value={addWidget} onChange={handleChangeCards} label="Add Widget" >
					<MenuItem value={1}>Searcher symbols & signals</MenuItem>
					<MenuItem value={2}>Interactive Charts </MenuItem>
					<MenuItem value={3}>Operations Manager</MenuItem>
					<MenuItem value={4}>Operator form </MenuItem>
				</Select>

			</div>

		</div>
	);

}
