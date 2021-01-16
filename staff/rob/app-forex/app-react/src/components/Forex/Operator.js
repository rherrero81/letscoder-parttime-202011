import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { makeStyles, withStyles } from '@material-ui/core/styles';
import logic from "app-logic"
import cloneDeep from 'lodash/cloneDeep'
import "./Home.css";
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import { grey } from '@material-ui/core/colors';
import Switch, { SwitchClassKey, SwitchProps } from '@material-ui/core/Switch';
import Typography from '@material-ui/core/Typography';
import iLogo from '../../static/images/cards/operator.jpg'
import FlipCard from '../UI/FlipCard'
import GetAppIcon from '@material-ui/icons/GetApp';
import PublishIcon from '@material-ui/icons/Publish';
import MaximizeIcon from '@material-ui/icons/Maximize';

import TrendingDownIcon from '@material-ui/icons/TrendingDown';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';

const FormSwitch = withStyles({
    switchBase: {
        color: grey[300],
        '&$checked': {
            color: grey[500],
        },
        '&$checked + $track': {
            backgroundColor: grey[500],
        },
    },
    checked: {},
    track: {},
})(Switch);



const useStyles = makeStyles({
    root: {
        maxWidth: 500,
    },
});




/* export default class Login extends React.Component { */
export default function Operator(props) {
    let [error, setError] = useState(null)
    let [withPrice, setWithPrice] = useState(true)
    let [withSL, setWithSL] = useState(true)
    let [withTP, setWithTP] = useState(true)
    let [updateDate, setupdateDate] = useState('');
    let [listControls, setListControls] = useState([])
    const classes = useStyles();
    //let [order, setOrder] = useState(props.order);

    const handleChangeVolume = (event) => {

        let state = cloneDeep(props.order);
        state.volume = parseFloat(event.target.value);
        props.refreshOperator(state);
    }

    const handleChangePrice = (event) => {
        let state = cloneDeep(props.order);
        state.price = parseFloat(event.target.value);
        props.refreshOperator(state);
    }

    const handleChangeSl = (event) => {
        let state = cloneDeep(props.order);
        state.sl = parseFloat(event.target.value);
        props.refreshOperator(state);
    }

    const handleChangeTp = (event) => {
        let state = cloneDeep(props.order);
        state.tp = parseFloat(event.target.value);
        props.refreshOperator(state);
    }

    const saveOperation = (event) => {
        if (!withPrice)
            props.order.price = 0;
        if (!withSL)
            props.order.sl = 0;
        if (!withTP)
            props.order.tp = 0;
        let newop = null;
        try {
            newop = new logic.OperationModel(props.order, true);

        } catch (error) {
            setError(error.message);
        }

        if (newop.isvalid)
            logic.registrateForexOperation(props.token, newop).then(c => {
                if (c.message || c.reason) {
                    setError(c.reason ? c.reason.explain : c.message);
                } else
                    props.refreshOperations(true);

            }).catch(e => alert(e.message));
        else setError(newop.cmd % 2 == 0 ? 'Invalid limits : SL< PRICE < TP' : 'Invalid limits : SL> PRICE > TP');
    }

    const renderControls = (control) => {
        return (control);
    }

    const renderControlsSL = (hasDir) => {
            return ( < tr > < td > Stop Lost < /td> <
                    td > {
                        withSL && < input className = "formOperator-input--number"
                        id = "isl"
                        type = "number"
                        step = ".01"
                        disabled = { props.order.cmd == undefined ? true : false }
                        value = { props.order.sl }
                        onChange = { handleChangeSl }
                        />} <
                        FormSwitch color = "primary"
                        checked = { withSL }
                        onChange = {
                            () => { setWithSL(!withSL);
                                handleChangeSl({ target: { value: 0 } }) } }
                        inputProps = {
                            { 'aria-label': 'secondary checkbox' } }
                        disabled = { props.order.cmd == undefined ? true : false }
                        /> <
                        /td> {
                            hasDir && < td rowSpan = "3" > { renderControlsArrow(props.order.cmd) } <
                                /td>}</tr > );
                    }

                    const renderControlsArrow = (cmd) => {

                        return (cmd % 2 != 0 ? < div > < div className = "line line--red" > < /div><TrendingDownIcon style={{color:'$color_price', fontSize: 75 }} ></TrendingDownIcon > < div className = "line line--green" > < /div></div > : < div > < div className = "line line--green" > < /div><TrendingUpIcon style={{ color:'$color_price',fontSize: 75 }}></TrendingUpIcon > < br / > < div className = "line line--red" > < /div></div > );
                    }

                    const renderControlsTP = (hasDir) => {
                            return ( < tr > < td > Take Profit < /td> <
                                    td > {
                                        withTP && < input className = "formOperator-input--number"
                                        id = "itp"
                                        type = "number"
                                        step = ".01"
                                        disabled = { props.order.cmd == undefined ? true : false }
                                        value = { props.order.tp }
                                        onChange = { handleChangeTp }
                                        />} <
                                        FormSwitch
                                        checked = { withTP }
                                        onChange = {
                                            () => { setWithTP(!withTP);
                                                handleChangeTp({ target: { value: 0 } }) } }
                                        inputProps = {
                                            { 'aria-label': 'secondary checkbox' } }
                                        disabled = { props.order.cmd == undefined ? true : false }
                                        /> <
                                        /td> {
                                            hasDir && < td rowSpan = "3" > { renderControlsArrow(props.order.cmd) } <
                                                /td>}</tr >
                                        );
                                    }

                                    const renderControlsPrice = () => {
                                            return ( < tr > < td > Price < /td> <
                                                td > {
                                                    withPrice && < input disabled = { props.order.cmd == undefined || props.order.order != 0 ? true : false }
                                                    className = "formOperator-input--number"
                                                    type = "number"
                                                    step = ".01"
                                                    value = { props.order.price }
                                                    onChange = { handleChangePrice }
                                                    />}

                                                    <
                                                    FormSwitch
                                                    checked = { withPrice }
                                                    onChange = {
                                                        () => { setWithPrice(!withPrice);
                                                            handleChangePrice({ target: { value: 0 } }) } }
                                                    name = "checkedA"
                                                    inputProps = {
                                                        { 'aria-label': 'secondary checkbox' } }
                                                    disabled = { props.order.cmd == undefined ? true : false }
                                                    />

                                                    <
                                                    /td></tr > )

                                            }



                                            useEffect(() => {
                                                if (props.order) {
                                                    /* 	setWithSL(props.order.sl==0?false:true);	 
                                                    	setWithTP(props.order.tp==0?false:true);
                                                    	setWithPrice(props.order.price==0?false:true); */
                                                    setError(null);

                                                    if (!props.order.cmd || props.order.cmd % 2 == 0)
                                                        setListControls([renderControlsTP(true), renderControlsPrice(), renderControlsSL(false)]);
                                                    else
                                                        setListControls([renderControlsSL(true), renderControlsPrice(), renderControlsTP(false)]);


                                                }
                                            }, [props.order, withPrice, withSL, withTP])


                                            return ( <
                                                    div className = { props.className } >

                                                    <
                                                    FlipCard className = { classes.root }
                                                    iLogo = { iLogo }
                                                    updateDate = { updateDate }
                                                    hideCard = { props.hideCard }
                                                    idCard = { props.idCard }
                                                    cards = { props.cards } >
                                                    <
                                                    div className = "formOperator" >
                                                    <
                                                    table className = "formOperator-table" > { props.order.order != 0 && < tr > < td > Order: { props.order.order } < /td> </tr > } <
                                                    tr >
                                                    <
                                                    td colSpan = "3" > { props.order.cmd == undefined ? 'No Operation selected' : logic.OperationModel.prototype.getCMDLabel(props.order.cmd) } < /td> <
                                                    /tr> <
                                                    tr >
                                                    <
                                                    td > Symbol < /td> <
                                                    td > { props.order.symbol } < /td> <
                                                    /tr> { listControls && listControls.map((c) => renderControls(c)) }



                                                    {
                                                        props.order.order == 0 &&
                                                            <
                                                            tr >
                                                            <
                                                            td > Volume < /td><td>   <input  className="formOperator-input--number" type="number"  disabled={props.order.cmd==undefined?true:false}  step=".01" value={props.order.volume} onChange={handleChangeVolume} / > < /td> <
                                                            /tr>
                                                    }

                                                    <
                                                    tr >
                                                    <
                                                    td colSpan = "3" >
                                                    <
                                                    br / > {
                                                        props.order.cmd !== undefined && < button className = "button button--save button--big"
                                                        onClick = { saveOperation } > Save < /button>}

                                                        {
                                                            error && < label className = "label--error label--error--top" > { error.toUpperCase() } < /label> } <
                                                                /td> <
                                                                /tr>


                                                            <
                                                            /table>

                                                            <
                                                            /div> <
                                                            div class = "back" >
                                                                Info Operator <
                                                                /div> <
                                                                /FlipCard> <
                                                                /div>


                                                        );

                                                    }