import React from 'react';
import './Leaderboard.css';

const Leaderboard = ({ difficulty, scores }) => {
    return (
      <div className="leaderboard">
        <h2 className="leaderboard-title">Leaderboard for {difficulty} Difficulty</h2>
        <div className="leaderboard-table">
          <div className="leaderboard-header">
            <div className="rank">Rank</div>
            <div className="name">Name</div>
            <div className="score">Score</div>
          </div>
          {scores.map((score, index) => (
            <div className="leaderboard-row" key={index}>
              <div className="rank">{index + 1}</div>
              <div className="name">{score.name ? score.name : 'Anonymous'}</div>
              <div className="score">{score.score} seconds</div>
            </div>
          ))}
        </div>
      </div>
    );
  };

export default Leaderboard;