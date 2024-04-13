import React, { useState } from 'react';
import './Form.css';

const Form = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [validations, setValidations] = useState({
    emailValid: false,
    passwordValid: false,
    confirmPasswordValid: false
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    validateField(name, value);
  };

  // Function to validate individual input fields
  const validateField = (name, value) => {
    let isValid = false;
    switch (name) {
      case 'email':
        isValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        setValidations({ ...validations, emailValid: isValid });
        break;
      case 'password':
        isValid = value.length >= 8;
        setValidations({ ...validations, passwordValid: isValid });
        break;
      case 'confirmPassword':
        isValid = value === formData.password;
        setValidations({ ...validations, confirmPasswordValid: isValid });
        break;
      default:
        break;
    }
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const { emailValid, passwordValid, confirmPasswordValid } = validations;
    if (emailValid && passwordValid && confirmPasswordValid) {
      alert('Form submitted successfully');
      setFormSubmitted(true);
    } else {
      alert('Can’t submit the form');
      setFormSubmitted(false);
    }
  };

  const { emailValid, passwordValid, confirmPasswordValid } = validations;

  return (
    <div className="form-container">
      <h2>Create an Account</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={emailValid ? 'valid' : 'invalid'}
          />
          {!emailValid && formSubmitted && <span className="error">Please enter a valid email address</span>}
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className={passwordValid ? 'valid' : 'invalid'}
          />
          {!passwordValid && formSubmitted && <span className="error">Password must be at least 8 characters long</span>}
        </div>
        <div className="form-group">
          <label>Confirm Password:</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className={confirmPasswordValid ? 'valid' : 'invalid'}
          />
          {!confirmPasswordValid && formSubmitted && <span className="error">Passwords do not match</span>}
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Form;
