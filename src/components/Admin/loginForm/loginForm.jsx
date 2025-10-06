import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Background from '../../Background/Background';
import './loginForm.css';
import axios from 'axios'; // Import Axios
{/*import { FaUserTie, FaLock } from "react-icons/fa";*/}


function LoginForm() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);



  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const login = async (username, password) => {
        try {
            const response = await axios.post(`http://localhost:5000/signinAdmin`, {
                username: username,
                password: password
            });
            console.log("Login successful:", response.data);
            // Redirect the user to the appropriate dashboard
            const token = response.data.token;
            // Store token and user info in localStorage
            localStorage.setItem('token', token);
            localStorage.setItem('usertype', "admin");
            localStorage.setItem('id', response.data.id);
            localStorage.setItem('name', response.data.nom);
            redirectUser(); // No need to pass userType anymore
            return; // Exit if login is successful
        } catch (error) {
            console.error("Login error:", error.response.data);
            // Handle error, maybe display a message to the user
            window.alert("Invalid username or password.");
            setError("Invalid username or password.");
        }
    };

    const redirectUser = () => {
        // Implement redirection logic based on the fact that the user is an admin
        if (localStorage.getItem("usertype")==="admin"){
          navigate("/admin");
        }
        else {
          navigate("/");
        }
       
    };

    // Example usage
    login(username, password);
};

  return (
    <div>
    <Background/>
    <div className='wrapper'>
      <form className="login-form" onSubmit={handleSubmit}> 
      <img src={require('./log.png')} style={{marginLeft: '60px'}}/>
      <h1 style={{ color: '#0A1D56', fontSize:'20px'}}>Welcome to the Admin realm!</h1>


        <div className="input-box">
          <input type="text" name="username" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
          {/*<FaUserTie className="icon" />*/}
        </div>
        <div className="input-box">
          <input type={showPassword ? "text" : "password"} name="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          {/*<FaLock className="icon" onClick={togglePasswordVisibility} />*/}
        </div>
        <div className="remember-forgot">
          <label><input type="checkbox" /> Remember me </label>
          <a href="#">Forgot Password?</a>
        </div>
        <button type="submit">Log In</button>
      </form>
    </div>
    </div>
  );
}

export default LoginForm;
