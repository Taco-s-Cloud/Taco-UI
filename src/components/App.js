import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate, Link } from 'react-router-dom';
import ScheduleForm from './ScheduleForm';
import ScheduleList from './ScheduleList';
import UserProfile from './UserProfile';
import ScheduleManager from './ScheduleManager';

function App(){
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const getIdentityToken = async () => {
    const targetAudience = 'https://schedule-manager-1024364663505.us-central1.run.app';

    // Fetch the token from the metadata server
    const response = await fetch(
      `http://metadata/computeMetadata/v1/instance/service-accounts/default/identity?audience=${targetAudience}`,
      {
        headers: {
          'Metadata-Flavor': 'Google',
        },
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch Identity Token');
    }

    return await response.text();
  };

  const loadSchedules = async () => {
    try {
      const idToken = await getIdentityToken();

      // Make the request to the backend
      const response = await fetch('https://schedule-manager-1024364663505.us-central1.run.app/schedules', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${idToken}`,
          'Content-Type': 'application/json',
        },
      });
      //const response = await fetch('https://schedule-manager-1024364663505.us-central1.run.app/schedules');
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
        </Routes>
      </div>
    </Router>
  );
}

export default App;
