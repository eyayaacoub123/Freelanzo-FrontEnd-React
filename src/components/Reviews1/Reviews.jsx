import React, { useEffect, useState } from 'react';
import './Reviews.css'; // Ensure this path is correct
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Reviews = (props) => {
  const [reviews, setReviews] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState('');
  const [note, setNote] = useState('');
  const [reviewText, setReviewText] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const id = props.idfreelancer || props.idformateur || localStorage.getItem('id');
        const usertype = props.usertype || localStorage.getItem('usertype');
        const token = localStorage.getItem('token');

        if (!id || !usertype) {
          navigate("/");
          return;
        }
        let endpoint = "";
        if (!props.idfreelancer && !props.idformateur) {

          switch (usertype) {
            case 'Client':
              endpoint =` http://localhost:5000/clientGetReviewsClient/${id}`;
              break;
            case 'Formateur':
              endpoint =` http://localhost:5000/formateurGetReviewsForamteur/${id}`;
              break;
            case 'Freelancer':
              endpoint = `http://localhost:5000/freelancerGetReviewsFreelancer/${id}`;
              break;
            default:
              // Handle unknown user type
              return;
          }
        }
        else {
          if (props.idfreelancer) {
            endpoint =` http://localhost:5000/freelancerGetReviewsFreelancer/${id}`;
          }
          else {
            endpoint =` http://localhost:5000/freelancerGetReviewsForamteur/${id}`;
          }
        }

        const response = await axios.get(endpoint, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        setReviews(response.data);
      } catch (error) {
        console.error("Error fetching reviews:", error);
        // Handle error
      }
    };

    fetchData();
  }, [props.id, props.usertype, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newReview = {
      auteur: name,
      note: note,
      commentaire: reviewText
    };
    try {
      // Send the new review to the backend
      // Assuming you have a route for adding reviews
      const response = await axios.post('http://localhost:5000/addReview', newReview);
      // Update the reviews state with the new review
      setReviews([...reviews, response.data]);
      // Clear the form fields
      setName('');
      setNote('');
      setReviewText('');
      // Hide the form
      setShowForm(false);
    } catch (error) {
      console.error("Error adding review:", error);
      // Handle error
    }
  };

  return (
    <div >
  
      {reviews.length === 0 ? (
        <div className='reviews33 container33' style={{ marginTop: '300px ' }}>
        <div className='review1'>
              <p style={{ color: '#0a1d56', fontWeight: 'bold',textAlign:'center' }}>You haven't received any reviews yet.</p>
          
            </div>
            </div>

      ) : (
        <div className='reviews container' style={{ backgroundColor: '#e0e8ff' }}>
          {reviews.map((review, index) => (
            <div className='review1' key={index}>
              <h2 style={{ color: '#0a156d', fontSize: '20px' }}>{review.auteur}</h2>
              <p style={{ color: '#b7c9ff', fontWeight: 'bold' }}>Note: {review.note}</p>
              <p>'{review.commentaire}'</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Reviews;