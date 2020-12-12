import React, { useState, useEffect, useContext, useRef } from "react";
import PropTypes from "prop-types";
import logic from "../../../logic/index.js"
import cloneDeep from 'lodash/cloneDeep'
import Operation from '../../../logic/models/Forex/Operation.js';
/* export default class Login extends React.Component { */
export default function Signals(props) {


    return (
        
        <div ref={props.signals}>Signals</div>

    );

}