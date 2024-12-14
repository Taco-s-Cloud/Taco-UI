import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { makeApiCall } from '../middleware/apiHelper';
import NavBar from './NavBar';
import '../styles/CommonStyles.css'; // Shared styles

const localizer = momentLocalizer(moment);

const ScheduleManager = () => {
  const navigate = useNavigate();
  // State for schedules and calendar events
  const [events, setEvents] = useState([]);
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(true);

  // Function to load schedules
  const loadSchedules = async () => {
    try {
      const data = await makeApiCall('https://schedule-manager-1024364663505.us-central1.run.app/schedules', 'GET');
      setSchedules(data);
    } catch (error) {
      console.error('Failed to load schedules:', error);
      alert('Error loading schedules. Check the console for details.');
    } finally {
      setLoading(false);
    }
  };

  const deleteSchedule = async (scheduleId) => {
    try {
      await makeApiCall(`https://schedule-manager-1024364663505.us-central1.run.app/schedules/${scheduleId}`, 'DELETE');
      alert('Schedule deleted successfully!');
      // Reload schedules after deletion
      loadSchedules();
    } catch (error) {
      console.error('Error deleting schedule:', error);
      alert('Failed to delete schedule.');
    }
  };

  const handleEventClick = (event) => {
    const confirmDelete = window.confirm(`Are you sure you want to delete the event: ${event.title}?`);
    if (confirmDelete) {
      deleteSchedule(event.id);
    }
  };
  
  // Load schedules when the component mounts
  useEffect(() => {
    loadSchedules();
  }, []);

  // Update events when schedules change
  useEffect(() => {
   if (schedules && schedules.length > 0) {
      const formattedEvents = schedules.map((schedule) => ({
        id: schedule.id,
        title: schedule.title || 'Untitled Event',
        start: new Date(schedule.start_time),
        end: new Date(schedule.end_time),
        location: schedule.location || '',
      }));
      setEvents(formattedEvents);
    } else {
      // If no schedules, clear events
      setEvents([]);
    }
  }, [schedules]);
  return (
    <div className="container">
      {/* Navigation Section */}
      <NavBar />
      {/* Page Title */}
      <h1 className="page-title">Schedule Manager</h1>

      {/* Loading State */}
      {loading ? (
        <p>Loading schedules...</p>
      ) : (
        <div className="calendar-container">
          <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            style={{ height: '600px', width: '100%', margin: 'auto' }}
            views={['month', 'week', 'day']}
            defaultView="week"
            popup
            onSelectEvent={handleEventClick} 
          />
        </div>
      )}
    </div>
  );
};

export default ScheduleManager;
