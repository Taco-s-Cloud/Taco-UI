import React, { useState, useEffect } from 'react';
import ScheduleForm from './ScheduleForm';
import ScheduleList from './ScheduleList';


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

  // Load schedules on component mount
  useEffect(() => {
    loadSchedules();
  }, []);

  return (
    <div className="container">
      <h1>Schedule Builder</h1>
      <ScheduleForm loadSchedules={loadSchedules} />
      <h2>Existing Schedules</h2>
      {loading ? (
        <p>Loading schedules...</p>
      ) : schedules.length > 0 ? (
        <ScheduleList schedules={schedules} />
      ) : (
        <p>No schedules found.</p>
      )}
    </div>
  );
}

export default App;
