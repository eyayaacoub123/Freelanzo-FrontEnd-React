import React from 'react';
import './Contact.css';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';


function Contact() {
    return (
        <div className='Contact'>
        <Navbar />
        <div className="container">
            <div className="contact-container">
                <div className="contact-form">
                    <h2 className="section-title">Get in touch</h2>
                    <p>Feel free to contact us anytime. We will get back to you as soon as possible!</p>
                    <section id="form">
                        <form action="/submit_form" method="post">
                            <label htmlFor="name">Name:</label><br />
                            <input type="text" id="name" name="name" required /><br />
                            <label htmlFor="email">Email Address:</label><br />
                            <input type="email" id="email" name="email" required /><br />
                            <label htmlFor="message">Message:</label><br />
                            <textarea id="message" name="message" required></textarea><br />
                            <input type="submit" value="Envoyer" />
                        </form>
                    </section>
                </div>
                <div className="contact-info">
                    <h3>Info</h3>
                    <p><strong>Phone Number:</strong> +216 54 086 070</p>
                    <p><strong>Email Address:</strong> freelanzo@gmail.com</p>
                    <p><strong>Disponibility:</strong> 24/7 </p>
                </div>
            </div>
        </div>
        <Footer/>
        </div>
    );
}

export default Contact;
