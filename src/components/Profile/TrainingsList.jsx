import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';

const TrainingsList = ({ onClose, isOpen, formations }) => {
    const [finishedTrainings, setFinishedTrainings] = useState(() => {
        const storedFinishedTrainings = localStorage.getItem('finishedTrainings');
        return storedFinishedTrainings ? JSON.parse(storedFinishedTrainings) : {};
    });

    const handleFinish = (index) => {
        const updatedFinishedTrainings = { ...finishedTrainings, [index]: true };
        setFinishedTrainings(updatedFinishedTrainings);
        localStorage.setItem('finishedTrainings', JSON.stringify(updatedFinishedTrainings));
    };

    const handleUnsatisfied = () => {
        alert("Please contact us at -- freelanzo@gmail.com -- for assistance.");
    };

    return (
        <div className={`trainingsList-container ${isOpen ? 'open' : ''}`}>
            <CloseIcon style={{ marginRight: '850px', marginTop: '5px', color: '#ff9409' }} className="close-button" onClick={onClose} />
            <table style={{ marginLeft: '69px' }}>
                <thead>
                    <tr>
                        <th>Training Name</th>
                        <th>Trainer</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {formations.map((formation, index) => (
                        <tr key={index}>
                            <td>{formation.domain}</td>
                            <td>{formation.auteur}</td>
                            <td>{new Date(formation.startdate).toLocaleDateString()}</td>
                            <td>{new Date(formation.enddate).toLocaleDateString()}</td>
                            <td>
                                {finishedTrainings[index] ? (
                                    <span>Training finished, <br/>Certificate earned!🏆</span>
                                ) : (
                                    <>
                                        <button onClick={() => handleFinish(index)}>Finished</button>
                                        <button onClick={handleUnsatisfied}>Unsatisfied</button>
                                    </>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <p style={{ marginLeft: '50px', marginBottom: '10px', fontSize: '14px', textAlign: 'center', color: '#0a1d56' }}>
                <strong style={{ textDecoration: 'underline' }}>Note:</strong> If you've completed your training and received the certificate, please click 'Finished'. However, if you haven't received your certificate or encountered any issues, please click 'Unsatisfied' to contact us. We'll promptly assist you in resolving any problems encountered during the training.
            </p>
        </div>
    );
}

export default TrainingsList;
