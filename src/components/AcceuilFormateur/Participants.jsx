import React, { useState, useEffect } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import ShowList from './ShowList';
import axios from 'axios';

const Participants = ({ onClose }) => {
    const [formations, setFormations] = useState([]);
    const [isShowListOpen, setIsShowListOpen] = useState(false);
    const [selectedFormationId, setSelectedFormationId] = useState(null);

    useEffect(() => {
        const idformateur = localStorage.getItem("id");
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/getAnnonces/${idformateur}`);
                setFormations(response.data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, []);

    const toggleShowList = (formationId) => {
        setIsShowListOpen(!isShowListOpen);
        setSelectedFormationId(formationId);
    };

    const handleCloseShowList = () => {
        setIsShowListOpen(false);
        setSelectedFormationId(null);
    };

    return (
        <div className="participants-container">
            <CloseIcon style={{ marginRight: '550px', marginTop: '10px', color: '#ff9409' }} className="close-button" onClick={onClose} />

            <table>
                <thead>
                    <tr>
                        <th>Training ID</th>
                        <th>Title of the Training</th>
                        <th>List Of Participants</th>
                    </tr>
                </thead>
                <tbody>
                    {formations.map((formation, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{formation.domain}</td>
                            <td>
                                <button onClick={() => toggleShowList(formation._id)}>Show List</button>
                                {isShowListOpen && selectedFormationId === formation._id && <ShowList isOpen={isShowListOpen} formationId={selectedFormationId} onClose={handleCloseShowList} />}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Participants;
