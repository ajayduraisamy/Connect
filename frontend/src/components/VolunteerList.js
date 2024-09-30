import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './VolunteerList.css'; 

const VolunteerList = () => {
  const [volunteers, setVolunteers] = useState([]);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/volunteers`)
      .then(response => {
        setVolunteers(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the volunteers!', error);
      });
  }, []);

  return (
    <div className="volunteer-list-container">
      <h2>Volunteer List</h2>
      <div className="volunteer-cards">
        {volunteers.map(volunteer => (
          <div className="volunteer-card" key={volunteer._id}>
            <div className="volunteer-name">{volunteer.name}</div>
            <div className="volunteer-email">{volunteer.email}</div>
            <div className="volunteer-skills">{volunteer.skills.join(', ')}</div>
            <div className="volunteer-location">{volunteer.location}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VolunteerList;

