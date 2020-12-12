import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import logic from "../../../logic/index.js"
import cloneDeep from 'lodash/cloneDeep'
import Operation from '../../../logic/models/Forex/Operation.js';
/* export default class Login extends React.Component { */
export default function Operator(props) {


    let [order, setOrder] = useState(props.order);

    const handleChangeVolume = (event) => {

        let state = cloneDeep(order);
        state.volume = parseFloat(event.target.value);
        setOrder(state);
    }

    const handleChangePrice = (event) => {
        let state = cloneDeep(order);
        state.price = parseFloat(event.target.value);
        setOrder(state);
    }

    const handleChangeSl = (event) => {
        let state = cloneDeep(order);
        state.sl = parseFloat(event.target.value);
        setOrder(state);
    }

    const handleChangeTp = (event) => {
        let state = cloneDeep(order);
        state.tp = parseFloat(event.target.value);
        setOrder(state);
    }

    const saveOperation = (event) => {
        logic.registrateForexOperation(props.token, new Operation(order)).then(c => {
            if (c.order)
                props.refreshOperations(true);
            else alert(c.reason.explain);
        }).catch(e=> alert(e.message) );
    }


    useEffect(() => {

        setOrder(props.order);
    }, [props.order])


    return (
        <div className={props.className}>
            <br/><br/>
            <table>
                {order.order!=-1 && <tr> <td>Order : {order.order} </td>  </tr>}
                <tr>
                    <td> {order.cmd == 0 ? 'Buy' : 'Sell'} </td>
                </tr>
                <tr>
                    <td>Symbol : {order.symbol} </td>
                </tr>
                <tr>
                    <td>Stop Lost :
                        <input id="isl" type="number" step=".01" value={order.sl} onChange={handleChangeSl} />
                    </td>
                </tr>
                <tr>
                    <td>Take Profit :
                        <input id="itp" type="number" step=".01" value={order.tp} onChange={handleChangeTp} />
                    </td>
                </tr>
              
                {
                   order.order==-1 &&
                    <tr>
                        <td>Volume :  <input type="number" step=".01" value={order.volume} onChange={handleChangeVolume} /> </td>
                    </tr>
                }
                {
                   order.order==-1 &&
                    <tr>
                        <td>Price :  <input type="number" step=".01" value={order.price} onChange={handleChangePrice} /> </td>
                    </tr>
                }
                <tr>
                    <td>
                        <button onClick={saveOperation}>Save</button>
                    </td>
                </tr>


            </table>
        </div >

    );

}