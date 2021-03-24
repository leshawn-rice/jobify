import { useState, useContext } from "react";
import { Redirect, useHistory } from "react-router";
import userContext from '../UserContext';
import JoblyApi from '../api';
import Form from '../form-components/Form';

import '../styles/Profile.css';

const Profile = () => {
  const { user, editUser } = useContext(userContext);
  const history = useHistory();

  const INITIAL_DATA = {
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    password: '',
  }

  const [formData, setFormData] = useState(INITIAL_DATA);
  const [messages, setMessages] = useState([]);

  if (!user) {
    console.log('Redirecting');
    return (
      <Redirect to="/" />
    )
  }

  const handleErrors = (errs) => {
    const errors = []
    for (let err of errs) {
      err = err.replace('instance.', '');
      if (err === 'Invalid username/password') {
        err = 'Invalid password';
      }
      errors.push({ message: err, type: 'Error' });
    }
    setMessages(messages => errors);
  }


  const authenticateUser = async () => {
    const { password } = formData
    const username = user.username;
    try {
      await JoblyApi.login({ username, password });
      return true;
    }
    catch (err) {
      handleErrors(err)
      return false;
    }
  }

  const handleSubmit = async () => {
    if (await authenticateUser()) {
      delete formData.password;
      editUser(formData);
      history.push('/');
    }
  }

  const textInputs = [
    { name: 'firstName', label: 'First Name' },
    { name: 'lastName', label: 'Last Name' },
    { name: 'email', label: 'Email' },
  ];

  const passwordInputs = [
    { name: 'password', label: 'Confirm password to make changes' }
  ];

  return (
    <div className="Profile">
      <Form
        formData={formData}
        setFormData={setFormData}
        INITIAL_DATA={INITIAL_DATA}
        textInputs={textInputs}
        passwordInputs={passwordInputs}
        title="Edit Profile"
        buttonLabel="Save Changes"
        handleFormSubmit={handleSubmit}
        messages={messages}
        setMessages={setMessages}
      />
    </div>
  );
}

export default Profile;