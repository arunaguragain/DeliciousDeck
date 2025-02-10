import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/MyTable.css";

const MyTable = () => {
  const [bookings, setBookings] = useState([]);
  const navigate = useNavigate();

  // Fetch bookings from localStorage (or API)
  useEffect(() => {
    const storedBookings = JSON.parse(localStorage.getItem("bookings")) || [];
    setBookings(storedBookings);
  }, []);

  // Delete a booking
  const handleDelete = (index) => {
    const updatedBookings = bookings.filter((_, i) => i !== index);
    setBookings(updatedBookings);
    localStorage.setItem("bookings", JSON.stringify(updatedBookings));
  };

  return (
    <div className="my-table">
      {/* Navbar */}
      <div className="navbar">
        <div className="logo" onClick={() => navigate("/")}></div>
        <div className="nav-links">
          <button onClick={() => navigate("/mainpage")}>Home</button>
          <button onClick={() => navigate("/aboutus")}>About Us</button>
          <button onClick={() => navigate("/contactus")}>Contact Us</button>
        </div>
      </div>

      {/* Page Title */}
      <h2>My Booked Tables</h2>

      {/* Check if there are bookings */}
      {bookings.length === 0 ? (
        <p>No bookings yet.</p>
      ) : (
        <table className="booking-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Date</th>
              <th>Time</th>
              <th>Guests</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking, index) => (
              <tr key={index}>
                <td>{booking.name}</td>
                <td>{booking.date}</td>
                <td>{booking.time}</td>
                <td>{booking.guests}</td>
                <td>
                  <button className="delete-btn" onClick={() => handleDelete(index)}>Cancel</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default MyTable;
