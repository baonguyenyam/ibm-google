import React, { useState } from 'react';
import '../../bootstrap/bootstrap.min.css';
import './Signup.css'; // Import your custom CSS file
import { Link } from 'react-router-dom';

const Signup = () => {

    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');

    const [phoneNumber, setphoneNumber] = useState('');
    const [phoneNumberError, setPhoneNumberError] = useState('');

    const handleEmailChange = (e) => {
        console.log("mail change");
        setEmail(e.target.value);
        setEmailError('');
        // Email validation regex
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

        if (!emailRegex.test(email)) {
        setEmailError('Please enter a valid email address');
        return;
        }
    };

    const handleSubmit = (e) => {
        console.log("submitted");
        e.preventDefault();
    };



  return (
    <section id="signin">
      <div className="container-xl">
        <div className="text-center mt-5 pt-1">
          <h2>Sign Up</h2>
          <p>Already a member? <Link to="/login" className="form-link">Login</Link></p>
        </div>

        <div className="row justify-content-center my-4">
          <div className="col-lg-6">
            <form onSubmit={handleSubmit}>
              <label htmlFor="role" className="form-label">Role</label>
              <div className="mb-2 input-group">
                <select className="form-select" id="role">
                  <option selected>Select role</option>
                  <option value="patient">Patient</option>
                  <option value="doctor">Doctor</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <label htmlFor="name" className="form-label">Name</label>
              <div className="mb-2 input-group">
                <input type="text" id="name" className="form-control" placeholder="Please enter your name" />
              </div>

              <label htmlFor="phone" className="form-label">Phone</label>
              <div className="mb-2 input-group">
                <input type="tel" id="phone" className="form-control" placeholder="Please enter your phone number" />
              </div>

              <label htmlFor="email" className="form-label">Email address:</label>
              <div className="input-group mb-1">
                <input 
                    type="text" 
                    id="email" 
                    className="form-control" 
                    placeholder="Please enter your e-mail address"
                    value={email}
                    onChange={handleEmailChange}
                    required />
              </div>
              <div className="input-group mb-3">
                {emailError && <div className="text-danger">{emailError}</div>}
              </div>
              

              <div className="mb-2">
                <label htmlFor="password" className="form-label">Password:</label>
                <div className="input-group">
                  <input type="password" name="password" id="password" className="passwordfield form-control" />
                  <i className="bi bi-eye-slash" id="togglePassword"></i>
                </div>
              </div>

              <div className="row justify-content-center">
                <div className="mb-1">
                  <button type="submit" className="btn btn-primary form-button">Submit</button>
                </div>
                <div className="mb-1">
                  <button type="reset" className="btn btn-danger form-button">Reset</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signup;
