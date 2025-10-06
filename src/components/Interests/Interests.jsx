import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Interests.css';
import Background from '../Background/Background';


const Interests = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const searchParams = new URLSearchParams(location.search);
    const [selectedFields, setSelectedFields] = useState([]);

    const toggleField = (field) => {
        const index = selectedFields.indexOf(field);
        if (index === -1) {
            setSelectedFields([...selectedFields, field]);
        } else {
            setSelectedFields(selectedFields.filter(item => item !== field));
        }
    };
    let formData = {
        name: searchParams.get('name'),
        email: searchParams.get('email'),
        username: searchParams.get('email'),
        password: searchParams.get('password'),
        role: searchParams.get('role'),
        job: searchParams.get('job'),
        jobDescription: searchParams.get('jobDescription'),
        parcours: searchParams.get('journey'),
        phoneNumber: searchParams.get('phoneNumber'),
        address: searchParams.get('address'),
        competences: searchParams.get('skills') ? searchParams.get('skills').split(",") : [],
        languages: searchParams.get('selectedLanguages') ? searchParams.get('selectedLanguages').split(",") : [],
        intersts: selectedFields
    }
    console.log(formData);
    const handelformsubmit = () => {
        console.log(formData);
        if (formData.role === "freelancer") {
            console.log(formData.intersts);
            axios.post("http://localhost:5000/signupFreelancer", formData).then(response => {
                console.log(response.data);
                if (response.data === "Signup successful") {
                    navigate(`/success`);
                }
            })
                .catch(error => {
                    console.error(error);

                });
        }
        else if (formData.role === 'client') {
            axios.post("http://localhost:5000/signupClient", formData).then(response => {
                console.log(response.data);
                formData = {
                    name: searchParams.get('name'),
                    email: searchParams.get('email'),
                    username: searchParams.get('email'),
                    password: searchParams.get('password'),
                    phoneNumber: searchParams.get('phoneNumber'),
                    address: searchParams.get('address'),
                    languages: searchParams.get('selectedLanguages') ? searchParams.get('selectedLanguages').split(",") : [],
                    intersts: selectedFields
                }
                if (response.data === "Signup successful") {
                    navigate(`/success`);
                }
            })
                .catch(error => {
                    console.error(error);

                });
        } else {
            formData = {
                name: searchParams.get('name'),
                email: searchParams.get('email'),
                username: searchParams.get('email'),
                password: searchParams.get('password'),
                phoneNumber: searchParams.get('phoneNumber'),
                address: searchParams.get('address'),
                competances: searchParams.get('skills') ? searchParams.get('skills').split(",") : [],
                languages: searchParams.get('selectedLanguages') ? searchParams.get('selectedLanguages').split(",") : [],
                interets: selectedFields
            }
            console.log(formData);
            axios.post("http://localhost:5000/signupFormateur", formData).then(response => {
                console.log(response.data);
                if (response.data === "Signup successful") {
                    navigate(`/success`);
                }
            })
                .catch(error => {
                    console.error(error);

                });
        }
    }

    const displaySelectedFields = () => {
        return selectedFields.map((field, index) => (
            <li key={index}>{field}</li>
        ));
    };


    const handlePrevious = () => {
        window.history.back(); // Go back to the previous page
    };

    return (
        <div className='interests'>
            <Background />
            <div className="container">
                <label htmlFor="fieldsInput" className="label">Which fields you are interested in :</label>
                <div className="input-container">
                    <button className="field-button" onClick={() => toggleField('Software Development')}>Software Development</button>
                    <button className="field-button" onClick={() => toggleField('Web Development')}>Web Development</button>
                    <button className="field-button" onClick={() => toggleField('Mobile App Development')}>Mobile App Development</button>
                    <button className="field-button" onClick={() => toggleField('Data Science')}>Data Science</button>
                    <button className="field-button" onClick={() => toggleField('Graphic Design')}>Graphic Design</button>
                    <button className="field-button" onClick={() => toggleField('Content Creation')}>Content Creation</button>
                    <button className="field-button" onClick={() => toggleField('Social Media Management')}>Social Media Management</button>
                    <button className="field-button" onClick={() => toggleField('Search Engine Optimization (SEO)')}>Search Engine Optimization (SEO)</button>
                    <button className="field-button" onClick={() => toggleField('User Experience (UX) / User Interface (UI) Design')}>User Experience (UX) / User Interface (UI) Design</button>
                    <button className="field-button" onClick={() => toggleField('Marketing')}>Marketing</button>
                    <button className="field-button" onClick={() => toggleField('Systems Administration')}>Systems Administration</button>
                    <button className="field-button" onClick={() => toggleField('Network Engineering')}>Network Engineering</button>
                    <button className="field-button" onClick={() => toggleField('Database Administration')}>Database Administration</button>
                    <button className="field-button" onClick={() => toggleField('IT Support')}>IT Support</button>
                    <button className="field-button" onClick={() => toggleField('Cybersecurity')}>Cybersecurity</button>
                    <button className="field-button" onClick={() => toggleField('DevOps')}>DevOps</button>
                    <button className="field-button" onClick={() => toggleField('Cloud Computing')}>Cloud Computing</button>
                    <button className="field-button" onClick={() => toggleField('IT Project Management')}>IT Project Management</button>
                    <button className="field-button" onClick={() => toggleField('Business Intelligence (BI) Analysis')}>Business Intelligence (BI) Analysis</button>
                    <button className="field-button" onClick={() => toggleField('Quality Assurance (QA)')}>Quality Assurance (QA)</button>
                    <button className="field-button" onClick={() => toggleField('IT Consulting')}>IT Consulting</button>
                    <button className="field-button" onClick={() => toggleField('User Interface Design')}>User Interface Design</button>
                    <button className="field-button" onClick={() => toggleField('Frontend Development')}>Frontend Development</button>
                    <button className="field-button" onClick={() => toggleField('Backend Development')}>Backend Development</button>
                    <button className="field-button" onClick={() => toggleField('Video Gaming')}>Video Gaming</button>
                    <button className="field-button" onClick={() => toggleField('Creative Multimedia Production')}>Creative Multimedia Production</button>
                </div>
                <ul id="selectedFieldsList">
                    {displaySelectedFields()}
                </ul>
                <div className="button-container">
                    <button className='btn' onClick={handlePrevious}>Previous</button>
                    <button className='btn' onClick={handelformsubmit}>Next</button>
                </div>
            </div>
        </div>
    );
};

export default Interests;
