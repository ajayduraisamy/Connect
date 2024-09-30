import React from 'react';
import './Home.css';

const Home = () => {
  return (
    <div className="home">
      <h1>Welcome to Community Connect</h1>
      <p>Your platform to connect with community projects and volunteers.</p>
      <div className="home-content">
      <a href="/projects" className="get-started-link">
          <h2>Get Started</h2>
        </a>
       
      </div>
    </div>
  );
};

export default Home;
