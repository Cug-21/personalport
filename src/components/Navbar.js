import React from 'react';


function Navbar({ onAbout, onResume, onProjects, onGame }) {
    return (
      <div className="Navbar">
        <a href="#" onClick={(e) => { e.preventDefault(); onAbout(); }}>About</a>
        <a href="#" onClick={(e) => { e.preventDefault(); onResume(); }}>Resume</a>
        <a href="#" onClick={(e) => { e.preventDefault(); onProjects(); }}>Projects</a>
        <a href="#" onClick={(e) => { e.preventDefault(); onGame(); }}>Game</a>
      </div>
    );
}
export default Navbar;