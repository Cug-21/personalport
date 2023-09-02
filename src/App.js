import React, { useState, useEffect } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Resume from './components/Resume';
import About from './components/About';
import Projects from './components/Projects';
import ContactUs from './components/ContactUs';
import Carousel from './Carousel';
import img1 from './IMG_3982.JPG';
import img2 from './IMG_4052.JPG';
import img18 from './bent1.JPG';
import img3 from './IMG_4064.JPG';
import img4 from './IMG_4067.JPG';
import img5 from './IMG_4093.jpg';
import img15 from './imag1.jpeg';
import img16 from './imag3.jpeg';
import img17 from './imag2.jpeg';
import img7 from './image0.jpeg';
import img8 from './image1.jpeg';
import img9 from './image2.jpeg';
import img10 from './image3.jpeg';
import img11 from './image4.jpeg';
import img12 from './image5.jpeg';
import img13 from './image6.jpeg';
import img14 from './image7.jpeg';

import img19 from './bent2.JPG';
import Board from './minesweeper/Board';
import PetApp from './components/PetApp';
import Shark from './components/Shark'; 
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AdminPanel from './components/AdminPanel';
import Kitten from './components/walkingCat';
import Bird from './components/Bird';

function App() {
  const [activeComponent, setActiveComponent] = useState(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isPetSelectionOpen, setPetSelectionOpen] = useState(false);
  const [isSharkVis, setSharkVis] = useState(false);
  const [isKittenVis, setIsKittenVis] = useState(false);
  const [difficulty, setDifficulty] = useState('Easy');
  const [isBirdVisible, setIsBirdVisible] = useState(true);
  const [highScores, setHighScores] = useState([]);
  const [birdPosition, setBirdPosition] = useState({ top: 0, left: 0 });

  useEffect(() => {
    const updateBirdPosition = () => {
        const x = Math.random() * window.innerWidth;
        const y = Math.random() * window.innerHeight;

        setBirdPosition({ top: y, left: x });
    };

    const intervalId = setInterval(updateBirdPosition, 2000); // Update every 2 seconds

    return () => clearInterval(intervalId); // Cleanup interval on unmount
}, []);

  
  useEffect(() => {
      const scores = JSON.parse(localStorage.getItem(`highScores-${difficulty}`) || '[]');
      setHighScores(scores);
  }, [difficulty]);

  const updateHighScores = (newScores) => {
    setHighScores(newScores);
    localStorage.setItem('highScores', JSON.stringify(newScores));
  };

  const getMinesForDifficulty = (difficulty) => {
    switch (difficulty) {
      case 'Easy':
        return 5;
      case 'Medium':
        return 10;
      case 'Hard':
        return 20;
      default:
        return 5;
    }
  };

  const imageList = [
    img17,
    img1,
    img2,
    img10,
    img3,
    img18,
    img4,
    img12,
    img5,
    img13,
    img7,
    img8,
    img9,
    img17,
    img16,
    img15,
    img11,
    img14,
    img19,
    
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
    if(petType === "Shark") {
      setSharkVis(true); 
      setIsKittenVis(false);
      setIsBirdVisible(false);
    } else if (petType === "Kitten") {
      setIsKittenVis(true);
      setIsBirdVisible(false)
      setSharkVis(false);
    } else if (petType === "Bird") {
      setIsBirdVisible(true);
      setSharkVis(false);
      setIsKittenVis(false);
    } else {
      setIsKittenVis(false);
      setSharkVis(false);
      setIsBirdVisible(false);
    }
  }

  return (
    <Router>
      <div className="App" onMouseMove={trackMouse}>
        <Navbar
          onPetSelect={handlePetSelect}
          onMine={() => setActiveComponent('Minesweeper')}
          onAbout={() => setActiveComponent('About')}
          onResume={() => setActiveComponent('Resume')}
          onProjects={() => setActiveComponent('Projects')}
         
      
        />
        
        
        <div className="carousel-wrapper">
          <Carousel images={imageList} />
        </div>
        
        
        {activeComponent === 'About' && <div className="About"><About /></div>}
        {activeComponent === 'Resume' && <div className="Resume"><Resume /></div>}
        {activeComponent === 'Projects' && <div className="Projects"><Projects /></div>}
        {activeComponent === 'Minesweeper' && (
          <div className="Minesweeper">
            {/* Render the dropdown here */}
            <select className= "difficulty-dropdown"onChange={(e) => setDifficulty(e.target.value)} value={difficulty}>
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>
            {/* Render the Minesweeper board, using the difficulty to set the number of mines */}
            <Board key={difficulty} width={10} height={10} mines={getMinesForDifficulty(difficulty)} difficulty={difficulty} />
            
          </div>
        )}
        
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
        
        {isSharkVis && <Shark/>}
        {isKittenVis && <Kitten />}
        {isBirdVisible && <Bird position={birdPosition} />}
      </div>
      <ContactUs />
      <Routes>
        <Route 
          path="/admin" 
          element={<AdminPanel highScores={highScores} updateHighScores={updateHighScores} />} 
        />
      </Routes>
    </Router>
  );
}

export default App;