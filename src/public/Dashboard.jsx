import '../styles/Dashboard.css';
import React from 'react';
import { useNavigate } from 'react-router-dom';


const Dashboard = () => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className="dashboard-container">
      <div className="background-image">
        <div className="overlay">
          <main>
            <section className="intro">
              <h1>Welcome to Delicious Deck</h1>
              <p>Experience nature’s finest vegetarian dishes in a serene, peaceful environment.</p>
            </section>

            <section className="cta-buttons">
              <button className="cta-btn" onClick={() => handleNavigation('/signup')}>
                Sign Up
              </button>
              <button className="cta-btn" onClick={() => handleNavigation('/login')}>
                Log In 
              </button>
            </section>
          </main>
        </div>
      </div>

    </div>
  );
};

export default Dashboard;
