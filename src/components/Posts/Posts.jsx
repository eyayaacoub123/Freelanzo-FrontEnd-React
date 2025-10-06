import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faComment } from '@fortawesome/free-solid-svg-icons';
import './post.css';
import Comment from '../cmt/CommentSection';
import axios from 'axios';

const Posts = (props) => {
  const [showComments, setShowComments] = useState(false);
  const [projects, setProjects] = useState("");

  const toggleComments = () => {
    setShowComments(prevShowComments => !prevShowComments);
  };
  /*const deleteProject = async (postId) => {
    try {
      const response = await axios.delete(`http://localhost:5000/deletePoste/${postId}`);
      if (response.status === 200) {
        alert('Post deleted successfully!');
        props.onPostDelete(postId); // Notify parent component about the deletion
      } else {
        console.error('Failed to delete the project');
      }
    } catch (error) {
      console.error('Error deleting the project:', error);
    }
  };
*/

  return (
    <div>
      {props.postes && props.postes.map(post => (
        <div key={post._id}>
          <p style={{ color: '#ff9409', textDecoration: 'underline', textAlign: 'center' }}>{post.domainTraining}</p>
          <p>{post.descriptionTraining}</p>
          <div className="action-icons">
            <FontAwesomeIcon icon={faEdit} className="edit-icon" />
            <FontAwesomeIcon icon={faTrash} className="delete-icon" onClick={() => props.onDeletePost(post._id)}/>
            <FontAwesomeIcon icon={faComment} className="comment-icon" onClick={toggleComments} />
            {showComments && (<Comment idpostcl={post._id} />)}
          </div>
          <hr />
        </div>
      ))}
      {props.projets && props.projets.map((post) => {
        const deadline = new Date(post.Deadline);
        const formattedDeadline = `${deadline.getDate()}/${deadline.getMonth() + 1}/${deadline.getFullYear()}`;
        return (
          <div key={post._id}>
            <p style={{ color: 'rgb(83 120 233)', textDecoration: 'underline', textAlign: 'center' }}>Domain:{post.domain}</p>
            <p>-Activity:{post.titre}</p>
            <p>-Description: {post.contenu}</p>
            <p>-Skills Needed: {post.Skills}</p>
            <p>- Deadline: {formattedDeadline}</p>
            <p style={{ color: 'rgb(83 120 233)', textDecoration: 'underline' }}><strong>Budget:{post.Budget}</strong> </p>
            <div className="action-icons">
              <FontAwesomeIcon icon={faEdit} className="edit-icon" />
              <FontAwesomeIcon icon={faTrash} className="delete-icon" onClick={() => props.onDeleteProject(post._id)}/>


              {/*<FontAwesomeIcon icon={faTrash} className="delete-icon" onClick={() => deleteProject(idproject.id)} />*/}
              <FontAwesomeIcon icon={faComment} className="comment-icon" onClick={toggleComments} />
              {showComments && (<Comment idprojet={post._id} />)}
            </div>
            <hr />
          </div>
        );
      })}
      {props.postesfr && props.postesfr.map(post => (
        <div key={post._id}>
          <h3 style={{ color: '#0A1D56', textDecoration: 'underline', fontSize: '20px' }}>{post.domain}</h3>
          <p><strong>Activity:</strong> {post.activity}</p>
          <p><strong>Description:</strong> {post.description}</p>
          <p><strong>Files:</strong> </p>
          {post.files.map((file, index) => (
            <img width="400px" height="200px" key={index} src={file.url} alt={`Image ${index + 1}`} />
          ))}
          <div className="action-icons">
            <FontAwesomeIcon icon={faEdit} className="edit-icon" />
            <FontAwesomeIcon icon={faTrash} className="delete-icon" onClick={() => props.onDeletePost(post._id)}/>
            <FontAwesomeIcon icon={faComment} className="comment-icon" onClick={toggleComments} />
            {showComments && (<Comment idpostfr={post._id} />)}
          </div>
          <hr />
        </div>
      ))}
      {props.annonces && props.annonces.map(post => (
        <div key={post._id}>
          <h3 style={{ color: '#0A1D56', textDecoration: 'underline', fontSize: '20px' }}>{post.domain}</h3>
          <p><strong>Description: </strong>{post.contenu}</p>
          <p><strong>Start Date: </strong>{post.startdate}</p>
          <p><strong>End Date:</strong> {post.enddate}</p>
          <p><strong>Address:</strong> {post.address}</p>
          <p><strong>Mode Delivery: </strong>{post.modedelivery}</p>
          <p><strong>Price:</strong> {post.price}</p>
          <div className="action-icons">
            <FontAwesomeIcon icon={faEdit} className="edit-icon" />
            <FontAwesomeIcon icon={faTrash} className="delete-icon" onClick={() => props.onDeleteAnnouncement(post._id)}/>
            <FontAwesomeIcon icon={faComment} className="comment-icon" onClick={toggleComments} />
            {showComments && (<Comment idannonce={post._id} />)}
          </div>
          <hr />
        </div>
      ))}
    </div>
  );
};

export default Posts;
