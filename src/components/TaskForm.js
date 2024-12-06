import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TaskForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [completed, setCompleted] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      title,
      description,
      completed,
      due_date: new Date(dueDate).toISOString(),
    };

    try {
      const response = await fetch('http://localhost:5003/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Task added successfully!');
        navigate('/tasks'); // Redirect to tasks list
      } else {
        const errorData = await response.json();
        alert(`Failed to add task: ${errorData.error || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Error adding task:', error);
      alert('An error occurred while adding the task.');
    }
  };

  return (
    <div className="container">
      <h1>Add a Task</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title *</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div>
          <label>Due Date</label>
          <input
            type="datetime-local"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Completed</label>
          <input
            type="checkbox"
            checked={completed}
            onChange={(e) => setCompleted(e.target.checked)}
          />
        </div>
        <button type="submit">Save Task</button>
      </form>
    </div>
  );
};

export default TaskForm;