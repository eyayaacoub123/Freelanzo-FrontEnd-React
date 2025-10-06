
import React from 'react';
import "./Footer.css";
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';

function Footer() {
  return (
    <div className='Footer'>
      <div className="waves">
        <div className="wave" id="wave1"></div>
        <div className="wave" id="wave2"></div>
        <div className="wave" id="wave3"></div>
        <div className="wave" id="wave4"></div>
      </div>
      <div id="last_section" className="row">
        <div className="col-md-4 follow-us-section">
          <div className="text-center" style={{fontWeight: 'bold'}}>
            <p className="mb-3">Follow Us</p>
            <div className="social-icons">
              <a href="https://www.facebook.com/jackob.eya.5" >
                <FacebookOutlinedIcon className="mr-3" alt="Facebook" style={{ marginRight: '10px', color:"0a165d" }} />
              </a>
              <a href="https://www.instagram.com/">
                <InstagramIcon className="mr-3" alt="Instagram" style={{ marginRight: '10px', color:"0a165d"}} />
              </a>
              <a href="https://www.linkedin.com/in/yasmine-douik-316b0324a/">
                <LinkedInIcon alt="link" style={{ marginRight: '10px', color:"0a165d"}}/>
              </a>
            </div>
          </div>
        </div>
        <div className="col-md-4 contact-section">
          <div className="text-center">
            <p style={{fontWeight: 'bold'}}>Contact</p>
           <p> <PhoneIcon style={{width: '20px'}}/> +216 54 086 070</p>
            <p> <EmailIcon style={{width: '20px'}}/> freelanzo@gmail.com</p>
          </div>
        </div>
        <div className="col-md-4 privacy-section">
          <div className="text-center">
            <p className="privacy-text" style={{fontWeight: 'bold'}} >Support</p>
            <a href='#'><p style={{color:  '#0a1d56'}}>Privacy policy</p></a>
            <a href='#'><p style={{color:  '#0a1d56'}}>Terms of service</p></a>
          </div>
        </div>
        <div id="copy" className="copyright-section text-center">
          <p>&copy; 2024 | All Rights Reserved</p>
        </div>
      </div>
    </div>
  );
}

export default Footer;

