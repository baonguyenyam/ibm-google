import React, { useState } from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import './DoctorCard.css';
import AppointmentForm from '../AppointmentForm/AppointmentForm'
import { v4 as uuidv4 } from 'uuid';


const DoctorCard = ({ name, speciality, experience, ratings, profilePic }) => {
  const [showModal, setShowModal] = useState(false);
  const [appointments, setAppointments] = useState([]);

  const handleBooking = () => {
    setShowModal(true);
  };

  const handleCancel = (appointmentId) => {
    const updatedAppointments = appointments.filter((appointment) => appointment.id !== appointmentId);
    setAppointments(updatedAppointments);

    // put the updated appointments in the local storage
    sessionStorage.setItem("storedAppointments", JSON.stringify(updatedAppointments) );

    // log to see what the appointments list becomes in storage
    console.log(sessionStorage.getItem("storedAppointments"));

  };

  //this is how we handle (and store) the data that the AppointmentForm component returns on submit! 
  const handleFormSubmit = (patientName, phoneNumber, selectedDate, selectedSlot) => {
    
    const newAppointment = {
      id: uuidv4(),
      pName: patientName,
      pPhoneNumber : phoneNumber,
      appointmentDate : selectedDate,
      timeslot : selectedSlot,
      dName : name,
      dSpeciality : speciality
    };

    const updatedAppointments = [...appointments, newAppointment];

    setAppointments(updatedAppointments);
          
    setShowModal(false);

    // put the updated appointments in the local storage
    console.log("writing appointment update to local storage");
    
    sessionStorage.setItem("storedAppointments", JSON.stringify(updatedAppointments));

    // log to see what the appointments list becomes in storage
    console.log(sessionStorage.getItem("storedAppointments"));
    
    window.location.reload();
  };

  return (
    <div className="doctor-card-container">
      <div className="doctor-card-details-container">
        <div className="doctor-card-profile-image-container">
            
        </div>
        <div className="doctor-card-details">
            <img src={`/doctor_img/${profilePic}`} className="doctor-card-pic" />
            <div className="doctor-card-detail-name">{name}</div>
            <div className="doctor-card-detail-speciality">{speciality}</div>
            <div className="doctor-card-detail-experience">{experience} years experience</div>
            <div className="doctor-card-detail-consultationfees">Ratings: {ratings}</div>
        </div>
         
      </div>


      <div className="doctor-card-options-container">
      <Popup
          style={{ backgroundColor: '#FFFFFF' }}
          trigger={
            <button className={`book-appointment-btn ${appointments.length > 0 ? 'cancel-appointment' : ''}`}>
              {appointments.length > 0 ? (
                <div>Cancel Appointment</div>
              ) : (
                <div>Book Appointment</div>
              )}
              <div>No Booking Fee</div>
            </button>
          }
          modal
          open={showModal}
          onClose={() => setShowModal(false)}
        >
          {(close) => (
            <div className="doctorbg" style={{ height: '100vh', overflow: 'scroll' }}>
              <div>
                <div className="doctor-card-profile-image-container">
                    <img src={`/doctor_img/${profilePic}`} className="doctor-card-pic" />
                </div>
                <div className="doctor-card-details">
                  <div className="doctor-card-detail-name">{name}</div>
                  <div className="doctor-card-detail-speciality">{speciality}</div>
                  <div className="doctor-card-detail-experience">{experience} years experience</div>
                  <div className="doctor-card-detail-consultationfees">Ratings: {ratings}</div>
                </div>
              </div>

              {appointments.length > 0 ? (
                <>
                  <h3 style={{ textAlign: 'center' }}>Appointment Booked!</h3>
                  {appointments.map((appointment) => (
                    <div className="bookedInfo" key={appointment.id}>
                      <p>Name: {appointment.pName}</p>
                      <p>Phone Number: {appointment.pPhoneNumber}</p>
                      <p>Date: {appointment.appointmentDate}</p>
                      <p>Timeslot: {appointment.timeslot}</p>
                      <button onClick={() => handleCancel(appointment.id)}>Cancel Appointment</button>
                    </div>
                  ))}
                </>
              ) : (
                <AppointmentForm doctorName={name} doctorSpeciality={speciality} onSubmit={handleFormSubmit} />
              )}
            </div>
          )}
        </Popup> 
      </div>
    </div>
  );
};

export default DoctorCard;
