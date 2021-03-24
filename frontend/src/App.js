import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Navbar from './Navbar';
import Routes from './routes/Routes';
import UserProvider from './UserProvider';
import './styles/App.css';

const App = () => {

  return (
    <BrowserRouter>
      <UserProvider>
        <Navbar />
        <div className="container">
          <Routes />
        </div>
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;
