import React, { useContext } from 'react';
import { NavLink, Link } from 'react-router-dom';
import UserContext from './UserContext';
import './styles/Navbar.css'


const Navbar = () => {
  const { user, logoutUser } = useContext(UserContext);

  if (user) {
    return (
      <div className="Navbar">
        <div className="Navbar-Left">
          <NavLink className="Navbar-Link" id="Navbar-Home" exact to="/" >Jobify</NavLink>
        </div>
        <div className="Navbar-Right">
          <NavLink className="Navbar-Link" exact to="/jobs" >Jobs</NavLink>
          <NavLink className="Navbar-Link" exact to="/profile" >Profile</NavLink>
          <Link className="Navbar-Link" to="/" onClick={logoutUser} >Sign Out</Link>
        </div>
      </div>
    );
  }
  else {
    return (
      <div className="Navbar">
        <div className="Navbar-Left">
          <NavLink className="Navbar-Link" id="Navbar-Home" exact to="/" >Jobify</NavLink>
        </div>
        <div className="Navbar-Right">
          <NavLink className="Navbar-Link" exact to="/login" >Login</NavLink>
          <NavLink className="Navbar-Link" exact to="/signup" >Sign Up</NavLink>
        </div>
      </div>
    );
  }


}

export default Navbar;