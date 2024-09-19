import React, { useState, useEffect, useRef } from 'react';
import './Game.css';

function Game() {
  const [coins, setCoins] = useState(Array(64).fill('H'));
  const [keyLocation, setKeyLocation] = useState(getRandomLocation());
  const [flipped, setFlipped] = useState(false);
  const [gameStage, setGameStage] = useState(1);
  const [ellGuess, setEllGuess] = useState(null);
  const [message, setMessage] = useState('');
  const isMounted = useRef(true); // To keep track of component mount status

  function getRandomLocation() {
    return Math.floor(Math.random() * 64);
  }

  useEffect(() => {
    isMounted.current = true;
    if (gameStage === 1) {
      setMessage(`Jailer has kept the key under square ${keyLocation + 1}`);
    } else {
      setMessage('');
    }

    return () => {
      isMounted.current = false;
    };
  }, [keyLocation, gameStage]);

  const flipCoin = (index) => {
    if (!flipped && gameStage === 1) {
      const newCoins = [...coins];
      newCoins[index] = newCoins[index] === 'H' ? 'T' : 'H';
      setCoins(newCoins);
      setFlipped(true);
      setTimeout(() => {
        if (isMounted.current) {
          setGameStage(2);
        }
      }, 500);
    }
  };

  const handleGuess = (index) => {
    if (gameStage === 2) {
      setEllGuess(index);
      const isCorrect = index === keyLocation;
      if (isCorrect) {
        alert(`Ell guessed correctly! The key was under square ${keyLocation + 1}.`);
      } else {
        alert(`Ell's guess was incorrect. The key was under square ${keyLocation + 1}.`);
      }
      resetGame();
    }
  };

  const resetGame = () => {
    setCoins(Array(64).fill('H'));
    setKeyLocation(getRandomLocation());
    setFlipped(false);
    setGameStage(1);
    setEllGuess(null);
  };

  return (
    <div className="game">
      <h2>Almost Impossible Chessboard Puzzle</h2>
      {message && <p>{message}</p>}
      {gameStage === 1 && <p>Player 1 (Fox): Flip a coin to signal the key's location</p>}
      {gameStage === 2 && <p>Player 2 (Ell): Guess the square hiding the key!</p>}
      <div className="chessboard">
        {coins.map((coin, index) => (
          <div
            key={index}
            className={`square ${index === keyLocation && !flipped ? 'key-square' : index % 2 === 0 ? 'white' : 'black'}`}
            onClick={() => gameStage === 1 ? flipCoin(index) : handleGuess(index)}
          >
            {coin === 'H' ? '🟡' : '⚪'}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Game;
