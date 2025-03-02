import React from 'react'
import "../CSS/nav.css";
import { 
    FaTwitter,
    FaTelegramPlane,
    FaGithub
} from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <div className="mainContainer footer">
      <section className="footerContainer">
          <div className="footerContent left">
              {/* <img src={require('../assets/imgs/MSLPHNewLogo.png')} alt="" /> */}
              <h5>MSL Philippines</h5>
              <p>
                  This website is under the use of Moonton Student Leaders Philippines 
                  supervised and monitored by the SERP Department. For inquiries and website concerns, 
                  send it to us using this link or you may contact us through contact@moontonslph.org
              </p>
          </div>
          <div className="footerContent right">
              <ul>
                  <h5>Resources</h5>
                  <li><Link><h6>Apply SL</h6></Link></li>
                  <li><Link><h6>About Us</h6></Link></li>
                  <li><Link to='/News'><h6>News And Feature</h6></Link></li>
                  <li><Link><h6>FAQs</h6></Link></li>
              </ul>
              <ul>
                  <h5>Links</h5>
                  <li><Link to='/Events'><h6>All Events</h6></Link></li>
                  <li><Link to='/Programs' ><h6>All Programs</h6></Link></li>
                  <li><Link to='/PrivacyPolicies'><h6>Privacy Policies</h6></Link></li>
                  <li><Link to='/TermsAndConditions'><h6>Terms and Condition</h6></Link></li>
              </ul>
          </div>
      </section>
      <hr />
      <section className="footerLogos">
          <img src={require('../assets/imgs/MoontonLogo.png')} alt="" />
          <img src={require('../assets/imgs/MLBBNewLogo2.png')} alt="" />
          <img src={require('../assets/imgs/MSLPHNewLogo.png')} alt="" />
      </section>
      <section className="footerBottom">
          <p>©2024 | Moonton Student Leaders Philippines | All rights reserved</p>
      </section>   
    </div>
  )
}

export default Footer;