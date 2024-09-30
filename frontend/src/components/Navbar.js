// import React from 'react';
// import { Link } from 'react-router-dom';
// import './Navbar.css'; // Import the CSS file for styles

// const Navbar = () => {
//   return (
//     <nav className="navbar">
//       <div className="navbar-container">
//         <Link to="/" className="navbar-logo">
//           Community Connect
//         </Link>
//         <ul className="navbar-menu">
//           <li><Link to="/">Home</Link></li>
//           <li><Link to="/projects">Projects Register</Link></li>
//           <li><Link to="/projectslist">Projects List</Link></li>
//           <li><Link to="/volunteers">Volunteers Register</Link></li>
//           <li><Link to="/volunteerslist">Volunteers List</Link></li>
         
//         </ul>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Import the CSS file for styles

const Navbar = () => {
  const [projectsDropdown, setProjectsDropdown] = useState(false);
  const [volunteersDropdown, setVolunteersDropdown] = useState(false);

  const toggleProjectsDropdown = () => setProjectsDropdown(!projectsDropdown);
  const toggleVolunteersDropdown = () => setVolunteersDropdown(!volunteersDropdown);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          CommunityConnect
        </Link>
        <ul className="navbar-menu">
          <li><Link to="/">Home</Link></li>
          <li className="dropdown" onClick={toggleProjectsDropdown}>
            <span className="dropdown-link">Projects</span>
            {projectsDropdown && (
              <ul className="dropdown-menu">
                <li><Link to="/projects">Projects Register</Link></li>
                <li><Link to="/projectslist">Projects List</Link></li>
              </ul>
            )}
          </li>
          <li className="dropdown" onClick={toggleVolunteersDropdown}>
            <span className="dropdown-link">Volunteers</span>
            {volunteersDropdown && (
              <ul className="dropdown-menu">
                <li><Link to="/volunteers"> Register</Link></li>
                <li><Link to="/volunteerslist">Volunteers List</Link></li>
              </ul>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
