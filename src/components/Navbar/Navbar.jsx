import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom instead of NavLink
import './Navbar.css';

function Navbar() {
  // Function to handle click on navbar links

  return (
    <nav className="navbar navbar-expand-lg navbar-light custom-navbar">
      <Link className="navbar-brand" to="/">
      <img 
  src={require('../images/logo.png')} 
  width="30" 
  height="30" 
  style={{ borderRadius: '7px', marginLeft: '15px' }}
  className="d-inline-block align-top" 
  alt="Logo" 
/>
<span style={{ marginLeft: '10px', color:'white'}}>Freelanzo</span>
  </Link>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
        aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav mx-auto">
          <li className="nav-item">
            <Link to="/" className="nav-link" id="home" >Home</Link>
          </li>
          <li className="nav-item">
            <Link to="/About" className="nav-link" id="about">About</Link>
          </li>
          <li className="nav-item">
            <Link to="/Contact" className="nav-link" id="contact">Contact</Link>
          </li>
        </ul>
        <ul className="navbar-nav">
          <li className="nav-item special-button">
            <Link to="/Signin" className="btn btn-outline-light sign" id="signin" >Sign In</Link>
          </li>
          <li className="nav-item special-button">
            <Link to="/Signup" className="btn btn-outline-light sign" id="signup" >Sign Up</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
