import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Operations from './Operations/Operations';
import Operator from './Operator/Operator'
import Search from './Symbols/Search'
import Charts from './Charts/Charts'
import Login from '../Login/Login';
import SignIn from '../SignIn/SignIn';
import Menu from '../Menu/Menu';
/* export default class Login extends React.Component { */
export default function Home(props) {
  let [order, setOrder] = useState(null);
  let [refreshOp, setrefreshOperations] = useState(false);
  

  const handlerRefreshymbol = (neworder) => {
    setOrder(neworder);

  }


  const handlerRefreshOperator = (neworder) => {
    
    setOrder(neworder);
  }

  const handlerRefreshOperations = (val) => {

    setrefreshOperations(val);
    console.log(refreshOp);
  }

  return (
    < div className="container--flex--row" >
      < Menu changeNavigation={props.changeNavigation} />

      {props.token && <Search className="colSpan4" token={props.token}  refreshOperator={handlerRefreshOperator} refreshSymbol={handlerRefreshymbol} />}
      {props.token && order  && <Charts className="colSpan8" token={props.token}  order={order}  refreshOperator={handlerRefreshOperator} />}
      {props.token && <Operations className="colSpan8" refresh={refreshOp} token={props.token} refreshOperations={handlerRefreshOperations} refreshOperator={handlerRefreshOperator} />}
      {props.token && order && <Operator className="colSpan4" token={props.token} order={order} refreshOperations={handlerRefreshOperations} refreshSymbol={handlerRefreshymbol} />}
    </div>
  );

}