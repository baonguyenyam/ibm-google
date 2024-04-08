
import React, { useContext } from 'react';
import { FaTimesCircle } from 'react-icons/fa';
import { AppContext } from '../context/AppContext';
const ExpenseItem = (props) => {
    const { dispatch, currency } = useContext(AppContext);
    const handleDeleteExpense = () => {
        dispatch({
            type: 'DELETE_EXPENSE',
            payload: props.id,
        });
    };
    const increaseAllocation = (name) => {
        const expense = {
            name: name,
            cost: 10,
        };
        dispatch({
            type: 'ADD_EXPENSE',
            payload: expense
        });
    }
    // Decrease
    const decreaseAllocation = (name) => {
        const expense = {
            name: name,
            cost: 10,
        };
        dispatch({
            type: 'RED_EXPENSE',
            payload: expense
        });
    }
    return (
        <tr>
            <td>{props.name}</td>
            <td>{currency} {props.cost}</td>
            <td><button className='btn btn-success' onClick={event=> increaseAllocation(props.name)}>+</button></td>
            <td><button className='btn btn-danger' onClick={event=> decreaseAllocation(props.name)}>-</button></td>
            <td><FaTimesCircle  size='2.2em' color="red" onClick={handleDeleteExpense}></FaTimesCircle></td>
        </tr>
    );
};
export default ExpenseItem;