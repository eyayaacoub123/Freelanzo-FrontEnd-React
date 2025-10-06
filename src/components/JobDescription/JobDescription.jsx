import React, { useState } from 'react';
import { Link ,useLocation ,useNavigate} from 'react-router-dom';
import "./JobDescription.css";
import Background from '../Background/Background';


function JobDescription() {
    const [jobDescription,setJobDescription]=useState("");
    const handlePrevious = () => {
        window.history.back();
    };
    const location = useLocation();
    const navigate=useNavigate();
    const searchParams = new URLSearchParams(location.search);
  let  formData = {
        name: searchParams.get('name'),
        email: searchParams.get('email'),
        password: searchParams.get('password'),
        role: searchParams.get('role') ,
        job:searchParams.get('job') ,
        phoneNumber: searchParams.get('phoneNumber'),
        address: searchParams.get('address'),
        jobDescription:jobDescription
    }
    console.log(formData);
   const handleinputchange=(event)=>{
    setJobDescription(event.target.value);
   }
   const handleformsubmit=()=>{
    const queryParams = new URLSearchParams(formData).toString();
    navigate(`/journey?${queryParams}`);
   }
    return (
        <div className='JobDescription'>
        <Background/>
            <div className="container">
                {/* Combined job description input */}
                <div className="input-container">
                    <label htmlFor="jobDescription" className="label">Describe your job:</label>
                    <textarea id="jobDescription" onChange={handleinputchange} className="input-jobdescription"></textarea>
                </div>
                {/* End of combined job description input */}

                {/* Next and Previous buttons */}
                <div className="button-container">
                    <button className='btn' onClick={handlePrevious}>Previous</button>
                <button className='btn' onClick={handleformsubmit}>Next</button>
                </div>
                {/* End of Next and Previous buttons */}
            </div>
        </div>
    );
}

export default JobDescription;
