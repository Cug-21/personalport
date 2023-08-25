import React from 'react';
import Dropdown from './Dropdown';

function Navbar({ onAbout, onResume, onProjects, onGame, onMine, onPetSelect}) {
  const pets = ["Cat", "Dog", "Fish", "Bird"];

  const [isDropdownOpen, setDropdownOpen] = React.useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  }

    return (
      <div className="Navbar">
        <div className="hamburger" onClick={toggleDropdown}>
          <div className="hamburger-line"></div>
          <div className="hamburger-line"></div>
          <div className="hamburger-line"></div>
        </div>

        
        {isDropdownOpen && <Dropdown options={pets} onSelect={onPetSelect} onClose={toggleDropdown} />}
        <a href="#" onClick={(e) => { e.preventDefault(); onAbout(); }}>About</a>
        <a href="#" onClick={(e) => { e.preventDefault(); onResume(); }}>Resume</a>
        <a href="#" onClick={(e) => { e.preventDefault(); onProjects(); }}>Projects</a>
        <a href="#" onClick={(e) => { e.preventDefault(); onGame(); }}>Game</a>
        <a href="#" onClick={(e) => { e.preventDefault(); onMine(); }}>Minesweeper</a>
      </div>
    );
}
export default Navbar;