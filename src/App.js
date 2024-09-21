import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './Home';
import Rules from './Rules';
import Game from './Game';
import Loading from './Loading'; // Import the Loading component
import './App.css';
import { inject } from '@vercel/analytics';
import { injectSpeedInsights } from '@vercel/speed-insights';

injectSpeedInsights();
inject();

function App() {
  const [isLoading, setIsLoading] = useState(true); // Loading state

  // Simulating loading (You can replace this with actual API calls or logic)
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false); // Disable loading after 2 seconds
    }, 2000);
  }, []);

  return (
    <Router>
      <div className="App">
        {isLoading ? ( 
          // Show the loading component while isLoading is true
          <Loading />
        ) : (
          <>
            
            {/* Routes */}
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/rules" element={<Rules />} />
              <Route path="/game" element={<Game />} />
            </Routes>
          </>
        )}
      </div>
    </Router>
  );
}

export default App;
