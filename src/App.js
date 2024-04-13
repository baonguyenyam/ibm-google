import React, { useReducer } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './bootstrap/bootstrap.min.css';
import LandingPage from './Components/Landing_Page/LandingPage';
import Signin from './Components/Login/Signin';
import Signup from './Components/Sign_up/Signup';
import InstantConsultation from './Components/InstantConsultation/InstantConsultation';
import Appointments from './Components/Appointments/Appointments';
import Notification from './Components/Notification/Notification';
import Reviews from './Components/Reviews/Reviews';
import ProfileCard from './Components/ProfileCard/ProfileCard'
import HealthBlog from './Components/HealthBlog/HealthBlog';
import Navbar from './Components/Navbar/Navbar';



// een reducer "LoggedInReducer" die de state LoggedInState kan aanpassen
const initialLoggedInState = false;
const LoggedInReducer = (loggedInState,action) => {
    switch (action) {
        case 'login':
            console.log("you are being logged in");
            return true;
        case 'logout':
            console.log("you are being logged out");
            return false;
        case 'reset':
            return initialLoggedInState;
        default:
            return loggedInState;
    }
}

function App() {
// we willen niet dispatchen van deze component, maar vanuit onze components
const [loggedIn, dispatch] = useReducer(LoggedInReducer,initialLoggedInState);

const isLoggedIn = sessionStorage.getItem("loggedIn") === "true";

  return (
    <div className="App">
        {/* alle components die in de AppContext.Provider zitten, kunnen aan de states die in AppContext zitten! */}
        {/* vanuit onze componenten verwijzen we naar state 'loggedIn' als 'loggedIn' en 'dispatch' is 'dispatch' */}
      
            <BrowserRouter>
                <Navbar/>
                {isLoggedIn && <Notification/>}
                <div className="content">
                        <Routes>
                            <Route exact path="/login" element={ <Signin/> }/>
                            <Route exact path="/signup" element={ <Signup/> }/>
                            <Route exact path="/" element={ <LandingPage/> }/>
                            <Route exact path="/instant-consultation" element={<InstantConsultation />} />
                            <Route exact path="/appointments" element={<Appointments />} />
                            <Route exact path="/reviews" element={ <Reviews/> }/>
                            <Route exact path="/profile" element={ <ProfileCard/> }/>
                            <Route exact path="/blog" element={ <HealthBlog/> }/>
                        </Routes>               
                </div>  
                
            </BrowserRouter>
      
        
       
    </div>
  );
}

export default App;
