import React from 'react';
import '../styles/OrderDetailsModal.css'; // Include your CSS

const OrderDetailsModal = ({ orderDetails, closeModal }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-btn" onClick={closeModal}>&times;</button>

        <h3>Order ID: {orderDetails.id}</h3>
        <p>Date: {new Date(orderDetails.date).toLocaleDateString()}</p>
        <p>Total: Rs. {orderDetails.total}</p>
        <p><strong>Status:</strong> {orderDetails.status}</p> {/* Display status */}

        <div className="order-summary">
          <h4>Order Summary:</h4>
          <ul className="order-items">
            {orderDetails.items.map((item, index) => (
              <li key={index}>{item.name} x{item.quantity} - Rs. {item.quantity * item.price}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsModal;
