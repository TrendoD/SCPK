import React from 'react';
import './ThemeToggle.css';

const ThemeToggle = ({ theme, onToggle }) => {
  return (
    <button 
      className={`theme-toggle ${theme}`} 
      onClick={onToggle}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      <div className="toggle-track">
        <div className="toggle-sun">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="2"/>
            <path d="M12 1v6m0 6v6m11-7h-6m-6 0H1m16.5-8.5L15 9m-6 6l-3.5 3.5m11 0L15 15M9 9L5.5 5.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </div>
        <div className="toggle-moon">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <div className="toggle-thumb"></div>
      </div>
    </button>
  );
};

export default ThemeToggle;