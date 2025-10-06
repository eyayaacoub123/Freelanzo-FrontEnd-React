import React, {useState } from 'react';
import ConfirmationModal from './ConfirmationModal';

const ListFreelancers = ({ listeCandidates, idproject }) => {
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [selectedFreelancerId, setSelectedFreelancerId] = useState('');

    const handleCommit = (freelancerId) => {
        setSelectedFreelancerId(freelancerId);
        setShowConfirmation(true);
    };
    const handleCoverLetter = (coverletter) => {
        console.log(coverletter);
        window.open(`/coverletter?nomclient=${coverletter.nomclient}&contenu=${encodeURIComponent(coverletter.contenu)}&nom=${coverletter.nom}`, '_blank');

    };

    return (
        <div className="list-freelancers-container">
            <h2>List of Freelancers</h2>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Cover Letter</th>
                        <th>Commit</th>
                    </tr>
                </thead>
                <tbody>
                    {listeCandidates.map((freelancer, index) => (
                        <tr key={index}>
                            <td>{freelancer.nom}</td>
                            <td>{freelancer.price}</td>
                            <td>
                            <a style={{ cursor: 'pointer' }} onClick={() => handleCoverLetter(freelancer.coverletter)}>Cover Letter</a>

                            </td>
                            <td>
                            <button onClick={() => handleCommit(freelancer.idfreelancer)}>Commit</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <ConfirmationModal
                isOpen={showConfirmation}
                onClose={() => setShowConfirmation(false)}
                selectedFreelancerId={selectedFreelancerId}
                idproject={idproject}
            />
        </div>
    );
}

export default ListFreelancers;
