import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import { GoogleLogin } from '@react-oauth/google'; // For Google login
import { useDispatch } from 'react-redux';
import { setUser } from '../../redux/userSlice'; // Assume this action sets user in the redux store

const Registration = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Handle email/password form submission
  const handleEmailPasswordSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Email and Password are required.');
      return;
    }
    try {
      // Simulate API call
      const response = await fakeApiRegister(email, password);
      dispatch(setUser(response.data)); // Save user in redux store
      navigate('/'); // Redirect to home page after successful registration
    } catch (error) {
      setError('Registration failed. Please try again.');
    }
  };

  // Simulate API call for email/password registration (replace with actual API)
  const fakeApiRegister = (email, password) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ data: { email } });
      }, 1000);
    });
  };

  // Handle Google login success
  const handleGoogleLoginSuccess = (response) => {
    // Process the Google login token, send it to the backend for validation
    console.log(response);
    const userData = { email: 'user@google.com' }; // Simulate user data from Google
    dispatch(setUser(userData)); // Save user in redux store
    navigate('/'); // Redirect to home page
  };

  // Handle Google login failure
  const handleGoogleLoginFailure = (error) => {
    console.error('Google Login Error:', error);
    setError('Google login failed. Please try again.');
  };

  return (
    <div className="registration-page">
      <h2>Register</h2>
      <form onSubmit={handleEmailPasswordSubmit} className="registration-form">
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {error && <p className="error">{error}</p>}

        <button type="submit">Register</button>
      </form>

      <div className="social-login">
        <p>Or register with:</p>
        {/* Google login */}
        {/* <GoogleLogin
          onSuccess={handleGoogleLoginSuccess}
          onError={handleGoogleLoginFailure}
          useOneTap
        /> */}
        
        {/* You can integrate other social logins (Apple, Facebook, Instagram, LinkedIn) here similarly */}
      </div>
    </div>
  );
};

export default Registration;