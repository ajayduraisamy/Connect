import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ProjectList.css'; 

const ProjectList = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/projects`)
      .then(response => {
        setProjects(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the projects!', error);
      });
  }, []);

  return (
    
    <div className="project-list-container">
      <h2>Project Lists</h2>
      <div className="project-cards">
        {projects.map(project => (
          <div key={project._id} className="project-card">
            <h3 className="project-title">Title:- {project.title}</h3>
            <p className="project-description">Description: {project.description}</p>
            <p className="project-skills">Skills: {project.skillsRequired.join(', ')}</p>
            <p className="project-location">Location: {project.location}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectList;
