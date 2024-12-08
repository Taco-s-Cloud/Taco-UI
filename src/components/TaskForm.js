// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// const TaskForm = () => {
//   const [title, setTitle] = useState('');
//   const [description, setDescription] = useState('');
//   const [dueDate, setDueDate] = useState('');
//   const [completed, setCompleted] = useState(false);
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const formData = {
//       title,
//       description,
//       completed,
//       due_date: new Date(dueDate).toISOString(),
//     };

//     try {
//       // const response = await fetch('https://task-manager-1024364663505.us-central1.run.app/tasks', {
//       //   method: 'POST',
//       //   headers: {
//       //     'Content-Type': 'application/json',
//       //   },
//       //   body: JSON.stringify(formData),
//       // });
//       //await makeApiCall('http://localhost:5002/schedules', 'POST', data)
//       const response = await fetch('http://localhost:5003/tasks', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(formData),
//       });

//       if (response.ok) {
//         alert('Task added successfully!');
//         navigate('/tasks'); // Redirect to tasks list
//       } else {
//         const errorData = await response.json();
//         alert(`Failed to add task: ${errorData.error || 'Unknown error'}`);
//       }
//     } catch (error) {
//       console.error('Error adding task:', error);
//       alert('An error occurred while adding the task.');
//     }
//   };

//   return (
//     <div className="container">
//       <h1>Add a Task</h1>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label>Title *</label>
//           <input
//             type="text"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             required
//           />
//         </div>
//         <div>
//           <label>Description</label>
//           <textarea
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//           />
//         </div>
//         <div>
//           <label>Due Date</label>
//           <input
//             type="datetime-local"
//             value={dueDate}
//             onChange={(e) => setDueDate(e.target.value)}
//             required
//           />
//         </div>
//         <div>
//           <label>Completed</label>
//           <input
//             type="checkbox"
//             checked={completed}
//             onChange={(e) => setCompleted(e.target.checked)}
//           />
//         </div>
//         <button type="submit">Save Task</button>
//       </form>
//     </div>
//   );
// };

// export default TaskForm;

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { makeApiCall } from '../middleware/apiHelper';

function TaskForm({ loadTasks }) {
  const [formData, setFormData] = useState({
    user_id: '',
    title: '',
    description: '',
    due_date: '',
    completed: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { ...data } = formData; // Extract form data for submission
    try {
      await makeApiCall('http://localhost:5001/tasks', 'POST', data); // Call the task API
      loadTasks(); // Refresh the task list
      setFormData({
        user_id: '',
        title: '',
        description: '',
        due_date: '',
        completed: false,
      }); // Reset the form
    } catch (error) {
      console.error('Failed to save task:', error);
      alert('Error saving task. Check the console for details.');
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

      <h1>Add a Task</h1>
      <form onSubmit={handleSubmit} className="form-group" id="taskForm">
        <div className="form-group">
          <label>User ID *</label>
          <input
            type="text"
            name="user_id"
            value={formData.user_id}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Title *</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Due Date</label>
          <input
            type="datetime-local"
            name="due_date"
            value={formData.due_date}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Completed</label>
          <input
            type="checkbox"
            name="completed"
            checked={formData.completed}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Save Task</button>
      </form>
    </div>
  );
}

export default TaskForm;
