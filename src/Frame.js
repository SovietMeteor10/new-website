import React, { useState } from 'react';
import './frame.css';
import About from './About.js';
import Experience from './Experience';
import Contact from './Contact';

function Frame({ selectedComponent }) {
  const [currentComponent, setCurrentComponent] = useState(selectedComponent);

  const handleMenuClick = (componentName) => {
    setCurrentComponent(componentName);
  };

  return (
    <div>
      <div className="topbar">
        <div className="title-box"></div>
        <div className="menu">
          <div
            className="menu-items"
            onClick={() => handleMenuClick('about')}
          >
            About
          </div>
          <div
            className="menu-items"
            onClick={() => handleMenuClick('experience')}
          >
            Experience
          </div>
          <div
            className="menu-items"
            onClick={() => handleMenuClick('contact')}
          >
            Contact
          </div>
        </div>
      </div>
      <div className="page-borders">
        {currentComponent === 'about' && <About />}
        {currentComponent === 'experience' && <Experience />}
        {currentComponent === 'contact' && <Contact />}
      </div>
    </div>
  );
}

export default Frame;
