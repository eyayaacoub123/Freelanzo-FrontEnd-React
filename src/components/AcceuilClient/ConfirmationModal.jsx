import React from 'react';
import { useNavigate } from 'react-router-dom';

const ConfirmationModal = ({ isOpen, onClose, selectedFreelancerId, idproject }) => {
    const navigate = useNavigate();

    const handleNavigateToPayment = () => {
        const queryParams = new URLSearchParams({ selectedFreelancerId, idproject }).toString();
        navigate(`/paycl?${queryParams}`);
    };

    return (
        <>
            {isOpen && (
                <div className="confirmation-modal">
                    <div className="modal-content1">
                        <p>Are you sure you want to select this freelancer?</p>
                        <div className="modal-buttons">
                            <button onClick={handleNavigateToPayment}>Yes</button>
                            <button onClick={onClose}>No</button>
                            <p style={{ color: '#ff9409', marginTop: '10px', fontSize: '12px' }}>
                                <strong>Note:</strong>
                                If you click "Yes," you will be redirected to the payment form.
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default ConfirmationModal;

