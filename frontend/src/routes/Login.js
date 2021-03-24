// External dependencies
import React, { useState, useContext } from 'react';
// Internal dependencies
import JoblyApi from '../api';
// Components
import Form from '../form-components/Form';
import UserContext from '../UserContext';
// Styles
import '../styles/Form.css'
import { Redirect } from 'react-router';


const Login = () => {
  const INITIAL_DATA = {
    username: '',
    password: ''
  }

  const { user } = useContext(UserContext);
  const [formData, setFormData] = useState(INITIAL_DATA)
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

  const authenticateUser = async () => {
    const { username } = formData
    try {
      let token = await JoblyApi.login(formData);
      loginUser(token, username);
    }
    catch (err) {
      handleErrors(err)
    }
  }

  const textInputs = [{ name: 'username', label: 'Username' }]
  const passwordInputs = [{ name: 'password', label: 'Password' }]

  return (
    <Form
      INITIAL_DATA={INITIAL_DATA}
      textInputs={textInputs}
      passwordInputs={passwordInputs}
      title="Log In"
      buttonLabel="Login!"
      formData={formData}
      setFormData={setFormData}
      messages={messages}
      setMessages={setMessages}
      handleFormSubmit={authenticateUser} />
  );
}

export default Login;