// Home.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <h1 className="home-title">Almost Impossible Chessboard Puzzle</h1>
      <p className="home-description">
        Welcome to the Almost Impossible Chessboard Puzzle! You are tasked with finding the hidden key on an 8x8 chessboard after a single coin flip.
      </p>
      <button className="start-btn" onClick={() => navigate('/game')}>
        Start Game
      </button>
    </div>
  );
}

export default Home;
