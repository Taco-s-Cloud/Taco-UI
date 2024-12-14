import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/NavBar.css';

const NavBar = () => {
  return (
    <nav className="navbar">
      <div className="nav-container">
        <button className="back-button" onClick={() => window.history.back()}>
          ← Back
        </button>
        <ul className="nav-list">
          <li><Link to="/schedule-manager" className="nav-link">View Calendar</Link></li>
          <li><Link to="/add-schedule" className="nav-link">Add Schedule Event</Link></li>
          <li><Link to="/add-task" className="nav-link">Add Task</Link></li>
          <li><Link to="/to-do-list" className="nav-link">To-Do List</Link></li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
