import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import "../styles/BookTable.css";

const BookingForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [guests, setGuests] = useState(1);
  const [tableno, setTableno] = useState("1");

  const navigate = useNavigate(); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newBooking = { name, email, phone, reservationDate:date, reservationTime:time,  guestCount:guests, tableNo:tableno };

    const token = localStorage.getItem("token");

    if (!token) {
      alert("login expired");
      navigate("/login")
      return;
    }

    const userId = localStorage.getItem("userId");  

    if (!userId) {
      alert("No user found");
      return;
    }

    const bookingPayload = { ...newBooking, UseruserId: userId };

    try {
      const response = await fetch("http://localhost:5001/reservations/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(bookingPayload),
      });

      if (response.ok) {
        alert("Booking confirmed!");
        navigate("/mytable");
      } else {
        const data = await response.json();
        alert(data.message || "Error creating reservation");
      }
    } catch (err) {
      console.error("Error:", err);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="book_contents">
      <div className="navbar">
        <div className="logo"></div>
        <div className="nav-links">
          <button onClick={() => navigate("/mainpage")}>Home</button>
          <button onClick={() => navigate("/aboutus")}>About Us</button>
          <button onClick={() => navigate("/contactus")}>Contact Us</button>
        </div>
      </div>

      <div className="main">
        <div className="booking-form">
          <h4>Book a Table at Delicious Deck</h4>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Your Name:</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email Address:</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone">Phone Number:</label>
              <input
                type="tel"
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="date">Reservation Date:</label>
              <input
                type="date"
                id="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="time">Reservation Time:</label>
              <input
                type="time"
                id="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="guests">Number of Guests:</label>
              <input
                type="number"
                id="guests"
                min="1"
                max="10"
                value={guests}
                onChange={(e) => setGuests(Number(e.target.value))}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="tableno">Table No:</label>
              <input
                type="number"
                id="tableno"
                min="1"
                max="20"
                value={tableno}
                onChange={(e) => setTableno(Number(e.target.value))}
                required
              />
            </div>

            <button type="submit" className="bookingbtn">Confirm Booking</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookingForm;
