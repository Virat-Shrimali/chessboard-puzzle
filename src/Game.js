import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // Import Link here

import './Game.css';

function Game() {
  // Initialize state variables
  const [coins, setCoins] = useState(initializeCoins());  // 64 coins initialized randomly as heads ('H') or tails ('T')
  const [keyLocation, setKeyLocation] = useState(getRandomLocation());  // Randomly set initial key location
  const [flipped, setFlipped] = useState(false);  // Track if Player 1 has flipped a coin
  const [gameStage, setGameStage] = useState(1);  // Game stage: 1 for Player 1, 2 for Player 2
  const [ellGuess, setEllGuess] = useState(null);  // Store Player 2's guess
  const [message, setMessage] = useState('');
  const [showKey, setShowKey] = useState(false);  // Control whether key position is shown

  // Function to randomly select initial key location
  function getRandomLocation() {
    return Math.floor(Math.random() * 64);
  }

  // Function to initialize the chessboard with random heads ('H') or tails ('T')
  function initializeCoins() {
    return Array.from({ length: 64 }, () => (Math.random() > 0.5 ? 'H' : 'T'));
  }

  // Set message when component mounts or key location changes
  useEffect(() => {
    if (gameStage === 1) {
      setMessage(`Jailer has kept the key under square ${keyLocation + 1}`);
    } else {
      setMessage('');
    }
  }, [keyLocation, gameStage]);

  // Function to handle coin flip by Player 1
  const flipCoin = (index) => {
    if (!flipped && gameStage === 1) {
      const newCoins = [...coins];
      newCoins[index] = newCoins[index] === 'H' ? 'T' : 'H';  // Toggle between heads ('H') and tails ('T')
      setCoins(newCoins);
      setFlipped(true);
      // Wait for a brief moment before setting game stage to 2
      setTimeout(() => {
        setGameStage(2);  // Move to Player 2's turn
      }, 500); // 500 milliseconds delay
    }
  };

  // Function to handle Ell's guess of the key location
  const handleGuess = (index) => {
    if (gameStage === 2) {
      setEllGuess(index);
      // Compare with initial key location and provide feedback
      const isCorrect = index === keyLocation;
      if (isCorrect) {
        setMessage(`Ell guessed correctly! The key was under square ${keyLocation + 1}.`);
        setShowKey(true);  // Show key position when correct
        // Wait for a brief moment before resetting the game
        setTimeout(() => {
          resetGame();
        }, 2000); // 2000 milliseconds delay to show the message
      } else {
        setMessage(`Ell's guess was incorrect. Try again.`);
        setFlipped(false);  // Reset flipped state to allow Player 1 to flip again
      }
    }
  };

  // Function to reset the game for a new round
  const resetGame = () => {
    setCoins(initializeCoins());
    setKeyLocation(getRandomLocation());
    setFlipped(false);
    setGameStage(1);
    setEllGuess(null);
    setMessage(''); // Clear message after reset
    setShowKey(false);  // Hide key position on reset
  };

  return (
    <div className="game">
      <div className="nav">
        <nav className="navbar">
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/rules">Rules</Link></li>
            <li><Link to="/game">Play Game</Link></li>
          </ul>
        </nav>
      </div>
      <h2>Almost Impossible Chessboard Puzzle</h2>
      {message && <p>{message}</p>}
      {gameStage === 1 && <p>Player 1 (Fox): Flip a coin to signal the key's location</p>}
      {gameStage === 2 && <p>Player 2 (Ell): Guess the square hiding the key!</p>}
      
      <div className="chessboard">
        {coins.map((coin, index) => (
          <div
            key={index}
            className={`square 
              ${index === keyLocation && showKey ? 'key-square' : index % 2 === 0 ? 'white' : 'black'}`}
            onClick={() => gameStage === 1 ? flipCoin(index) : handleGuess(index)}
          >
            {coin === 'H' ? '🟡' : '⚪'}  {/* Gold for heads, silver for tails */}
          </div>
        ))}
      </div>

      {/* Restart Game button */}
      <button onClick={resetGame} className="restart-button">
        Restart Game
      </button>
    </div>
  );
}

export default Game;
