import React, { useEffect, useState } from 'react';
import './Profile.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Posts from '../Posts/Posts';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import TrainingsList from './TrainingsList';
import img2 from '../images/pp.png';
const ProfileFreelancer = () => {
    const [user, setuser] = useState({});
    const [postesfr, setPostesFr] = useState([]);
    const navigate = useNavigate();
    const [isTrainingsListOpen, setIsTrainingsListOpen] = useState(false);
    

    const toggleTrainingsList = () => {
        setIsTrainingsListOpen(!isTrainingsListOpen);
    };
    const handleCloseTrainingsList = () => {
        setIsTrainingsListOpen(false);
    };
    useEffect(() => {
        const token = localStorage.getItem('token');
        const usertype = localStorage.getItem('usertype');
        const id = localStorage.getItem('id');
        if (!token || usertype !== "Freelancer" && !id) {
            // Redirect to '/'
            navigate('/');
        }
        else {
            axios.get(`http://localhost:5000/freelancerGetFreelancer/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then(response => {
                    console.log(response.data);
                    setuser(response.data);

                })
                .catch(error => {
                    // Handle error
                });
            axios.get(`http://localhost:5000/getPostes/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then(response => {
                    console.log(response.data);
                    setPostesFr(response.data);

                })
                .catch(error => {
                    // Handle error
                });
        }
    }, [])
    const handleDeletePost = async (postId) => {
        try {
            // Perform the delete operation here
            // For example, you can use axios.delete or any other method
            const response = await axios.delete(`http://localhost:5000/deletePoste/${postId}`);
            if (response.status === 200) {
                // If deletion is successful, update the state to reflect the change
                setPostesFr(prevPostes => prevPostes.filter(post => post._id !== postId));
                alert('Post deleted successfully!');
            } else {
                console.error('Failed to delete the post');
            }
        } catch (error) {
            console.error('Error deleting the post:', error);
        }
    };
    
    const handlereviews = async () => {
        navigate("/reviews1");
    }
    return (
        <div className='b'>
            {isTrainingsListOpen && <TrainingsList formations={user.formations} onClose={handleCloseTrainingsList} isOpen={isTrainingsListOpen} />}

            <div className={isTrainingsListOpen ? "blur-background" : ""}>
                <div className="container ">
                    <div className="main-body">
                        {/* Breadcrumb */}
                        <nav aria-label="breadcrumb" className="main-breadcrumb">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item"><a href="/acceuilfreel">Home</a></li>
                                <li className="breadcrumb-item active" aria-current="page">Profile</li>
                            </ol>
                        </nav>
                        {/* /Breadcrumb */}
                        <div className="row gutters-sm">
                            <div className="col-md-4 mb-3">
                                <div className="card">
                                    <div className="card-body">
                                        <div className="d-flex flex-column align-items-center text-center">
                                            <img src={img2} alt="Admin" className="rounded-circle" width="150" />
                                            <div className="mt-3">
                                                <h4>{user.name}</h4>
                                                <p className="text-secondary mb-1">{user.job}</p>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/*  About Me */}

                                <div className="card mt-3">
                                    <h4 style={{ textAlign: 'center', color: 'rgb(99, 196, 241)', marginTop: '10px' }}>About Me</h4>
                                    <ul className="list-group list-group-flush">
                                        <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                            <h6 className="mb-0">Journey</h6>
                                            <span className="text-secondary">
                                                {user.parcours ? user.parcours : "No journey information available"}
                                            </span>
                                        </li>
                                        <li className="list-group-item">
                                            <h6>Skills</h6>
                                            <div className="skill1-container">
                                                {user.competences && user.competences.map((skill, index) => (
                                                    <div key={index} className="skill1-box">
                                                        <p>{skill}</p>
                                                    </div>
                                                ))}
                                            </div>

                                        </li>


                                        {/*<li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                        <h6 className="mb-0">Interests</h6>
                                        <span className="text-secondary">
                                        {user.intersts && user.intersts.map((interet, index) => (
                                                <React.Fragment key={index}>
                                                    {interet}
                                                    {index !== user.intersts.length - 1 && <br />}
                                                </React.Fragment>
                                            ))}
                                        </span>
                                    </li>*/}
                                        <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                            <h6 className="mb-0">Languages</h6>
                                            <span className="text-secondary">
                                                {user.languages && user.languages.map((language, index) => (
                                                    <React.Fragment key={index}>
                                                        {language}
                                                        {index !== user.languages.length - 1 && <br />}
                                                    </React.Fragment>
                                                ))}
                                            </span>
                                        </li>
                                        {
                                            /*<li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                                              <h6 className="mb-0"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-facebook mr-2 icon-inline text-primary"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>Facebook</h6>
                                                              <span className="text-secondary">bootdey</span>
                                                            </li> */
                                        }
                                    </ul>
                                </div>
                            </div>
                            <div className="col-md-8">
                                {/*  Buttons */}

                                {/*  Infos */}
                                <div className="card mb-3" style={{ height: '270px' }}>
                                    <div className="card-body">


                                        <div className="row">
                                            <div className="col-sm-3">
                                                <h6 className="mb-0">Email</h6>
                                            </div>
                                            <div className="col-sm-9 text-secondary">
                                                {user.email}
                                            </div>
                                        </div>
                                        <hr />
                                        <div className="row">
                                            <div className="col-sm-3">
                                                <h6 className="mb-0">Phone</h6>
                                            </div>
                                            <div className="col-sm-9 text-secondary">
                                                {user.phoneNumber}
                                            </div>
                                        </div>
                                        <hr />


                                        <div className="row">
                                            <div className="col-sm-3">
                                                <h6 className="mb-0">Address</h6>
                                            </div>
                                            <div className="col-sm-9 text-secondary">
                                                {user.address}
                                            </div>
                                        </div>
                                        <hr />
                                        <div className="row" style={{ marginBottom: '20px' }}>
                                            <div className="col-sm-12" >
                                                <button className="Profile button button1">Edit</button>
                                                <button className="Profile button" onClick={toggleTrainingsList}>Trainings</button>
                                                <button onClick={handlereviews} className=" Profile button ">Reviews</button>

                                            </div>
                                        </div>

                                    </div>
                                </div>
                                {/*  Posts */}
                                <div className="row gutters-sm">
                                    <div className="col-sm-6 mb-3" style={{ width: '100%' }}>
                                        <div className="card h-100">
                                            <div className="card-body">
                                                <h4 style={{ color: 'rgb(99, 196, 241)', textAlign: 'center', marginBottom: '-7px', marginTop: '-5px' }}>Projects</h4>
                                                <hr />
                                                <Posts postesfr={postesfr} onDeletePost={handleDeletePost} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileFreelancer;
