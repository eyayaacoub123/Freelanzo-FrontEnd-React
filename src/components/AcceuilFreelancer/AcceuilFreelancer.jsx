import React, { useState, useEffect } from 'react';
import './AcceuilFreelancer.css';
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
import Comment from '../cmt/CommentSection';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import BasketContainer from './BasketContainer';
import gifImage from '../images/pic2.gif'; 
import image from '../images/pic3.jpg';
import gifImage1 from '../images/p3.gif';
import FolderIcon from '@mui/icons-material/Folder';
import MyProjects from './MyProjects';



const AcceuilFreelancer = () => {
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
    const [posts, setPosts] = useState([]);
    const [projets, setProjets] = useState([]);
    const [annonces, setAnnonces] = useState([]);

    const [modalData, setModalData] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [showModal2, setShowModal2] = useState(false);
    const [showModal3, setShowModal3] = useState(false);
    const [isBasketOpen, setIsBasketOpen] = useState(false);
    const [button1Clicked, setButton1Clicked] = useState(true);
    const [button2Clicked, setButton2Clicked] = useState(false);
    const [button3Clicked, setButton3Clicked] = useState(false);
    const [dataposts, setDatapost] = useState([]);//hedhi
    const [search, setsearch] = useState("");
    const [formData, setFormData] = useState({
        activity: '',
        domain: '',
        contenu: '',
    });

    const [isMyProjectsOpen, setIsMyProjectsOpen] = useState(false);

    const toggleMyProjects = () => {
        setIsMyProjectsOpen(!isMyProjectsOpen);
    };

    
    const handleBasketClose = () => {
        setIsBasketOpen(false);
    };

    const handleMyProjectsClose = () => {
        setIsMyProjectsOpen(false);
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
        if (!token || usertype !== "Freelancer") {
            // Redirect to '/'
            navigate('/');
        } else {
            // Fetch data from multiple endpoints
            const fetchData = async () => {
                try {

                    const projetsResponse = await axios.get('http://localhost:5000/projetsclients', {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });
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

    useEffect(() => {
        setIsFormOpen(false); // Set isFormOpen to false when the component mounts
    }, []); // Empty dependency array to execute this effect only once, when the component mounts
    
    const handlegetinsp = async () => {
        const postesResponse = await axios.get(`http://localhost:5000/postesfreelancers/${iduser}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        setPosts(postesResponse.data);
        setDatapost(postesResponse.data);
        setAnnonces([]);
        setProjets([]);
        setButton1Clicked(false);
        setButton2Clicked(true);
        setButton3Clicked(false);

    }
    const handlegetjobs = async () => {
        const projetsResponse = await axios.get('http://localhost:5000/projetsclients', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        setProjets(projetsResponse.data);
        setDatapost(projetsResponse.data);
        console.log(dataposts);
        setAnnonces([]);
        setPosts([]);

        setButton1Clicked(true);
        setButton2Clicked(false);
        setButton3Clicked(false);
    }
    const handlegetcourses = async () => {
        const annoncesResponse = await axios.get('http://localhost:5000/annoncesformations', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        setAnnonces(annoncesResponse.data);
        setDatapost(annoncesResponse.data);
        console.log(dataposts);
        setPosts([]);
        setProjets([]);
        setButton1Clicked(false);
        setButton2Clicked(false);
        setButton3Clicked(true);

    }
    const [files, setFiles] = useState([]);

    const handleDrop = (e) => {
        e.preventDefault();
        setFiles([...files, ...e.dataTransfer.files]);
    };

    const handleChange = (e) => {
        setFiles([...files, ...e.target.files]);
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

        // Extract form data
        const activity = document.getElementById('activity').value;
        const domain = document.getElementById('domain').value;
        const description = document.getElementById('description').value;

        // Create a new post object
        const newPost = {
            auteur: nom,
            activity,
            domain,
            description,
            files
        };
        if (!activity || !domain || !description || !files) {
            // Display error message
            document.getElementById('errorMessage').innerText = 'Please fill in all fields.';
            document.getElementById('errorMessage').style.display = 'block';
            return;
        }
        const formData = new FormData();
        formData.append('auteur', nom);
        formData.append('activity', activity);
        formData.append('domain', domain);
        formData.append('description', description);

        // Append files to the FormData object
        for (let file of files) {
            formData.append('files', file);
        }
        console.log(files);
        const endpointURL = 'http://localhost:5000/createPoste/' + iduser;

        // Add the new post to the beginning of the posts array
        setPosts([newPost, ...posts]);

        // Send a POST request to the endpoint with the new post data
        axios.post(endpointURL, formData)
            .then(response => {
                console.log('Post request successful:', response.data);
                window.alert("Post added with success");

                // Handle successful response here if needed
            })
            .catch(error => {
                console.error('Error making post request:', error);
                // Handle error here if needed
            });

        // Close the form and reset the form fields
        closeForm();
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
                (post.auteur && post.auteur.toLowerCase().includes(searchTerm.toLowerCase()))||
            (post.domain && post.domain.toLowerCase().includes(searchTerm.toLowerCase()))||
            (post.activity && post.activity.toLowerCase().includes(searchTerm.toLowerCase()))

            );

            setPosts(filteredPosts);


        } else if (button3Clicked && annonces) {
            // Filter announcements based on search term
            const filteredAnnouncements = annonces.filter((announcement) =>
                (announcement.auteur && announcement.auteur.toLowerCase().includes(searchTerm.toLowerCase()))||
            (announcement.domain && announcement.domain.toLowerCase().includes(searchTerm.toLowerCase()))||
            (announcement.modedelivery && announcement.modedelivery.toLowerCase().includes(searchTerm.toLowerCase()))

            );
            setAnnonces(filteredAnnouncements);

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

        }

    };
    const toggleSidebar = () => {
        // setIsSidebarOpen(prev => !prev);// Update isSidebarOpen state
        const body = document.querySelector("body");
        const sidebar = body.querySelector(".sidebar");
        sidebar.classList.toggle("close");
    };

    const toggleBasket = () => {
        setIsBasketOpen(!isBasketOpen);
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
        console.log(" ok" + post._id);
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
    const handleLogout = async () => {

        // Clear authentication data from localStorage
        localStorage.clear();


        // Redirect to a specific location, such as '/'
        navigate('/');
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
    const gotoprofile = async () => {

        navigate("/profilefreelancer");
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
                                        <span className="text nav-text">Add Project</span>
                                    </a>
                                </li>
                                <li className="nav-link" onClick={toggleBasket}>
                                    <a href="#">
                                        <ShoppingCartIcon className='icon' />
                                        <span className="text nav-text">Basket</span>
                                    </a>
                                </li>
                                <li className="nav-link" onClick={toggleMyProjects}>
                                    <a href="#">
                                        <FolderIcon className='icon' />
                                        <span className="text nav-text">My projects</span>
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
                                <a onClick={handleLogout}>
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
                    {isBasketOpen && <BasketContainer onClose={handleBasketClose}/>}
                    {isMyProjectsOpen && <MyProjects onClose={handleMyProjectsClose} />}
                    <div className={isMyProjectsOpen || isBasketOpen ? "blur-background" : ""}>
                        <div className="top-buttons">

                            <button className="insp" id="button2" onClick={handlegetjobs} style={{ color: button1Clicked ? '#ff9409' : 'initial' }}>Looking For Work</button>
                            <button id="button1" onClick={handlegetinsp} style={{ color: button2Clicked ? '#ff9409' : 'initial' }}>Inspiration</button>
                            <button className='learn' id="button3" onClick={handlegetcourses} style={{ color: button3Clicked ? '#ff9409' : 'initial' }}>Learn</button>

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
                            <p className='mar'>
                                Explore the realm of top-tier freelancers,<br />

                                Set off on a creative voyage,<br />
                                Acquire the skills of freelancing,<br />
                                and proudly display your expertise.<br /></p>
                            <img className='gifimg1' src={gifImage1} alt="GIF" />


                        </div>

                        {/* Form section */}
                  
                        
                        <div id="projectForm" className="form-container">
                            <form id="addProjectForm">
                                <label htmlFor="activity">Activity:</label>
                                <input type="text" value={formData.activity} onChange={handleInputChange} id="activity" name="activity" required />

                                <label htmlFor="domain">Domain:</label>
                                <input type="text" id="domain" name="domain" list="domainOptions" required />
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
                                <label htmlFor="description">Description:</label>
                                <textarea value={formData.description} onChange={handleInputChange} id="description" name="description" required></textarea>
                                <div>
                                    <h3>Project Files </h3>
                                    <p>You must add at least one file or video link to your project*</p>
                                    <div
                                        onDrop={handleDrop}
                                        onDragOver={(e) => e.preventDefault()}
                                        style={{
                                            border: '2px dashed black',
                                            padding: '20px',
                                            textAlign: 'center',
                                        }}
                                    >
                                        Drag and drop or
                                        <input
                                            type="file"
                                            multiple
                                            onChange={handleChange}
                                            style={{ display: 'none' }}
                                            id="file-upload"
                                        />
                                        <label htmlFor="file-upload" style={{ color: 'blue', cursor: 'pointer' }}>
                                            browse files
                                        </label>
                                    </div>
                                    {files.length > 0 && (
                                        <ul>
                                            {Array.from(files).map((file, index) => (
                                                <h5 key={index}>{file.name}</h5>
                                            ))}
                                        </ul>
                                    )}
                                    <br />
                                </div>
                                <p id="errorMessage" style={{ color: 'red', display: 'none' }}>Please fill in all fields.</p>

                                <button type="submit" onClick={submitForm} style={{marginRight: '10px'}}>Submit</button>
                                <button type="button" onClick={closeForm}>Cancel</button>

                            </form>
                        </div>

                        {/* Post container */}
                        {/* Post container */}
                        <div className="post-container">
                            {/* Separate posts by type */}
                            {[
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
                                        <img  width="600px" height="400px"key={index} src={file.url} alt={`Image ${index + 1}`} />
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
                    </div>
                </section>
            </div>
        </div>
    );


}

export default AcceuilFreelancer;