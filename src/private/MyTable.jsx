import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/MyTable.css";

const MyTable = () => {
  const [bookings, setBookings] = useState([]);
  const navigate = useNavigate();

  // Fetch bookings from the backend API
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please log in to view your bookings");
      navigate("/login");
      return;
    }

    // Fetch bookings from the server
    const fetchBookings = async () => {
      try {
        const response = await fetch("http://localhost:5001/reservations", {
          headers: {
            "Authorization": `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setBookings(data);  // Set the bookings fetched from the server
        } else {
          alert("Failed to fetch bookings. Please try again later.");
        }
      } catch (error) {
        console.error("Error fetching bookings:", error);
        alert("Something went wrong. Please try again.");
      }
    };

    fetchBookings();
  }, [navigate]);

  // Handle deleting a booking
  const handleDelete = async (index, bookingId) => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please log in to cancel a booking");
      navigate("/login");
      return;
    }

    try {
      // Send delete request to the backend
      const response = await fetch(`http://localhost:5001/reservations/${bookingId}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const updatedBookings = bookings.filter((_, i) => i !== index);
        setBookings(updatedBookings);
        alert("Booking canceled successfully");
      } else {
        const data = await response.json();
        alert(data.message || "Error deleting booking");
      }
    } catch (err) {
      console.error("Error deleting booking:", err);
      alert("Something went wrong. Please try again.");
    }
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

      <div className="mytablecontents">
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
                <tr key={booking._id}>  {/* Assuming _id is the unique identifier */}
                  <td>{booking.name}</td>
                  <td>{booking.date}</td>
                  <td>{booking.time}</td>
                  <td>{booking.guests}</td>
                  <td>
                    <button 
                      className="delete-btn" 
                      onClick={() => handleDelete(index, booking._id)}  
                    >
                      Cancel Booking
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default MyTable;
