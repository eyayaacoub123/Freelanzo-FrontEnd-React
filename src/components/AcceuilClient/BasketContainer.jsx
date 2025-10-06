import React, { useEffect, useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const BasketContainer = ({ onClose }) => {
    const navigate = useNavigate();
    const [close, setClose] = useState(true);
    const [formationsinp, setFormationsinp] = useState([]);
    const [loading, setLoading] = useState(true); 

    const closeModal = () => {
        setClose(false);
        onClose();
    };

    useEffect(() => {
        const idUser = localStorage.getItem("id");
        const userType = localStorage.getItem("usertype");

        if (userType === "Freelancer") {
            axios.get(`http://localhost:5000/freelancerGetFreelancer/${idUser}`)
                .then(response => {
                    console.log("Freelancer data:", response.data);
                    setFormationsinp(response.data.formationsinp);
                    setLoading(false); 
                })
                .catch(error => {
                    console.error("Error fetching freelancer data:", error);
                    setLoading(false); 
                });
        } else if(userType === "Client") {
            console.log("ouiclient");
            axios.get(`http://localhost:5000/clientGetClient/${idUser}`)
                .then(response => {
                    console.log("Client data:", response.data);
                    setFormationsinp(response.data.formationsinp);
                    setLoading(false); 
                })
                .catch(error => {
                    console.error("Error fetching client data:", error);
                    setLoading(false); 
                });
        }
    }, []);

    const handlePay = (idformation) => {
        localStorage.setItem("posteformation", idformation);
        navigate("/pay");
    }
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate();
        const month = date.getMonth() + 1; // Month is zero-based
        const year = date.getFullYear();

        // Pad single digit day and month with leading zero
        const formattedDay = day < 10 ? `0${day}` : day;
        const formattedMonth = month < 10 ? `0${month}` : month;

        return `${formattedDay}/${formattedMonth}/${year}`;
    };
    return (
        close && (
            <div className="basket-container">
                <span
                    className="close"
                    onClick={closeModal}
                    style={{
                        cursor: 'pointer',
                        color: '#ff9409',
                        fontSize: '24px',
                        position: 'relative',
                        top: '5px',
                        left: '-315px'
                    }}
                >
                    ×
                </span>                
                <br />
                <h3>My Basket</h3>
                {loading ? (
                    <div>Loading...</div>
                ) : (
                    <table>
                        <thead>
                            <tr>
                                <th>Training Name</th>
                                <th>Start Date</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {formationsinp.length !== 0 && formationsinp.map((formation, index) => (
                                <tr key={index}>
                                    <td>{formation.domain}</td>
                                    <td>{formatDate(formation.startdate)}</td>
                                    <td>
                                        <button onClick={() => handlePay(formation._id)}>Payer</button>
                                        <DeleteIcon />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                        
                    </table>
                )}
            </div>
        )
    );
}

export default BasketContainer;
