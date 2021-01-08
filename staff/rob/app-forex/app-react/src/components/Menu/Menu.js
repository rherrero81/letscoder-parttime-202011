import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Icon from '@material-ui/core/Icon';
import MenuIcon from '@material-ui/icons/Menu';
import ExitToAppOutlinedIcon from '@material-ui/icons/ExitToAppOutlined';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
/* export default class Login extends React.Component { */
export default function Menu(props) {
    const [showVMenu, setshowVMenu] = useState(false)
    const onClick = () => setshowVMenu(!showVMenu)
    return (

        <div ClassName={props.className}>             
            <div class="menu menu--horizontal menu--tabcolor" onClick={onClick}>
                <MenuIcon className="button--ini" onClick={onClick}></MenuIcon>
          
                <label></label> <label id="lf"></label> <label id="ll"></label>
              <Link to="/"> <ExitToAppOutlinedIcon onClick={() => props.changeNavigation('login')} ></ExitToAppOutlinedIcon> </Link>
             
            </div>
            { showVMenu ?
                <div class="menu menu--vertical menu--tabcolor">
                   
                 {/*    <a class="menu--vertical__item" id="eDD">Drink Decoder</a>
                    <a class="menu--vertical__item" id="eML">Maria Lunarillos</a>
                    <a class="menu--vertical__item" id="eFor">Forex</a>
                    <a class="menu--vertical__item" id="eHW">HotWheels</a> */}
                </div> : null}

        </div>

    );
    /*   } */
}