import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // Import Link here
import './Home.css';
import { Analytics } from "@vercel/analytics/react"

function Home() {
  const navigate = useNavigate();
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isInteracting, setIsInteracting] = useState(false);

  const handleStartInteraction = (e) => {
    e.preventDefault();
    setIsInteracting(true);
  };

  const handleEndInteraction = () => {
    setIsInteracting(false);
  };

  const handleMove = (e) => {
    if (!isInteracting) return;

    const { clientX, clientY, currentTarget } = e;
    const { width, height, left, top } = currentTarget.getBoundingClientRect();
    const x = ((clientX - left) / width - 0.5) * 30; // Adjust sensitivity (30 degrees max)
    const y = ((clientY - top) / height - 0.5) * 30;
    setRotation({ x, y });
  };

  return (
    <div className="home-container">
      <div className="nav">
        <nav className="navbar">
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/rules">Rules</Link></li>
            <li><Link to="/game">Play Game</Link></li>
          </ul>
        </nav>
      </div>
      <div className="desc">
        <h1 className="home-title">Impossible Chessboard Puzzle</h1>
        <p className="home-description">
          Welcome to the Almost Impossible Chessboard Puzzle! You are tasked with finding the hidden key on an 8x8 chessboard after a single coin flip.
        </p>
        {/* Uncomment and update the chessboard container as needed */}
        {/* 
        <div
          className="chessboard-container"
          onMouseDown={handleStartInteraction}
          onMouseMove={handleMove}
          onMouseUp={handleEndInteraction}
          onTouchStart={handleStartInteraction}
          onTouchMove={handleMove}
          onTouchEnd={handleEndInteraction}
        >
          <Chessboard2 rotation={rotation} />
        </div>
        */}
        <button className="start-btn" onClick={() => navigate('/game')}>
          Start Game
        </button>
      </div>
    </div>
  );
}

export default Home;
