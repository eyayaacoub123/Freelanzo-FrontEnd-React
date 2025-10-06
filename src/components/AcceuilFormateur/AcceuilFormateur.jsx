import React, { useState, useEffect } from 'react';
import '../AcceuilFreelancer/AcceuilFreelancer.css';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import HomeIcon from '@mui/icons-material/Home';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ChatIcon from '@mui/icons-material/Chat';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import HelpIcon from '@mui/icons-material/Help';
import LogoutIcon from '@mui/icons-material/Logout';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import BellIcon from '@mui/icons-material/Notifications';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import SearchIcon from '@mui/icons-material/Search';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import gifImage1 from '../images/formateurgif.gif';
import Comment from '../cmt/CommentSection';


import { Assignment } from '@mui/icons-material';
import Participants from './Participants';
const AcceuilFormateur = () => {
    const token = localStorage.getItem('token');
    const usertype = localStorage.getItem('usertype');
    const navigate = useNavigate();
    const location = useLocation();
    const [ispostchosen, setidpostchosen] = useState("");
    const searchParams = new URLSearchParams(location.search);
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [isFullScreen, setIsFullScreen] = useState(false);
    const [isFormOpen, setIsFormOpen] = useState(false);
    //const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [annonces, setAnnonces] = useState([]);
    const [tR, settR] = useState([]);

    const [modalData, setModalData] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [showModal1, setShowModal1] = useState(false);
    const [button1Clicked, setButton1Clicked] = useState(true);
    const [button2Clicked, setButton2Clicked] = useState(false);
    const [dataposts, setDatapost] = useState([]);//hedhi
    const [search, setsearch] = useState("");
    const [formData, setFormData] = useState({
        contenu: '',
        domain:'',
        startdate: '',
        enddate: '',
        price: '',
        modedelivery: '',
        address: '',
    });

    const [isParticipantsOpen, setIsParticipantsOpen] = useState(false);

    const toggleParticipants = () => {
        setIsParticipantsOpen(!isParticipantsOpen);
    };
    const handleCloseParticipants = () => {
        setIsParticipantsOpen(false);
    };

    const [iduser, setiduser] = useState("");
    const [nom, setnom] = useState("");
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };



    useEffect(() => {
        const token = localStorage.getItem('token');
        const usertype = localStorage.getItem('usertype');
        const iduser = localStorage.getItem('id');
        const nom = localStorage.getItem('name');
        setiduser(iduser)
        setnom(nom);
        console.log(iduser);
        console.log(nom);
        if (!token && usertype !== "Formateur") {
            // Redirect to '/'
            navigate('/');
        }
        else {//chnouwa bech yjih fel acceuil
            // Fetch data from multiple endpoints
            const fetchData = async () => {
                try {

                    const trainingResponse = await axios.get('http://localhost:5000/formateurGetPostesClients', {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });
                    setDatapost(trainingResponse.data);

                    // Merge the data from all endpoints into a single array

                    // Set the merged data to the posts state


                    settR(trainingResponse.data);
                } catch (error) {
                    // Handle error
                }
            };

            // Call the fetchData function
            fetchData();
        }
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
    }, []);
    const handlegetannonce = async () => {
        const annonceResponse = await axios.get(`http://localhost:5000/formateurGetAnnonce/${iduser}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        setAnnonces(annonceResponse.data);
        setDatapost(annonceResponse.data);
        settR([]);

        setButton1Clicked(false);
        setButton2Clicked(true);

    }
    const handlesearch = (event) => {//hedhi
        const searchTerm = event.target.value;
        setsearch(searchTerm);
        console.log(searchTerm);
        if (button1Clicked && tR) {
            // Filter projects based on search term
            const filteredtR = tR.filter((tR) =>
               ( tR.auteur && tR.auteur.toLowerCase().includes(searchTerm.toLowerCase()))||
            (                tR.domainTraining && tR.domainTraining.toLowerCase().includes(searchTerm.toLowerCase())
        )
            );
            settR(filteredtR);


       


        } else if (button2Clicked && annonces) {
            // Filter announcements based on search term
            const filteredAnnouncements = annonces.filter((announcement) =>
                announcement.auteur && announcement.auteur.toLowerCase().includes(searchTerm.toLowerCase())||
            (announcement.domain && announcement.domain.toLowerCase().includes(searchTerm.toLowerCase()))||
            (announcement.modedelivery && announcement.modedelivery.toLowerCase().includes(searchTerm.toLowerCase()))
            );
            setAnnonces(filteredAnnouncements);

        }

        if (searchTerm.length === 0 && button1Clicked) {
            settR(dataposts);
            console.log("hi");
            console.log(dataposts);
        }
      
        else if (searchTerm.length === 0 && button2Clicked) {
            setAnnonces(dataposts);

        }

    };
    const handlegettR = async () => {
        const tRResponse = await axios.get('http://localhost:5000/formateurGetPostesClients', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        settR(tRResponse.data);
        setDatapost(tRResponse.data);
        console.log(dataposts);
        setAnnonces([]);

        setButton1Clicked(true);
        setButton2Clicked(false);
    }
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

    const toggleForm = () => {
        setIsFormOpen(!isFormOpen);
        const form = document.getElementById("projectForm");

        form.style.display = form.style.display === "none" || form.style.display === "" ? "block" : "none";
    };

    const closeForm = () => {
        document.getElementById("projectForm").style.display = "none";
        setIsFormOpen(false); // Also set isFormOpen state to false
    };

    const submitForm = (event) => {
        event.preventDefault(); // Prevent the form from submitting in the traditional way
        const startdate = new Date(document.getElementById('startdate').value);
        const enddate = new Date(document.getElementById('enddate').value);

        if (startdate > enddate) {
            alert("End date must be after start date.");
            return;
        }
        // Extract form data
        const domain = document.getElementById('domain').value;
        const contenu = document.getElementById('contenu').value;
        const price = document.getElementById('price').value;
        const modedelivery = document.getElementById('mode').value;
const address = document.getElementById('address').value;
        // Create a new post object
        const newAnnonce = {
            auteur: nom,
            domain,
            contenu,
            startdate: startdate.toISOString(),
            enddate: enddate.toISOString(),
            price,
            modedelivery,
            address
        };
        const endpointURL = 'http://localhost:5000/createAnnonce/' + iduser;

        // Add the new post to the beginning of the posts array
        setAnnonces([newAnnonce, ...annonces]);

        axios.post(endpointURL, newAnnonce)
            .then(response => {
                console.log('Post request successful:', response.data);
                window.alert("Announcement added with success");

                // Handle successful response here if needed
            })
            .catch(error => {
                console.error('Error making post request:', error);
                // Handle error here if needed
            });

        // Close the form and reset the form fields
        closeForm();
    };

    const toggleSidebar = () => {
        // setIsSidebarOpen(prev => !prev);// Update isSidebarOpen state
        const body = document.querySelector("body");
        const sidebar = body.querySelector(".sidebar");
        sidebar.classList.toggle("close");
    };

    const toggleModeSwitch = () => {
        setIsDarkMode(!isDarkMode);
        const body = document.querySelector("body");
        const modeText = body.querySelector(".mode-text");

        body.classList.toggle("dark");

        if (body.classList.contains("dark")) {
            modeText.innerText = "Dark Mode";
        } else {
            modeText.innerText = "Light Mode";
        }
    };
    const handleLogout = async () => {

        // Clear authentication data from localStorage
        localStorage.clear();


        // Redirect to a specific location, such as '/'
        navigate('/');
    };
    const toggleDetails = (post) => {
        setidpostchosen(post._id);

        setModalData({
            descriptionTraining: post.descriptionTraining,
        });
        setShowModal(true);
    };

    const toggleDetails1 = (post) => {
        setidpostchosen(post._id);
        console.log(" hhh" + post._id);
        localStorage.setItem("posteformation", (post._id));
        setModalData({
            contenu: post.contenu,
            modedelivery: post.modedelivery,
            address: post.address,

        });
        setShowModal1(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };
    const closeModal1 = () => {
        setShowModal1(false);
    };
    const gotoprofile = async () => {

        navigate("/profileFormateur");
    }
    return (
        <div className='acceuil'>
            <div className='menu1'>
                <nav className="sidebar close ">
                    <header>
                        <div className="image-text">
                            <span className="image">
                                <img src={require('../images/logo.png')} alt="logo" />
                            </span>
                            <div className="text header-text">
                                <span className="name">Freelanzo</span>
                            </div>
                        </div>
                        <ChevronRightIcon className='toggle' onClick={toggleSidebar} />
                    </header>
                    <div className="menu-bar">
                        <div className="menu">
                            <ul className="menu-links">
                                <li className="nav-link">
                                    <a href="#">
                                        <HomeIcon className='icon' />
                                        <span className="text nav-text">Home</span>
                                    </a>
                                </li>
                                <li className="nav-link">
                                    <a onClick={gotoprofile}>
                                        <AccountCircleIcon className='icon' />
                                        <span className="text nav-text">Profile</span>
                                    </a>
                                </li>
                              
                                <li className="nav-link">
                                    <a href="#" onClick={toggleForm}>
                                        <AddCircleIcon className='icon' />
                                        <span className="text nav-text">Add Annonce</span>
                                    </a>
                                </li>
                                <li className="nav-link">
                                    <a href="#" onClick={toggleParticipants}>
                                        <Assignment className='icon' />
                                        <span className="text nav-text">Participants list</span>
                                    </a>
                                </li>
                                <li className="nav-link">
                                    <a href="#">
                                        <HelpIcon className='icon' />
                                        <span className="text nav-text">Help</span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div className="bottom-content">
                            <li className="nav-link">
                                <a onClick={handleLogout} >
                                    <LogoutIcon className='icon' />
                                    <span className="text nav-text">Logout</span>
                                </a>
                            </li>
                            <li className="mode" onClick={toggleModeSwitch}>
                                {isDarkMode ? (
                                    <>
                                        <DarkModeIcon className='icon' />
                                        <span className="mode-text text">Dark Mode</span>
                                    </>
                                ) : (
                                    <>
                                        <LightModeIcon className='icon' />
                                        <span className="mode-text text">Light Mode</span>
                                    </>
                                )}
                                <div className="toggle-switch">
                                    <span className={`switch ${isDarkMode ? 'dark' : 'light'}`} />
                                </div>
                            </li>
                        </div>
                    </div>
                </nav>
                {isFormOpen && (
                    <div className='modal'>
                    <div className="form-container">
                        <form id="addProjectForm">
                            {/* Your form elements */}
                            <button type="submit" onClick={submitForm}>Submit</button>
                            <button type="button" onClick={closeForm}>Cancel</button>
                        </form>
                    </div>
                    </div>
                )}

                <section className="home">
                {isParticipantsOpen && <Participants onClose={handleCloseParticipants} />}
              <div   className={isParticipantsOpen ? "blur-background" : ""}>
                    <div className="top-buttons">

                        <button className="insp" id="button1" onClick={handlegettR} style={{ color: button1Clicked ? '#ff9409' : 'initial' }}>Training Requests</button>
                        <button className='learn' id="button2" onClick={handlegetannonce} style={{ color: button2Clicked ? '#ff9409' : 'initial' }}>Announcements</button>


                        <div id="notification" className="notification-icon">
                            <BellIcon />
                        </div>
                        <div id="fullscreen" className="fullscreen-icon" onClick={toggleFullScreen}>
                            <FullscreenIcon />
                        </div>

                        <div className="search" id="searchContainer">
                            <SearchIcon id="searchIcon" />
                            <input type="text" onChange={handlesearch} name="search" placeholder="Search.." id="searchInput" />
                        </div>

                    </div>
                    <div className="container1">
                        <p className='mar'><br />Ensure impactful training sessions,<br />
and showcase your expertise.<br /><br /></p>
                        <img className='gifimg1' src={gifImage1} alt="GIF" />

                    </div>
                    {/* Form section */}
                    <div id="projectForm" className="form-container">
                        <form id="addProjectForm">
                            {/*<label htmlFor="activity">Activity:</label>
                        <input type="text" id="activity" name="activity" required />*/}

                            <label htmlFor="domain">Title:</label>
                            <input type="text" value={formData.domain} onChange={handleInputChange} id="domain" name="domain" list="domainOptions" required />

                            <datalist id="domainOptions">
                                <option value="Programming"></option>
                                <option value="Web Development"></option>
                                <option value="Marketing"></option>
                                <option value="Software Development"></option>
                                <option value="UI/UX Design"></option>
                                <option value="Graphic Design"></option>
                                <option value="Data Science"></option>
                                <option value="Digital Marketing"></option>
                                <option value="Content Writing"></option>
                                <option value="Project Management"></option>
                                <option value="Business Analysis"></option>
                                <option value="Cybersecurity"></option>
                            </datalist>

                            <label htmlFor="startDate">Start Date:</label>
                            <input value={formData.startdate} onChange={handleInputChange} type="datetime-local" id="startdate" name="startdate" required />

                            <label htmlFor="endDate">End Date:</label>
                            <input  value={formData.enddate} onChange={handleInputChange} type="datetime-local" id="enddate" name="enddate" required />

                            <label htmlFor="mode">Mode of Delivery:</label>
                            <select id="mode" name="mode" value={formData.modedelivery} onChange={handleInputChange} placeholder='Select Mode' required >
                                <option value="Online">Online</option>
                                <option value="In Person">In Person</option>
                                <option value="Blended">Blended (Combination of Online and In-Person Sessions)</option>
                            </select>
                            <label htmlFor="address">Address:</label>
                            <input value={formData.address} onChange={handleInputChange} id="address" name="address" required></input>

                            <label htmlFor="contenu">Description:</label>
                            <textarea value={formData.contenu} onChange={handleInputChange} id="contenu" name="contenu" required></textarea>

                            <label htmlFor="price">Price ($):</label>
                            <input value={formData.price} onChange={handleInputChange} type="number" id="price" name="price" required min="0" step="0.01" />

                            <button type="submit" onClick={submitForm} style={{marginRight: '10px'}}>Submit</button>
                            <button type="button" onClick={closeForm}>Cancel</button>

                        </form>
                    </div>

                    {/* Post container */}
                    <div className="post-container">
                        {/* Separate posts by type */}
                        {[
                            annonces.map(post => ({ ...post, type: 'annonces' })),
                            tR.map(post => ({ ...post, type: 'tR' }))
                        ]
                            // Merge posts into one array
                            .reduce((acc, curr) => acc.concat(curr), [])
                            // Sort posts by dateCreation in ascending order
                            .sort((a, b) => new Date(a.dateCreation) - new Date(b.dateCreation))
                            .map((post, index) => {
                                const dateCreation = new Date(post.dateCreation);
                                const formattedDate = `${dateCreation.getDate()}/${dateCreation.getMonth() + 1}/${dateCreation.getFullYear()}`;
                                switch (post.type) {
                                    case 'tR':
                                        return (
                                            <div key={index} className="post">
                                                <a>
                                                    <h2 className="custom3-h2">{post.auteur}</h2>
                                                </a>
                                                <h2>{formattedDate}</h2>
                                                <p className="custom2-h2">{post.domainTraining}</p>
                                                <div className="see-more">
                                                    <button type='button' onClick={() => toggleDetails(post)}>See More</button>
                                                </div>
                                            </div>
                                        );

                                    case 'annonces':
                                        const startdate = new Date(post.startdate);
                                        const formattedStartdate = `${startdate.getDate()}/${startdate.getMonth() + 1}/${startdate.getFullYear()}`;
                                        const enddate = new Date(post.enddate);
                                        const formattedEnddate = `${enddate.getDate()}/${enddate.getMonth() + 1}/${enddate.getFullYear()}`;
                                        return (
                                            <div key={index} className="post">
                                                <a >
                                                    <h2 className="custom3-h2">{post.auteur}</h2>
                                                </a>
                                                <h2>{formattedDate}</h2>
                                                <p className='custom2-h2'>{post.domain}</p>
                                                <p>-Start Date: {formattedStartdate}</p>
                                                <p>-End Date: {formattedEnddate}</p>
                                                <h6><strong>Price($):</strong> {post.price}</h6>
                                                <div className="see-more">
                                                    <button type='button' onClick={() => toggleDetails1(post)}>See More</button>
                                                </div>
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
                    {showModal1 && (
                        <div className="modal">
                            <div className="modal-content">
                                <span className="close" onClick={closeModal1}>&times;</span>
                                <h5 >Mode Delivery:</h5>
                                <p>{modalData.modedelivery}</p>

                                <h5 >Address:</h5>
                                <p>{modalData.address}</p>

                                <h5>Description:</h5>
                                <p>{modalData.contenu}</p>
                               

                            </div>
                        </div>
                    )}
                    {showModal && (
                        <div className="modal">
                            <div className="modal-content">
                                <span className="close" onClick={closeModal}>&times;</span>
                              
                                

                                <h2>DescriptionTraining:</h2>
                                <p>{modalData.descriptionTraining}</p>

                                <button className='seeComments' onClick={toggleComments} style={{ color: '#808080' }}>See comments</button>
                                {showComments && (<Comment idpostcl={ispostchosen} />)}
                          

                            </div>
                        </div>
                    )}
</div>
                </section>
            </div>
        </div>
    );


}

export default AcceuilFormateur;