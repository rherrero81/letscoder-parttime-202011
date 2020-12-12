import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Operations from '../Forex/Operations/Operations';
/* export default class Login extends React.Component { */
export default function SigIn(props) {
  
    return ( 
        <div id="sign-in" class="container container--flex--column">

    <label class="label label--title">First Name</label>
    <br/>
    <input id="iFN" class="input input--text" type="text" required />
    <br/>
    <label class="label label--title">Last Name</label>
    <br/>
    <input id="iLN" class="input input--text" type="text"  required />
    <br/>
    <label class="label label--title">Email</label>
    <br/>
    <input id="iM" class="input input--text" type="email"  required />
    <br/>
    <label class="label label--title">Login</label>
    <br/>
    <input id="iUS" class="input input--text" type="text"  required />
    <br/>
    <label class="label label--title">Password</label>
    <br/>
    <input id="iPS" type="password" class="input input--password"   />
    <br/>
    <button id="bSave" class="button button--save">SAVE</button>
    <br/>
    <button id="bRemove" class="button button--save">DELETE</button>
    <br/>
    <button id="bBack" class="button button--back" onClick={()=>props.changeNavigation(0)}>BACK</button>

    <br/>
    <label id="lErrorS" class="label label--error">Some input incomplete</label>

</div>
    );
    /*   } */
}