import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/MyTable.css";

const MyTable = () => {
  const [bookings, setBookings] = useState([]);
  const [editingBookingId, setEditingBookingId] = useState(null); // Track which booking is being edited
  const [updatedBooking, setUpdatedBooking] = useState({}); // Track updated booking data
  const navigate = useNavigate();

  // Function to format date to a more readable format
  const formatDate = (date) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(date).toLocaleDateString(undefined, options); // Formats as "Month Day, Year"
  };

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
          console.log("Fetched bookings:", data); // Log the bookings to inspect their structure
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
  const handleDelete = async (index, reservationId) => {
    console.log("Reservation ID:", reservationId);  // Log the ID to ensure it's correct
    
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please log in to cancel a booking");
      navigate("/login");
      return;
    }

    try {
      // Send delete request to the backend with reservationId
      const response = await fetch(`http://localhost:5001/reservations/${reservationId}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });

      if (response.ok) {
        // Remove the deleted booking from the state
        const updatedBookings = bookings.filter(booking => booking.reservationId !== reservationId);  
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

  // Handle editing a booking
  const handleEdit = (booking) => {
    setEditingBookingId(booking.reservationId); // Set the booking being edited
    setUpdatedBooking({ ...booking }); // Pre-fill the form with the booking data
  };

  // Handle updating the booking
  const handleUpdate = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please log in to update the booking");
      navigate("/login");
      return;
    }

    try {
      const response = await fetch(`http://localhost:5001/reservations/${updatedBooking.reservationId}`, {
        method: "PUT",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(updatedBooking)
      });

      if (response.ok) {
        const updatedBookings = bookings.map((booking) =>
          booking.reservationId === updatedBooking.reservationId ? updatedBooking : booking
        );
        setBookings(updatedBookings);
        setEditingBookingId(null); // Exit edit mode
        alert("Booking updated successfully");
      } else {
        const data = await response.json();
        alert(data.message || "Error updating booking");
      }
    } catch (err) {
      console.error("Error updating booking:", err);
      alert("Something went wrong. Please try again.");
    }
  };

  // Function to handle input changes for the edit form
  const handleChange = (e) => {
    setUpdatedBooking({
      ...updatedBooking,
      [e.target.name]: e.target.value,
    });
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
                <th>Table No</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr key={booking.reservationId}>
                  <td>
                    {editingBookingId === booking.reservationId ? (
                      <input
                        type="text"
                        name="name"
                        value={updatedBooking.name}
                        onChange={handleChange}
                      />
                    ) : (
                      booking.name
                    )}
                  </td>
                  <td>
                    {editingBookingId === booking.reservationId ? (
                      <input
                        type="date"
                        name="reservationDate"
                        value={updatedBooking.reservationDate}
                        onChange={handleChange}
                      />
                    ) : (
                      formatDate(booking.reservationDate)
                    )}
                  </td>
                  <td>
                    {editingBookingId === booking.reservationId ? (
                      <input
                        type="time"
                        name="reservationTime"
                        value={updatedBooking.reservationTime}
                        onChange={handleChange}
                      />
                    ) : (
                      booking.reservationTime
                    )}
                  </td>
                  <td>
                    {editingBookingId === booking.reservationId ? (
                      <input
                        type="number"
                        name="guestCount"
                        value={updatedBooking.guestCount}
                        onChange={handleChange}
                      />
                    ) : (
                      booking.guestCount
                    )}
                  </td>
                  <td>
                    {editingBookingId === booking.reservationId ? (
                      <input
                        type="number"
                        name="tableNo"
                        value={updatedBooking.tableNo}
                        onChange={handleChange}
                      />
                    ) : (
                      booking.tableNo
                    )}
                  </td>
                  <td>
                    {editingBookingId === booking.reservationId ? (
                      <>
                        <button className="save-btn" onClick={handleUpdate}>Save</button>
                        <button className="cancel-btn" onClick={() => setEditingBookingId(null)}>Cancel</button>
                      </>
                    ) : (
                      <>
                        <button className="edit-btn" onClick={() => handleEdit(booking)}>Edit</button>
                        <button className="delete-btn" onClick={() => handleDelete(booking.index, booking.reservationId)}>Cancel Booking</button>
                      </>
                    )}
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
