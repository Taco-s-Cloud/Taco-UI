//import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/WelcomePage.css';
import React, { useState, useEffect } from 'react'; 
import { makeApiCall } from '../middleware/apiHelper';

const WelcomePage = () => {
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadSchedules = async () => {
      try {
        const data = await makeApiCall('https://schedule-manager-1024364663505.us-central1.run.app/schedules', 'GET'); // Call the API using the helper
        //const data = await makeApiCall('http://localhost:5002/schedules', 'GET');
        setSchedules(data); // Update the schedules state with the response data
      } catch (error) {
        console.error('Failed to load schedules:', error);
        alert('Error loading schedules. Check the console for details.');
      } finally {
        setLoading(false); // Ensure loading state is updated
      }
    };
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
