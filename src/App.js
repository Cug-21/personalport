import React, { useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Resume from './components/Resume';
import About from './components/About';
import Projects from './components/Projects';
import Game from './components/game';
import { Container } from "@mui/material";  // <-- Import Container from MUI
import Carousel from './Carousel';
import img1 from './IMG_3982.JPG';
import img2 from './IMG_4052.JPG';
import img3 from './IMG_4064.JPG';
import img4 from './IMG_4067.JPG';
import img5 from './IMG_4093.jpg';


function App() {
  const [activeComponent, setActiveComponent] = useState(null);

  const imageList = [
    img1,
    img2,
    img3,
    img4,
    img5,
  ];


  return (
    <><><div className="App">
      <Navbar
        onAbout={() => setActiveComponent('About')}
        onResume={() => setActiveComponent('Resume')}
        onProjects={() => setActiveComponent('Projects')}
        onGame={() => setActiveComponent('Game')} />
      {activeComponent === 'About' && <div className="About"><About /></div>}
      {activeComponent === 'Resume' && <div className="Resume"><Resume /></div>}
      {activeComponent === 'Projects' && <div className="Projects"><Projects /></div>}
      {activeComponent === 'Game' && <div className="Game"><Container><Game /></Container></div>}
    </div><h1>About Me!</h1></><div className="App">
        <Carousel images={imageList} />
      </div></>
    );

  
}
export default App;

