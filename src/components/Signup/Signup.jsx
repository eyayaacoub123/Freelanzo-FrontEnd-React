import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import FacebookIcon from '@mui/icons-material/Facebook';
import GoogleIcon from '@mui/icons-material/Google';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import RadioButton from '../RadioButtonLogin/RadioButton';
import './Signup.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Signup({ handleClick }) {
    const navigate = useNavigate();
    const [username, setusername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const [isRightPanelActive, setIsRightPanelActive] = useState(false);

    const handlePanelToggle = () => {
        setIsRightPanelActive(!isRightPanelActive);
    };

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        phoneNumber: '',
        address: '',
    });

    const handleFormSubmit = () => {
        // Check if any required field is empty
        if (
            formData.name.trim() === '' ||
            formData.phoneNumber.trim() === '' ||
            formData.address.trim() === '' ||
            formData.email.trim() === '' ||
            formData.password.trim() === ''
        ) {
            alert('Please fill in all required fields.');
            return; // Don't proceed with navigation
        }
    
        // Check if email is in the correct format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            alert('Please enter a valid email address.');
            return; // Don't proceed with navigation
        }
    
        // If all validations pass, navigate to the next page
        let queryParams = new URLSearchParams(formData).toString();
        navigate(`/user?${queryParams}`);
    };
    

    // Event handler for input changes
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };
    console.log(formData);

    const handleSubmit = async (e) => {
        console.log(RadioButton.selectedValue);
        e.preventDefault();
        const login = async (username, password) => {
            const userTypes = ['Client', 'Formateur', 'Freelancer']; // Assuming these are your user types

            for (const userType of userTypes) {
                try {
                    const response = await axios.post(`http://localhost:5000/signin${userType}`, {
                        username: username,
                        password: password
                    });
                    console.log("Login successful:", response.data);
                    // Redirect the user based on user type
                    const token = response.data.token;
                    // Store token in localStorage
                    localStorage.setItem('token', token);
                    localStorage.setItem('usertype', userType);
                    localStorage.setItem('id', response.data.id);
                    redirectUser(userType); // Implement this function to redirect users
                    return; // Exit the loop if login is successful
                } catch (error) {
                    console.error(`Login error for ${userType}:`, error.response.data);
                    // Handle error, maybe try the next user type
                }
            }

            // Handle case when none of the user types could be authenticated
            setError("Invalid username or password."); // Set appropriate error message
        };

        const redirectUser = (userType) => {

            // Implement redirection logic based on user type
            switch (userType) {
                case 'Client':
                    // Redirect to Client dashboard
                    console.log(userType);
                    navigate("/acceuilcl")
                    break;
                case 'Formateur':
                    // Redirect to Formateur dashboard
                    console.log(userType);
                    navigate("/acceuilformateur")
                    break;
                case 'Freelancer':
                    console.log(userType);
                    navigate("/acceuilfreel")
                    // Redirect to Freelancer dashboard
                    break;
                default:
                    // Handle unknown user type
            }
        };

        // Example usage
        login(username, password);
    };

    return (
        <div className='SignUp'>
            <header>
                <Link to="/">
                    <ArrowBackIcon />
                </Link>
            </header>
            <Container id="container" className={isRightPanelActive ? 'right-panel-active' : ''}>
                <Row>
                    <Col>
                        <div className="form-container sign-up-container">
                            <Form>
                                <h1 style={{ color: '#0A1D56' }}>Sign in</h1>

                                <Form.Control type="email" value={username} onChange={(e) => setusername(e.target.value)} placeholder="Email" />
                                <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
                                <a href="#">Forgot your password?</a>
                                <Button onClick={handleSubmit}>Sign In</Button>
                            </Form>
                        </div>
                    </Col>
                    <Col>
                        <div className="form-container sign-in-container">
                            <Form>
                                <h1 style={{ color: '#0A1D56' }}>Create Account</h1>
                                <Form.Control type="text" value={formData.name} onChange={handleInputChange} name="name" placeholder="full name" required />
                                <Form.Control type="tel" value={formData.phoneNumber} onChange={handleInputChange} name="phoneNumber" placeholder="Phone Number" required />
                                <Form.Control type="text" value={formData.address} onChange={handleInputChange} name="address" placeholder="Address" required />
                                <Form.Control type="email" value={formData.email} onChange={handleInputChange} name="email" placeholder="email" required />
                                <Form.Control type="password" value={formData.password} onChange={handleInputChange} name="password" placeholder="password" required />

                                {/* Utilisez handleNextClick pour gérer l'événement de clic */}
                                <Button id='SignUp' onClick={handleFormSubmit}>Next</Button>

                            </Form>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <div className="overlay-container">
                            <div className="overlay">
                                <div className="overlay-panel overlay-left">
                                    <h1>Welcome Back!</h1>
                                    <p>To keep connected with us please login with your personal info</p>
                                    <Button className="ghost" id="signIn" onClick={handlePanelToggle}>Sign Up</Button>
                                </div>
                                <div className="overlay-panel overlay-right">
                                    <h1>Hello, Friend!</h1>
                                    <p>Enter your personal details and start journey with us</p>
                                    <Button className="ghost" id="signUp" onClick={handlePanelToggle}>Sign In</Button>
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default Signup;
