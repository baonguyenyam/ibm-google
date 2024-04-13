import React, { useEffect, useState } from 'react';

import "./Notification.css"

const Notification = ({ children }) => {

    const [username, setUsername] = useState("");
    const [appointmentData, setAppointmentData] = useState(null);
  
  useEffect( () => {
    //console.log("we reloaded the notification thingy");
    const storedUsername = sessionStorage.getItem('email');
    const storedAppointmentData = JSON.parse(sessionStorage.getItem('storedAppointments'));
    //console.log(storedAppointmentData);
    setAppointmentData(storedAppointmentData);
    
    if(storedUsername) {
      
      setUsername(storedUsername);
      //console.log("The local storage username is" + storedUsername);
      //console.log("loggedIn state var is set to" + sessionStorage.getItem('loggedIn')  );
    } 
    //else {console.log("There is no logged username")}

    if (storedAppointmentData) {
      setAppointmentData(storedAppointmentData);
    } 
    //else {console.log("There is no stored appointment data")}
  }, []);
  return (
    <div >
        
        <br/>
        <br/>
        <br/>
        
        
      {children}
      {sessionStorage.getItem('loggedIn') && appointmentData && (
        <>
           {appointmentData.map((appointment, index) => (
                    <div className="appointment-card" key={index}>
                        <div className="appointment-card__content">
                            <div className="appointment-card__title">Appointment Details</div>
                            <div className="appointment-card__message">
                                <div><strong>Date:  </strong> {  appointment.appointmentDate}</div>
                                <div><strong>Time:  </strong> {appointment.timeslot}</div> 
                                <div><strong>Patient:  </strong> {appointment.pName}</div> 
                                <div><strong>Doctor:  </strong>{appointment.dName}</div> 
                                <div><strong>Specialty:  </strong>{appointment.dSpeciality}</div> 
                            </div>
                        </div>
                    </div>
                ))}
        </>
      )}
    </div>
  );
};
export default Notification;