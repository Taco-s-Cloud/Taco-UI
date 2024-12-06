import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserProfile from './UserProfile'; // Import the UserProfile page
import WelcomePage from './WelcomePage';
import ScheduleManager from './ScheduleManager';
import ScheduleForm from './ScheduleForm';
import TaskForm from './TaskForm';
import ToDoList from './ToDoList';

function App() {
  const [schedules, setSchedules] = useState([]);

  const loadSchedules = async () => {
    try {
      const response = await fetch('http://localhost:5002/schedules');
      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }
      const data = await response.json();
      setSchedules(data);
    } catch (error) {
      console.error('Failed to load schedules:', error);
    }
  };

  useEffect(() => {
    loadSchedules();
  }, []);

  return (
    <Router>
      <Routes>
        {/* Set UserProfile as the login page */}
        <Route path="/" element={<UserProfile />} />

        {/* Redirect to WelcomePage after login */}
        <Route path="/welcome" element={<WelcomePage />} />

        {/* Other routes */}
        <Route path="/schedule-manager" element={<ScheduleManager schedules={schedules} />} />
        <Route path="/add-schedule" element={<ScheduleForm loadSchedules={loadSchedules} />} />
        <Route path="/add-task" element={<TaskForm />} />
        <Route path="/to-do-list" element={<ToDoList />} />
      </Routes>
    </Router>
  );
}

export default App;
