import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
const CurencyChange = () => {
        const { currency } = useContext(AppContext);
        const [newCurrency, setNewCurrency] = useState(currency);
        const handleCurrencyChange = (event) => {
            setNewCurrency(event.target.value);
        }
    return (
        <>
        <div className='alert alert-secondary'>
        <span>Currency:</span>
        <select className="custom-select" id="inputGroupSelect01" onChange={handleCurrencyChange}>
            <option defaultValue>Choose...</option>
            {(newCurrency === 'USD') ? <option value="USD" selected>$ Dollar</option> : <option value="USD">$ Dollar</option>}
            {/* <option value="GBP" name="GBP">£ Pound</option>
            <option value="EUR" name="EUR">€ Euro</option>
            <option value="INR" name="INR">₹ Ruppee</option> */}
            {(newCurrency === 'GBP') ? <option value="GBP" selected>£ Pound</option> : <option value="GBP">£ Pound</option>}
            {(newCurrency === 'EUR') ? <option value="EUR" selected>€ Euro</option> : <option value="EUR">€ Euro</option>}
            {(newCurrency === 'INR') ? <option value="INR" selected>₹ Ruppee</option> : <option value="INR">₹ Ruppee</option>}
        </select>
        </div>
        </>
    );
};
export default CurencyChange;