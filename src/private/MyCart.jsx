import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/MyCart.css";

const MyCart = () => {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  // Fetch cart items from localStorage
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    console.log(storedCart); // Check if cart items are loaded properly
    setCartItems(storedCart);
  }, []);

  // Remove item from cart
  const handleRemove = (index) => {
    const updatedCart = cartItems.filter((_, i) => i !== index);
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  // Update item quantity
  const handleQuantityChange = (index, action) => {
    const updatedCart = [...cartItems];
    if (action === "add") {
      updatedCart[index].quantity += 1;  // Increase quantity
    } else if (action === "remove" && updatedCart[index].quantity > 1) {
      updatedCart[index].quantity -= 1;  // Decrease quantity
    }
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const calculateSubtotal = (price, quantity) => {
    if (!price || !quantity) {
      return 0; 
    }
    return price * quantity;
  };

  const calculateTotal = () => {
    const subtotal = cartItems.reduce((total, item) => {
      return total + calculateSubtotal(item.price, item.quantity);
    }, 0);
    
    const deliveryCharge = 100;  // Example delivery charge
    return subtotal + deliveryCharge;
  };

  // Handle the place order action
  const handlePlaceOrder = () => {
    const order = {
      id: Date.now(),
      date: new Date(),
      total: calculateTotal(),
      items: cartItems,
    };

    // Fetch existing orders from localStorage and add the new order
    const existingOrders = JSON.parse(localStorage.getItem("orders")) || [];
    existingOrders.push(order);
    localStorage.setItem("orders", JSON.stringify(existingOrders));

    // Clear the cart after placing the order
    localStorage.removeItem("cart");

    // Redirect to My Orders page
    alert("Your order has been placed successfully!");
    navigate("/myorders");
  };

  return (
    <div className="my-cart">
      {/* Navbar */}
      <div className="navbar">
        <div className="logo" onClick={() => navigate("/")}></div>
        <div className="nav-links">
          <button onClick={() => navigate("/menu")}>Menu</button>
          <button onClick={() => navigate("/mainpage")}>Home</button>
          <button onClick={() => navigate("/aboutus")}>About Us</button>
          <button onClick={() => navigate("/contactus")}>Contact Us</button>
        </div>
      </div>

      <div className="cart-contents">
        <h2>My Cart</h2>

        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <>
            <table className="cart-table">
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item, index) => (
                  <tr key={index}>
                    <td>{item.name}</td>
                    <td>Rs. {item.price || "N/A"}</td>
                    <td>
                      <div className="quantity-controls">
                        <button
                          className="quantity-btn"
                          onClick={() => handleQuantityChange(index, "remove")}
                        >
                          -
                        </button>
                        {item.quantity || 1}
                        <button
                          className="quantity-btn"
                          onClick={() => handleQuantityChange(index, "add")}
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td>
                      <button className="delete-btn" onClick={() => handleRemove(index)}>
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="cart-summary">
              <p>Subtotal: Rs. {calculateTotal() - 100}</p>
              <p>Delivery Charge: Rs. 100</p>
              <p>Total: Rs. {calculateTotal()}</p>
            </div>

            <button className="place-order-btn" onClick={handlePlaceOrder}>
              Place Order
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default MyCart;
