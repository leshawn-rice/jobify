// External dependencies
import React, { useContext, useState } from 'react';
import { Redirect } from 'react-router-dom';
// Internal dependencies
import JoblyApi from '../api';
// Components
import Form from '../form-components/Form';
import UserContext from '../UserContext';
// Styles
import '../styles/Form.css'

const Signup = () => {
  const INITIAL_DATA = {
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    email: ''
  }

  const { user } = useContext(UserContext);
  const [formData, setFormData] = useState(INITIAL_DATA);
  const [messages, setMessages] = useState([]);
  const { loginUser } = useContext(UserContext);

  if (user) {
    return <Redirect to="/" />
  }

  const handleErrors = (errs) => {
    const errors = []
    for (let err of errs) {
      err = err.replace('instance.', '');
      errors.push({ message: err, type: 'Error' });
    }
    setMessages(messages => errors);
  }

  const registerUser = async () => {
    const { username } = formData
    try {
      let token = await JoblyApi.register(formData);
      loginUser(token, username);
    }
    catch (err) {
      handleErrors(err)
    }
  }

  const textInputs = [{ name: 'firstName', label: 'First Name' }, { name: 'lastName', label: 'Last Name' }, { name: 'email', label: 'Email' }, { name: 'username', label: 'Username' }]
  const passwordInputs = [{ name: 'password', label: 'Password' }]


  return (
    <Form
      INITIAL_DATA={INITIAL_DATA}
      textInputs={textInputs}
      passwordInputs={passwordInputs}
      title="Sign Up"
      buttonLabel="Sign up!"
      formData={formData}
      setFormData={setFormData}
      messages={messages}
      setMessages={setMessages}
      handleFormSubmit={registerUser} />
  );
}

export default Signup;