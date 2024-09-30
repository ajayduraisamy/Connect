import React, { useState } from 'react';
import axios from 'axios';
import './ProjectForm.css'; // Optional: Add CSS for styling if needed

const ProjectForm = ({ onProjectCreated }) => {
  const [newProject, setNewProject] = useState({
    title: '',
    description: '',
    skillsRequired: '',
    location: '',
  });

  const [message, setMessage] = useState({ text: '', type: '' }); 

  // Handle input changes
  const handleChange = (e) => {
    setNewProject({
      ...newProject,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Convert the skills to an array, splitting by comma
    const projectToCreate = {
      ...newProject,
      skillsRequired: newProject.skillsRequired.split(',').map(skill => skill.trim()),
    };

    // POST the new project to the backend
    axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/projects`, projectToCreate)
      .then((response) => {
        // Call the parent function (if needed) to refresh the project list or notify of the new project
        if (onProjectCreated) {
          onProjectCreated(response.data);
        }
        // Set success message
        setMessage({
          text: 'Project created successfully!',
          type: 'success',
        });
        // Reset the form
        setNewProject({
          title: '',
          description: '',
          skillsRequired: '',
          location: '',
        });
      })
      .catch((error) => {
        // Log error details
        console.error('There was an error creating the project!', error.response ? error.response.data : error.message);
        // Set error message
        setMessage({
          text: 'There was an error creating the project. Please try again.',
          type: 'error',
        });
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="project-form">
        <h3>Register Project</h3>
        {message.text && (
          <div style={{
            color: message.type === 'success' ? 'green' : 'red',
            marginBottom: '15px',
          }}>
            {message.text}
          </div>
        )}
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={newProject.title}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={newProject.description}
            onChange={handleChange}
            required
          ></textarea>
        </div>

        <div className="form-group">
          <label htmlFor="skillsRequired">Skills (comma separated)</label>
          <input
            type="text"
            id="skillsRequired"
            name="skillsRequired"
            value={newProject.skillsRequired}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="location">Location</label>
          <input
            type="text"
            id="location"
            name="location"
            value={newProject.location}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit">Create Project</button>
      </form>
    </div>
  );
};

export default ProjectForm;
