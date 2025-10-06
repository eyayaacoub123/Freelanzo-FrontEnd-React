import React from 'react';
import Navbar from './NavbarFreelancer/NavbarFreelancer';
import './Portfolio.css';
import Background from '../Background/Background';
import HomeIcon from '@mui/icons-material/Home';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom instead of NavLink


const Portfolio = () => {

    return (
        <div>
            <Navbar />
            <Background />
            <Link to="/"><a style={{ textDecoration: 'none', color: 'inherit' }}>
                <HomeIcon sx={{ fontSize: 40, color: '#0A1D56' }} />
            </a></Link><br />
            <div className='portfolio'>

                <div className="text-section">
                    <h2>Here are some models of my work</h2>
                    <div className="arrow">&#8595;</div>
                </div>
                <div className="container py-5 text-center">
                    <div id="imageCarousel" className="carousel">
                        <div className="carousel-inner">
                            <div className="carousel-item active">
                                <img src="img/discordhoto.png" className="d-block w-10 mx-auto" alt="Image 1" />
                            </div>
                            <div className="carousel-item">
                                <img src="img/logo.png" className="d-block w-10 mx-auto" alt="Image 2" />
                            </div>
                            <div className="carousel-item">
                                <img src="img/eya.jpg" className="d-block w-10 mx-auto" alt="Image 3" />
                            </div>
                            <div className="carousel-item">
                                <img src="img/logo.png" className="d-block w-10 mx-auto" alt="Image 4" />
                            </div>
                            {/* Add as many images as needed */}
                        </div>
                    </div>
                </div>
                <a href="#" className="previous round">&#8249;</a>
                <a href="#" className="next round">&#8250;</a>
            </div>
        </div>
    );
};

export default Portfolio;
