import React from 'react';
import './contact.css';

function Contact() {
  return (
    <div class="toplevel">
      <h1 class="title">Contact me</h1>
      <div className="container">
        <div className="box">
          For any enquiries or opportunities, please contact me via my LinkedIn
          profile or to see what I'm up to, visit my Substack and Github using the buttons below:
        </div>
        <div className="button">
          <a href="https://www.linkedin.com/in/aduncalf/" target="_blank" rel="noopener noreferrer" className="contact-button">
            LinkedIn
          </a>

          <a href="https://substack.com/@anthonyduncalf?utm_source=profile-page" target="_blank" rel="noopener noreferrer" className="contact-button">
            Substack
          </a>

          <a href="https://github.com/SovietMeteor10" target="_blank" rel="noopener noreferrer" className="contact-button">
            Github
          </a>
        </div>
      </div>
    </div>
  );
}

export default Contact;
