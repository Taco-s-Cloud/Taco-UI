import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

const ScheduleManager = ({ schedules }) => {
  const [events, setEvents] = useState(schedules.map(schedule => ({
    title: schedule.name,
    start: new Date(schedule.date + 'T' + schedule.time),
    end: new Date(schedule.date + 'T' + schedule.time), // You can add duration here
  })));

  return (
    <div className="container">
      <nav>
        <ul>
          <li><Link to="/schedule-manager">View Calendar</Link></li>
          <li><Link to="/add-schedule"> Add Schedule Event</Link></li>
        </ul>
      </nav>

      <h1>Schedule Manager</h1>
      <div style={{ height: '600px', maxWidth: '100%', overflowX: 'auto' }}>
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: '100%', minWidth: '800px' }}  // Ensure it doesn't overflow
          views={['day', 'week', 'month']}
          defaultView="week"
        />
      </div>
    </div>
  );
};

export default ScheduleManager;
