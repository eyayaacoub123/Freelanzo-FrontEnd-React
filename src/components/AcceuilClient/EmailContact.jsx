import React from "react";
import { Link } from "react-router-dom";
import { useLocation,useNavigate } from 'react-router-dom';
import { useState,useEffect } from "react";
const Email =()=> {
  const location = useLocation();
  const [selectedFreelancerEmail, setSelectedFreelancerEmail] = useState('');
  const navigate=useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const usertype = localStorage.getItem('usertype');
    const searchParams = new URLSearchParams(location.search);
    const freelancerEmail = searchParams.get('freelancerEmail');
    setSelectedFreelancerEmail(freelancerEmail);
    console.log(selectedFreelancerEmail);
    if (!token || usertype !== "Client") {
      // Redirect to '/'
      navigate('/');
  }

}, [location.search]);
return(
    <div className="emailContact-container">
<div className="emailContact-container">
      <div className="emailContact-message">
        <img src={require('../images/check.png')}  alt="success" />
        <h2>Your payment has been completed.</h2>
        <p>This is the email address of the freelancer you requested, feel free to contact them.<br/><br/>{selectedFreelancerEmail}</p>
        <Link to="/acceuilcl"><button>OK</button></Link></div>
      </div>
    </div>

 );
}
export default Email;