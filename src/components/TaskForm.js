import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/CommonStyles.css'; // Shared styles

const TaskForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      title,
      description,
      due_date: new Date(dueDate).toISOString(),
    };

    try {
      await fetch('http://localhost:5001/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      alert('Task added successfully!');
      navigate('/welcome');
    } catch (error) {
      console.error('Error adding task:', error);
      alert('Failed to add task.');
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
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>
        <div>
          <label>Description</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
        </div>
        <div>
          <label>Due Date *</label>
          <input type="datetime-local" value={dueDate} onChange={(e) => setDueDate(e.target.value)} required />
        </div>
        <button type="submit">Save Task</button>
      </form>
    </div>
  );
};

export default TaskForm;
