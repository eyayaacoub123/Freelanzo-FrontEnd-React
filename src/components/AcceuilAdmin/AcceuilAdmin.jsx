import React, { useState, useEffect } from 'react';
import '../AcceuilFreelancer/AcceuilFreelancer.css';
import BellIcon from '@mui/icons-material/Notifications';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import Comment from '../cmt/CommentSection';
import gifImage1 from '../images/p3.gif';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faEdit, faTrash, faComment } from '@fortawesome/free-solid-svg-icons';




const AcceuilAdmin = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [ispostchosen, setidpostchosen] = useState("");
    const searchParams = new URLSearchParams(location.search);
    const [isFullScreen, setIsFullScreen] = useState(false);
    //const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [posts, setPosts] = useState([]);
    const [projets, setProjets] = useState([]);
    const [annonces, setAnnonces] = useState([]);
    const [trainings, setTrainings] = useState([]);


    const [modalData, setModalData] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [showModal2, setShowModal2] = useState(false);
    const [showModal3, setShowModal3] = useState(false);
    const [modalDataTraining, setModalDataTraining] = useState(null);
    const [showModalTraining, setShowModalTraining] = useState(false);

    const [button1Clicked, setButton1Clicked] = useState(true);
    const [button2Clicked, setButton2Clicked] = useState(false);
    const [button3Clicked, setButton3Clicked] = useState(false);
    const [button4Clicked, setButton4Clicked] = useState(false);
    const [dataposts, setDatapost] = useState([]);
    const [search, setsearch] = useState("");






    const [iduser, setiduser] = useState("");
    const [nom, setnom] = useState("");


    useEffect(() => {
        setiduser(iduser);
        setnom(nom);
        console.log(iduser);
        console.log(nom);
       
            if (localStorage.getItem("usertype")!=="admin"){
              navigate("/");
            }
          
     
        // Fetch data from multiple endpoints
        const fetchData = async () => {
            try {
                const projetsResponse = await axios.get(`http://localhost:5000/adminGetProjetsClient/${iduser}`);
                setDatapost(projetsResponse.data);
                // Merge the data from all endpoints into a single array
                // Set the merged data to the posts state
                setProjets(projetsResponse.data);
            } catch (error) {
                // Handle error
            }
        };
        // Call the fetchData function
        fetchData();

        // Cleaning up event listeners
        const searchContainerClickHandler = () => {
            const searchContainer = document.getElementById('searchContainer');
            searchContainer.classList.toggle('clicked');
            document.getElementById('searchInput').focus();
        };

        const searchIconClickHandler = () => {
            const searchContainer = document.getElementById('searchContainer');
            searchContainer.classList.toggle('show-input');
            if (searchContainer.classList.contains('show-input')) {
                document.getElementById('searchInput').focus();
            }
        };

        const searchContainer = document.getElementById('searchContainer');
        const searchIcon = document.getElementById('searchIcon');

        searchContainer.addEventListener('click', searchContainerClickHandler);
        searchIcon.addEventListener('click', searchIconClickHandler);

        return () => {
            searchContainer.removeEventListener('click', searchContainerClickHandler);
            searchIcon.removeEventListener('click', searchIconClickHandler);
        };
    }, [iduser, nom]); // Include dependencies in the dependency array

    const handlegetinsp = async () => {
        try {
            const postesResponse = await axios.get(`http://localhost:5000/adminGetPostes/`);
            setPosts(postesResponse.data);
            setDatapost(postesResponse.data);
            setAnnonces([]);
            setProjets([]);
            setTrainings([]);

            setButton1Clicked(false);
            setButton2Clicked(true);
            setButton3Clicked(false);
            setButton4Clicked(false);
        } catch (error) {
            console.error("Error fetching inspiration:", error);
            // Handle error (e.g., show an error message to the user)
        }
    };

    const handlegetjobs = async () => {
        try {
            const projetsResponse = await axios.get(`http://localhost:5000/adminGetProjetsClient`);
            setProjets(projetsResponse.data);
            setDatapost(projetsResponse.data);
            setAnnonces([]);
            setPosts([]);
            setTrainings([]);

            setButton1Clicked(true);
            setButton2Clicked(false);
            setButton3Clicked(false);
            setButton4Clicked(false);
        } catch (error) {
            console.error("Error fetching jobs:", error);
            // Handle error
        }
    };

    const handlegetcourses = async () => {
        try {
            const annoncesResponse = await axios.get(`http://localhost:5000/adminGetAnnonces/`);
            setAnnonces(annoncesResponse.data);
            setDatapost(annoncesResponse.data);
            setPosts([]);
            setProjets([]);
            setTrainings([]);

            setButton1Clicked(false);
            setButton2Clicked(false);
            setButton3Clicked(true);
            setButton4Clicked(false);
        } catch (error) {
            console.error("Error fetching courses:", error);
            // Handle error
        }
    };

    const handlegettrainings = async () => {

        try {
            const trainingsResponse = await axios.get(`http://localhost:5000/adminGetPostesClient/`);
            setTrainings(trainingsResponse.data);
            setDatapost(trainingsResponse.data);
            console.log(trainingsResponse.data);
            setAnnonces([]);
            setPosts([]);
            setProjets([]);

            setButton1Clicked(false);
            setButton2Clicked(false);
            setButton3Clicked(false);
            setButton4Clicked(true);
        } catch (error) {
            console.error("Error fetching jobs:", error);
            // Handle error
        }
    };

    const toggleFullScreen = () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
            setIsFullScreen(true);
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
                setIsFullScreen(false);
            }
        }
    };

    const [showComments, setShowComments] = useState(false);

    const toggleComments = () => {
        setShowComments(!showComments);
    };





    const handlesearch = (event) => {
        const searchTerm = event.target.value;
        setsearch(searchTerm);
        console.log(searchTerm);
        if (button1Clicked && projets) {
            // Filter projects based on search term
            const filteredProjects = projets.filter((project) =>
                (  project.auteur && project.auteur.toLowerCase().includes(searchTerm.toLowerCase()) )||
            (project.domain && project.domain.toLowerCase().includes(searchTerm.toLowerCase()))||
            (project.titre && project.titre.toLowerCase().includes(searchTerm.toLowerCase()))
        );
            setProjets(filteredProjects);


        } else if (button2Clicked && posts) {
            // Filter posts based on search term
            const filteredPosts = posts.filter((post) =>
                (post.auteur && post.auteur.toLowerCase().includes(searchTerm.toLowerCase()) )||
            (post.domain && post.domain.toLowerCase().includes(searchTerm.toLowerCase())) ||
            (post.activity && post.activity.toLowerCase().includes(searchTerm.toLowerCase()))

            );

            setPosts(filteredPosts);


        } else if (button3Clicked && annonces) {
            // Filter announcements based on search term
            const filteredAnnouncements = annonces.filter((announcement) =>
                announcement.auteur && announcement.auteur.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (announcement.domain && announcement.domain.toLowerCase().includes(searchTerm.toLowerCase())) ||
            (announcement.modedelivery && announcement.modedelivery.toLowerCase().includes(searchTerm.toLowerCase()))
        );
            setAnnonces(filteredAnnouncements);

        }else if (button4Clicked && trainings) {
            // Filter announcements based on search term
            const filteredTrainings = trainings.filter((training) =>
            (training.auteur && training.auteur.toLowerCase().includes(searchTerm.toLowerCase())) ||
            (training.domainTraining && training.domainTraining.toLowerCase().includes(searchTerm.toLowerCase()))

            );
            setTrainings(filteredTrainings);

        }

        if (searchTerm.length === 0 && button1Clicked) {
            setProjets(dataposts);
            console.log("hi");
            console.log(dataposts);
        }
        else if (searchTerm.length === 0 && button2Clicked) {
            setPosts(dataposts);
        }
        else if (searchTerm.length === 0 && button3Clicked) {
            setAnnonces(dataposts);

        }else if (searchTerm.length === 0 && button4Clicked) {
            setTrainings(dataposts);

        }

    };
    const closeModalTraining = () => {
        setShowModalTraining(false);
    };

    const toggleTrainingDetails = (post) => {
        setidpostchosen(post._id);

        setModalDataTraining({
            domainTraining: post.domainTraining,
            descriptionTraining: post.descriptionTraining,
        });
        showModalTraining(true);
    };
    const toggleDetails = (post) => {
        setidpostchosen(post._id);
        console.log(ispostchosen);
        console.log(post._id);
        setModalData({
            description: post.description,
            files: post.files
        });
        setShowModal(true);
    };
    const toggleDetails2 = (post) => {
        setidpostchosen(post._id);
        console.log(" hhh" + post._id);
        localStorage.setItem("posteformation", (post._id));
        setModalData({
            contenu: post.contenu,
            modedelivery: post.modedelivery,
            address: post.address,

        });
        setShowModal2(true);
    };
    const toggleDetails3 = (post) => {
        setidpostchosen(post._id);
        console.log(post._id);
        console.log(ispostchosen);
        setModalData({
            contenu: post.contenu,
            Skills: post.Skills

        });
        setShowModal3(true);
    };
  
    const redirecttocard = async (id) => {
        const queryParams = new URLSearchParams({ id: id }).toString();
        navigate(`/cardprofile?${queryParams}`);
    }
    const redirecttocardcl = async (id) => {
        const queryParams = new URLSearchParams({ id: id }).toString();
        navigate(`/cardprofilecl?${queryParams}`);
    }
    const redirecttocardfo = async (id) => {
        const queryParams = new URLSearchParams({ id: id }).toString();
        navigate(`/cardprofilefo?${queryParams}`);
    }

    const handleContinue = () => {
        navigate(`/inscritFormation`);
    };

    const handleSendRequest = () => {

        localStorage.setItem('posteid', ispostchosen);
        navigate(`/Apply`);
    };
    const closeModal = () => {
        setShowModal(false);
    };
    const closeModal2 = () => {
        setShowModal2(false);
    };
    const closeModal3 = () => {
        setShowModal3(false);
    };
    const handleDeletePosteFreelancer = async (id) => {
        try {
            const response = await axios.delete(`http://localhost:5000/adminDeletePoste/${id}`);
            if (response.status === 200) {
                // Update the posts state
                const updatedPosts = posts.filter(post => post._id !== id);
                setPosts(updatedPosts);
                alert('Post deleted successfully!');
            } else {
                console.error('Failed to delete the post');
            }
        } catch (error) {
            console.error('Error deleting the post:', error);
        }
    };

    // Function to delete an Annonce
    const handleDeleteAnnonce = async (id) => {
        try {
            const response = await axios.delete(`http://localhost:5000/adminDeleteAnnonce/${id}`);
            if (response.status === 200) {
                // Update the annonces state
                const updatedAnnonces = annonces.filter(annonce => annonce._id !== id);
                setAnnonces(updatedAnnonces);
                alert('Annonce deleted successfully!');
            } else {
                console.error('Failed to delete the annonce');
            }
        } catch (error) {
            console.error('Error deleting the annonce:', error);
        }
    };

    // Function to delete a ProjetClient
    const handleDeleteProjetClient = async (id) => {
        try {
            const response = await axios.delete(`http://localhost:5000/adminDeleteProjet/${id}`);
            if (response.status === 200) {
                // Update the projets state
                const updatedProjets = projets.filter(projet => projet._id !== id);
                setProjets(updatedProjets);
                alert('Projet deleted successfully!');
            } else {
                console.error('Failed to delete the projet');
            }
        } catch (error) {
            console.error('Error deleting the projet:', error);
        }
    };

    // Function to delete a PosteClient
    const handleDeletePosteClient = async (id) => {
        try {
            const response = await axios.delete(`http://localhost:5000/adminDeletePosteClient/${id}`);
            if (response.status === 200) {
                // Update the trainings state
                const updatedTrainings = trainings.filter(training => training._id !== id);
                setTrainings(updatedTrainings);
                alert('PosteClient deleted successfully!');
            } else {
                console.error('Failed to delete the posteClient');
            }
        } catch (error) {
            console.error('Error deleting the posteClient:', error);
        }
    };

    
    return (
        <div className='acceuil' style={{ backgroundColor: '#e0e8ff' }}>
            <section className="home">
                <div className="top-buttons">

                    <button className="insp1" id="button2" onClick={handlegetjobs} style={{ color: button1Clicked ? '#ff9409' : 'initial' }}>Projects Requests</button>
                    <button id="button1" onClick={handlegetinsp} style={{ color: button2Clicked ? '#ff9409' : 'initial' }}>Freelancer's Posts</button>
                    <button id="button3" onClick={handlegetcourses} style={{ color: button3Clicked ? '#ff9409' : 'initial' }}>Announcement</button>
                    <button className='learn1' id="button4" onClick={handlegettrainings} style={{ color: button4Clicked ? '#ff9409' : 'initial' }}>Trainings Requests</button>


                    <div id="notification" className="notification-icon">
                        <BellIcon />
                    </div>
                    <div id="fullscreen" className="fullscreen-icon" onClick={toggleFullScreen}>
                        <FullscreenIcon />
                    </div>
                    <div className="search" id="searchContainer">
                        <SearchIcon id="searchIcon" />
                        <input 
    type="text" 
    onChange={handlesearch} 
    name="search" 
    placeholder="Search.." 
    id="searchInput" 
    style={{ width: '1104.2px' }} 
/>

                    </div>

                </div>


                {/* Form section */}




                {/* Post container */}
                {/* Post container */}
                <div className="post-container">
                    {/* Separate posts by type */}
                    {[  trainings.map(post => ({ ...post, type: 'TrainingPosts' })),
                        projets.map(post => ({ ...post, type: 'projets' })),
                        annonces.map(post => ({ ...post, type: 'annonces' })),
                        posts.map(post => ({ ...post, type: 'postsfr' }))
                    ]
                        // Merge posts into one array
                        .reduce((acc, curr) => acc.concat(curr), [])
                        // Sort posts by dateCreation in ascending order
                        .sort((a, b) => new Date(a.dateCreation) - new Date(b.dateCreation))
                        .map((post, index) => {
                            const dateCreation = new Date(post.dateCreation);
                            const formattedDate = `${dateCreation.getDate()}/${dateCreation.getMonth() + 1}/${dateCreation.getFullYear()}`;
                            switch (post.type) {
                                case 'projets':
                                    const deadline = new Date(post.Deadline);
                                    const formattedDeadline = `${deadline.getDate()}/${deadline.getMonth() + 1}/${deadline.getFullYear()}`;
                                    return (
                                        <div key={index} className="post">
                                            <a onClick={() => redirecttocardcl(post.idclient)}>
                                                <h2 className="custom3-h2">{post.auteur}</h2>
                                            </a>
                                            <h2>{formattedDate}</h2>
                                            <p>- Domain: {post.domain}</p>
                                            <p>- Activity: {post.titre}</p>
                                            <p>- Deadline: {formattedDeadline}</p> {/* Change here */}
                                            <h6><strong>Budget($):</strong> {post.Budget}</h6>
                                            <div className="see-more">
                                                <button type='button' onClick={() => toggleDetails3(post)}>See More</button>
                                            </div>
                                            <FontAwesomeIcon icon={faTrash} className="delete-icon"onClick={() => handleDeleteAnnonce(post._id, post.type)}/>

                                        </div>
                                    );

                                case 'annonces':
                                    const startdate = new Date(post.startdate);
                                    const formattedStartdate = `${startdate.getDate()}/${startdate.getMonth() + 1}/${startdate.getFullYear()}`;
                                    const enddate = new Date(post.enddate);
                                    const formattedEnddate = `${enddate.getDate()}/${enddate.getMonth() + 1}/${enddate.getFullYear()}`;
                                    return (
                                        <div key={index} className="post">
                                            <a onClick={() => redirecttocardfo(post.idformateur)}>
                                                <h2 className="custom3-h2">{post.auteur}</h2>
                                            </a>
                                            <h2>{formattedDate}</h2>
                                            <p className='custom2-h2'>{post.domain}</p>
                                            <p>-Start Date: {formattedStartdate}</p>
                                            <p>-End Date: {formattedEnddate}</p>
                                            <h6><strong>Price($):</strong> {post.price}</h6>
                                            <div className="see-more">
                                                <button type='button' onClick={() => toggleDetails2(post)}>See More</button>
                                            </div>
                                            <FontAwesomeIcon icon={faTrash} className="delete-icon"onClick={() => handleDeleteProjetClient(post._id, post.type)}/>

                                        </div>
                                    );
                                case 'postsfr':
                                    return (

                                        <div key={index} className="post">
                                            <a onClick={() => redirecttocard(post.idfreelancer)}>
                                                <h2 className="custom3-h2">{post.auteur}</h2>
                                            </a>
                                            <h2>{formattedDate}</h2>
                                            <p className="custom2-h2">-Domain: {post.domain}</p>
                                            <p > <strong className="custom1-h2" style={{ textDecoration: 'none' }}>-Activity: </strong>{post.activity}</p>
                                            <div className="see-more">
                                                <button type='button' onClick={() => toggleDetails(post)}>See More</button>
                                            </div>
                                            <FontAwesomeIcon icon={faTrash} className="delete-icon"onClick={() => handleDeletePosteFreelancer(post._id, post.type)}/>

                                        </div>
                                    );
                                case 'TrainingPosts':
                                    return (
                                        <div key={index} className="post">
                                            <a onClick={() => redirecttocardcl(post.idclient)}>
                                                <h2 className="custom3-h2">{post.auteur}</h2>
                                            </a>
                                            <h2>{formattedDate}</h2>
                                            <div className="custom2-h2"> {post.domainTraining}</div>
                                            <div className="see-more">
                                                <button type='button' onClick={() => toggleTrainingDetails(post)}>See More</button>
                                            </div>
                                            <FontAwesomeIcon icon={faTrash} className="delete-icon"onClick={() => handleDeletePosteClient(post._id, post.type)}/>

                                        </div>
                                    );
                                default:
                                    return null;
                            }
                        })}
                </div>


                {/* Copyright section */}
                <div id="copy" className="copyright-section text-center">
                    <p>&copy; 2024 | All Rights Reserved.</p>
                </div>

                {/* Details modal */}
                {showModal && (
                    <div className="modal">
                        <div className="modal-content">
                            <span className="close" onClick={closeModal}>&times;</span>
                            <h5>Description:</h5>
                            <p>{modalData.description}</p>

                            <h5>Files:</h5>
                            {modalData.files.map((file, index) => (
                                <img width="600px" height="400px" key={index} src={file.url} alt={`Image ${index + 1}`} />
                            ))}

                            <button className='seeComments' onClick={toggleComments} style={{ color: '#808080' }}>See comments</button>
                            {showComments && (<Comment idpostfr={ispostchosen} />)}
                        </div>
                    </div>
                )}
                {showModal2 && (
                    <div className="modal">
                        <div className="modal-content">
                            <span className="close" onClick={closeModal2}>&times;</span>
                            <button className="signup-button" onClick={handleContinue}>Sign up</button>
                            <h5 >Mode Delivery:</h5>
                            <p>{modalData.modedelivery}</p>

                            <h5 >Address:</h5>
                            <p>{modalData.address}</p>

                            <h5>Description:</h5>
                            <p>{modalData.contenu}</p>
                            <button className='seeComments' onClick={toggleComments} style={{ color: '#808080' }}>See comments</button>
                            {showComments && (<Comment idannonce={ispostchosen} />)}

                        </div>
                    </div>
                )}
                {showModal3 && (
                    <div className="modal">
                        <div className="modal-content">
                            <span className="close" onClick={closeModal3}>&times;</span>
                            <button className="signup-button" onClick={handleSendRequest}>Send Request</button>
                            <h5 >Description:</h5>
                            <p>{modalData.contenu}</p>
                            <h5 >Skills:</h5>
                            <p>{modalData.Skills}</p>
                            <button className='seeComments' onClick={toggleComments} style={{ color: '#808080' }}>See comments</button>
                            {showComments && (<Comment idprojet={ispostchosen} />)}



                        </div>
                    </div>
                )}
                {showModalTraining && (
                            <div className="modal">
                                <div className="modal-content">
                                    <span className="close" onClick={closeModalTraining}>&times;</span>
                                    <h2>Description:</h2>
                                    <p>{modalDataTraining.descriptionTraining}</p>
                                    <button className='seeComments' onClick={toggleComments} style={{ color: '#808080' }}>See comments</button>
                                    {showComments && (<Comment idpostcl={ispostchosen} />)}
                                </div>
                            </div>
                        )}

            </section>
        </div>
    );


}

export default AcceuilAdmin;