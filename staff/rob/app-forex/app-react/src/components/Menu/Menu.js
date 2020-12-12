import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
 import Operations from '../Forex/Operations/Operations';
/* export default class Login extends React.Component { */
export default function Menu(props) {
    const [showVMenu, setshowVMenu] = useState(false)
    const onClick = () => setshowVMenu(!showVMenu)
    return (

        <div id="wellcome">
            <div id="MenuH" class="menu menu--horizontal menu--tabcolor"  onClick={onClick}>
         <a onClick={onClick}> <img id="iMenu" class="menu--horizontal__imenu" src="../images/menu.svg" /></a>      
                <label></label> <label id="lf"></label> <label id="ll"></label>
                <img id="bKO" src="../images/logout.svg" onClick={()=>props.changeNavigation(0)}  />
            </div>
            { showVMenu ?      
            <div id="MenuV" class="menu menu--vertical menu--tabcolor   ">
                <label>Menu</label>
                <br />
                <br />
                <a class="menu--vertical__item" id="eDD">Drink Decoder</a>
                <a class="menu--vertical__item" id="eML">Maria Lunarillos</a>
                <a class="menu--vertical__item" id="eFor">Forex</a>
                <a class="menu--vertical__item" id="eHW">HotWheels</a>
            </div> : null }
       
        </div>

    );
    /*   } */
}