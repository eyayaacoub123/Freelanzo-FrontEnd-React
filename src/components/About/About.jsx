import React from 'react';
import './About.css'; // Make sure to import your CSS file
import Background from '../Background/Background.jsx';
import Navbar from '../Navbar/Navbar.jsx'
import Footer from '../Footer/Footer.jsx';
import Aboutusphoto from '../images/aboutus.png';
import pointing from '../images/lead.png';

function About() {
    return (
        <div className='About'>
            <Navbar />
            <Background />
            <div className="container">
                <section>
                    <div className="container">
                        <h2 className="section-title">About Us</h2>
                        <br /><br /><br />
                    </div>
                    <div className="container description-frame">
                        <p>                     Founded with a vision to empower freelance professionals and clients alike. Our mission is to provide a dynamic environment where every member can achieve their fullest potential. With a core team of innovators and educators, we uphold values of integrity, respect, and excellence in all our interactions. Learn more about our journey, the people behind Freelanzo, and our commitment to making professional development accessible to everyone.
                        </p>
                    </div>
                    <img className='Aboutusphoto' src={Aboutusphoto} alt="GIF" />
                    <br /><br /><br /><br /><br />
                    { /* <img  src={require('../images/whoo.png')} style={{width:'300px', height:'300px',marginLeft:'-1000px'}}/>
*/} <div className="down-arrow-container">
                        <div className="down-arrow"></div>
                    </div>

                </section>
                <br /><br />
                <section id="leadership">
                    <div className="container">
                        <h2 className="section-title" >Leadership</h2>
                        <br /><br />
  
                    </div>
                    <div className='leaders-container'>
                        <div className="leader ">
                            <img src={require('../images/yass.jpg')} alt="Leader 1" />
                            <div className="info">
                                <h3>Yasmine Douik</h3>
                                <p>FullStack-Developer</p>
                            </div>
                        </div>
                        <div className="leader">
                            <img src={require('../images/eya.jpg')} alt="Leader 2" />
                            <div className="info">
                                <h3>Eya Yaccoub</h3>
                                <p>FullStack-Developer</p>
                            </div>
                        </div>
                    </div>
                    <img className='pointingphoto' src={pointing} />
                </section>
                <br /><br /><br /><br /><br /><br />
                <section id="osophy" style={{marginBottom:'200px'}}>
                    <div className="container" >
                        <h2 className="section-title" style={{ marginTop: '-50px'}}>Our Philosophy</h2>
                        <section id="phrases">
                            <div className="container">
                                <div className="phrase">
                                    <h5><strong>Accomplish the Work</strong></h5>
                                    <p>We are committed to the success of every project and do not take shortcuts. We have a unique process
                                        and the discipline to follow it.</p>
                                </div>
                                <div className="phrase">
                                    <h5><strong>Invest In</strong></h5>
                                    <p>We are passionate about results. We deeply care about achieving the goals set by our partners, and we
                                        work accordingly.</p>
                                </div>
                                <div className="phrase">
                                    <h5><strong>Respect for Others</strong></h5>
                                    <p>We are empathetic and do not tolerate egotism or inappropriate behavior. We treat others with respect,
                                        mirroring the treatment we would like to receive. It's unfortunate that this is a distinguishing factor.
                                    </p>
                                </div>
                            </div>
                        </section>
                    </div>
                </section>



            </div>
            
            <Footer />
        </div>
    );
}

export default About;
