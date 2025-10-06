import './User.css';
import React, { useState,useEffect } from 'react';
import { Link ,useLocation ,useNavigate} from 'react-router-dom';
import Background from '../Background/Background';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
const User = () => {
    const [checkedRole, setCheckedRole] = useState(null);
    const [role,setRole]=useState("");
    const location = useLocation();
    const navigate=useNavigate();
    const searchParams = new URLSearchParams(location.search);
   let  formData = {
    name: searchParams.get('name'),
    email: searchParams.get('email'),
    password: searchParams.get('password'),
    phoneNumber: searchParams.get('phoneNumber'),
    address: searchParams.get('address'),
    role: role 
};

const handleFormSubmit = () => {
    let queryParams = new URLSearchParams(formData).toString();
   
    if (checkedRole === "freelancer-checkbox") {
        navigate(`/job?${queryParams}`);
}


   else{ navigate(`/languages?${queryParams}`);}};
    useEffect(() => {
        if (checkedRole === "freelancer-checkbox") {
            setRole("freelancer");
            
        } else if (checkedRole === "trainer-checkbox") {
            setRole("trainer");
         
        } else if (checkedRole === "client-checkbox") {
            setRole("client");
         
        }
        else{
            return;
        }
    }, [checkedRole]);
    console.log(formData);
    const handleButtonClick = (role) => {
        // If the role is already checked, uncheck it
        if (checkedRole === role) {
            setCheckedRole(null);
            document.getElementById(role).checked = false;
        } else {
            // If a different role is checked, uncheck the previous one
            if (checkedRole !== null) {
                document.getElementById(checkedRole).checked = false;
            }
            // Check the clicked role
            setCheckedRole(role);
            document.getElementById(role).checked = true;
        }
    };


    const handlePrevious = () => {
        window.history.back(); // Go back to the previous page
    };
    return (
        <div className="User">
        <Background/>
       
            <div className="container" id="user">
                <div className="title">Join as a client, Freelancer, or Trainer?</div>
                <br/>
                <button className="role-button" onClick={() => handleButtonClick('client-checkbox')}>
                    <input type="checkbox" id="client-checkbox" className="role-checkbox" />
                    
                    <div className="description">I’m a Client, Hiring for a Project</div>
                    <label htmlFor="client-checkbox">
                        {checkedRole === 'client-checkbox' ? <CheckCircleOutlineIcon className="icon-color"/> : <RadioButtonUncheckedIcon className="icon-color"/>}
                    </label>
                </button>
                <button className="role-button" onClick={() => handleButtonClick('freelancer-checkbox')}>
                    <input type="checkbox" id="freelancer-checkbox" className="role-checkbox" checked={checkedRole === 'freelancer-checkbox'} />
                   
                    <div className="description">I’m a Freelancer, Looking for work</div>
                    <label htmlFor="freelancer-checkbox">
                        {checkedRole === 'freelancer-checkbox' ? <CheckCircleOutlineIcon className="icon-color"/> : <RadioButtonUncheckedIcon className="icon-color"/>}
                    </label>
                </button>
                <button className="role-button" onClick={() => handleButtonClick('trainer-checkbox')}>
                    <input type="checkbox" id="trainer-checkbox" className="role-checkbox" checked={checkedRole === 'trainer-checkbox'} />
                    
                    <div className="description">I’m a Trainer, Building futures for Freelancers.</div>
                    <label htmlFor="trainer-checkbox">
                        {checkedRole === 'trainer-checkbox' ? <CheckCircleOutlineIcon className="icon-color"/> : <RadioButtonUncheckedIcon className="icon-color"/>}
                    </label>
                </button>

                <div className="button-container">
                <button className='btn' onClick={handlePrevious}>Previous</button>
                 <button className='btn' onClick={handleFormSubmit} >Next</button>
                </div>
            </div>
        </div>
    );
};

export default User;
