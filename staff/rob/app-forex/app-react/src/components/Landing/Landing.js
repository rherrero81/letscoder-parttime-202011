import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Operations from '../Forex/Operations/Operations';
import Operator from '../Forex/Operator/Operator'
import Symbols from '../Forex/Symbols/Search'
import Login from '../Login/Login';
import SignIn from '../SignIn/SignIn';
import Menu from '../Menu/Menu';
import Home from '../Forex/Home.js'
/* export default class Login extends React.Component { */
export default function Landing(props) {

    /*   let [page, setPage] = useState(parseInt(props.navigateComponent));
      let [tokens, setTokens] = useState({}); */
    let [view, setview] = useState(props.navigateComponent);
    let [tokens, settokens] = useState({});



    const refreshState = (newpage, newtokens) => {
        setview(newpage);
        settokens(newtokens);

    }

    const changeNavigation = (newpage) => {
        setview(newpage);
    }

    const refreshToken = (newtokens) => {
        settokens(newtokens);

    }







    return ( <
            div > {
                view == 'sigin' && < SignIn changeNavigation = { changeNavigation }
                />} {
                    view == 'home' &&
                        <
                        div >
                        <
                        Menu changeNavigation = { changeNavigation }
                    /> <
                    Home token = { tokens.forex_token }
                    /> <
                    /div>
                } {
                    view == 'login' && < Login changeNavigation = { changeNavigation }
                    refreshToken = { refreshToken }
                    refreshState = { refreshState }
                    />} <
                    /div>
                );

            }