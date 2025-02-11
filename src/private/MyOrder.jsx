import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/MyOrders.css";
import OrderDetailsModal from "../private/OrderDetailsModel.jsx"; // Import the modal

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const navigate = useNavigate();

  // Fetch orders from localStorage
  useEffect(() => {
    const storedOrders = JSON.parse(localStorage.getItem("orders")) || [];
    console.log(storedOrders); // Check if orders are loaded properly
    setOrders(storedOrders);
  }, []);

  const openModal = (order) => {
    setSelectedOrder(order);
    setIsModalOpen(true); // Open the modal when clicking 'View Details'
  };

  const closeModal = () => {
    setIsModalOpen(false); // Close the modal
    setSelectedOrder(null); // Reset the selected order
  };

  return (
    <div className="my-orders">
      {/* Navbar */}
      <div className="navbar">
        <div className="logo"></div>
        <div className="nav-links">
          <button onClick={() => navigate("/mainpage")}>Home</button>
          <button onClick={() => navigate("/aboutus")}>About Us</button>
          <button onClick={() => navigate("/contactus")}>Contact Us</button>
        </div>
      </div>

      <div className="orders-contents">
        <h2>My Orders</h2>

        {orders.length === 0 ? (
          <p>You have no orders yet.</p>
        ) : (
          <table className="orders-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Date</th>
                <th>Total</th>
                <th>Details</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => (
                <tr key={index}>
                  <td>{order.id}</td>
                  <td>{new Date(order.date).toLocaleDateString()}</td>
                  <td>Rs. {order.total}</td>
                  <td>
                    <button onClick={() => openModal(order)}>View Details</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Modal for viewing order details */}
      {isModalOpen && (
        <OrderDetailsModal orderDetails={selectedOrder} closeModal={closeModal} />
      )}
    </div>
  );
};

export default MyOrders;
