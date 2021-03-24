import React from 'react';
import './Input.css'

const TextInput = ({ formData, name, label, handleChange, value }) => {
  return (
    <div className="Input">
      <label htmlFor={name}>{label}</label>
      <input type="text" id={name} name={name} onChange={handleChange} value={value ? value : formData[name]} required />
    </div>
  );
}

export default TextInput;