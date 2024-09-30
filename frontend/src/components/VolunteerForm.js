import axios from 'axios';
import React, { useEffect, useState } from 'react';

const VolunteerForm = () => {
  const [volunteer, setVolunteer] = useState({
    name: '',
    email: '',
    skills: '',
    location: '',
    projectId: ''
  });
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    skills: '',
    location: '',
    projectId: ''
  });
  const [projects, setProjects] = useState([]);
  //const web3FormsAccessKey = '8a2bf5a9-999a-4210-ace6-87be4a7d737d'; // Web3Forms public access key
  const web3FormsAccessKey = '968cdfaf-0eae-4c6f-a3fc-65d83954fb5c';

  // Fetch projects from the database
  useEffect(() => {
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/projects`) // Updated to fetch projects
      .then(response => {
        console.log(response.data); // Log the response to check the structure
        setProjects(response.data); // Set projects from the response
      })
      .catch(error => {
        console.error('There was an error fetching the projects!', error);
      });
  }, []);

  const validate = () => {
    let valid = true;
    const newErrors = { name: '', email: '', skills: '', location: '', projectId: '' };

    if (!volunteer.name) {
      newErrors.name = 'Name is required';
      valid = false;
    }

    if (!volunteer.email) {
      newErrors.email = 'Email is required';
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(volunteer.email)) {
      newErrors.email = 'Email is invalid';
      valid = false;
    }

    if (!volunteer.skills) {
      newErrors.skills = 'Skills are required';
      valid = false;
    }

    if (!volunteer.location) {
      newErrors.location = 'Location is required';
      valid = false;
    }

    if (!volunteer.projectId) {
      newErrors.projectId = 'Project selection is required';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleChange = (e) => {
    setVolunteer({ ...volunteer, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validate()) {
      const selectedProject = projects.find(project => project._id === volunteer.projectId);

      axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/volunteers`, volunteer)
        .then(response => {
          alert('Volunteer registered successfully');

          // Send email notification via Web3Forms
          axios.post('https://api.web3forms.com/submit', {
            access_key: web3FormsAccessKey,
            subject: 'New Volunteer Registration',
            from_name: volunteer.name,
            from_email: volunteer.email,
            message: `New volunteer registration details:
              - Name: ${volunteer.name}
              - Email: ${volunteer.email}
              - Skills: ${volunteer.skills}
              - Location: ${volunteer.location}
              - Project Name: ${selectedProject ? `${selectedProject.title} - ${selectedProject.location}` : 'Unknown Project'}`,
          })
          .then(() => {
            console.log('Email sent successfully');
          })
          .catch((error) => {
            console.error('Error sending email via Web3Forms:', error);
          });

          // Reset form fields
          setVolunteer({ name: '', email: '', skills: '', location: '', projectId: '' });
          setErrors({ name: '', email: '', skills: '', location: '', projectId: '' }); // Clear errors
        })
        .catch(error => {
          console.error('There was an error registering the volunteer!', error);
        });
    }
  };

  const formStyle = {
    maxWidth: '500px',
    margin: '0 auto',
    padding: '20px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    marginTop: '70px',
    backgroundColor: '#98efd8',
  };

  const headingStyle = {
    textAlign: 'center',
    marginBottom: '20px',
    color: '#333',
  };

  const inputStyle = {
    width: '98%',
    padding: '10px',
    margin: '10px 0',
    border: '1px solid #ccc',
    borderRadius: '4px',
  };

  const buttonStyle = {
    width: '50%',
    padding: '10px',
    backgroundColor: '#007bff',
    border: 'none',
    borderRadius: '4px',
    color: 'white',
    fontSize: '16px',
    cursor: 'pointer',
    marginLeft: '120px',
  };

  const buttonHoverStyle = {
    backgroundColor: 'black',
  };

  return (
    <form onSubmit={handleSubmit} style={formStyle}>
      <h2 style={headingStyle}>Register Volunteer</h2>

      <label htmlFor="name">Name</label>
      <input
        type="text"
        name="name"
        id="name"
        value={volunteer.name}
        onChange={handleChange}
        placeholder="Enter your Name"
        style={inputStyle}
      />
      {errors.name && <div style={{ color: 'red', marginBottom: '10px' }}>{errors.name}</div>}

      <label htmlFor="email">Email</label>
      <input
        type="email"
        name="email"
        id="email"
        value={volunteer.email}
        onChange={handleChange}
        placeholder="Enter your Email"
        style={inputStyle}
      />
      {errors.email && <div style={{ color: 'red', marginBottom: '10px' }}>{errors.email}</div>}

      <label htmlFor="skills">Skills</label>
      <input
        type="text"
        name="skills"
        id="skills"
        value={volunteer.skills}
        onChange={handleChange}
        placeholder="Enter your Skills (comma separated)"
        style={inputStyle}
      />
      {errors.skills && <div style={{ color: 'red', marginBottom: '10px' }}>{errors.skills}</div>}

      <label htmlFor="location">Location</label>
      <input
        type="text"
        name="location"
        id="location"
        value={volunteer.location}
        onChange={handleChange}
        placeholder="Enter your Location"
        style={inputStyle}
      />
      {errors.location && <div style={{ color: 'red', marginBottom: '10px' }}>{errors.location}</div>}

      {/* Dropdown to select project */}
      <label htmlFor="projectId">Select a Project</label>
      <select
        name="projectId"
        id="projectId"
        value={volunteer.projectId}
        onChange={handleChange}
        style={inputStyle}
      >
        <option value="">Select a Project</option>
        {projects.map((project) => (
          <option key={project._id} value={project._id}>
            {project.title} - {project.location}
          </option>
        ))}
      </select>
      {errors.projectId && <div style={{ color: 'red', marginBottom: '10px' }}>{errors.projectId}</div>}

      <button
        type="submit"
        style={buttonStyle}
        onMouseOver={(e) => (e.target.style.backgroundColor = buttonHoverStyle.backgroundColor)}
        onMouseOut={(e) => (e.target.style.backgroundColor = buttonStyle.backgroundColor)}
      >
        Register
      </button>
    </form>
  );
};

export default VolunteerForm;
