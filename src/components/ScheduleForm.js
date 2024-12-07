import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/CommonStyles.css'; // Shared styles

const ScheduleForm = ({ loadSchedules }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    start_time: '',
    end_time: '',
    location: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch('http://localhost:5002/schedules', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      loadSchedules();
      navigate('/welcome');
    } catch (error) {
      console.error('Failed to save schedule:', error);
    }
  };

  return (
    <div className="page-container">
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

      {/* Schedule Form */}
      <h1>Add Schedule Event</h1>
      <form onSubmit={handleSubmit} className="form-group">
        <div>
          <label>Title *</label>
          <input type="text" name="title" value={formData.title} onChange={handleChange} required />
        </div>
        <div>
          <label>Description</label>
          <textarea name="description" value={formData.description} onChange={handleChange} />
        </div>
        <div>
          <label>Start Time *</label>
          <input type="datetime-local" name="start_time" value={formData.start_time} onChange={handleChange} required />
        </div>
        <div>
          <label>End Time *</label>
          <input type="datetime-local" name="end_time" value={formData.end_time} onChange={handleChange} required />
        </div>
        <div>
          <label>Location</label>
          <input type="text" name="location" value={formData.location} onChange={handleChange} />
        </div>
        <button type="submit">Save Schedule</button>
      </form>
    </div>
  );
};

export default ScheduleForm;
