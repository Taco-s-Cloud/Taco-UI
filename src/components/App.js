import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ScheduleForm from './ScheduleForm';
import ScheduleManager from './ScheduleManager';
import UserProfile from './UserProfile';
import TaskForm from "./TaskForm";
import ToDoList from './ToDoList';
import WelcomePage from './WelcomePage';
import PrintToken from './PrintToken';

function App() {
  return (
      <Router>
        {/* This will attempt to print the token whenever the user is logged in */}
        <PrintToken />
        <Routes>
          <Route path="/" element={<UserProfile />} />
          <Route path="/welcome" element={<WelcomePage />} />
          <Route path="/schedule-manager" element={<ScheduleManager />} />
          <Route path="/add-schedule" element={<ScheduleForm />} />
          <Route path="/add-task" element={<TaskForm />} />
          <Route path="/to-do-list" element={<ToDoList />} />
        </Routes>
      </Router>
  );
}

export default App;
