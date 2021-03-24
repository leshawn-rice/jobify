import React, { useState } from 'react';
import './Input.css'

const PasswordInput = ({ formData, name, label, handleChange }) => {
  const [passwordType, setPasswordType] = useState('password');
  const [revealIcon, setRevealIcon] = useState('fa-eye-slash');

  const togglePassword = () => {
    if (passwordType === 'password') {
      setPasswordType(type => 'text');
      setRevealIcon(icon => 'fa-eye');
    }
    else {
      setPasswordType(type => 'password');
      setRevealIcon(icon => 'fa-eye-slash');
    }
  }


  return (
    <div className="Input">
      <label htmlFor={name}>{label}</label>
      <div className="Password">
        <input type={passwordType} id={name} name={name} onChange={handleChange} value={formData[name]} required />
        <span onClick={togglePassword}><i className={`fas ${revealIcon}`}></i></span>
      </div>
    </div>
  );
}

export default PasswordInput;