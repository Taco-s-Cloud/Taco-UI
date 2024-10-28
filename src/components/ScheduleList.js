import React from 'react';

function ScheduleList({ schedules }) {
  return (
    <div id="schedulesList">
      {schedules.map((schedule) => (
        <div key={schedule.user_id} className="schedule-card">
          <h3>{schedule.title}</h3>
          <p><strong>Description:</strong> {schedule.description || 'N/A'}</p>
          <p><strong>Start:</strong> {new Date(schedule.start_time).toLocaleString()}</p>
          <p><strong>End:</strong> {new Date(schedule.end_time).toLocaleString()}</p>
          <p><strong>Location:</strong> {schedule.location || 'N/A'}</p>
          <p><strong>Reminder:</strong> {schedule.reminder ? `${schedule.reminder} minutes before` : 'No reminder'}</p>
        </div>
      ))}
    </div>
  );
}

export default ScheduleList;
