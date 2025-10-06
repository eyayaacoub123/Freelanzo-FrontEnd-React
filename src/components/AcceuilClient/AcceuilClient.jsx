import React, { useState, useEffect, useRef } from 'react';
import '../AcceuilFreelancer/AcceuilFreelancer.css';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import HomeIcon from '@mui/icons-material/Home';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import HelpIcon from '@mui/icons-material/Help';
import LogoutIcon from '@mui/icons-material/Logout';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import BellIcon from '@mui/icons-material/Notifications';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import Comment from '../cmt/CommentSection';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import BasketContainer from './BasketContainer';
import gifImage1 from '../images/girl.gif';
import { Assignment } from '@mui/icons-material';
import ProjectsList from './ProjectsList';
import './Client.css';

const AcceuilClient = () => {
    const token = localStorage.getItem('token');
    const usertype = localStorage.getItem('usertype');
    const navigate = useNavigate();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const [ispostchosen, setidpostchosen] = useState("");

    const [isDarkMode, setIsDarkMode] = useState(false);
    const [isFullScreen, setIsFullScreen] = useState(false);
    const [isProjectFormOpen, setIsProjectFormOpen] = useState(false);
    const [isTrainingFormOpen, setIsTrainingFormOpen] = useState(false);
    //const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [posts, setPosts] = useState([]);
    const [annonces, setAnnonces] = useState([]);
    const [ProjectPosts, setProjectPosts] = useState([]);
    const [TrainingPosts, setTrainingPosts] = useState([]);
    const [modalDataProject, setModalDataProject] = useState(null);
    const [showModalProject, setShowModalProject] = useState(false);
    const [modalData, setModalData] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [showModal2, setShowModal2] = useState(false);
    const [modalDataTraining, setModalDataTraining] = useState(null);
    const [showModalTraining, setShowModalTraining] = useState(false);
    const [iduser, setiduser] = useState("");
    const [nom, setnom] = useState("");
    const [isBasketOpen, setIsBasketOpen] = useState(false);
    const [button1Clicked, setButton1Clicked] = useState(true);
    const [button2Clicked, setButton2Clicked] = useState(false);
    const [button3Clicked, setButton3Clicked] = useState(false);
    const [isProjectsListOpen, setIsProjectsListOpen] = useState(false);
    const [dataposts, setDatapost] = useState([]);

    const [search, setsearch] = useState("");

    const toggleProjectsList = () => {
        setIsProjectsListOpen(!isProjectsListOpen);
    };
    const handleCloseProjectsList = () => {
        setIsProjectsListOpen(false);
    };

    const handleBasketClose = () => {
        setIsBasketOpen(false);
    };
    const [formData, setFormData] = useState({
        auteur: '',
        activityProject: '',
        domainProject: '',
        descriptionProject: '',
        budgetProject: '',
        deadline: '', 
        Skills: '',

    });
    const [formData1, setFormData1] = useState({
        descriptionTraining: '',
        domainTraining: '',
        auteur: '',

    });


    const toggleBasket = () => {
        setIsBasketOpen(!isBasketOpen);
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
        if (!token || usertype !== "Client") {
            // Redirect to '/'
            navigate('/');
        } else {
            // Fetch data from multiple endpoints
            const fetchData = async () => {
                try {

                    const postesResponse = await axios.get('http://localhost:5000/postesfreelancers', {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });
                    setDatapost(postesResponse.data);
                    setPosts(postesResponse.data);


                } catch (error) {
                }
            };
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
    const handlegettrainingrequests = async () => {
        const tRResponse = await axios.get(`http://localhost:5000/clientGetPostesClients/${iduser}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        setTrainingPosts(tRResponse.data);
        setDatapost(tRResponse.data);
        setPosts([]);
        setAnnonces([]);



        setButton1Clicked(false);
        setButton2Clicked(true);
        setButton3Clicked(false);

    }
    const handlegettalent = async () => {
        const postesResponse = await axios.get('http://localhost:5000/postesfreelancers', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        setPosts(postesResponse.data);
        setDatapost(postesResponse.data);

        setTrainingPosts([]);
        setAnnonces([]);

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
        setPosts([]);
        setTrainingPosts([]);


        setButton1Clicked(false);
        setButton2Clicked(false);
        setButton3Clicked(true);

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

    {/*   PROJECT FUNCTIONS   */ }
    const toggleProjectForm = () => {
        setIsProjectFormOpen(!isProjectFormOpen);
        const form = document.getElementById("ProjectForm");

        form.style.display = form.style.display === "none" || form.style.display === "" ? "block" : "none";
    };

    const closeProjectForm = () => {
        document.getElementById("ProjectForm").style.display = "none";
        setIsProjectFormOpen(false); // Also set isProjectFormOpen state to false
    };
    const submitProjectForm = (event) => {
        event.preventDefault();

        // Extract form data
        const activityProject = document.getElementById('activityProject').value;
        const domainProject = document.getElementById('domainProject').value;
        const descriptionProject = document.getElementById('descriptionProject').value;
        const budgetProject = document.getElementById('budgetProject').value;
        const deadline = document.getElementById('deadline').value; // Corrected id



        // Check if any field is empty
        if (!activityProject || !domainProject || !descriptionProject || !budgetProject || !deadline) {
            // Display error message
            document.getElementById('errorMessage').innerText = 'Please fill in all fields.';
            document.getElementById('errorMessage').style.display = 'block';
            return;
        }

        // Reset error message if all fields are filled
        document.getElementById('errorMessage').style.display = 'none';

        // Create a new post object
        const newProjectPost = {
            auteur: nom,
            titre: activityProject,
            domain: domainProject,
            contenu: descriptionProject,
            Budget: budgetProject,
            Deadline: deadline, // Include the deadline
            Skills
        };

        // Add the new post to the beginning of the ProjectPosts array
        const endpointURL = 'http://localhost:5000/createProjet/' + iduser;
        setProjectPosts([newProjectPost, ...ProjectPosts]);

        // Submit the form data
        axios.post(endpointURL, newProjectPost)
            .then(response => {
                console.log('Post request successful:', response.data);
                window.alert("Project added with success");

            })
            .catch(error => {
                console.error('Error making post request:', error);
                // Handle error here if needed
            });

        // Close the form and reset the form fields
        closeProjectForm();
    };



    const toggleProjectDetails = (post) => {
        setModalDataProject({
            title: post.activityProject,
            domainProject: post.domainProject,
            description: post.contenu,
            budget: post.budget,
            skills: post.Skills // Add the 'Skills' array to the modal data
        });
        setShowModalProject(true);
    };

    const closeModalProject = () => {
        setShowModalProject(false);
    };


    {/*   TRAINNG FUNCTIONS   */ }


    const toggleTrainingForm = () => {
        setIsTrainingFormOpen(!isTrainingFormOpen);
        const form = document.getElementById("TrainingForm");

        form.style.display = form.style.display === "none" || form.style.display === "" ? "block" : "none";
    };

    const closeTrainingForm = () => {
        document.getElementById("TrainingForm").style.display = "none";
        setIsTrainingFormOpen(false); // Also set isTrainingFormOpen state to false
    };

    const submitTrainingForm = (event) => {
        event.preventDefault();

        // Extract form data
        const domainTraining = document.getElementById('domainTraining').value;
        const descriptionTraining = document.getElementById('descriptionTraining').value;

        // Check if any field is empty
        if (!domainTraining || !descriptionTraining) {
            // Display error message
            document.getElementById('trainingErrorMessage').style.display = 'block';
            return;
        }

        // Reset error message if all fields are filled
        document.getElementById('trainingErrorMessage').style.display = 'none';

        // Create a new post object and submit the form
        const newTrainingPost = {
            auteur: nom,
            domainTraining,
            descriptionTraining,
        };

        const endpointURL = 'http://localhost:5000/createPosteClient/' + iduser;

        axios.post(endpointURL, newTrainingPost)
            .then(response => {
                console.log('Post request successful:', response.data);
                // Handle successful response here if needed
                window.alert("Training Request added with success");

            })
            .catch(error => {
                console.error('Error making post request:', error);
                // Handle error here if needed
            });

        // Close the form and reset the form fields
        closeTrainingForm();
    };

    const [showComments, setShowComments] = useState(false);

    const toggleComments = () => {
        setShowComments(!showComments);
    };


    const toggleTrainingDetails = (post) => {
        setidpostchosen(post._id);

        setModalDataTraining({
            domainTraining: post.domainTraining,
            descriptionTraining: post.descriptionTraining,
        });
        setShowModalTraining(true);
    };


    const closeModalTraining = () => {
        setShowModalTraining(false);
    };
    const toggleDetails = (post) => {
        setidpostchosen(post._id);
        console.log(post);
        console.log(post.files);
        console.log(post._id);
        setModalData({
            description: post.description,
            files: post.files
        });

        setShowModal(true);
    };
    const toggleDetails2 = (post) => {
        setidpostchosen(post._id);
        console.log(post._id);
        setModalData({
            contenu: post.contenu,
            modedelivery: post.modedelivery,
            address: post.address,

        });
        localStorage.setItem("posteformation", (post._id));
        setShowModal2(true);
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

        navigate("/profileclient");
    }
    const handleContinue = () => {
        navigate(`/inscritFormation`);
    };
    const closeModal = () => {
        setShowModal(false);
    };
    const closeModal2 = () => {
        setShowModal2(false);
    };
    //This is Skills inpu
    const predefinedSkills = [
        "JavaScript", "HTML", "CSS", "Python", "React", "Angular", "Vue.js", "Node.js",
        "Java", "C++", "Ruby", "PHP", "Swift", ".NET", "SQL", "MongoDB", "Firebase", "Git",
        "Docker", "AWS", "Azure", "Google Cloud", "TensorFlow", "PyTorch",
        "Natural Language Processing (NLP)", "Computer Vision", "UI/UX Design", "Graphic Design",
        "Adobe Creative Suite", "Content Writing", "Copywriting", "Blogging", "Social Media Management",
        "SEO (Search Engine Optimization)", "Digital Marketing", "Data Analysis", "Machine Learning",
        "Project Management", "Agile Methodology", "Problem Solving", "Critical Thinking",
        "Communication Skills", "Team Collaboration", "Time Management", "Leadership",
        "Public Speaking", "Customer Service", "Sales", "Financial Analysis", "Statistical Analysis",
        "Language Translation", "Cybersecurity", "Blockchain", "Internet of Things (IoT)", "Keyword Research",
        " On-Page Optimization",
        "Off-Page Optimization",
        " Technical SEO",
        "Content Strategy",
        "  Database Management",
        "Testing and Quality Assurance",
        "SEO Audits",
        "Game Development",

        "SEO Copywriting",
        " Mobile SEO Optimization",
        "E-commerce SEO",
        "Typography",
        "Color Theory",
        "Layout Design",
        "Composition",
        "Visual Hierarchy",
        "Responsive Design",
        "User Research",
        "Wireframing",
        "Prototyping",
        "Usability Testing",
        "Branding",
        "Print Design",
        "Motion Graphics",
        "Video Editing",
        "Illustration",
        "Photography",
        "Animation",
        "Email Marketing",
        "PPC Advertising",

        "Typography",


        "Composition",
        "Visual Hierarchy",
        "Branding and Identity Design",

        "Digital Illustration",
        "Logo Design",
        "Packaging Design",
        "Poster Design",
        "Photo Editing",
        "Endpoint Security",
        "Intrusion Detection and Prevention Systems (IDPS)",
        "Firewall Configuration and Management",
        "Security Information and Event Management (SIEM)",
        "Vulnerability Assessment and Penetration Testing (VAPT)",
        "Security Incident Response",
        "Cryptography",
        "Secure Coding Practices",
        "Risk Assessment and Management",
        "Security Policy Development and Enforcement",
        "Identity and Access Management (IAM)",
        "Threat Intelligence Analysis",
        "Security Awareness Training",
        "Endpoint Security",
        "Intrusion Detection and Prevention Systems (IDPS)",
        "Firewall Configuration and Management",
        "Security Information and Event Management (SIEM)",
        "Vulnerability Assessment and Penetration Testing (VAPT)",
        "Identity and Access Management (IAM)",
        "Troubleshooting hardware and software issues",
        "Network connectivity problem resolution",
        "Software installation and configuration",
        "Operating system support (Windows, macOS, Linux)",
        "Remote desktop support",
        "Mobile device support (iOS, Android)",
        "Printer and peripheral device troubleshooting",


    ];

    const [Skills, setSkills] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [showOptions, setShowOptions] = useState(false);

    const handleKeyDown = (event) => {
        if (event.key === 'Enter' && inputValue) {
            // Prevent form submission
            event.preventDefault();
            // Add skill if it's not already in the list
            if (!Skills.includes(inputValue)) {
                setSkills([...Skills, inputValue]);
                setInputValue('');
            }
        }
    };

    const handleDelete = (skillToDelete) => {
        setSkills(Skills.filter((skill) => skill !== skillToDelete));
    };
    const handleLogout = async () => {

        // Clear authentication data from localStorage
        localStorage.clear();


        // Redirect to a specific location, such as '/'
        navigate('/');
    };
    const handlesearch = (event) => {//hedhi
        const searchTerm = event.target.value;
        setsearch(searchTerm);
        console.log(searchTerm);
        if (button2Clicked && TrainingPosts) {
            // Filter projects based on search term
            const filteredTrainingPosts = TrainingPosts.filter((TrainingPost) =>
                (TrainingPost.auteur && TrainingPost.auteur.toLowerCase().includes(searchTerm.toLowerCase())) ||
                (TrainingPost.domainTraining && TrainingPost.domainTraining.toLowerCase().includes(searchTerm.toLowerCase()))

            );
            setTrainingPosts(filteredTrainingPosts);


        } else if (button1Clicked && posts) {
            // Filter posts based on search term
            const filteredPosts = posts.filter((post) =>
                post.auteur && post.auteur.toLowerCase().includes(searchTerm.toLowerCase()) ||
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

        }

        if (searchTerm.length === 0 && button2Clicked) {
            setTrainingPosts(dataposts);
            console.log("hi");
            console.log(dataposts);
        }
        else if (searchTerm.length === 0 && button1Clicked) {
            setPosts(dataposts);
        }
        else if (searchTerm.length === 0 && button3Clicked) {
            setAnnonces(dataposts);

        }

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
                                    <a href="#" onClick={toggleProjectForm}>
                                        <AddCircleIcon className='icon' />
                                        <span className="text nav-text">Project Request</span>
                                    </a>
                                </li>

                                <li className="nav-link">
                                    <a href="#" onClick={toggleTrainingForm}>
                                        <AddCircleIcon className='icon' />
                                        <span className="text nav-text">Training Request</span>
                                    </a>
                                </li>
                                <li className="nav-link" onClick={toggleBasket}>
                                    <a href="#">
                                        <ShoppingCartIcon className='icon' />
                                        <span className="text nav-text">Basket</span>
                                    </a>
                                </li>
                                <li className="nav-link">
                                    <a href="#" onClick={toggleProjectsList}>
                                        <Assignment className='icon' />
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
                {isProjectFormOpen && (
                    <div className='modal'>
                        <div className="Projectform-container">
                            <form id="addProjectForm">
                                {/* Your form elements */}
                                <button type="submit">Submit</button>
                                <button type="button" onClick={closeProjectForm}>Cancel</button>
                            </form>
                        </div>
                    </div>
                )}

                {isTrainingFormOpen && (
                    <div className='modal'>
                        <div className="Trainingform-container">
                            <form id="addTrainingForm">
                                {/* Your form elements */}
                                <button type="submit">Submit</button>
                                <button type="button" onClick={closeTrainingForm}>Cancel</button>
                            </form>
                        </div>
                    </div>
                )}
                <section className="home">
                    {isProjectsListOpen && <ProjectsList onClose={handleCloseProjectsList} />}
                    {isBasketOpen && <BasketContainer onClose={handleBasketClose} />}


                    <div className={isProjectsListOpen || isBasketOpen ? "blur-background" : ""}>

                        <div className="top-buttons">


                            <button className="insp " id="button1" onClick={handlegettalent} style={{
                                color: button1Clicked
                                    ? (document.body.classList.contains('dark') ? '#ffffff' : '#ff9409')
                                    : 'initial'
                            }}>Find Talents</button>
                            <button id="button2" onClick={handlegetcourses} style={{ color: button3Clicked  ? (document.body.classList.contains('dark') ? '#ffffff' : '#ff9409')
                                    : 'initial'}}>Learn</button>
                            <button id="button2" className='learn' onClick={handlegettrainingrequests} style={{ color: button2Clicked  ? (document.body.classList.contains('dark') ? '#ffffff' : '#ff9409')
                                    : 'initial'}}>Training requests</button>


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

                                Embark on a journey of innovation,<br />
                                Discover top freelancers,<br />
                                Showcase your talent,<br />
                                Master freelancing .</p>
                            <img className='gifimg1' src={gifImage1} alt="GIF" />

                        </div>
                        {/* Form section */}
                        <div id="ProjectForm" className="Projectform-container">
                            <form id="addProjectForm">
                                <h1 style={{ textAlign: 'left', marginLeft: '20px', fontFamily: 'Fira Code, monospace', fontWeight: '700' }}>Add Project Request</h1>

                                <label htmlFor="activityProject" style={{ textAlign: 'left', marginLeft: '20px', marginTop: '35px' }}>Activity:</label>
                                <input type="text" id="activityProject" name="activityProject" required />

                                <label htmlFor="domainProject" style={{ textAlign: 'left', marginLeft: '20px' }}>Domain:</label>
                                <input type="text" id="domainProject" name="domainProject" list="domainOptions" required />
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

                                <label htmlFor="descriptionProject" style={{ textAlign: 'left', marginLeft: '20px' }}>Description:</label>
                                <textarea id="descriptionProject" name="descriptionProject" required></textarea>

                                <label htmlFor="skills" style={{ textAlign: 'left', marginLeft: '20px' }}>Skills:</label>
                                <div className="Skills-container">
                                    <input
                                        id='skills'
                                        type="text"
                                        value={inputValue}
                                        onChange={(e) => setInputValue(e.target.value)}
                                        onKeyDown={handleKeyDown}
                                        onClick={() => setShowOptions(true)}
                                        placeholder="Add a skill and hit enter please"
                                        list="skillsChoices" // Connect the input to the datalist
                                        required
                                    />
                                    {Skills.map((skill, index) => (
                                        <div key={index} className="skill-tag">
                                            {skill}
                                            <button onClick={() => handleDelete(skill)}>x</button>
                                        </div>
                                    ))}
                                    <datalist id="skillsChoices"> {/* Define the datalist */}
                                        {predefinedSkills.map((skill, index) => (
                                            <option key={index} value={skill} />
                                        ))}
                                    </datalist>
                                </div>

                                <label htmlFor="deadline" style={{ textAlign: 'left', marginLeft: '20px' }}>Deadline:</label>
                                <input type="date" id="deadline" name="deadline" required />

                                <label htmlFor="budgetProject" style={{ textAlign: 'left', marginLeft: '20px' }}>Budget ($):</label>
                                <input type="number" id="budgetProject" name="budgetProject" required min="0" step="0.01" />
                                <p id="errorMessage" style={{ color: 'red', display: 'none' }}>Please fill in all fields.</p>

                                <button type="submit" onClick={submitProjectForm} style={{ marginRight: '10px' }}>Submit</button>
                                <button type="button" onClick={closeProjectForm}>Cancel</button>
                                <div id="successMessage" style={{ display: 'none', color: 'green' }}>Project added successfully!</div>


                            </form>
                        </div>

                        {/* Form section */}
                        <div id="TrainingForm" className="Trainingform-container">
                            <form id="addTrainingForm">
                                <h1 style={{ textAlign: 'left', marginLeft: '20px', fontFamily: 'Fira Code, monospace', fontWeight: '700' }}>Add Training Request</h1>
                                <label htmlFor="domainProject" style={{ textAlign: 'left', marginLeft: '20px' }}>Domain:</label>
                                <input type="text" id="domainTraining" name="domainTraining" list="domainOptions" required />
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


                                <label htmlFor="descriptionTraining" style={{ textAlign: 'left', marginLeft: '20px' }}>Description:</label>
                                <textarea id="descriptionTraining" name="descriptionTraining" required></textarea>

                                <br />
                                <br />
                                <br />
                                <p id="trainingErrorMessage" style={{ color: 'red', display: 'none' }}>Please fill in all fields.</p>

                                <button type="submit" onClick={submitTrainingForm} style={{ marginRight: '10px' }}>Submit</button>
                                <button type="button" onClick={closeTrainingForm}>Cancel</button>

                            </form>
                        </div>

                        <div className="post-container">
                            {/* Separate posts by type */}
                            {[
                                TrainingPosts.map(post => ({ ...post, type: 'TrainingPosts' })),
                                annonces.map(post => ({ ...post, type: 'annonces' })),
                                posts.map(post => ({ ...post, type: 'postfr' }))

                            ]
                                // Merge posts into one array
                                .reduce((acc, curr) => acc.concat(curr), [])
                                // Sort posts by dateCreation in ascending order
                                .sort((a, b) => new Date(a.dateCreation) - new Date(b.dateCreation))
                                .map((post, index) => {
                                    const dateCreation = new Date(post.dateCreation);
                                    const formattedDate = `${dateCreation.getDate()}/${dateCreation.getMonth() + 1}/${dateCreation.getFullYear()}`;
                                    switch (post.type) {
                                        case 'postfr':

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
                                                </div>
                                            );
                                        case 'annonces':
                                            const startdate = new Date(post.startdate);
                                            const formattedStartdate = `${startdate.getDate()}/${startdate.getMonth() + 1}/${startdate.getFullYear()}`;
                                            const enddate = new Date(post.enddate);
                                            const formattedEnddate = `${enddate.getDate()}/${enddate.getMonth() + 1}/${enddate.getFullYear()}`;
                                            return (
                                                <div key={index} className="post">
                                                    <a onClick={() => redirecttocardfo(post.idformateur)}  >
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
                                    <span className="close" onClick={closeModal} >&times;</span>
                                    <h5>Description:</h5>
                                    <p>{modalData.description}</p>

                                    <h5>Files:</h5>
                                    {modalData.files.map((file, index) => (
                                        <img width="100px" height="100px" key={index} src={file.url} alt={`Image ${index + 1}`} />
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
                                    <h5>Mode Delivery:</h5>
                                    <p>{modalData.modedelivery}</p>
                                    <h5>Address:</h5>
                                    <p>{modalData.address}</p>
                                    <h5>Description:</h5>
                                    <p>{modalData.contenu}</p>
                                    <button className='seeComments' onClick={toggleComments} style={{ color: '#808080' }}>See comments</button>
                                    {showComments && (<Comment idannonce={ispostchosen} />)}
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



                    </div>
                </section>
            </div>
        </div>
    );


}

export default AcceuilClient;