import React, { useEffect, useState } from 'react';
import './CommentSection.css'; // Import your CSS file
import { IconButton, InputAdornment, TextField } from '@mui/material';
import { Edit, Delete, Save, Send } from '@mui/icons-material'; // Import the necessary icons
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import axios from 'axios';
const Comment = (props) => {

    const [userComment, setUserComment] = useState('');
    const [comments, setComments] = useState([]);
    const [commentCount, setCommentCount] = useState(0);
    const [editingCommentId, setEditingCommentId] = useState("null"); // New state to track the id of the comment being edited
    const [likedComments, setLikedComments] = useState([]);
    const [typepost, settypepost] = useState("");
    useEffect(() => {
        const fetchData = async () => {
            const id = props.idpostfr || props.idannonce || props.idprojet || props.idpostcl || props.idannonce;
            console.log("ID:", id);
            let endpoint = "";

            if (props.idpostfr) {
                endpoint = `http://localhost:5000/freelancerGetComments/${id}`;
                settypepost("postfr");
            } else if (props.idannonce) {
                endpoint = `http://localhost:5000/freelancerGetCommentsAnnonce/${id}`;
                settypepost("annonce");
            } else if (props.idprojet) {
                endpoint = `http://localhost:5000/freelancerGetCommentsProjet/${id}`;
                settypepost("projet");
            } else if (props.idpostcl) {
                endpoint = `http://localhost:5000/clientGetCommentsPosteClient/${id}`;
                settypepost("posteclient");
            }else if (props.idannonce) {
                endpoint = `http://localhost:5000/formateurGetCommentsAnnonce/${id}`;
                settypepost("annonce");
            }else if (props.idprojet) {
                endpoint = `http://localhost:5000/clientGetCommentsProjet/${id}`;
                settypepost("projet");
            } else if (props.idpostcl) {
                endpoint = `http://localhost:5000/clientGetCommentsPosteClient/${id}`;
                settypepost("posteclient");
            }

            try {
                const response = await axios.get(endpoint);
                console.log("Response:", response.data);
                setComments(response.data);
            } catch (error) {
                console.error("Error fetching comments:", error);
                // Handle error
            }
        };

        fetchData();
    }, [props.idpostfr, props.idannonce, props.idprojet, props.idpostcl, props.idannonce]);
    const handleCommentChange = (e) => {
        setUserComment(e.target.value);
    }

    const handleLike = (id) => {
        if (likedComments.includes(id)) {
            setLikedComments(likedComments.filter(likedId => likedId !== id));
        } else {
            setLikedComments([...likedComments, id]);
        }
    }

    const isLiked = (id) => {
        return likedComments.includes(id);
    }

    const addPost = () => {
        if (!userComment) return;

        const newComment = {


            nom: localStorage.getItem("name"),
            contenu: userComment,

        };
        console.log(props);
        let endpoint = "";
        if (localStorage.getItem("usertype") === "Freelancer") {
            if (typepost === "postfr") {
                endpoint = `http://localhost:5000/freelancerAddCommentPoste/${props.idpostfr}`;
            } else if (typepost === "annonce") {
                endpoint = `http://localhost:5000/freelancerAddCommentAnnonce/${props.idannonce}`;
            } else if (typepost === "projet") {
                endpoint = `http://localhost:5000/freelancerAddCommentProjet/${props.idprojet}`;
            }
        } else if (localStorage.getItem("usertype") === "Client") {
            if (typepost === "postfr") {
                endpoint = `http://localhost:5000/clientAddCommentPoste/${props.idpostfr}`;
            } else if (typepost === "annonce") {
                endpoint = `http://localhost:5000/clientAddCommentAnnonce/${props.idannonce}`;
            } else if (typepost === "posteclient") {
                console.log("oui");
                endpoint = `http://localhost:5000/clientAddCommentPosteClient/${props.idpostcl}`;
            }else if (typepost === "projet") {
                endpoint = `http://localhost:5000/clientAddCommentProjet/${props.idprojet}`;
            }
        }else if (localStorage.getItem("usertype") === "Formateur") {
            if(typepost === "posteclient") {
                console.log("oui");
                endpoint = `http://localhost:5000/formateurAddCommentPosteClient/${props.idpostcl}`;
            }else if (typepost === "annonce") {
                endpoint = `http://localhost:5000/formateurAddCommentAnnonce/${props.idannonce}`;
          
        }}
        axios.post(endpoint, newComment)
            .then(response => {
                console.log("Comment added successfully:", response.data);
           {/* setEditingCommentId(response.data.id);*/}
                setComments([...comments, newComment]);
                setUserComment('');
                setCommentCount(comments.length + 1);
            })
            .catch(error => {
                console.error("Error adding comment:", error);
                // Handle error
            });
    };

   {/* const handleEdit = (id) => {
        console.log(id);
        console.log(comments);
        // Set the comment to be edited in the input field
        const commentToEdit = comments.find(comment => comment._id === id);
        console.log(commentToEdit);
        setUserComment(userComment); // Update userComment state
        setEditingCommentId(id);
    }

    const handleSaveEdit = () => {
        console.log(userComment);

        const updatedComments = comments.map(comment => {
            if (comment._id === editingCommentId) {
                console.log(true);
                return {
                    ...comment,
                    contenu: userComment
                };
            }
            // If it's not the comment being edited, return it unchanged
            return comment;
        });
        let endpoint = "";
        if (localStorage.getItem("usertype") === "Freelancer") {
            if (typepost === "postfr") {
                endpoint = `http://localhost:5000/freelancerUpdateCommentPoste/${props.idpostfr}/${editingCommentId}`;
            } else if (typepost === "annonce") {
                endpoint = `http://localhost:5000/freelancerUpdateCommentAnnonce/${props.idannonce}/${editingCommentId}`;
            } else if (typepost === "projet") {
                endpoint = `http://localhost:5000/freelancerUpdateCommentProjet/${props.idprojet}/${editingCommentId}`;
            }
        } else if (localStorage.getItem("usertype") === "Client") {
            if (typepost === "postfr") {
                endpoint = `http://localhost:5000/ClientUpdateCommentPoste/${props.idpostfr}/${editingCommentId}`;
            } else if (typepost === "annonce") {
                endpoint = `http://localhost:5000/ClientUpdateCommentAnnonce/${props.idannonce}/${editingCommentId}`;
            } else if (typepost === "posteclient") {
                console.log("oui");
                endpoint = `http://localhost:5000/ClientUpdateCommentPosteClient/${props.idpostcl}/${editingCommentId}`;
            }
        }

        axios.patch(endpoint, { nom: localStorage.getItem("name"), contenu: userComment }) // Assuming you want to send the updated content in the request body
            .then(response => {
                console.log("Comment updated successfully:", response.data);
                console.log(updatedComments);
                setComments(updatedComments);
                setUserComment('');
                setEditingCommentId(null);
            })
            .catch(error => {
                console.error("Error updating comment:", error);
                // Handle error
            });


    }*/}

    const handleDelete = (id) => {
        let endpoint = "";
    
        if (typepost === "postfr" && localStorage.getItem("usertype") === "Freelancer") {
            endpoint = `http://localhost:5000/freelancerDeleteCommentPoste/${props.idpostfr}/${id}`;
        } else if (typepost === "annonce" && localStorage.getItem("usertype") === "Freelancer") {
            endpoint = `http://localhost:5000/freelancerDeleteCommentAnnonce/${props.idannonce}/${id}`;
        } else if (typepost === "projet" && localStorage.getItem("usertype") === "Freelancer") {
            endpoint = `http://localhost:5000/freelancerDeleteCommentProjet/${props.idprojet}/${id}`;
        } else if (typepost === "postfr" && localStorage.getItem("usertype") === "Client") {
            endpoint = `http://localhost:5000/clientDeleteCommentPoste/${props.idpostfr}/${id}`;
        } else if (typepost === "annonce" && localStorage.getItem("usertype") === "Client") {
            endpoint = `http://localhost:5000/clientDeleteCommentAnnonce/${props.idannonce}/${id}`;
        } else if (typepost === "posteclient" && localStorage.getItem("usertype") === "Client") {
            endpoint = `http://localhost:5000/ClientDeleteCommentPosteClient/${props.idpostcl}/${id}`;
        } else if (typepost === "projet" && localStorage.getItem("usertype") === "Client") {
            endpoint = `http://localhost:5000/ClientDeleteCommentProjet/${props.idprojet}/${id}`;
        }else if (typepost === "posteclient" && localStorage.getItem("usertype") === "Formateur") {
            endpoint = `http://localhost:5000/formateurDeleteCommentPosteClient/${props.idpostcl}/${id}`;
        }else if (typepost === "annonce" && localStorage.getItem("usertype") === "Formateur") {
            endpoint = `http://localhost:5000/formateurDeleteCommentAnnonce/${props.idannonce}/${id}`;
        }
    
        axios.delete(endpoint)
            .then(response => {
                const updatedComments = comments.filter(comment => comment._id !== id);
                setComments(updatedComments);
                setCommentCount(updatedComments.length);
            })
            .catch(error => {
                console.error('Error deleting comment:', error);
            });
    }
    
    return (
        <div className='commentsection'>
            <div className="container">
                <div className="comments">
                    {comments.map(comment => (
                        <div key={comment._id} className="parents">
                            <div>
                                <h1 style={{ color: 'black' }}>{comment.nom}</h1>
                                {editingCommentId === comment._id ? (
                                    <TextField
                                        value={userComment}
                                        onChange={handleCommentChange}
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton /*onClick={handleSaveEdit}*/>
                                                        <Save />
                                                    </IconButton>
                                                </InputAdornment>
                                            ),
                                        }}

                                    />
                                ) : (
                                    <p>{comment.contenu}</p>
                                )}
                                <div className="engagements">
                                    {isLiked(comment._id) ? (
                                        <FavoriteIcon onClick={() => handleLike(comment._id)} />
                                    ) : (
                                        <FavoriteBorderIcon onClick={() => handleLike(comment._id)} />
                                    )}
                                    {localStorage.getItem("name") === comment.nom && (
                                        <div>
                                            <IconButton /* onClick={() => handleEdit(comment._id)}*/ >
                                                <Edit />
                                            </IconButton>
                                            <IconButton onClick={() => handleDelete(comment._id)}>
                                                <Delete />
                                            </IconButton>
                                        </div>
                                    )}


                                </div>
                                <span className="date">{comment.date}</span>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="commentbox">
                    <img src={require('./user1.png')} alt="User" />
                    <div className="content">
                        <div className="commentinput">
                            <TextField
                                type="text"
                                placeholder="Enter comment"
                                className="usercomment"
                                value={userComment}
                                onChange={handleCommentChange}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton onClick={addPost}>
                                                <Send />
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Comment;
