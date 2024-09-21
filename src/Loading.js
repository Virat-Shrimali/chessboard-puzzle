// Loading.js
import React from 'react';
import './Loading.css'; // Custom styles

const Loading = () => {
  return (
    <div className="loading-container">
      <div className="spinner"></div> {/* Customized spinner */}
      <p>Loading...</p>
      <div className="progress-bar-container">
        <div className="progress-bar"></div>
      </div>
    </div>
  );
};

export default Loading;
