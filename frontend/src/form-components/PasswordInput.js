import React from 'react';
import './Input.css'

const PasswordInput = ({ formData, name, label, handleChange }) => {
  return (
    <div className="Input">
      <label htmlFor={name}>{label}</label>
      <input type="password" id={name} name={name} onChange={handleChange} value={formData[name]} required />
    </div>
  );
}

export default PasswordInput;