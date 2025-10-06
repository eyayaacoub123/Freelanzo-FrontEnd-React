// ShowList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CloseIcon from '@mui/icons-material/Close';

const ShowList = ({ isOpen, formationId, onClose }) => {
    const [participants, setParticipants] = useState([]);

    useEffect(() => {
        const fetchParticipants = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/clients-and-freelancers/${formationId}`);
                setParticipants(response.data.allClientsAndFreelancers);
            } catch (error) {
                console.log(error);
            }
        };

        if (isOpen) {
            fetchParticipants();
        }
    }, [isOpen, formationId]);

    return (
        <div className="show-list-container">
<CloseIcon style={{ marginLeft: '-450px', marginTop: '10px', color: 'red' }} className="close-button" onClick={onClose} />
            <table>
            <thead>
                    <tr>
                        <th>Index</th>
                        <th>Name</th>
                        <th>Email</th>
                    </tr>
                </thead>
            <tbody>
                {participants.map((participant, index) => (
                    <tr key={index}>
                    <td>{index+1}</td>
                    <td>{participant.name}</td>
                    <td>{participant.email}</td>
                    </tr> 
                            
                    // Adjust this based on your participant data structure
                ))}
            </tbody>
            </table>
        </div>
    );
};

export default ShowList;
