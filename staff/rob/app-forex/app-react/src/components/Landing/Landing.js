import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Operations from '../Forex/Operations';
import Operator from '../Forex/Operator'
import Symbols from '../Forex/Search'
import Login from '../Login/Login';
import SignIn from '../SignIn/SignIn';
import Menu from '../Menu/Menu';
import Home from '../Forex/Home.js'
import { useHistory } from "react-router-dom";
/* export default class Login extends React.Component { */
export default function Landing(props) {
	let history=useHistory()

	/* let [page, setPage] = useState(parseInt(props.navigateComponent));
		let [tokens, setTokens] = useState({}); */
	let [view, setview] = useState(props.navigateComponent);
	let [tokens, settokens] = useState({});



	const refreshState = (newpage, newtokens) => {
		setview(newpage);
		settokens(newtokens);

		history.push("/home");
	}

	const changeNavigation = (newpage) => {
		setview(newpage);
	}

	const refreshToken = (newtokens) => {
		settokens(newtokens);

		history.push("/home");

	}







	return (< div > {
		view == 'sigin' && < SignIn changeNavigation={changeNavigation} />} {
			view == 'home' &&
			< div >
				< Menu className="colSpan12" changeNavigation={changeNavigation} />
				< Home token={tokens.forex_token} config={tokens.config}  />
			</div>
		} {
			view == 'login' && < Login changeNavigation={changeNavigation}
				refreshToken={refreshToken}
				refreshState={refreshState}

			/>} </div>
	);

}
