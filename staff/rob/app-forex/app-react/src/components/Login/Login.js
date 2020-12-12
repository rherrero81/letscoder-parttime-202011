import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "./template.css";
import logic from "../../logic/index.js";

/* export default class Login extends React.Component { */
export default function Login(props) {

    let [credential, setcredential] = useState({ login: '', password: '' });
    let [error, seterror] = useState('');

    const authenticate = () => {
        logic.authenticateUser(credential.login, credential.password).then((c) => {
            if (c.token) {
                logic.retrieveUser(c.token).then(cc => {
                    logic.retrieveForexToken(credential.login, credential.password, 'demo').then(ccc => {
                        c.forex_token = ccc;
                        props.refreshState('home', c);
                        /*    props.refreshToken(c);
                           props.changeNavigation(2); */
                    });

                });

            } else {
                seterror(c);
            }

        })

    };

    const handleChangeU = (event) => {
        setcredential({ login: event.target.value, password: credential.password });
    }

    const handleChangeP = (event) => {
        setcredential({ login: credential.login, password: event.target.value });
    }


    return ( <
        div id = "log-in"
        className = "container container--flex--column" >
        <
        br / >
        <
        label className = "label label--title" > Login < /label> <
        input id = "iU"
        className = "input input--text"
        type = "text"
        required value = { credential.login }
        onChange = { handleChangeU }
        /> <
        br / >
        <
        label className = "label label--title" > Password < /label> <
        input id = "iP"
        type = "password"
        className = "input input--password"
        required value = { credential.password }
        onChange = { handleChangeP }
        /> <
        br / > { /*   <button id="bOk" className="button button--save"  onClick={()=>props.changeNavigation(2)}> OK </button> */ } <
        button id = "bOk"
        className = "button button--save"
        onClick = { authenticate } > OK < /button> <
        br / >
        <
        button id = "bR"
        className = "button button--register"
        onClick = {
            () => props.changeNavigation('home')
        } > SIGN IN < /button> <
        br / >
        <
        label id = "lError"
        className = "label label--error" > { error } < /label>

        <
        /div >
    );

}