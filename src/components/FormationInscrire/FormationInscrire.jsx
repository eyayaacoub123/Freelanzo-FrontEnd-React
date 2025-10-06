import React, { useState,useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../PaymentForm/PaymentForm.css';
import axios from 'axios';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const FormationInscrire = () => {
    const navigate = useNavigate();
    // State for form inputs
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        address: '',
        address2: '',
        country: '',
        gender: '',
        birth: ''
    });

    // Handler for form input changes
    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData({ ...formData, [id]: value });
    };

    const handleCheckout = () => {
        navigate("/pay");
    }
    useEffect(()=>{
        const freelancerid = localStorage.getItem("id");
        const clientid = localStorage.getItem("id");
        const usertype = localStorage.getItem('usertype');


            const getdata= async ()=>{
                try { 
                    if (usertype === "Freelancer") {
                        let result= await axios.get(`http://localhost:5000/freelancerGetFreelancer/${freelancerid}`);
                        const [firstName, lastName] = result.data.name.split(' ');
                   
                        setFormData((prev) => ({
                          ...prev,
                          firstName: firstName,
                          lastName: lastName,
                          email:result.data.email,
                          address:result.data.address
    
                        }));
                    } else {
                        let result= await axios.get(`http://localhost:5000/clientGetClient/${clientid}`);
                        const [firstName, lastName] = result.data.name.split(' ');
                   
                        setFormData((prev) => ({
                          ...prev,
                          firstName: firstName,
                          lastName: lastName,
                          email:result.data.email,
                          address:result.data.address
                    
                        }));
                };
                    
                }catch (error) 
                {
                    console.log(error);

                }
            }
            getdata();
    },[])
    const handleCheckoutLater = () => {
        const idFormation = localStorage.getItem("posteformation");
        const idUser = localStorage.getItem("id");
        const userType = localStorage.getItem("usertype");

        if (userType === "Freelancer") {
            axios.post(`http://localhost:5000/freelancerInscritFormationnonpayes/${idFormation}/${idUser}`)
                .then(response => {
                    console.log("Request successful:", response.data);
                    navigate("/acceuilfreel");
                })
                .catch(error => {
                    console.error("Error:", error);
                });
        } else {
            axios.post(`http://localhost:5000/clientInscritFormationnonpayes/${idFormation}/${idUser}`)
                .then(response => {
                    console.log("Request successful:", response.data);
                    navigate("/acceuilcl");
                })
                .catch(error => {
                    console.error("Error:", error);
                });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        handleCheckout();
    };

    return (
        <div>
            <ArrowBackIcon className='margin' onClick={() => navigate(-1)} />
            <div className="payment-form">
                <h2>Registration Form</h2>
                <div className="row">
                    <div className='col'>
                        <div className='container '>
                            <div className='form2'>
                                <h4>Enter your information to sign up for this training</h4>
                                <form onSubmit={handleSubmit}>
                                    <div className='form3'>
                                        <div>
                                            <label htmlFor="firstName">First name</label>
                                            <input type="text" id="firstName" value={formData.firstName} onChange={handleChange} placeholder="" required />
                                        </div>

                                        <div>
                                            <label htmlFor="lastName">Last name</label>
                                            <input type="text" id="lastName" value={formData.lastName} onChange={handleChange} placeholder="" required />
                                        </div>

                                        <div>
                                            <label htmlFor="email">Email</label>
                                            <input type="email" id="email" value={formData.email} onChange={handleChange} placeholder="you@example.com" required />
                                        </div>

                                        <div>
                                            <label htmlFor="address">Address</label>
                                            <input type="text" id="address" value={formData.address} onChange={handleChange} placeholder="1234 Main St" required />
                                        </div>

                                        <div>
                                            <label htmlFor="address2">Address 2 <span>(Optional)</span></label>
                                            <input type="text" id="address2" value={formData.address2} onChange={handleChange} placeholder="Apartment or suite" />
                                        </div>

                                        <div>
                                            <label htmlFor="country">country:</label>
                                            <input type="text" id="country" name="country" list="countryOptions" value={formData.country} onChange={handleChange} required />
                                            <datalist id="countryOptions">
                                                <option value="Tunisia"></option>
                                                <option value="Algeria"></option>
                                                <option value="Libiya"></option>
                                                <option value="Morroco"></option>
                                                <option value="Egypt"></option>
                                                <option value="United States"></option>
                                            </datalist>
                                        </div>

                                        <div>
                                            <label htmlFor="gender">Gender</label>
                                            <select id="gender" value={formData.gender} onChange={handleChange} required>
                                                <option value="">Choose...</option>
                                                <option>Female</option>
                                                <option>Male</option>
                                            </select>
                                        </div>

                                        <div>
                                            <label htmlFor="birth">Birth</label><br />
                                            <input type="date" id="birth" value={formData.birth} onChange={handleChange} required />
                                        </div>
                                    </div>

                                    <div>
                                        <input type="checkbox" id="save-info" />
                                        <label htmlFor="save-info">Save this information for next time</label>
                                    </div>
                                    <br />
                                    <br />
                                    <button type="submit" style={{ marginRight: '10px', marginLeft: '270px' }}>Continue to checkout</button>
                                    <button type="button" onClick={handleCheckoutLater}>Checkout Later</button>
                                    <p style={{ color: '#808080', marginTop: '10px', fontSize: '12px' }}>
                                        <strong>Note:</strong> If you choose "Checkout Later," your information will be saved, and you can find this form in your basket on the homepage.
                                    </p>
                                </form>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default FormationInscrire;
