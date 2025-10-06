import React, { useEffect, useState } from 'react';
import './Reviews.css'; // Ensure this path is correct
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Delete } from '@mui/icons-material'; // Import the necessary icons
import { IconButton, InputAdornment, TextField } from '@mui/material';

const Reviews = (props) => {
  const [reviews, setReviews] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState('');
  const [note, setNote] = useState('');
  const [reviewText, setReviewText] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const id = props.idfreelancer || props.idformateur || localStorage.getItem('id');
      const usertype = props.usertype || localStorage.getItem('usertype');
      const token = localStorage.getItem('token');
      if (!token || usertype !== "Freelancer") {
        // Redirect to '/'
        navigate('/');
    } 

      try {
        let endpoint = "";
        if (usertype === 'Freelancer') {
          if (props.idformateur) {
            endpoint = `http://localhost:5000/freelancerGetReviewsForamteur/${props.idformateur}`;
          } else if (props.idfreelancer) {
            endpoint = `http://localhost:5000/freelancerGetReviewsFreelancer/${props.idfreelancer}`;
          } else {
            console.error("Freelancer's review target not specified.");
            return;
          }
        } else if (usertype === 'Client') {
          if (props.idfreelancer) {
            endpoint = `http://localhost:5000/clientGetReviewsFreelancer/${props.idfreelancer}`;
          } else if (props.idformateur) {
            endpoint = `http://localhost:5000/clientGetReviewsForamteur/${props.idformateur}`;
          } else {
            console.error("Client's review target not specified.");
            return;
          }
        } else {
          console.error("Invalid user type.");
          return;
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
  }, [props.idfreelancer, props.idformateur, props.id, props.usertype, navigate]);


  const handleDelete = (reviewId) => {
    const usertype = localStorage.getItem("usertype");
    let endpoint = "";

    if (usertype === "Freelancer") {
      endpoint = `http://localhost:5000/freelancerDeleteReviewFormateur/${props.idformateur}/${reviewId}`;
    } else if (usertype === "Client") {
      if (props.idfreelancer) {
        endpoint = `http://localhost:5000/clientDeleteReviewFreelancer/${props.idfreelancer}/${reviewId}`;
      } else if (props.idformateur) {
        endpoint = `http://localhost:5000/clientDeleteReviewFormateur/${props.idformateur}/${reviewId}`;
      } else {
        console.error("Client's review target not specified.");
        return;
      }
    }

    axios.delete(endpoint, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then(response => {
        const updatedReviews = reviews.filter(review => review._id !== reviewId);
        setReviews(updatedReviews);
      })
      .catch(error => {
        console.error('Error deleting review:', error);
      });
  }



  const canAddReview = () => {
    const userType = props.usertype || localStorage.getItem('usertype');
    if (userType === 'Freelancer') {
      return !!props.idformateur;
    } else if (userType === 'Client') {
      return !!props.idformateur || !!props.idfreelancer;
    }
    return false;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newReview = {
      auteur: name,
      note: note,
      commentaire: reviewText
    };

    const id = props.idfreelancer || props.idformateur || localStorage.getItem('id');
    const usertype = props.usertype || localStorage.getItem('usertype');
    const token = localStorage.getItem('token');

    try {
      let endpoint = "";
      if (usertype === 'Freelancer') {
        if (props.idformateur) {
          endpoint = `http://localhost:5000/freelancerCreateReviewFormateur/${props.idformateur}`;
        } else {
          console.error("Freelancer's review target not specified.");
          return;
        }
      } else if (usertype === 'Client') {
        if (props.idfreelancer) {
          endpoint = `http://localhost:5000/clientCreateReviewFreelancer/${props.idfreelancer}`;
        } else if (props.idformateur) {
          endpoint = `http://localhost:5000/clientCreateReviewFormateur/${props.idformateur}`;
        } else {
          console.error("Client's review target not specified.");
          return;
        }
      } else {
        console.error("Invalid user type.");
        return;
      }

      const response = await axios.post(endpoint, newReview, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      console.log("Review added successfully:", response.data);
      setReviews([...reviews, newReview]);
      setName('');
      setNote('');
      setReviewText('');
      setShowForm(false);

    } catch (error) {
      console.error("Error adding Review:", error);
    }
  };


  return (
    <div style={{ backgroundColor: '#e0e8ff' }}>
      {canAddReview() && (
        <div className="addreview">
          <button type='button' onClick={() => setShowForm(!showForm)}>Add Review</button>
        </div>
      )}

      {showForm && (
        <div className="review-form reviews33 container33">
          <form className="form" onSubmit={handleSubmit}>
            <label className="form-label">Your Name:</label>
            <input
              className="form-input"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <label className="form-label">Note (out of 10):</label>
            <input
              className="form-input"
              type="number"
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
            <label className="form-label">Review:</label>
            <textarea
              className="form-textarea"
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
            />
            <button className="form-button" type="submit">Send</button>
          </form>
        </div>
      )}
      {reviews.length === 0 ? (
        <div className='reviews33 container33' style={{ marginTop: '50px ' }}>
          <div className='review1'>
            <p style={{ color: '#0a1d56', fontWeight: 'bold', textAlign: 'center' }}>No reviews yet. Add the first review to spark the conversation</p>
          </div>
        </div>
      ) : (
        <div className='reviews container'>

          {reviews.map((review, index) => (
            <div className='review1' key={index}>
              <h2 style={{ color: '#0a156d', fontSize: '20px' }}>{review.auteur}</h2>
              <p style={{ color: '#b7c9ff', fontWeight: 'bold' }}>Note: {review.note}</p>
              <p>'{review.commentaire}'</p>
              {localStorage.getItem("name") === review.auteur && (
                <div>
                  <IconButton onClick={() => { console.log(review._id); handleDelete(review._id); }}>
                    <Delete />
                  </IconButton>
                </div>
              )}
            </div>
          ))}

         
        </div>
      )}
    </div>
  );
}

export default Reviews;