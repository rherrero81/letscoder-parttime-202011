import React, { useState, useEffect, useContext, useReducer, useCallback } from "react";
import PropTypes from "prop-types";
import "./template.css";
import logic from "../../../logic/index.js";
import cloneDeep from 'lodash/cloneDeep'
import Operation from '../../../logic/models/Forex/Operation.js';
import reduxOperations from '../../../logic/operations-redux.js';
/* export default class Operations extends React.Component { */
const initialState = { call: true, list_page: [],listLength:0, list: [], profitSum: 0, profitSumConsolidated: 0, search: '', filter: 1, sort_column: '', sort_dir: 0, page_cur: 0, page_rows: 5 };


export default function Operations(props) {

    const [orders, setOrders] = useReducer(reduxOperations, initialState);
    var dstar = new Date();
    var dend = new Date();
    dstar.setDate(dend.getDate() - 10);

/*     useEffect(() => {

        const timer = setInterval(() => {
            setOrders({ type: 'recall' })
        }, 10000);
        return () => {
            clearInterval(timer);
        }
    }, []) */


    const handleChangeSearch = (event) => {
        event.preventDefault();
        setOrders({ type: 'search', value: event.target.value })
    }

    const handleChangeFilter = (event) => {
        event.preventDefault();
        setOrders({ type: 'filter', value: parseInt(event.target.value) })
    }

    const handleChangePage = (event) => {
        event.preventDefault();
        setOrders({ type: 'page', value: parseInt(event.target.value) })
    }

    const handledeleteOperator = (el) => {

        logic.unregistrateForexOperation(props.token, new Operation(el)).then(c => {
            if(c.order)
            setOrders({ type: 'recall' });
            else alert(c);
        });
    }



    const handleSort = (event) => {
        event.preventDefault();
        if( event.target.attributes['value']) 
        if (orders.sort_column == event.target.attributes['value'].value) {
            setOrders({ type: 'sort', value: { sort_dir: !orders.sort_dir, sort_column: orders.sort_column } });
        } else {
            setOrders({ type: 'sort', value: { sort_dir: 0, sort_column: event.target.attributes['value'].value } });
        }

    }

    useEffect(() => {
        if (orders.call || props.refresh) {
            props.refreshOperations(false);
            setOrders({ type: 'stopcall' })
            logic.retrieveForexTrade(props.token, '', 0, 0).then((operationsC) => {
                logic.retrieveForexTradeHistorical(props.token, '', dstar.getTime(), dend.getTime()).then((operationsH) => {

                    if(operationsC && operationsH)
                    setOrders({ type: 'lists', value: { list: [...operationsC.returnData, ...operationsH.returnData] } });

                });
            });
        }
    }, [orders.call, props.refresh]);
 



    return (

        <div className={props.className}>

            <br /><br />
            <input placeholder="Search a symbol..." type="search" value={orders.search} onChange={handleChangeSearch} />

            <button onClick={handleChangeFilter} value="1"> Just Open </button>
            <button onClick={handleChangeFilter} value="2" > Just Closed</button>
            <button onClick={handleChangeFilter} value="0" >All</button>
            < span >   Profit :   {orders.profitSum} cur.  / {orders.profitSumConsolidated} cons.</span>
            <br />
            <table>
                <thead>
                    <th onClick={handleSort} value='order' > Order <span>{orders.sort_column == 'order' ? orders.sort_dir == 0 ? '^' : 'v' : ''}</span> </th>
                    <th onClick={handleSort} value='open_timeString' > OpenDate  <span>{orders.sort_column == 'open_timeString' ? orders.sort_dir == 0 ? '^' : 'v' : ''}</span></th>
                    <th onClick={handleSort} value='symbol' > Symbol <span>{orders.sort_column == 'symbol' ? orders.sort_dir == 0 ? '^' : 'v' : ''}</span> </th>
                    <th onClick={handleSort} value='cmd' > Op <span>{orders.sort_column == 'cmd' ? orders.sort_dir == 0 ? '^' : 'v' : ''}</span> </th> 
                    <th onClick={handleSort} value='value' > Ini <span>{orders.sort_column == 'value' ? orders.sort_dir == 0 ? '^' : 'v' : ''}</span> </th>
                    <th onClick={handleSort} value='sl' > SL <span>{orders.sort_column == 'sl' ? orders.sort_dir == 0 ? '^' : 'v' : ''}</span> </th>
                    <th onClick={handleSort} value='tp' > TP <span>{orders.sort_column == 'tp' ? orders.sort_dir == 0 ? '^' : 'v' : ''}</span> </th>
                    <th onClick={handleSort} value='close_price'> Last <span>{orders.sort_column == 'close_price' ? orders.sort_dir == 0 ? '^' : 'v' : ''}</span> </th>
                    <th onClick={handleSort} value='profit' > Profit <span>{orders.sort_column == 'profit' ? orders.sort_dir == 0 ? '^' : 'v' : ''}</span> </th>
                    <th> </th>
                </thead>
                <tbody>
                    {
                        orders.list_page.map(el => 
                        <tr>
                            <td>  {el.order}  </td>
                            <td> {el.open_timeString} </td>
                            <td>  {el.symbol}  </td>
                            <td> {el.cmd==1?'Sell':'Buy'}  </td> 
                            <td> {el.open_price}  </td>
                            <td>  {el.sl} </td>
                            <td> {el.tp}  </td>
                            <td> {el.close_price}</td>
                            <td> {el.profit}  </td>
                            <td >
                            { !el.close_time &&  <button onClick={() => props.refreshOperator(el)} > Edit </button>}
                            { !el.close_time &&  <button onClick={() => handledeleteOperator(el)} > Close </button>}
                            </td >
                        </tr>

                        )
                    }
                    <tr><td colSpan="10">
                        {Math.floor(orders.listLength / orders.page_rows) > 0 ?
                            <span>Page {orders.page_cur + 1} / {Math.floor(orders.listLength / orders.page_rows) + 1} of {orders.listLength}                 <button onClick={handleChangePage} value="-1"> Prev. </button>
                                <button onClick={handleChangePage} value="1" >Next. </button> </span>
                            : null}  </td></tr>
                </tbody>
            </table>
        </div>
    );

}

