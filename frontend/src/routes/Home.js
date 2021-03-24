import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Home.css'
import UserContext from '../UserContext';

const Home = () => {
  const { user } = useContext(UserContext);

  if (!user) {
    return (
      <div className="Home">
        <h1>Jobify</h1>
        <p>Search for jobs in one, convenient place</p>
        <div className="Home-Nav">
          <button className="Home-Btn"><Link to="/login">Log in</Link></button>
          <button className="Home-Btn"><Link to="/signup">Sign up</Link></button>
        </div>
      </div>
    );
  }
  else {
    return (
      <div className="Home">
        <h1>Jobly</h1>
        <p>Search for jobs in one, convenient place</p>
        <div className="Home-Nav">
          <h2>Welcome Back, {user.firstName}</h2>
        </div>
      </div>
    );
  }

}

export default Home;