import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Main.css';

const MainPage = () => {
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  return (
    <div className="main-page">
      <nav className="navbar">
        <div className="logo" onClick={toggleSidebar}></div>
        <div className="nav-links">
          <button onClick={() => navigate('/mainpage')}>Home</button>
          <button onClick={() => navigate('/aboutus')}>About Us</button>
          <button onClick={() => navigate('/contact')}>Contact Us</button>
        </div>
      </nav>

      <div className={`sidebar ${sidebarVisible ? 'visible' : ''}`}>
        <ul>
          <li><button onClick={() => navigate('/menu')}>Menu</button></li>
          <li><button onClick={() => navigate('/book-table')}>Book Table</button></li>
          <li><button onClick={() => navigate('/reviews')}>Reviews</button></li>
          <li><button onClick={() => navigate('/profile')}>Profile</button></li>
          <li><button onClick={toggleSidebar}>Close</button></li>
        </ul>
      </div>

      <div className="contents">
        <h1>Experience Authentic Nepalese Vegetarian Cuisine</h1>
        <p>Fresh ingredients, unique flavors, and a serene ambiance await you.</p>
        <button className="cta-btn" onClick={() => navigate('/menu')}>Explore the Menu</button>
      </div>
    </div>
  );
};

export default MainPage;
