import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import { makeApiCall } from '../middleware/apiHelper';
import '../styles/CommonStyles.css'; // Shared styles

function TaskForm({ loadTasks }) {
  const navigate = useNavigate(); // Initialize navigate for navigation

  const [formData, setFormData] = useState({
    user_id: '',
    title: '',
    description: '',
    due_date: '',
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      //await makeApiCall('http://localhost:5001/tasks', 'POST', formData); // Call the task API
      await makeApiCall('https://task-manager-1024364663505.us-central1.run.app/tasks', 'POST', formData); // Call the task API
      loadTasks(); // Refresh the task list
      setFormData({
        user_id: '',
        title: '',
        description: '',
        due_date: '',
      }); // Reset the form
    } catch (error) {
      console.error('Failed to save task:', error);
      alert('Error saving task. Check the console for details.');
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

      {/* Task Form */}
      <h1>Add a Task</h1>
      <form onSubmit={handleSubmit} className="form-group">
        <div>
          <label>Title *</label>
          <input
            type="text"
            name="title"
            value={formData.title} // Use formData state
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Description</label>
          <textarea
            name="description"
            value={formData.description} // Use formData state
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Due Date *</label>
          <input
            type="datetime-local"
            name="due_date"
            value={formData.due_date} // Use formData state
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Save Task</button>
      </form>
    </div>
  );
}

export default TaskForm;
