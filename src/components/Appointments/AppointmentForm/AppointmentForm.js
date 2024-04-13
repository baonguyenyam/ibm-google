import React, { useState } from 'react';


<input className="form-control bg-white datepicker" data-date-format="m/d/Y G:iK" data-enable-time="true"></input>

const AppointmentForm = ({ doctorName, doctorSpeciality, onSubmit }) => {
    const [patientName, setPatientName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedSlot, setSelectedSlot] = useState('');
  
    const handleSlotSelection = (slot) => {
      setSelectedSlot(slot);
    };
  
    //SUPER IMPORTANT MECHANISM!
    const handleFormSubmit = (e) => {
      e.preventDefault();
      console.log(`you have entered: ${patientName}, ${phoneNumber}, ${selectedDate}, ${selectedSlot}`);
      onSubmit(patientName, phoneNumber, selectedDate, selectedSlot); // Which data does the component return on submit!
      
      //setPatientName('');
      //setPhoneNumber('');
    };
  
    return (
      <form onSubmit={handleFormSubmit} className="appointment-form">
        
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            onChange={(e) => setPatientName(e.target.value)}
            value={patientName}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="phoneNumber">Phone Number:</label>
          <input
            type="tel"
            id="phoneNumber"
            onChange={(e) => setPhoneNumber(e.target.value)}
            value={phoneNumber}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="date">Date of Appointment:</label>
          <input 
                className="form-control bg-white datepicker" 
                data-date-format="m/d/Y G:iK" 
                data-enable-time="true"
                onChange={(e) => setSelectedDate(e.target.value)}
                value={selectedDate}
                required
                type="date"
                id="date">
            </input>
          
        </div>

        <div className="form-group">
            <label htmlFor="timeSlot">Pick a timeslot:</label>
            <div className="dropdown">
                <select 
                    className="form-control" 
                    name="selectSlot"
                    onChange={(e) => setSelectedSlot(e.target.value)}
                    value={selectedSlot}
                    required
                    type="date"
                    id="date">
                        <option value="09:00 AM" >09:00 AM</option>
                        <option value="11:15 AM">11:15 AM</option>
                        <option value="11:45 AM">11:45 AM</option>
                        <option value="02:30 PM">02:30 PM</option>
                        <option value="03:00 PM">03:00 PM</option>
                        <option value="04:15 PM">04:15 PM</option>
                </select>
            </div>
        </div>
        <button type="submit">Book Now</button>
      </form>
    );
  };

export default AppointmentForm
