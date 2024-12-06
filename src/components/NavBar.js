import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <nav>
      <ul>
        <li><Link to="/add-schedule">Add Schedule Event</Link></li>
        <li><Link to="/add-task">Add Task</Link></li>
        <li><Link to="/todo-list">To Do List</Link></li>
      </ul>
    </nav>
  );
};

export default NavBar;
