import React, { useContext, useState, useEffect } from 'react';
import { AppContext } from '../context/AppContext';
const Location = () => {
  const {dispatch, currency } = useContext(AppContext);
  const [getMyCurrency, setMyCurrency] = useState(currency);

  useEffect(() => {
    setMyCurrency(currency);
  }, [currency]);

  const changeLocation = (event)=>{
      dispatch({
          type: 'CHG_CURRENCY',
          payload: event.target.value
      })
      setMyCurrency(event.target.value);
  }
    
  return (
        <div className='alert alert-secondary'> Location {
          <select name="location" id="location" onChange={changeLocation}>
            {(getMyCurrency === "£") ? <option value="£">£ Pound</option> : <option value="£">£ Pound</option>}
            {(getMyCurrency === "€") ? <option value="€">€ Euro</option> : <option value="€">€ Euro</option>}
            {(getMyCurrency === "$") ? <option value="$">$ Dollar</option> : <option value="$">$ Dollar</option>}
            {(getMyCurrency === "₹") ? <option value="₹">₹ Rupee</option> : <option value="₹">₹ Rupee</option>}
          </select>	
        }	
      </div>
    );
};
export default Location;