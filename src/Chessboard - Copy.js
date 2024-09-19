import React from 'react';
import './Chessboard.css';

function Chessboard() {
  return (
    <div className="chessboard-container">
      <div className="chessboard">
        {Array.from({ length: 64 }).map((_, index) => (
          <div key={index} className={`square ${((Math.floor(index / 8) + index) % 2 === 0) ? 'white' : 'black'}`}></div>
        ))}
      </div>
    </div>
  );
}

export default Chessboard;
