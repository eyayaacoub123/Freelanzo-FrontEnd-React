import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom instead of NavLink
import './NavbarFreelancer.css';
import 'bootstrap/dist/css/bootstrap.min.css';


function Navbar() {
  // Function to handle click on navbar links

  return (
    <nav className="navbar navbar-expand-lg navbar-light custom-navbar">
      <Link className="navbar-brand" to="/">
        <img src="your-logo.png" width="30" height="30" className="d-inline-block align-top" alt="Logo" />
      </Link>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
        aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav mx-auto">
          <li className="nav-item">
            <Link to="/freelancer" className="nav-link" id="about">About</Link>
          </li>
          <li className="nav-item">
            <Link to="/portfolio" className="nav-link" id="portfolio">Portfolio</Link>
          </li>
          <li className="nav-item">
            <Link to="/getintouch" className="nav-link" id="getintouch">Get In Touch</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
