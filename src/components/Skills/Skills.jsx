import React, { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './Skills.css';
import Background from '../Background/Background';

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

  "SEO Audits",

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

const Skills = () => {
  const [skills, setSkills] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);

  useEffect(() => {
    populateSkillOptions();
  }, []);

  const populateSkillOptions = () => {
    const skillsChoices = document.getElementById("skillsChoices");
    skillsChoices.innerHTML = "";

    predefinedSkills.forEach((skill) => {
      const option = document.createElement("option");
      option.value = skill;
      skillsChoices.appendChild(option);
    });
  };

  const removeSkill = (skillToRemove) => {
    const updatedSkills = skills.filter(skill => skill !== skillToRemove);
    setSkills(updatedSkills);
  };


  const handleInputChange = (event) => {
    if (event.key === 'Enter') {
      const inputValue = event.target.value.trim(); // Remove leading/trailing whitespace
      if (inputValue && !skills.includes(inputValue)) {
        setSkills(prevSkills => [...prevSkills, inputValue]);
        event.target.value = ''; // Clear input field after adding the skill
      }
    }
  };


  const handleFormSubmit = () => {
    const formData = {
      name: searchParams.get('name'),
      email: searchParams.get('email'),
      password: searchParams.get('password'),
      role: searchParams.get('role'),
      job: searchParams.get('job'),
      jobDescription: searchParams.get('jobDescription'),
      journey: searchParams.get('journey'),
      phoneNumber: searchParams.get('phoneNumber'),
      address: searchParams.get('address'),
      selectedLanguages: searchParams.get('selectedLanguages') ? searchParams.get('selectedLanguages').split(",") : [],
      skills: skills.join(', ')
    };
    console.log(formData);
    if (formData.role === "trainer") {
      const queryParams = new URLSearchParams(formData).toString();
      navigate(`/interests?${queryParams}`);
    }
    else {
      const queryParams = new URLSearchParams(formData).toString();
      navigate(`/languages?${queryParams}`);
    }

  };
  console.log(skills);
  return (
    <div className="Skills">
      <Background />
      <div className="container">
        <div className="input-container">
          <label htmlFor="skillsInput" className="label">What are your skills?</label>
          <input
            type="text"
            placeholder='Add a skill and hit enter please'
            id="skillsInput"
            list="skillsChoices"
            className="input-skills"
            onKeyDown={handleInputChange} // Add this line
          />

          <datalist id="skillsChoices"></datalist>
          <div className="selected-skills">
            {skills.map((skill, index) => (
              <div key={index} className="selected-skill">
                <span>{skill}</span>
                <FontAwesomeIcon icon={faTimes} className="close-btn" onClick={() => removeSkill(skill)} />
              </div>
            ))}
          </div>
        </div>
        <div className="button-container">
          <button className='btn' onClick={() => window.history.back()}>Previous</button>
          <button className='btn' onClick={handleFormSubmit}>Next</button>
        </div>
      </div>
    </div>
  );
};

export default Skills;
