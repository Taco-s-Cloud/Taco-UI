import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate, Link } from 'react-router-dom';
import ScheduleForm from './ScheduleForm';
import ScheduleList from './ScheduleList';
import UserProfile from './UserProfile';
import ScheduleManager from './ScheduleManager';
import TaskForm from "./TaskForm";

function App() {
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(true);

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
      alert('Error loading schedules. Check the console for details.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSchedules();
  }, []);

  return (
    <Router>
      <div className="container">
        <Routes>
          {/* Set UserProfile as the home page */}
          <Route path="/" element={<UserProfile />} />
          {/* Redirect to calendar after login */}
          <Route path="/schedule-manager" element={<ScheduleManager schedules={schedules} />} />
          <Route path="/add-schedule" element={<ScheduleForm loadSchedules={loadSchedules} />} />
          <Route path="/add-task" element={<TaskForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
