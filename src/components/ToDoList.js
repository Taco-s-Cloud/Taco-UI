import React, { useState, useEffect } from 'react';
import BackButton from './BackButton';
import { makeApiCall } from '../middleware/apiHelper';
import NavBar from './NavBar';
import '../styles/CommonStyles.css';


const ToDoList = () => {
  const [tasks, setTasks] = useState([]); // Original tasks
  const [filteredTasks, setFilteredTasks] = useState([]); // Filtered tasks for display
  const [filter, setFilter] = useState('all'); // all, completed, pending
  const [keyword, setKeyword] = useState('');

  // Fetch tasks from API
  const fetchTasks = async () => {
    try {
      const data = await makeApiCall(
        "https://task-manager-1024364663505.us-central1.run.app/tasks",
        "GET"
      );
      setTasks(data);
      setFilteredTasks(data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Local filtering for status and keyword
  useEffect(() => {
    const filtered = tasks.filter((task) => {
      const statusMatch =
        filter === 'all' ||
        (filter === 'completed' && task.completed === true) ||
        (filter === 'pending' && task.completed === false);

      const keywordMatch =
        !keyword || task.title.toLowerCase().includes(keyword.toLowerCase());

      return statusMatch && keywordMatch;
    });

    setFilteredTasks(filtered);
  }, [filter, keyword, tasks]);

  const markAsCompleted = async (taskId) => {
    try {
      // Send PUT request to update task status
      await makeApiCall(
        `https://task-manager-1024364663505.us-central1.run.app/tasks/${taskId}`,
        'PUT',
        { completed: true }
      );
      alert('Task marked as completed!');
      fetchTasks(); // Refresh the task list
    } catch (error) {
      console.error('Error marking task as completed:', error);
      alert('Failed to mark task as completed.');
    }
  };
  
  return (
    <div className="page-container">
      {/* NavBar */}
      <NavBar />

      <h1>To-Do List</h1>

      {/* Filters */}
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

      {/* Task List */}
      <ul>
        {filteredTasks.map((task) => (
          <li key={task.id} className="task-item">
            <strong>{task.title}</strong> - {task.description || 'No Description'}
            <br />
            Due: {new Date(task.due_date).toLocaleString()}
            <br />
            Status: {task.completed ? 'Completed' : 'Pending'}
            {/* Mark as Completed Button */}
            {!task.completed && (
              <button
                className="mark-completed-btn"
                onClick={() => markAsCompleted(task.id)}
              >
                Mark as Completed
              </button>
            )}
          </li>
        ))}
      </ul>

      <BackButton />
    </div>
  );
};

export default ToDoList;
