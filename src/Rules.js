// Rules.js
import React from 'react';
import { useNavigate, Link } from 'react-router-dom'; // Import Link here
import './Rules.css'; // Assuming separate CSS for rules page styling

function Rules() {
  return (

    <div className='outercon'>
      <div className="nav">
        <nav className="navbar">
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/rules">Rules</Link></li>
            <li><Link to="/game">Play Game</Link></li>
          </ul>
        </nav>
      </div>
      
    <div className="rules-container">
      
      <h2>Rules of the Almost Impossible Chessboard Puzzle</h2>
      <ul>
        <li>
          An 8x8 chessboard with 64 coins, each either heads (H) or tails (T), is used.
        </li>
        <li>
          A key is hidden under one of the coins, and its position is unknown to both prisoners.
        </li>
        <li>
          Prisoner 1 (Fox) enters the room and observes the chessboard. The warden shows Fox the key’s location.
        </li>
        <li>
          Fox must flip exactly one coin and then leave the room.
        </li>
        <li>
          Prisoner 2 (Ell) enters the room after Fox has left and examines the board.
        </li>
        <li>
          Without altering the board’s state, Ell must deduce the key’s location.
        </li>
        <li>
          The prisoners can discuss and agree on a strategy before the game starts but cannot communicate once the game begins.
        </li>
        <li>
          The warden knows the prisoners' strategy in advance.
        </li>
      </ul>
    </div>
    </div>
  );
}

export default Rules;
