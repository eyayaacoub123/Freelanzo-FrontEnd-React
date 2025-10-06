import React from 'react';
import Navbar from './NavbarFreelancer/NavbarFreelancer';
import Background from '../Background/Background';
import HomeIcon from '@mui/icons-material/Home';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom instead of NavLink


const Getintouch = () => {

  return (
    <div>
      <Navbar />
      <Background />
      <div className='Getintouch'>
        <Link to="/"><a style={{ textDecoration: 'none', color: 'inherit' }}>
          <HomeIcon sx={{ fontSize: 40, color: '#0A1D56' }} />
        </a></Link>    <br />
        COMING SOON / FORUM DE DISCUSSION /
      </div>
    </div>
  );
};

export default Getintouch;
