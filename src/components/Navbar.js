import React from 'react';
import Dropdown from './Dropdown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin, faYoutube } from '@fortawesome/free-brands-svg-icons';

function Navbar({ onAbout, onResume, onProjects, onGame, onMine, onPetSelect }) {
  const pets = ["Shark", "Kitten", "Bird", "None"];

  const [isDropdownOpen, setDropdownOpen] = React.useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  }

    return (
      <div className="Navbar">
        <div style={{ position: 'absolute', right: '10px', top: '10px' }}>
          <a href="https://www.linkedin.com/in/conorsegreti/" target="_blank" rel="noreferrer">
            <FontAwesomeIcon className="icon" icon={faLinkedin} size="2x" style={{ margin: '5px', color: 'white' }} />
          </a>
          <a href="https://github.com/Cug-21/" target="_blank" rel="noreferrer">
            <FontAwesomeIcon className="icon" icon={faGithub} size="2x" style={{ margin: '5px', color: 'white' }} />
          </a>
          <a href="https://www.youtube.com/watch?v=IZUEnpFdguM" target="_blank" rel="noreferrer">
            <FontAwesomeIcon className="icon" icon={faYoutube} size="2x" style={{ margin: '5px', color: 'white' }} />
          </a>
 
        </div>
        <div className="hamburger" onClick={toggleDropdown}>
          <div className="hamburger-line"></div>
          <div className="hamburger-line"></div>
          <div className="hamburger-line"></div>
        </div>

        
        {isDropdownOpen && <Dropdown options={pets} onSelect={onPetSelect} onClose={toggleDropdown} />}
       
        <a href="#" onClick={(e) => { e.preventDefault(); onAbout(); }}>About</a>
        <a href="#" onClick={(e) => { e.preventDefault(); onResume(); }}>Resume</a>
        <a href="#" onClick={(e) => { e.preventDefault(); onProjects(); }}>Projects</a>
       
        <a href="#" onClick={(e) => { e.preventDefault(); onMine(); }}>Minesweeper</a>
      </div>
    );
}
export default Navbar;
