import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'; // Import Link here
import Home from './Home';
import Rules from './Rules';
import Game from './Game';
import './App.css';
import { inject } from '@vercel/analytics';
import { injectSpeedInsights } from '@vercel/speed-insights';

injectSpeedInsights();

inject();
function App() {
  return (
    <Router>
      <div className="App">
        {/* <nav className="navbar">
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/rules">Rules</Link></li>
            <li><Link to="/game">Play Game</Link></li>
          </ul>
        </nav> */}

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/rules" element={<Rules />} />
          <Route path="/game" element={<Game />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
