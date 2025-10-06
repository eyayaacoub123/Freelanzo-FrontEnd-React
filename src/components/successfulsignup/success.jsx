import React from 'react';
import './success.css';
import {useNavigate} from 'react-router-dom';

const Success = () => {
  const navigate=useNavigate();

  const handleContinue = () => {
    navigate(`/signin`);
  };
  return (
    <div className="signup-container">
      <div className="success-message">
        <img src={require('../images/check.png')}  alt="success" />
        <p>Congratulations, your account has been successfully created.<br/><br/>Press 'Continue' to explore and discover what awaits you inside</p>
        <button onClick={handleContinue} className="continue-button">Continue</button>
      </div>
    </div>
  );
};

export default Success;
