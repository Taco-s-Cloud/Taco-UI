import React, { useState, useEffect } from 'react';

const ToDoList = () => {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all'); // all, completed, pending
  const [keyword, setKeyword] = useState('');

  const fetchTasks = async () => {
    try {
      const params = new URLSearchParams();
      if (filter !== 'all') params.append('completed', filter === 'completed');
      if (keyword) params.append('keyword', keyword);

      const response = await fetch(`http://localhost:5001/tasks?${params.toString()}`);
      if (!response.ok) {
        throw new Error(`API Error: ${response.status} - ${response.statusText}`);
      }
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
      alert('Failed to fetch tasks.');
    }
  };

  const markAsCompleted = async (taskId) => {
    try {
      const response = await fetch(`http://localhost:5001/tasks/${taskId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ completed: true }),
      });
      if (!response.ok) {
        throw new Error(`API Error: ${response.status} - ${response.statusText}`);
      }
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
