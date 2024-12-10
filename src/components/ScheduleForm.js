import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom for navigation
import { makeApiCall } from '../middleware/apiHelper'; 
import '../styles/CommonStyles.css'; // Shared styles

function ScheduleForm({ loadSchedules }) {
  const [formData, setFormData] = useState({
    user_id: '',
    title: '',
    description: '',
    start_time: '',
    end_time: '',
    location: '',
    reminder: null,
    reminderEnabled: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { reminderEnabled, ...data } = formData; // Exclude reminderEnabled as it's a UI-only field
    try {
      await makeApiCall('https://schedule-manager-1024364663505.us-central1.run.app/schedules', 'POST', data); // Use the API helper for the request
      //await makeApiCall('http://localhost:5002/schedules', 'POST', data);
      loadSchedules(); // Refresh the schedules list
      setFormData({
        title: '',
        description: '',
        start_time: '',
        end_time: '',
        location: '',
        reminder: null,
        reminderEnabled: false,
      }); // Reset the form
    } catch (error) {
      console.error('Failed to save schedule:', error);
      alert('Error saving schedule. Check the console for details.');
    }
  };

  return (
    <div className="container">
      {/* Add Navigation Bar */}
      <nav>
        <ul>
          <li><Link to="/schedule-manager">View Calendar</Link></li>
          <li><Link to="/add-schedule">Add Schedule Event</Link></li>
          <li><Link to="/add-task">Add Task</Link></li>
        </ul>
      </nav>

      <h1>Add an Event</h1>
      <form onSubmit={handleSubmit} className="form-group" id="scheduleForm">
        <div className="form-group">
          <label>User ID *</label>
          <input type="text" name="user_id" value={formData.user_id} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Title *</label>
          <input type="text" name="title" value={formData.title} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Description</label>
          <textarea name="description" value={formData.description} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Start Date & Time *</label>
          <input type="datetime-local" name="start_time" value={formData.start_time} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>End Date & Time *</label>
          <input type="datetime-local" name="end_time" value={formData.end_time} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Location</label>
          <input type="text" name="location" value={formData.location} onChange={handleChange} />
        </div>
        <div className="reminder-section">
          <label>
            <input type="checkbox" name="reminderEnabled" checked={formData.reminderEnabled} onChange={handleChange} />
            Enable Reminder
          </label>
          {formData.reminderEnabled && (
            <div className="form-group">
              <label>Remind me:</label>
              <select name="reminder" value={formData.reminder || ''} onChange={handleChange}>
                <option value="">Select Reminder</option>
                <option value="5">5 minutes before</option>
                <option value="15">15 minutes before</option>
                <option value="30">30 minutes before</option>
                <option value="60">1 hour before</option>
                <option value="1440">1 day before</option>
              </select>
            </div>
          )}
        </div>
        <button type="submit">Save Schedule</button>
      </form>
    </div>
  );
}

export default ScheduleForm;
