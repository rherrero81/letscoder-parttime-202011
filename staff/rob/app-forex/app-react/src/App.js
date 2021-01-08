import logo from './logo.svg';
import './App.css';
import './styles/General.css';
import React from "react";
import Landing from './components/Landing/Landing';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
function App() {

	return (

		<BrowserRouter>
		<Switch>
			<Route path='/' exact render={()=> <Landing navigateComponent = 'login' /> } />
			<Route path='/login' exact render={()=> <Landing navigateComponent = 'login' /> } />
			<Route path='/home' exact render={()=> <Landing navigateComponent = 'home' /> } />		 
		</Switch>
		</BrowserRouter>


			/*
		<div></div> 
	*/
		);


}

export default App;
