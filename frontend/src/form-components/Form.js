// External dependencies
import React from 'react';
// Components
import TextInput from '../form-components/TextInput';
import PasswordInput from '../form-components/PasswordInput';
import Alert from '../form-components/Alert';
// Styles
import '../styles/Form.css'

const Form = (props) => {
  const { formData, setFormData, INITIAL_DATA } = props;
  const { messages, setMessages } = props;
  const { textInputs, passwordInputs, title, buttonLabel } = props;
  const { handleFormSubmit } = props;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData(formData => ({
      ...formData,
      [name]: value
    }));
  }

  const resetForm = () => {
    setMessages([]);
    setFormData(INITIAL_DATA);
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    resetForm();
    handleFormSubmit();
  }


  return (
    <>
      <div className="Form">
        <Alert alerts={messages} />
        <h1>{title}</h1>
        <form onSubmit={handleSubmit}>
          {textInputs.map(input => (
            <TextInput key={input.name} name={input.name} label={input.label} handleChange={handleChange} formData={formData} value={input.value ? input.value : null} />
          ))}
          {passwordInputs.map(input => (
            <PasswordInput key={input.name} name={input.name} label={input.label} handleChange={handleChange} formData={formData} />
          ))}
          <button className="Form-Submit">{buttonLabel}</button>
        </form>
      </div>
    </>
  );
}

export default Form;