import React, { useState } from 'react';
import './PaymentForm.css';
import { Link } from 'react-router-dom';
import nb from '../images/nb2.png';
import pay from '../images/pay2.png';
import Background from '../Background/Background';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import axios from 'axios';
import { useEffect } from "react";

import { useNavigate } from 'react-router-dom';

const Payment = () => {
    const navigate = useNavigate();
    const [paymentMethod, setPaymentMethod] = useState('');
    const [nameOnCard, setNameOnCard] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [expiration, setExpiration] = useState('');
    const [cvv, setCvv] = useState('');
    useEffect(() => {
        const token = localStorage.getItem('token');
        const usertype = localStorage.getItem('usertype');
    
        if (!token || usertype !== "Client" || usertype !== "Freelancer") {
          // Redirect to '/'
          navigate('/');
      }
    
    }, );
    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent form submission

        const idFormation = localStorage.getItem("posteformation");
        const idUser = localStorage.getItem("id");
        const userType = localStorage.getItem("usertype");

        // Check the user type and perform different actions
        if (userType === "Freelancer") {
            // If user is a freelancer, execute this block
            axios.post(`http://localhost:5000/freelancerInscritFormation/${idFormation}/${idUser}`)
                .then(response => {
                    console.log("Request successful:", response.data);
                    navigate("/acceuilfreel");
                })
                .catch(error => {
                    console.error("Error posting data:", error);
                });
        } else {
            // If user is not a freelancer (i.e., a client), execute this block
            axios.post(`http://localhost:5000/clientInscritFormation/${idFormation}/${idUser}`)
                .then(response => {
                    console.log("Request successful:", response.data);
                    navigate("/acceuilcl");
                })
                .catch(error => {
                    console.error("Error posting data:", error);
                });
        }
    };
    return (
        <div>
            <ArrowBackIcon className='margin' onClick={() => navigate(-1)} />
            <div className="payment-form">
                <Background />
                <h2>Checkout form</h2>
                <p style={{ textAlign: 'center' }}>Get ready to invest in your growth with our training service! </p>
                <div className="row">
                    <div className='col'>
                        <div className='container'>
                            <div className='form2'>
                                <h4>Payment</h4>
                                <form onSubmit={handleSubmit}>
                                    <div>
                                        <div>
                                            <input id="credit" name="paymentMethod" type="radio" value="credit" onChange={(e) => setPaymentMethod(e.target.value)} />
                                            <label htmlFor="credit">Credit card</label>
                                        </div>
                                        <div>
                                            <input id="debit" name="paymentMethod" type="radio" value="debit" onChange={(e) => setPaymentMethod(e.target.value)} />
                                            <label htmlFor="debit">Debit card</label>
                                        </div>
                                        <div>
                                            <input id="paypal" name="paymentMethod" type="radio" value="paypal" onChange={(e) => setPaymentMethod(e.target.value)} />
                                            <label htmlFor="paypal">PayPal</label>
                                        </div>
                                    </div>
                                    <br />
                                    <div>
                                        <div>
                                            <label htmlFor="cc-name">Name on card</label><br />
                                            <small>Full name as displayed on card</small>
                                            <input type="text" id="cc-name" placeholder="Name on card" value={nameOnCard} onChange={(e) => setNameOnCard(e.target.value)} required />
                                        </div>
                                        <div>
                                            <label htmlFor="cc-number">Credit card number</label>
                                            <input type="text" id="cc-number" placeholder="Credit card number" value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} required />
                                        </div>
                                        <div>
                                            <label htmlFor="cc-expiration">Expiration</label>
                                            <input type="text" id="cc-expiration" placeholder="Expiration date" value={expiration} onChange={(e) => setExpiration(e.target.value)} required />
                                        </div>
                                        <div>
                                            <label htmlFor="cc-cvv">CVV</label>
                                            <input type="text" id="cc-cvv" placeholder="Security code" value={cvv} onChange={(e) => setCvv(e.target.value)} required />
                                        </div>
                                        <div style={{ display: 'inline-block' }}>
                                            <img src={nb} alt="" style={{ width: '30px', height: '30px', margin: '0', padding: '0' }} />
                                            <p style={{ display: 'inline', color: '#0A1D56', fontWeight: 'bold' }}>Note:</p>
                                            <div style={{ borderBottom: '1px solid #0A1D56', marginBottom: '10px' }}></div>
                                        </div>
                                    </div>
                                    <small style={{ color: '#0A1D56' }}>After payment, your funds will be securely held until service receipt. Once received, please mark completion on your profile's training list. Payment will then be released to the trainer. If unsatisfied or service not received, click 'Unsatisfied' for prompt resolution by our team.</small>
                                    <button type="submit" style={{ marginLeft: "310px" }}>Submit</button>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className='col'>
                        <div className='container'>
                            <div className='form1'>
                                <h4>
                                    <span>Your cart</span>
                                </h4>
                                <ul>
                                    <li>
                                        <div>
                                            <h6>Product name</h6>
                                            <small>Brief description</small>
                                        </div>
                                        <span>$12</span>
                                    </li>
                                    <li>
                                        <span>Total (USD)</span>
                                        <strong>$12</strong>
                                    </li>
                                </ul>
                                <img src={pay} alt="" style={{ width: '200px', height: '200px', marginLeft: '80px', marginTop: '20px' }} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Payment;
