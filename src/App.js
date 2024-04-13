import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from './Components/Navbar/Navbar';
import Landing_Page from './Components/Landing_Page/LandingPage';
import Login from './Components/Login/Login';
import Sign_Up from './Components/Sign_Up/Sign_Up';
import InstantConsultation from './Components/InstantConsultationBooking/InstantConsultation';
import Notification from './Components/Notification/Notification';
import './App.css';

function App() {
  return (
    <div className="App">
        <BrowserRouter>
            <Navbar/>
            <Notification>

              <Routes>
                <Route path="/" element={<Landing_Page/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/signup" element={<Sign_Up/>}/>
                <Route path="/instant-consultation" element={<InstantConsultation />} />
                <Route path="<component_route>" element={<component_name/>}/> 
              </Routes>
            </Notification>
        </BrowserRouter>
    </div>
  );
}
export default App;