import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import '../styles/ScheduleManager.css'; // Optional custom styles

const localizer = momentLocalizer(moment);

const ScheduleManager = ({ schedules }) => {
  const navigate = useNavigate();

  // Map schedules to events for the calendar
  const [events] = useState(
    schedules.map((schedule) => ({
      title: schedule.title || 'No Title',
      start: moment(schedule.start_time).toDate(),
      end: moment(schedule.end_time).toDate(),
    }))
  );

  console.log("Schedules from prop:", schedules);
  console.log("Events to render:", events);

  return (
    <div className="schedule-manager-container">
      {/* Navigation Bar */}
      <nav className="nav-bar">
        <button className="back-button" onClick={() => navigate('/welcome')}>
          &larr; Back
        </button>
        <ul className="nav-links">
          <li><Link to="/schedule-manager">View Calendar</Link></li>
          <li><Link to="/add-schedule">Add Schedule Event</Link></li>
          <li><Link to="/add-task">Add Task</Link></li>
          <li><Link to="/to-do-list">To Do List</Link></li>
        </ul>
      </nav>

      {/* Calendar Section */}
      <div className="calendar-section">
        <h1>Schedule Manager</h1>
        <div className="calendar-container">
          <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            style={{ height: '80vh', width: '100%' }}
            views={['day', 'week', 'month']}
            defaultView="week"
          />
        </div>
      </div>
    </div>
  );
};

export default ScheduleManager;
