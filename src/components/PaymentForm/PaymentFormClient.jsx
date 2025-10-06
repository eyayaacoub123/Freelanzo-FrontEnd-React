
import React, { useState } from 'react';
import './PaymentForm.css';
import { Link } from 'react-router-dom';
import pay from '../images/pay.png';
import Background from '../Background/Background';
import nb from '../images/nb.png';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import axios from 'axios';
import { useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
const PaymentClient = () => {
    const location = useLocation();
    const [selectedFreelancerId, setSelectedFreelancerId] = useState('');
    const [idproject, setIdProject] = useState('');
    const navigate=useNavigate();
    const [freelancerEmail, setFreelancerEmail] = useState('');

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const selectedFreelancerId = searchParams.get('selectedFreelancerId');
        const idproject = searchParams.get('idproject');
        setSelectedFreelancerId(selectedFreelancerId);
        
        setIdProject(idproject);
        
            const token = localStorage.getItem('token');
            const usertype = localStorage.getItem('usertype');
        
            if (!token || usertype !== "Client") {
              // Redirect to '/'
              navigate('/');
          }
    }, [location.search]);

    console.log(selectedFreelancerId);
    console.log(idproject);
   

    // State to manage form data
    const [formData, setFormData] = useState({
        paymentMethod: '',
        ccName: '',
        ccNumber: '',
        ccExpiration: '',
        ccCvv: ''
    });

    // Function to handle form submission

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Perform form submission logic here, such as sending data to backend
        console.log('Form submitted:', formData);
        
        try {
            // Define iduser variable or make sure it's available in the scope
            const iduser = selectedFreelancerId;
            // Make GET request to server endpoint to fetch freelancer data
            const response = await axios.get(`http://localhost:5000/clientGetFreelancer/${iduser}`);
            // Extract email from response data and set it in state
            setFreelancerEmail(response.data.email);
            // Output email here since it's within the try block
            console.log(response.data);
           const  data={
            idclient:localStorage.getItem("id"),
            idfreelancer:selectedFreelancerId,
            idProjet:idproject
                
            }
            const response2 = await axios.post("http://localhost:5000/freelancerSelected",data);
            
            const response3= await axios.patch(`http://localhost:5000/projects/${idproject}/updateStatus`,{newStatus:"In progress"});
            const response4 = await axios.delete(`http://localhost:5000/deleteProjet/${idproject}`);
            if(response2.data=="Freelancer Selected"){   const queryParams = new URLSearchParams({freelancerEmail:response.data.email}).toString();
            navigate(`/email/?${queryParams}`);}
         
            setFormData({
                paymentMethod: '',
                ccName: '',
                ccNumber: '',
                ccExpiration: '',
                ccCvv: ''
            });
        } catch (error) {
            console.error('Error fetching freelancer data:', error);
        }
    };
    
    // Function to handle form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };
   
    return (
        <div>
            <Link className='margin' to="/acceuilcl">
                <ArrowBackIcon />
            </Link>
            <div className="payment-form">
                <Background />
                <h2>Checkout form</h2>
                <p style={{ textAlign: 'center' }}>Secure your freelancer's service now for optimal results!</p>
                <div className="row">
                    <div className='col'>
                        <div className='container '>
                            <div className='form2'>
                                <h4>Payment</h4>
                                <form onSubmit={handleSubmit}>
                                    <div>
                                        <input id="credit" name="paymentMethod" type="radio" value="credit" required onChange={handleInputChange} />
                                        <label htmlFor="credit">Credit card</label>
                                    </div>
                                    <div>
                                        <input id="debit" name="paymentMethod" type="radio" value="debit" required onChange={handleInputChange} />
                                        <label htmlFor="debit">Debit card</label>
                                    </div>
                                    <div>
                                        <input id="paypal" name="paymentMethod" type="radio" value="paypal" required onChange={handleInputChange} />
                                        <label htmlFor="paypal">PayPal</label>
                                    </div>
                                    <br />
                                    <div>
                                        <label htmlFor="cc-name">Name on card</label><br />
                                        <small>Full name as displayed on card</small>
                                        <input type="text" id="cc-name" name="ccName" value={formData.ccName} placeholder="Name on card is" required onChange={handleInputChange} />
                                    </div>
                                    <div>
                                        <label htmlFor="cc-number">Credit card number</label>
                                        <input type="text" id="cc-number" name="ccNumber" value={formData.ccNumber} placeholder="Credit card number is" required onChange={handleInputChange} />
                                    </div>
                                    <div>
                                        <label htmlFor="cc-expiration">Expiration</label>
                                        <input type="text" id="cc-expiration" name="ccExpiration" value={formData.ccExpiration} placeholder="Expiration date" required onChange={handleInputChange} />
                                    </div>
                                    <div>
                                        <label htmlFor="cc-cvv">CVV</label>
                                        <input type="text" id="cc-cvv" name="ccCvv" value={formData.ccCvv} placeholder="Security code" required onChange={handleInputChange} />
                                    </div>
                                    <div style={{ display: 'inline-block' }}>
                                        <img src={nb} alt="" style={{ width: '30px', height: '30px', margin: '0', padding: '0' }} />
                                        <p style={{ display: 'inline', color: '#0A1D56', fontWeight: 'bold' }}>Note:</p>
                                        <div style={{ borderBottom: '1px solid #0A1D56', marginBottom: '10px' }}></div>
                                    </div>
                                    <br />
                                    <small style={{ color: '#0A1D56' }}>After payment, your funds will be securely held until service receipt. Once received, please go to 'My Projects' in the sidebar of your homepage and click 'Realised' to confirm satisfaction. Payment will then be released to the freelancer. If unsatisfied or service not received, click 'Unsatisfied' for prompt resolution by our team.</small>
                                    <button type="submit" style={{ marginLeft: "310px" }}>Submit</button>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className='col'>
                        <div className='container'>
                            <div className='form1 '>
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
                                <img src={pay} alt="" style={{ width: '200px', height: '200px', marginLeft: '120px', marginTop: '20px' }} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PaymentClient;
