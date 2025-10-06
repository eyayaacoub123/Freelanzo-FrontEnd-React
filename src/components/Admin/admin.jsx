import React from "react";
import "./buttons.css";
import { Link } from "react-router-dom";
import LogoutIcon from '@mui/icons-material/Logout';
import Background from "../Background/Background";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
function Administrateur() {
  const navigate=useNavigate();
  useEffect(()=>{
    if (localStorage.getItem("usertype")==="admin"){
      navigate("/admin");
    }
    else {
      navigate("/");
    }
  },[]);
  const handleLogout = async () => {

    // Clear authentication data from localStorage
    localStorage.clear();


    // Redirect to a specific location, such as '/'
    navigate('/');
};
    return (
      <div>
      <Background/>
        <div className="buttons-container12">
          <Link to="/Clients List" className="btn12">Clients List <img src="https://cdn-icons-png.flaticon.com/512/6009/6009864.png" style={{ width: "25px", marginLeft: "3px", marginRight: "12px", flexDirection: "row-reverse" }} /></Link>
          <Link to="/Trainers List" className="btn12"> Trainers List<img src="https://cdn-icons-png.flaticon.com/128/14656/14656975.png" style={{ width: "25px", marginLeft: "3px", marginRight: "12px", flexDirection: "row-reverse" }} /></Link>
          <Link to="/Freelancers List" className="btn12">Freelancers List<img src="https://cdn-icons-png.flaticon.com/128/12129/12129608.png" style={{ width: "25px", marginLeft: "3px", marginRight: "12px", flexDirection: "row-reverse" }} /></Link>
          <Link to="/Training Payment List" className="btn12">Training Payment<img src="https://cdn-icons-png.flaticon.com/128/4222/4222025.png" style={{ width: "25px", marginLeft: "3px", marginRight: "12px", flexDirection: "row-reverse" }} /></Link>
          <Link to="/Project Payment List" className="btn12">Project Payment<img src="https://cdn-icons-png.flaticon.com/128/4222/4222025.png" style={{ width: "25px", marginLeft: "3px", marginRight: "12px", flexDirection: "row-reverse" }} /></Link>
          <Link to="/acceuilAdmin" className="btn12">Posts<img src="https://cdn-icons-png.flaticon.com/128/5902/5902652.png" style={{ width: "25px", marginLeft: "3px", marginRight: "12px", flexDirection: "row-reverse" }} /></Link>
          <Link to="/loginadmin" onClick={handleLogout} className="btn12">
  LogOut
  <LogoutIcon style={{ width: "25px", marginLeft: "3px", marginRight: "12px", flexDirection: "row-reverse" }} />
</Link>
        </div>
        </div>
    );
}

export default Administrateur;
