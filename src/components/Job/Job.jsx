import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import "./Job.css";
import Background from '../Background/Background';
const predefinedJobChoices = [
    "Web Developer",
    "Graphic Designer",
    "Content Writer",
    "Social Media Manager",
    "SEO Specialist",
    "Data Analyst",
    "UX/UI Designer",
    "Mobile App Developer",
    "Marketing Specialist",
    "Software Engineer",
    "Systems Administrator",
    "Network Engineer",
    "Database Administrator",
    "IT Support Specialist",
    "Cybersecurity Analyst",
    "DevOps Engineer",
    "Cloud Architect",
    "IT Project Manager",
    "Business Intelligence Analyst",
    "Quality Assurance Engineer",
    "IT Consultant",
    "User Interface Developer",
    "Frontend Developer",
    "Backend Developer"
];

function Job() {
    const location = useLocation();
    const navigate = useNavigate();
    const searchParams = new URLSearchParams(location.search);
    const [job, setJob] = useState("");

    useEffect(() => {
        populateJobOptions();
    }, []);

    const populateJobOptions = () => {
        const jobChoices = document.getElementById("jobChoices");

        predefinedJobChoices.forEach((job) => {
            const option = document.createElement("option");
            option.value = job;
            jobChoices.appendChild(option);
        });
    };

    let formData = {
        name: searchParams.get('name'),
        email: searchParams.get('email'),
        password: searchParams.get('password'),
        role: searchParams.get('role'),
        phoneNumber: searchParams.get('phoneNumber'),
        address: searchParams.get('address'),
        job: job
    }


    console.log(formData);
    const handleInputChange = (event) => {
        if (event.key === 'Enter') {
            setJob(event.target.value.trim()); // Set job when Enter is pressed
        }
    };
    const handlePrevious = () => {
        window.history.back();
    };
   
    const handleformsubmit = () => {
        let formData = {
            name: searchParams.get('name'),
            email: searchParams.get('email'),
            password: searchParams.get('password'),
            role: searchParams.get('role'),
            phoneNumber: searchParams.get('phoneNumber'),
            address: searchParams.get('address'),
            job: job
        };
        const queryParams = new URLSearchParams(formData).toString();
        navigate(`/jobDescription?${queryParams}`);
    };
    
    return (
        <div className='Job'>
            <Background />
            <div className="container">
                <div className="heading">Welcome ... ! </div>
                <div className="input-container">
                    <label htmlFor="jobInput" className="label">Select or type your job:</label>
                    <input
                        onChange={handleInputChange}
                        onKeyPress={handleInputChange} // Add this line
                        type="text"
                        placeholder='Add a job and hit enter please'
                        id="jobInput"
                        list="jobChoices"
                        className="input-field"
                    />
                    <datalist id="jobChoices">
                        {/* Options will be populated dynamically */}
                    </datalist>
                </div>
                <div className="button-container">
                    <button className='btn' onClick={handlePrevious}>Previous</button>
                    <button className='btn' onClick={handleformsubmit}>Next</button>
                </div>
            </div>
        </div>
    );
}

export default Job;
