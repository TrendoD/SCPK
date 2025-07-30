import React from 'react';
import './LoadingRice.css';

const LoadingRice = ({ message = 'Memproses data...' }) => {
  return (
    <div className="loading-rice-container">
      <div className="rice-loading">
        <div className="rice-grain"></div>
        <div className="rice-grain"></div>
        <div className="rice-grain"></div>
      </div>
      <p className="loading-message">{message}</p>
    </div>
  );
};

export default LoadingRice;