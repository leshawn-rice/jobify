import React, { useState } from 'react';
import JoblyApi from './api';
import UserContext from './UserContext';

const UserProvider = ({ children }) => {
  let userData = JSON.parse(localStorage.getItem('user'));
  const [user, setUser] = useState(userData);

  const addToLocalStorage = (user) => {
    localStorage.setItem('user', JSON.stringify(user));
  }

  const addUserToContext = (user, token) => {
    user.token = token;
    setUser(currentUser => user);
    addToLocalStorage(user);
  }

  const loginUser = async (token, username) => {
    let user = await JoblyApi.getUser(token, username);
    addUserToContext(user, token);
  }

  const logoutUser = () => {
    setUser(null);
    localStorage.removeItem('user');
  }

  const editUser = async (formData) => {
    let token = user.token;
    let newUser = await JoblyApi.patchUser(token, user.username, formData);
    addUserToContext(newUser, token);
  }

  const applyToJob = async (id) => {
    let jobId = await JoblyApi.applyToJob(user.token, user.username, id);
    user.applications.push(jobId);
    addUserToContext(user, user.token);
  }

  return (
    <UserContext.Provider value={{ user, loginUser, logoutUser, editUser, applyToJob }}>
      {children}
    </UserContext.Provider>
  )
}

export default UserProvider;