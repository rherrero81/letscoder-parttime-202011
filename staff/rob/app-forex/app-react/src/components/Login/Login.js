import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import CardMedia from '@material-ui/core/CardMedia' 
import logic from "app-logic";
import "./Login.css"

import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import iLogin from '../../static/images/login.jpg'
/* export default class Login extends React.Component { */
export default function Login(props) {

	let [credential, setcredential] = useState({ login: '', password: '' });
	let [error, seterror] = useState('');

	const authenticate = () => {
		logic.retrieveForexToken(credential.login, credential.password, 'demo').then(ccc => {

			if(ccc.error)
			seterror(ccc.error);
			else
			{
			const c = {};
			c.config = ccc.config;
			c.forex_token = ccc.token;

			props.refreshState('home', c);
			}
		});

		/* logic.authenticateUser(credential.login, credential.password).then((c) => {
			if (c.token) {
				logic.retrieveUser(c.token).then(cc => {
					logic.retrieveForexToken(credential.login, credential.password, 'demo').then(ccc => {
						c.forex_token = ccc.token;
						c.config = ccc.config;
						props.refreshState('home', c);
					});

				});

			} else {
				seterror(c);
			}

			}) */

	};

	const handleChangeU = (event) => {
		setcredential({ login: event.target.value, password: credential.password });
	}

	const handleChangeP = (event) => {
		setcredential({ login: credential.login, password: event.target.value });
	}


	return (
        <div>
	<CardMedia className={"Loginbackground"}
							component="img"
							alt="Symbol & Signal Searcher"
							height="100%"
							image={iLogin}
						/>
    < div id = "log-in"
		className = "container container--flex--column" >
            
		< br />
		< label className = "label label--title label--black" > Login </label> < input id = "iU"
		className = "input input--text"
		type = "text"
		required value = { credential.login }
		onChange = { handleChangeU }
		 
		/> < br />
		< label className = "label label--title  label--black" > Password </label> < input id = "iP"
		type = "password"
		className = "input input--password"
		required value = { credential.password }
		onChange = { handleChangeP }
		/> < br />
		 < label id = "lError" className = "label label--error" > { error.toLocaleUpperCase() } </label>  { /* <button id="bOk" className="button button--save" onClick={()=>props.changeNavigation(2)}> OK </button> */ } 
		< Link to = "/home" > < button id = "bOk" className = "button button--save button--right" onClick = { authenticate } > OK </button> </ Link >
			< br />

		< a class=" button--right" href = "https://es.xtb.com/acciones-contado-sin-comisiones-tdt-xtb?utm_source=google&utm_medium=cpc&utm_campaign=acciones_contado_sin_comision&utm_term=ES&utm_content=search&gclid=CjwKCAiA8ov_BRAoEiwAOZogwQpZ2fnUEHZz5FeI61WWIDbnfU8Fy2ZHHA8ftdnJ79cUY2k5zniYIhoC5TEQAvD_BwE"
		target = "_blank" > Sig In XTB </a> {
		/* <Link to="/sigin"> <button id="bR"
			className="button button--register"
			onClick={
				() => props.changeNavigation('sigin')
			} > SIGN IN </button></Link> < br /> */
		}</ div >

        </div>
    );

}
