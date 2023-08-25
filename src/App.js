import React, { useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Resume from './components/Resume';
import About from './components/About';
import Projects from './components/Projects';
import Game from './components/game';
import { Container } from "@mui/material";
import Carousel from './Carousel';
import img1 from './IMG_3982.JPG';
import img2 from './IMG_4052.JPG';
import img3 from './IMG_4064.JPG';
import img4 from './IMG_4067.JPG';
import img5 from './IMG_4093.jpg';
import img6 from './SegretiConor.jpg';
import img7 from './thomas.jpg';
import Board from './minesweeper/Board';
import PetApp from './components/PetApp';
import Cat from './components/Cat'; // <-- Import Cat here

function App() {
  const [activeComponent, setActiveComponent] = useState(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isPetSelectionOpen, setPetSelectionOpen] = useState(false);
  const [isCatVisible, setIsCatVisible] = useState(false); // Cat visibility state
 

  const imageList = [
    img1,
    img2,
    img3,
    img4,
    img5,
    img6,
    img7,
  ];

  const trackMouse = (event) => {
    setMousePos({
        x: event.clientX - 25, // Adjust so the center of the image is on the cursor
        y: event.clientY - 25
    });
  }

  const togglePetSelectionModal = () => {
    setPetSelectionOpen(!isPetSelectionOpen);
  };

  const handlePetSelect = (petType) => {
    console.log(petType)
    if(petType === "Cat") {
      setIsCatVisible(true); // Show the cat when "Cat" pet is selected
    } else {
      setIsCatVisible(false); // Hide the cat for other pets or conditions
    }
  }

  return (
    <div className="App" onMouseMove={trackMouse}>
      <Navbar
        onPetSelect={handlePetSelect}
        onMine={() => setActiveComponent('Minesweeper')}
        onAbout={() => setActiveComponent('About')}
        onResume={() => setActiveComponent('Resume')}
        onProjects={() => setActiveComponent('Projects')}
        onGame={() => setActiveComponent('Game')} 
      />
      <div className="carousel-wrapper">
        <Carousel images={imageList} />
      </div>
      
      {activeComponent === 'Minesweeper' && <div className="Minesweeper"><Board width={10} height={10} mines={5} /></div>}
      {activeComponent === 'About' && <div className="About"><About /></div>}
      {activeComponent === 'Resume' && <div className="Resume"><Resume /></div>}
      {activeComponent === 'Projects' && <div className="Projects"><Projects /></div>}
      {activeComponent === 'Game' && <div className="Game"><Container><Game /></Container></div>}
      

      
      {isPetSelectionOpen && (
        <div style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: 'white',
            padding: '20px',
            zIndex: 1000,
            boxShadow: '0px 0px 10px rgba(0,0,0,0.5)'
        }}>
            <PetApp onPetSelect={(petType) => {
                console.log("Pet type selected:", petType);  // This should print your pet type
                handlePetSelect(petType);
                togglePetSelectionModal(); // close the modal after pet is selected
            }} />
            <button onClick={togglePetSelectionModal} style={{ marginTop: '20px' }}>Close</button>
        </div>
    )}
      
      {isCatVisible && <Cat x={mousePos.x} y={mousePos.y} />}
    </div>
  );
}

export default App;