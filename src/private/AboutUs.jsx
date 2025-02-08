import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/AboutUs.css';

const AboutUsPage = () => {
  const navigate = useNavigate();

  return (
    <div className="about-us-page">
      <nav className="navbar">
        <div className="logo" onClick={() => navigate('/')}></div>
        <div className="nav-links">
          <button onClick={() => navigate('/mainpage')}>Home</button>
          <button onClick={() => navigate('/aboutus')}>About Us</button>
          <button onClick={() => navigate('/contactus')}>Contact Us</button>
        </div>
      </nav>

      <div className="about-content">
        <h1>About Us</h1>
        <p>Welcome to Delicious Deck, where we bring you the authentic flavors of Nepal, infused with fresh ingredients and prepared with love.</p>

        <section className="mission-section">
          <h2>Our Mission</h2>
          <p>At Delicious Deck, our mission is to provide a serene dining experience by offering mouthwatering Nepalese vegetarian cuisine in a peaceful, rustic setting. We prioritize fresh, locally sourced ingredients to ensure every meal is made with care and quality. Whether you dine with us in our cozy restaurant or enjoy our food delivered to your doorstep, our goal is to bring the flavors of Nepal to you, wherever you are.</p>
        </section>

        <section className="values-section">
          <h2>Our Values</h2>
          <ul>
            <li><strong>Quality:</strong> We believe in using only the finest ingredients to create the best dishes for our customers.</li>
            <li><strong>Sustainability:</strong> Our focus is on serving food that’s not only healthy but also eco-friendly and sustainable.</li>
            <li><strong>Authenticity:</strong> We pride ourselves on offering an authentic Nepalese culinary experience, bringing the rich traditions of Nepal to your table.</li>
            <li><strong>Community:</strong> We aim to create a space where people can gather, enjoy delicious food, and form lasting connections.</li>
          </ul>
        </section>

        <div className="cta-section">
          <h3>Come Visit Us and Experience Nepalese Cuisine Like Never Before!</h3>
          <button className="cta-btn" onClick={() => navigate('/menu')}>Explore the Menu</button>
        </div>
      </div>
    </div>
  );
};

export default AboutUsPage;
