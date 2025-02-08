import React from 'react';
import { useNavigate } from 'react-router-dom';  
import '../styles/ContactUs.css';  

const ContactUs = () => {
  const navigate = useNavigate();  

  return (
    <div>
      <nav className="navbar">
        <div className="logo"></div>
        <div className="nav-links">
          <button onClick={() => navigate('/mainpage')}>Home</button>
          <button onClick={() => navigate('/aboutus')}>About Us</button>
          <button onClick={() => navigate('/contactus')}>Contact Us</button>
        </div>
      </nav>

      <section id="contact-us-section">
        <div className="contact-container">
          <h2>Contact Us</h2>
          <p>
            We would love to hear from you! Reach out for inquiries, feedback, or to make a reservation.
          </p>

          <div className="contact-info">
            <div className="contact-location">
              <h3>Our Location</h3>
              <p>
                Delicious Deck, <br /> Address Line 1, Kathmandu, Nepal
              </p>
              <p>
                <a href="https://goo.gl/maps/yourmaplink" target="_blank" rel="noopener noreferrer">
                  View on Google Maps
                </a>
              </p>
            </div>

            <div className="contact-details">
              <h3>Contact Information</h3>
              <p>
                Phone: +977-9840243065<br />
                Email: <a href="mailto:info@deliciousdeck.com">info@deliciousdeck.com</a>
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactUs;
