import React from 'react';
import Navbar from './NavbarFreelancer/NavbarFreelancer';
import './Freelancer.css';
import Background from '../Background/Background';
import HomeIcon from '@mui/icons-material/Home';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom instead of NavLink


const Freelancer = () => {

    return (
        <div> 
        <Navbar />
        <Background />
            <div className='aboutfreelancer'>
            <Link to="/"><a style={{ textDecoration: 'none', color: 'inherit' }}>
                <HomeIcon sx={{ fontSize: 40, color: '#0A1D56' }} />
            </a></Link>
                <div className="container d-flex justify-content-center align-items-center h-100 section1">
                    <div className="row">
                        <div id="domain" className="col-md-6 text-center">
                            {/* Centered content */}
                            <h1>Domain</h1>
                            <p>
                                Here goes your job description. You can add multiple paragraphs or additional details as needed.
                            </p>
                            <a href="path/to/your/cv.pdf" download>
                                <button id="download">Download CV</button>
                            </a>
                        </div>
                        <div className="col-md-6 text-center">
                            {/* Centered content */}
                            <img id="img" src={require('./img/discordhoto.png').default} alt="Image description" style={{ maxWidth: '80%' }} />
                        </div>
                    </div>
                </div>
                <div className="container mt-5 section2">
                    <div className="row mt-5">
                        <div className="col-lg-6">
                            <h1>Diplômes</h1>
                        </div>
                        <div className="col-lg-6">
                            <ul>
                                <li>Titre du diplôme 1</li>
                                <li>Titre du diplôme 2</li>
                                <li>Titre du diplôme 3</li>
                                <li>Titre du diplôme 4</li>
                                {/* Add more diploma titles as needed */}
                            </ul>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-6">
                            <h1>Skills</h1>
                        </div>
                        <div className="col-lg-6">
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="card mb-3">
                                        <div className="card-body">
                                            <h5 className="card-title">HTML</h5>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="card mb-3">
                                        <div className="card-body">
                                            <h5 className="card-title">CSS</h5>
                                        </div>
                                    </div>
                                </div>
                                {/* Add more skills as needed */}
                            </div>
                        </div>
                    </div>
                    <div className="row mt-5">
                        <div className="col-lg-6">
                            <h1>My Journey</h1>
                        </div>
                        <div className="col-lg-6">
                            <div className="card">
                                <div className="card-body">
                                    <p>Texte du paragraphe pour décrire votre parcours.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mb-5"></div>
                    <div className="row">
                        <div className="col-lg-6">
                            <h1>Languages</h1>
                        </div>
                        <div className="col-lg-6">
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="card mb-3">
                                        <div className="card-body">
                                            <h5 className="card-title">English</h5>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="card mb-3">
                                        <div className="card-body">
                                            <h5 className="card-title">French</h5>
                                        </div>
                                    </div>
                                </div>
                                {/* Add more languages as needed */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Freelancer;
