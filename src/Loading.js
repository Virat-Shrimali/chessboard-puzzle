// Loading.js
import React from 'react';
import './Loading.css'; // Custom styles for spinner

const Loading = () => {
  return (
    <div className="loading-container">
      <div className="spinner"></div> {/* Customized spinner */}
      <p>Loading...</p>
    </div>
  );
};

export default Loading;
