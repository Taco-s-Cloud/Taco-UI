import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate, Link } from 'react-router-dom';
import ScheduleForm from './ScheduleForm';
import ScheduleList from './ScheduleList';
import UserProfile from './UserProfile';
import ScheduleManager from './ScheduleManager';
import { makeApiCall } from '../middleware/apihelper'; 

function App(){
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const loadSchedules = async () => {
    try {
      const data = await makeApiCall('https://schedule-manager-1024364663505.us-central1.run.app/schedules', 'GET'); // Call the API using the helper
      setSchedules(data); // Update the schedules state with the response data
    } catch (error) {
      console.error('Failed to load schedules:', error);
      alert('Error loading schedules. Check the console for details.');
    } finally {
      setLoading(false); // Ensure loading state is updated
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
