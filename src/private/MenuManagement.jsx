import React, { useState, useEffect } from "react";
import { FaHome, FaList, FaShoppingCart, FaUsers, FaChartBar, FaCog, FaSignOutAlt } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// Main Component
const MenuManagement = () => {
  const navigate = useNavigate();
  const [menu, setMenu] = useState([]);
  const [newItem, setNewItem] = useState({ name: "", description: "", price: "", category: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Get the token from localStorage or any other storage method
  const token = localStorage.getItem("token");

  // Fetch menu items on load
  useEffect(() => {
    fetchMenuItems();
  }, []);

  const fetchMenuItems = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:5001/menu", {
        headers: {
          Authorization: `Bearer ${token}`, // Add the token in the header
        },
      });
      console.log("Fetched menu items:", response.data); // Log the fetched menu items
      setMenu(response.data);
    } catch (error) {
      console.error("Error fetching menu:", error); // Log the error
      setError("Error fetching menu.");
    } finally {
      setLoading(false);
    }
  };

  // Add a new menu item
  const addMenuItem = async () => {
    if (!newItem.name || !newItem.price || !newItem.category) {
      alert("Please fill all fields");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5001/menu/create", newItem, {
        headers: {
          Authorization: `Bearer ${token}`, // Add the token in the header
        },
      });
      console.log("Added menu item:", response.data); // Log the new menu item
      setMenu([...menu, response.data]); // Update UI with new item
      setNewItem({ name: "", description: "", price: "", category: "" }); // Reset form
    } catch (error) {
      console.error("Error adding menu item:", error); // Log the error
      setError("Error adding menu item.");
    }
  };

  // Delete a menu item
  const deleteMenuItem = async (id) => {
    try {
      await axios.delete(`http://localhost:5001/menu/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Add the token in the header
        },
      });
      console.log("Deleted menu item with ID:", id); // Log the deleted item ID
      setMenu(menu.filter(item => item.itemID !== id)); // Update UI
    } catch (error) {
      console.error("Error deleting menu item:", error); // Log the error
      setError("Error deleting menu item.");
    }
  };

  return (
    <div className="d-flex">
      {/* Sidebar */}
      <div className="bg-dark text-white p-4" style={{ minHeight: "100vh", width: "250px" }}>
        <h4 className="mb-4">🍽️ Delicious Deck Admin</h4>
        <ul className="list-unstyled">
          <SidebarItem icon={<FaHome />} text="Dashboard" onClick={() => navigate("/adminpage")} />
          <SidebarItem icon={<FaList />} text="Menu Management" onClick={() => navigate("/menumanagement")} />
        </ul>
      </div>

      {/* Main Content Area */}
      <div className="container-fluid p-4" style={{ flex: 1 }}>
        <h2 className="mb-4">📋 Manage Menu</h2>

        {error && <p className="text-danger">{error}</p>}

        {/* Add New Item Form */}
        <div className="card p-4 mb-4">
          <h4>Add New Item</h4>
          <input
            type="text"
            placeholder="Name"
            value={newItem.name}
            onChange={e => setNewItem({ ...newItem, name: e.target.value })}
            className="form-control mb-2"
          />
          <input
            type="text"
            placeholder="Description"
            value={newItem.description}
            onChange={e => setNewItem({ ...newItem, description: e.target.value })}
            className="form-control mb-2"
          />
          <input
            type="number"
            placeholder="Price"
            value={newItem.price}
            onChange={e => setNewItem({ ...newItem, price: e.target.value })}
            className="form-control mb-2"
          />
          <input
            type="text"
            placeholder="Category"
            value={newItem.category}
            onChange={e => setNewItem({ ...newItem, category: e.target.value })}
            className="form-control mb-2"
          />
          <button onClick={addMenuItem} className="btn btn-primary w-100">
            ➕ Add Item
          </button>
        </div>

        {/* Menu List */}
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="card p-4">
            <h4>Menu Items</h4>
            {menu.length > 0 ? (
              <ul className="list-group">
                {menu.map(item => (
                  <li key={item.itemID} className="list-group-item d-flex justify-content-between align-items-center">
                    <div>
                      <h5>{item.name} (Rs{item.price})</h5>
                      <p className="mb-0">{item.description}</p>
                      <small className="text-muted">{item.category}</small>
                    </div>
                    <button
                      onClick={() => deleteMenuItem(item.itemID)}
                      className="btn btn-danger btn-sm"
                    >
                      ❌ Delete
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No menu items found.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

// Sidebar Item Component
const SidebarItem = ({ icon, text, onClick }) => (
  <li className="cursor-pointer py-2" onClick={onClick} style={{ cursor: "pointer" }}>
    {icon} <span className="ms-2">{text}</span>
  </li>
);

export default MenuManagement;
