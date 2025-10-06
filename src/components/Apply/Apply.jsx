import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Apply.css';
import Background from '../Background/Background';
import imgnb from '../images/imagenb.png';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const Apply = () => {
    const navigate = useNavigate();
  
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        duration: '',
        durationUnit: 'days',
        price: '',
        coverletter: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };
    useEffect(()=>{
        const token = localStorage.getItem('token');
        const usertype = localStorage.getItem('usertype');

        if (!token || usertype !== "Freelancer") {
            // Redirect to '/'
            navigate('/');
        }
        const freelancerid = localStorage.getItem("id");
            const getdata= async ()=>{
                try { 
                    let result= await axios.get(`http://localhost:5000/freelancerGetFreelancer/${freelancerid}`);

                    const [firstName, lastName] = result.data.name.split(' ');
                   
                    setFormData((prev) => ({
                      ...prev,
                      firstName: firstName,
                      lastName: lastName,
                      email:result.data.email
                    }));
                }catch (error) 
                {
                    console.log(error);

                }
            }
            getdata();
    },[])

    const handleSubmit = async (e) => {
        e.preventDefault();

        const projectid = localStorage.getItem("posteid");
        const freelancerid = localStorage.getItem("id");

        try {
            await axios.post(`http://localhost:5000/submitproject/${projectid}/${freelancerid}`, formData);
            console.log(formData);

            setFormData({
                firstName: '',
                lastName: '',
                email: '',
                duration: '',
                durationUnit: 'days',
                price: '',
                coverletter: ''
            });
            navigate("/acceuilfreel");

        } catch (error) {
            console.error('Error submitting application:', error);
        }
    };

    return (
        <div>
            <Link className='margin' to="/acceuilfreel">
                <ArrowBackIcon />
            </Link>
            <div className="payment-form color">
                <Background />
                <img
                    src={require('../images/logo.png')}
                    width="40"
                    height="40"
                    style={{ borderRadius: '7px', marginLeft: '2px', marginTop: '-8px' }}
                    className="d-inline-block align-top"
                    alt="Logo"
                />
                <h2>Project Application Form</h2>
                <div className="row">
                    <div className='col'>
                        <div className='container '>
                            <div className='form2'>
                                <h4>Enter your information to submit your application.</h4>
                                <form onSubmit={handleSubmit}>
                                    <div className='form3'>
                                        <div>
                                            <label htmlFor="firstName">First name</label>
                                            <input type="text" id="firstName" name="firstName" value={formData.firstName} onChange={handleInputChange} required />
                                        </div>
                                        <div>
                                            <label htmlFor="lastName">Last name</label>
                                            <input type="text" id="lastName" name="lastName" value={formData.lastName} onChange={handleInputChange} required />
                                        </div>
                                        <div>
                                            <label htmlFor="email">Email</label>
                                            <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} required />
                                        </div>
                                        <div>
                                            <label htmlFor="duration">Duration of work</label>
                                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                                <select id="duration-unit" name="durationUnit" value={formData.durationUnit} onChange={handleInputChange}>
                                                    <option value="days">Days</option>
                                                    <option value="months">Months</option>
                                                </select>
                                                <input type="number" id="duration" name="duration" value={formData.duration} onChange={handleInputChange} required min="1" style={{ marginRight: '10px' }} />

                                            </div>
                                        </div>
                                        <div>
                                            <label htmlFor="price">Price ($):</label>
                                            <input type="number" id="price" name="price" value={formData.price} onChange={handleInputChange} required min="0" step="1" />
                                        </div>
                                        <div>
                                            <label htmlFor="coverletter">Cover Letter :</label><br />
                                            <textarea id="coverletter" name="coverletter" value={formData.coverletter} onChange={handleInputChange} required></textarea>
                                        </div>
                                    </div>
                                    <br />
                                    <img src={imgnb} alt="" style={{ width: '100px', height: '100px', marginLeft: '400px' }} />
                                    <p style={{ color: '#ff9409', marginTop: '10px', fontSize: '16px' }}>
                                        <strong>Note:</strong> If you submit your application, it will be sent to the person who posted the project request. If they choose you, an email will be sent to the email address you provided.
                                    </p>
                                    <button type="submit" style={{ marginLeft: '400px' }}>Submit</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Apply;
