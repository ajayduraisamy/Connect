import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import ProjectForm from './components/ProjectForm';
import VolunteerForm from './components/VolunteerForm';
import ProjectList from './components/ProjectList';
import VolunteerList from './components/VolunteerList';

import './App.css'; 

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<ProjectForm />} />
        <Route path="/volunteers" element={<VolunteerForm />} />
        <Route path="/volunteerslist" element={<VolunteerList />} />
        <Route path="/projectslist" element={<ProjectList />} />
      </Routes>
    </Router>
  );
};

export default App;
