import React, { useState, useEffect } from 'react';
import BackButton from './BackButton';
import { makeApiCall } from '../middleware/apiHelper';

const ToDoList = () => {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all'); // all, completed, pending
  const [keyword, setKeyword] = useState('');

  const fetchTasks = async () => {
    try {
      const params = new URLSearchParams();
      if (filter !== 'all') params.append('completed', filter === 'completed');
      if (keyword) params.append('keyword', keyword);
      // Use makeApiCall for the API request
      //const data = await makeApiCall(`http://localhost:5001/tasks?${params.toString()}`);
      const data = await makeApiCall(`https://task-manager-1024364663505.us-central1.run.app/tasks?${params.toString()}`);
      setTasks(data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
      alert('Failed to fetch tasks.');
    }
  };
  
  const markAsCompleted = async (taskId) => {
    try {
      // Use makeApiCall for the API request
      
      //await makeApiCall(`http://localhost:5001/tasks/${taskId}`, 'PUT', { completed: true });
      await makeApiCall(`https://task-manager-1024364663505.us-central1.run.app/tasks/${taskId}`, 'PUT', { completed: true });
      alert('Task marked as completed!');
      fetchTasks();
    } catch (error) {
      console.error('Error marking task as completed:', error);
      alert('Failed to mark task as completed.');
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [filter, keyword]);

  return (
    <div className="container">
        <BackButton /> {/* Add the BackButton here */}
      <h1>To-Do List</h1>

      <div className="filters">
        <label>
          Filter by Status:
          <select value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value="all">All</option>
            <option value="completed">Completed</option>
            <option value="pending">Pending</option>
          </select>
        </label>

        <label>
          Search by Keyword:
          <input
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
        </label>
      </div>

      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <strong>{task.title}</strong> - {task.description || 'No Description'}
            <br />
            Due: {new Date(task.due_date).toLocaleString()}
            <br />
            Status: {task.completed ? 'Completed' : 'Pending'}
            {!task.completed && (
              <button onClick={() => markAsCompleted(task.id)}>Mark as Completed</button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ToDoList;
