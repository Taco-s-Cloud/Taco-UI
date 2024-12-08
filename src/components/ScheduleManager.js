import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

const ScheduleManager = ({ schedules }) => {
  const navigate = useNavigate();

  // State for calendar events
  const [events, setEvents] = useState([]);

  // Update events when schedules change
  useEffect(() => {
    if (schedules) {
      const formattedEvents = schedules.map((schedule) => ({
        title: schedule.title || 'Untitled Event',
        start: new Date(schedule.start_time),
        end: new Date(schedule.end_time),
        location: schedule.location || '',
      }));
      setEvents(formattedEvents);
    }
  }, [schedules]);

  return (
    <div className="container">
      {/* Navigation Section */}
      <nav className="nav-bar">
        <button className="back-button" onClick={() => navigate('/welcome')}>
          ← Back
        </button>
        <ul className="nav-links">
          <li><Link to="/schedule-manager" className="nav-link">View Calendar</Link></li>
          <li><Link to="/add-schedule" className="nav-link">Add Schedule Event</Link></li>
          <li><Link to="/add-task" className="nav-link">Add Task</Link></li>
          <li><Link to="/to-do-list" className="nav-link">To Do List</Link></li>
        </ul>
      </nav>

      {/* Page Title */}
      <h1 className="page-title">Schedule Manager</h1>

      {/* Calendar Section */}
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
        />
      </div>
    </div>
  );
};

export default ScheduleManager;
