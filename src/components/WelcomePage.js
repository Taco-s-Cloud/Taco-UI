import React from 'react';
import { Link } from 'react-router-dom';

const WelcomePage = () => {
  return (
    <div className="container">
      <h1>Welcome to the To-Do & Schedule Manager</h1>
      <nav>
        <ul>
          <li><Link to="/schedule-manager">Go to Schedule Manager</Link></li>
          <li><Link to="/add-schedule">Add a Schedule Event</Link></li>
          <li><Link to="/add-task">Add a Task</Link></li>
          <li><Link to="/to-do-list">View To-Do List</Link></li>
        </ul>
      </nav>
    </div>
  );
};

export default WelcomePage;
