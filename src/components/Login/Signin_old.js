import React, { useState } from 'react';

import './Signin.css'; // Import your custom CSS file
import { Link } from 'react-router-dom';

const Signin = () => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');

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
        <div className="text-center mt-5 pt-5">
          <h2>Log In</h2>
          <p>Are you a new member? <Link to="/signup" className="form-link">Sign up here!</Link></p>
        </div>

        <div className="row justify-content-center my-4">
          <div className="col-lg-6">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email address:</label>
                <div className="input-group">
                  <input
                    type="text"
                    id="email"
                    className="form-control"
                    placeholder="Please enter your e-mail address"
                    value={email}
                    onChange={handleEmailChange}
                    required
                  />
                </div>
                {emailError && <div className="text-danger">{emailError}</div>}
              </div>

              <div className="mb-3">
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

            <p id="forgotpassword">Forgot Password?</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signin;
