import React, { useEffect, useState } from 'react';
import './Profile.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Posts from '../Posts/Posts';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import img2 from '../images/pp.png';
const ProfileFormateur = () => {
    const [user, setuser] = useState({});
    const navigate = useNavigate();
    const [annonces, setAnnonces] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const usertype = localStorage.getItem('usertype');
        const id = localStorage.getItem('id');
        if (!token || usertype !== "Formateur" && !id) {
            // Redirect to '/'
            navigate('/');
        }
        else {
            axios.get(`http://localhost:5000/formateurGetFormateur/${id}`, {
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
            axios.get(`http://localhost:5000/getAnnonces/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then(response => {
                    console.log(response.data);
                    setAnnonces(response.data);

                })
                .catch(error => {
                    // Handle error
                });
        }
    }, [])
    const handlereviews = async () => {
        navigate("/reviews1");
    }
    const handleDeleteAnnouncement = async (announcementId) => {
        try {
            const response = await axios.delete(`http://localhost:5000/deleteAnnonce/${announcementId}`);
            if (response.status === 200) {
                setAnnonces(prevAnnouncements => prevAnnouncements.filter(annonce => annonce._id !== announcementId));
                alert('Announcement deleted successfully!');
            } else {
                console.error('Failed to delete the announcement');
            }
        } catch (error) {
            console.error('Error deleting the announcement:', error);
        }
    };
    return (
        <div className='b'>
            <div className="container">
                <div className="main-body">
                    {/* Breadcrumb */}
                    <nav aria-label="breadcrumb" className="main-breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><a href="acceuilformateur">Home</a></li>
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
                                            <p className="text-secondary mb-1">Trainer</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="card mt-3">
                                <h4 style={{ textAlign: 'center', color: 'rgb(99, 196, 241)', marginTop: '10px' }}>About Me</h4>
                                {/*  About Me */}
                                <ul className="list-group list-group-flush">
                                    {/*<li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                        <h6 className="mb-0">Interests</h6>
                                        <span className="text-secondary">
                                            {user.interets && user.interets.map((interet, index) => (
                                                <React.Fragment key={index}>
                                                    {interet}
                                                    {index !== user.interets.length - 1 && <br />}
                                                </React.Fragment>
                                            ))}
                                        </span>
                                    </li>*/}
                                    <li className="list-group-item">
                                        <h6>Skills</h6>
                                        <div className="skill1-container">
                                            {user.competances && user.competances.map((skill, index) => (
                                                <div key={index} className="skill1-box">
                                                    <p>{skill}</p>
                                                </div>
                                            ))}
                                        </div>

                                    </li>
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

                                </ul>

                            </div>
                        </div>
                        <div className="col-md-8">

                            {/*  Infos */}
                            <div className="card mb-3" style={{ height: '264px' }}>
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
                                    <div className="row">
                                        <div className="col-sm-12">
                                            <button className="Profile button button2">Edit</button>
                                            <button onClick={handlereviews} className="Profile button">Reviews</button>

                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/*  Posts */}
                            <div className="row gutters-sm">
                                <div className="col-sm-6 mb-3" style={{ width: '100%' }}>
                                    <div className="card h-100">
                                        <div className="card-body">
                                            <h4 style={{ color: 'rgb(99, 196, 241)', textAlign: 'center', marginBottom: '-7px', marginTop: '-5px' }}>Announcement</h4>
                                            <hr />

                                            <Posts annonces={annonces} onDeleteAnnouncement={handleDeleteAnnouncement} />
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

export default ProfileFormateur;
