import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <h1 className="logo">🌱 Farm Assist</h1>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/report">Report</Link>
      </nav>
    </header>
  );
};

export default Header;
