import React, { useState } from 'react';
import "./Journey.css"; // Import the CSS file if necessary
import { Link ,useNavigate,useLocation} from 'react-router-dom';
import Background from '../Background/Background';

const Journey = () => {
    const [journey,setJourney]=useState("");
    const location = useLocation();
    const navigate=useNavigate();
    const searchParams = new URLSearchParams(location.search);
    let  formData = {
        name: searchParams.get('name'),
        email: searchParams.get('email'),
        password: searchParams.get('password'),
        role: searchParams.get('role') ,
        job:searchParams.get('job') ,
        jobDescription:searchParams.get('jobDescription') ,
        phoneNumber: searchParams.get('phoneNumber'),
        address: searchParams.get('address'),
        journey:journey
    }
    console.log(formData);
    const handlePrevious = () => {
        window.history.back();
    };
    const handleinputchange=(event)=>{
        setJourney(event.target.value);
    }
    const handelformsubmit=()=>{
        const queryParams = new URLSearchParams(formData).toString();
        navigate(`/skills?${queryParams}`);
       }
    return (
        <div className='Journey'>
        <Background/>
            <div className="container">
                {/* Combined job selection input */}
                <div className="input-container">
                    <label htmlFor="journeyInput" className="label">Could you share a bit about your Journey!</label>
                    <h6>( Education , Experiences, ....)</h6>
                    <textarea id="journey" onChange={handleinputchange} className="input-journey"></textarea>
                </div>
          

                {/* Next and Previous buttons */}
                <div className="button-container">
                    <button className='btn' onClick={handlePrevious}>Previous</button>
                    <button className='btn' onClick={handelformsubmit}>Next</button>
                </div>
                {/* End of Next and Previous buttons */}
            </div>
        </div>
    );
}

export default Journey;
