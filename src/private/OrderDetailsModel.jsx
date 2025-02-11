import React from "react";
import "../styles/OrderDetailsModal.css";

const OrderDetailsModal = ({ orderDetails, closeModal }) => {
  if (!orderDetails) return null;

  // Close modal when clicking outside the content
  const handleOverlayClick = (e) => {
    if (e.target.classList.contains("modal-overlay")) {
      closeModal();
    }
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-content">
        <button className="close-btn" onClick={closeModal}>X</button>
        <h2>Order Details</h2>
        <div className="order-summary">
          <p><strong>Order ID:</strong> {orderDetails.id}</p>
          <p><strong>Date:</strong> {new Date(orderDetails.date).toLocaleDateString()}</p>
          <p><strong>Total:</strong> Rs. {orderDetails.total}</p>
        </div>

        <div className="order-items">
          <h3>Items:</h3>
          <ul>
            {orderDetails.items.map((item, index) => (
              <li key={index}>
                {item.name} - Rs. {item.price} x {item.quantity}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsModal;
