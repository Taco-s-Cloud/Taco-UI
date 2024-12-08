import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/WelcomePage.css';

const WelcomePage = () => {
  return (
    <div className="welcome-container">
      <header className="welcome-header">
        <div className="logo">
          🌮 <span className="app-name">Taco's Cloud</span>
        </div>
        <h1>Welcome to Your Productivity Hub</h1>
        <p>Efficiently manage your schedule and tasks with ease.</p>
      </header>

      <nav className="welcome-nav">
        <ul>
          <li>
            <Link to="/schedule-manager" className="nav-link">
              📅 View Schedule
            </Link>
          </li>
          <li>
            <Link to="/add-schedule" className="nav-link">
              🗓 Add Schedule Event
            </Link>
          </li>
          <li>
            <Link to="/add-task" className="nav-link">
              ✅ Add Task
            </Link>
          </li>
          <li>
            <Link to="/to-do-list" className="nav-link">
              📝 To-Do List
            </Link>
          </li>
        </ul>
      </nav>

      <footer className="welcome-footer">
        <p>© 2024 Taco's Cloud. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default WelcomePage;
