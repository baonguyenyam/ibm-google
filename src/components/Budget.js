import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
const Budget = () => {
    const { dispatch, budget, currency } = useContext(AppContext);
    const [newBudget, setNewBudget] = useState(budget);
    const handleBudgetChange = (event) => {
        setNewBudget(event.target.value);
        // SET_BUDGET
        dispatch({
            type: 'SET_BUDGET',
            payload: event.target.value
        });

    }
    return (
    <div className='alert alert-secondary d-flex'>
        <span>Budget: {currency} {budget}</span>
        <input type="number" className='form-control' step="10" value={newBudget} onChange={handleBudgetChange}></input>
    </div>
    );
};
export default Budget;