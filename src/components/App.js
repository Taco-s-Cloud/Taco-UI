import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate, Link } from 'react-router-dom';
import ScheduleForm from './ScheduleForm';
import ScheduleList from './ScheduleList';
import UserProfile from './UserProfile';
import ScheduleManager from './ScheduleManager';
import { makeApiCall } from '../middleware/apiHelper'; 
import TaskForm from "./TaskForm";
import ToDoList from './ToDoList';
import WelcomePage from './WelcomePage';


function App(){
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const loadSchedules = async () => {
    try {
      //const data = await makeApiCall('https://schedule-manager-1024364663505.us-central1.run.app/schedules', 'GET'); // Call the API using the helper
      const data = await makeApiCall('http://localhost:5002/schedules', 'GET');
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
      <Routes>
        <Route path="/" element={<UserProfile />} />
        <Route path="/welcome" element={<WelcomePage />} />
        <Route path="/schedule-manager" element={<ScheduleManager schedules={schedules} />} />
        <Route path="/add-schedule" element={<ScheduleForm loadSchedules={loadSchedules} />} />
        <Route path="/add-task" element={<TaskForm />} />
        <Route path="/to-do-list" element={<ToDoList />} />
      </Routes>
    </Router>
  );
}

export default App;
