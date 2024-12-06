import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

const ScheduleManager = ({ schedules }) => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    if (schedules && schedules.length > 0) {
      setEvents(
        schedules.map((schedule) => ({
          title: schedule.title,
          start: new Date(schedule.start_time),
          end: new Date(schedule.end_time),
        }))
      );
    }
  }, [schedules]);

  return (
    <div className="container">
      <nav>
        <ul>
          <li><Link to="/schedule-manager">View Calendar</Link></li>
          <li><Link to="/add-schedule">Add Schedule Event</Link></li>
          <li><Link to="/add-task">Add Task</Link></li>
          <li><Link to="/to-do-list">To Do List</Link></li>
        </ul>
      </nav>

      <h1>Schedule Manager</h1>
      {events.length === 0 ? (
        <p>No events to display</p>
      ) : (
        <div style={{ height: '600px', maxWidth: '100%', overflowX: 'auto' }}>
          <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            style={{ height: '100%', minWidth: '800px' }}
            views={['day', 'week', 'month']}
            defaultView="week"
          />
        </div>
      )}
    </div>
  );
};

export default ScheduleManager;
