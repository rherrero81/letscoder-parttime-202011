import React, { useState, useEffect, useContext, useRef,useCallback } from "react";
import { useDrag, useDrop, DropTargetMonitor } from 'react-dnd'
import { XYCoord } from 'dnd-core'
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Switch from '@material-ui/core/Switch';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import RemoveIcon from '@material-ui/icons/Remove';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Fab from '@material-ui/core/Fab';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
export default function FlipCard(props) {
	let refChoose = useRef(null)
/* const ref = useRef<HTMLDivElement>(null) */
	const [isBack, setIsBack] = useState(false)
	const [state, setState] = useState({ expanded: false })

	const handleExpandChange = (expanded) => {
		setState({ expanded: expanded });
	};

	const handleIsBack = () => {
		setIsBack(!isBack);

	}





	return ( 
		<div className={isBack ? "cardContainer cardContainer--flip " :"cardContainer" }>


			<div className="cardContainer-item cardContainer-item--front">
				<Card 
					className={state.expanded ? 'controller-card expanded' : 'controller-card'}
					expandable={true}
					expanded={state.expanded}
					onExpandChange={handleExpandChange}>
					<CardActions>
					<label>{props.updateDate}</label>
						<div className="contChooseWidget">
					
						<InfoOutlinedIcon fontSize="small" color={!isBack ? "disabled" : "secondary"} onClick={handleIsBack}></InfoOutlinedIcon>
{/* 							<MoreVertIcon fontSize="small" ></MoreVertIcon>
						<Select ref={refChoose} label="Add Widget" >
					<MenuItem value={1}><InfoOutlinedIcon fontSize="small" color={!isBack ? "disabled" : "secondary"} onClick={handleIsBack}></InfoOutlinedIcon></MenuItem>

				</Select> */}
					</div>

					</CardActions>
					<CardActionArea>
						<CardMedia
							component="img"
							alt="Symbol & Signal Searcher"
							height="25"
							image={props.iLogo}
						/>

						<CardContent>
							<Typography /* className={isBack ? 'card--hidden' : ''} */variant="body2" color="textSecondary" component="p">
								{props.children[0]}
							</Typography>

						</CardContent>
					</CardActionArea>

				</Card>

				</div>

			<div className="cardContainer-item  cardContainer-item--back">
				<Card 
					className={state.expanded ? 'controller-card expanded' : 'controller-card'}
					expandable={true}
					expanded={state.expanded}
					onExpandChange={handleExpandChange}>
					<CardActions>
						{props.updateDate}
						<ArrowBackIcon fontSize="small" color={!isBack ? "disabled" : "secondary"} onClick={handleIsBack}></ArrowBackIcon>
					</CardActions>
					<CardActionArea>
						<CardMedia
							component="img"
							alt="Symbol & Signal Searcher"
							height="25"
							image={props.iLogo}
						/>

							<CardMedia className="ibackground"
								component="img"
								alt="Symbol & Signal Searcher"
								image={props.iLogo}
							/>

						<CardContent>

							<Typography /* className={isBack ? '' : 'card--hidden'} */variant="body2" color="textSecondary" component="p">
								{props.children[1]}
							</Typography>
						</CardContent>
					</CardActionArea>

				</Card>

				</div>

		</div >
	);

}

