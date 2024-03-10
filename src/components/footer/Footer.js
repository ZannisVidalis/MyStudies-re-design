import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faLinkedinIn, faTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { Link } from 'react-router-dom'
import './Footer.css';

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="row footer">
        <div className="col-md-6" style={{ marginLeft: '-280px' }}>
          <h6>Επικοινωνια</h6>
          <ul className="footer-links">
            <li>Εθνικό και Καποδιστριακό Πανεπιστήμιο Αθηνών</li>
            <li>Διεύθυνση Πανεπιστημίου 30, Αθήνα, 10679 </li>
            <li>
              <FontAwesomeIcon icon={faEnvelope} />
              <a href="mailto:secret@di.uoa.gr" className="email-link">
                secret@di.uoa.gr
              </a>
            </li>
          </ul>
        </div>
        <div className="col-md-6">
          <h6>ΣΧΕΤΙΚΑ</h6>
          <div className="sxetika"> 
            <Link to="/about" className="about-link">
              About
            </Link>
            <Link to="/help" className="help-link">
              Help
            </Link>
          </div>

        </div>
      </div>
      <hr />
      <div className="row" style={{ marginLeft: '20px' }}>
        <div className="col-md-12 d-flex justify-content-end align-items-center">
          <p className="copyright-text">
            Copyright &copy;2024 - University of Athens. All rights reserved.
          </p>
          <ul className="social-icons" >
            <li>
              <a href="https://www.facebook.com/uoa.official" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faFacebook} />
              </a>
            </li>
            <li>
              <a href="https://www.youtube.com/channel/UCz9D6aUKkfItjR6cPrn1OVw" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faYoutube} />
              </a>
            </li>
            <li>
              <a href="https://twitter.com/uoaofficial" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faTwitter} />
              </a>
            </li>
            <li>
              <a href="https://www.linkedin.com/uas/login?session_redirect=%2Fschool%2F15094179%2F" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faLinkedinIn} />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;