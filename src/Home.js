// src/Home.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Chessboard from './Chessboard';
import './Home.css';
import Chessboard2 from './Chessboard2';

function Home() {
  const navigate = useNavigate();
  const [rotation, setRotation] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const { clientX, clientY, currentTarget } = e;
    const { width, height, left, top } = currentTarget.getBoundingClientRect();
    const x = ((clientX - left) / width - 0.5) * 30; // Adjust sensitivity (30 degrees max)
    const y = ((clientY - top) / height - 0.5) * 30;
    setRotation({ x, y });
  };

  return (
    <div className="home-container">
      <h1 className="home-title">Impossible Chessboard Puzzle</h1>
      <p className="home-description">
        Welcome to the Almost Impossible Chessboard Puzzle! You are tasked with finding the hidden key on an 8x8 chessboard after a single coin flip.
      </p>
      <div className="chessboard-container" onMouseMove={handleMouseMove}>
        <Chessboard2 rotation={rotation} /> {/* Pass rotation props */}
      </div>
      <button className="start-btn" onClick={() => navigate('/game')}>
        Start Game
      </button>
    </div>
  );
}

export default Home;
