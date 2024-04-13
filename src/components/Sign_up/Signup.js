import React, { useState } from 'react';
import './Signup.css'
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../../config';


 

const Sign_Up = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [showerr, setShowerr] = useState('');
    const navigate = useNavigate();

    const [phoneIsValid, setPhoneIsValid] = useState(true);

    const handlePhoneChange = (event) => {
        const value = event.target.value;
        // Remove any non-numeric characters from the input
        const numericValue = value.replace(/\D/g, '');
        setPhone(numericValue);

        // Check if the numeric value consists of exactly 10 digits
        setPhoneIsValid(/^\d{10}$/.test(numericValue));
    };


    // form submission and API call from server side -> establish db connection
    const register = async (e) => {
        
        e.preventDefault();
        console.log(`I will go fetch at: ${API_URL}/api/auth/register`);
                
        // API Call
        const response = await fetch(`${API_URL}/api/auth/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: name,
                email: email,
                password: password,
                phone: phone,
            }),
        });

        const json = await response.json();
        if (json.authtoken) {
            sessionStorage.setItem("auth-token", json.authtoken);
            sessionStorage.setItem("name", name);
            // phone and email
            sessionStorage.setItem("phone", phone);
            sessionStorage.setItem("email", email);
            
            // if this was a success, toggle the loggedin status to true
            alert("You were successfully registered. You are now logged in!");
            sessionStorage.setItem('loggedIn', "true"); 
            // Redirect to home page
            navigate("/");   //on directing to home page you need to give logic to change login and signup buttons with name of the user and logout button where you have implemented Navbar functionality
            
            window.location.reload();

        } else {
            if (json.errors) {
                for (const error of json.errors) {
                    setShowerr(error.msg);
                }
            } else {
                setShowerr(json.error);
            }
        }
    }; //end of "register" function

    return (
        <div className="container" style={{marginTop:'5%'}}>
            <div className="signup-grid row justify-content-center my-5">
                <div className="signup-form col-md-8 col-lg-6 col-xl-4">
                    <form method="POST" onSubmit={register}>
                        {/* name */}
                        
                        <div className="form-group mb-2">
                            <label htmlFor="name" className="form-label">Name</label>
                            <input
                                value={name}
                                onChange={(e) => setName(e.target.value)}   
                                type="text" 
                                id="name" 
                                name="name"
                                className="form-control" 
                                placeholder="Please enter your name" />
                        </div>

                        {/* email */}
                        <div className="form-group mb-2">
                                <label htmlFor="email">Email</label>
                                <input 
                                    value={email} 
                                    onChange={(e) => setEmail(e.target.value)} 
                                    type="email" 
                                    name="email" 
                                    id="email" 
                                    className="form-control" 
                                    placeholder="Enter your email" 
                                    aria-describedby="helpId" />
                                {showerr && <div className="err" style={{ color: 'red' }}>{showerr}</div>}
                        </div>
                        
                        {/* phone */}
                        
                        <div className="mb-2 form-group">
                            <label htmlFor="phone" className="form-label">Phone</label>
                            <input
                                value={phone} 
                                onChange={handlePhoneChange} 
                                type="tel" 
                                id="phone"
                                name="phone" 
                                className={`form-control ${phoneIsValid ? '' : 'is-invalid'}`}
                                placeholder="Please enter your phone number" />
                            {!phoneIsValid && <div className="invalid-feedback">Phone number must consist of exactly 10 digits</div>}
                        </div>

                        {/* password */}
                        
                        <div className="form-group mb-2">
                            <label htmlFor="password" className="form-label">Password:</label>
                            <input 
                                value={password} 
                                onChange={(e) => setPassword(e.target.value)} 
                                type="password" 
                                name="password" 
                                id="password"
                                className="passwordfield form-control" />
                            <i className="bi bi-eye-slash" id="togglePassword"></i>
                        </div>
                        

                        {/* buttons */}
                        <div className="row justify-content-center">
                            <div className="mb-1">
                                <button type="submit" className="btn btn-primary form-button">Submit</button>
                            </div>
                            <div className="mb-1">
                                <button type="reset" className="btn btn-danger form-button">Reset</button>
                            </div>
                        </div>
                        
                    </form>

                    
                        
                    {/*}
                        <div className="mb-1">
                            <button 
                                type="submit"
                                onClick = { () => appContext.dispatch('logout')} 
                                className="btn btn-secondary "> test logout </button>
                        </div>
                    */}



                </div>
            </div>
         </div>
        //Sign up role is not stored in database. You can apply logic for this according to your react code.
    );
}
export default Sign_Up;