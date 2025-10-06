import './Languages.css';
import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'; // Material-UI selector icon
import Background from '../Background/Background';

const predefinedLanguages = ["English", "Spanish", "French", "German", "Chinese", "Japanese", , "Turkish", "Korean", "Russian", "Arabic", "Portuguese", "Italian", "Dutch"];

function Languages() {
    const location = useLocation();
    const navigate = useNavigate();
    const searchParams = new URLSearchParams(location.search);

    const [inputValue, setInputValue] = useState('');
    const [selectedLanguages, setSelectedLanguages] = useState([]);

    const handelformsubmit = () => {
        let formData = {
            name: searchParams.get('name'),
            email: searchParams.get('email'),
            password: searchParams.get('password'),
            role: searchParams.get('role'),
            job: searchParams.get('job'),
            jobDescription: searchParams.get('jobDescription'),
            journey: searchParams.get('journey'),
            phoneNumber: searchParams.get('phoneNumber'),
            address: searchParams.get('address'),
            skills: searchParams.get('skills'),
            selectedLanguages: selectedLanguages
        };

        console.log(formData);
        if (formData.role === "freelancer") {
            const queryParams = new URLSearchParams(formData).toString();
            navigate(`/interests?${queryParams}`);
        } else if (formData.role === "trainer") {
            formData = {
                name: searchParams.get('name'),
                email: searchParams.get('email'),
                password: searchParams.get('password'),
                role: searchParams.get('role'),
                phoneNumber: searchParams.get('phoneNumber'),
                address: searchParams.get('address'),
                selectedLanguages: selectedLanguages
            };
            const queryParams = new URLSearchParams(formData).toString();
            navigate(`/skills?${queryParams}`);
        } else if (formData.role === "client") {
            formData = {
                name: searchParams.get('name'),
                email: searchParams.get('email'),
                password: searchParams.get('password'),
                phoneNumber: searchParams.get('phoneNumber'),
                address: searchParams.get('address'),
                role: searchParams.get('role'),
                selectedLanguages: selectedLanguages
            };
            const queryParams = new URLSearchParams(formData).toString();
            navigate(`/interests?${queryParams}`);
        }
    }

    useEffect(() => {
        populateLanguageOptions();
    }, []);

    const populateLanguageOptions = () => {
        return predefinedLanguages.map((language, index) => (
            <option key={index} value={language} />
        ));
    };

    const removeLanguage = (language) => {
        const updatedLanguages = selectedLanguages.filter(lang => lang !== language);
        setSelectedLanguages(updatedLanguages);
    };

    const addLanguage = () => {
        if (inputValue && !selectedLanguages.includes(inputValue)) {
            setSelectedLanguages([...selectedLanguages, inputValue]);
            setInputValue(''); // Clear input value after adding
        } else {
            alert("Please select a valid language from the list."); // Alert if the input value is not valid
        }
    };

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            addLanguage(); // Add language when Enter is pressed
        }
    };


    const handlePrevious = () => {
        window.history.back(); // Go back to the previous page
    };

    return (
        <div className="Languages">
            <Background />
            <div className="container">
                <div className="input-container">
                    <label htmlFor="languagesInput" className="label">List the languages you know ?</label><br />
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <input
                            type="text"
                            placeholder='Add a language and hit enter please'
                            id="languagesInput"
                            list="languagesChoices"
                            className="input-languages"
                            value={inputValue}
                            onChange={handleInputChange}
                            onKeyPress={handleKeyPress} // Add this line
                        />
                    </div>
                    <datalist id="languagesChoices">
                        {populateLanguageOptions()}
                    </datalist>
                </div>
                <div id="selectedLanguagesContainer">
                    {selectedLanguages.map((language, index) => (
                        <div key={index} className="selected-language">
                            <span>{language}</span>
                            <span className="close-btn" onClick={() => removeLanguage(language)}>
                                <CloseIcon />
                            </span>
                        </div>
                    ))}
                </div>
                <div className="button-container">
                    <button className='btn' onClick={handlePrevious}>Previous</button>
                    <button className='btn' onClick={handelformsubmit}>Next</button>
                </div>
            </div>
        </div>
    );
}

export default Languages;
