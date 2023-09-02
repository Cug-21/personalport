import React, { useState } from 'react';

const AdminPanel = () => {
    const [password, setPassword] = useState("");
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [highScores, setHighScores] = useState([]);
  
    const checkPassword = () => {
      if (password === "cug") {
        setIsAuthenticated(true);
        // Load high scores
        const savedScores = JSON.parse(localStorage.getItem('highScores') || '[]');
        setHighScores(savedScores);
      }
    };
  
    const deleteScore = (index) => {
      const newHighScores = [...highScores];
      newHighScores.splice(index, 1);
      setHighScores(newHighScores);
      localStorage.setItem('highScores', JSON.stringify(newHighScores));
    };
  
    return (
      <div>
        { isAuthenticated ? (
          <>
            <h1>Admin Panel</h1>
            <ul>
              {highScores.map((score, index) => (
                <li key={index}>
                  {score.name}: {score.score} 
                  <button onClick={() => deleteScore(index)}>Delete</button>
                </li>
              ))}
            </ul>
          </>
        ) : (
          <>
            <input type="password" onChange={(e) => setPassword(e.target.value)} />
            <button onClick={checkPassword}>Login</button>
          </>
        )}
      </div>
    );
};

export default AdminPanel;
