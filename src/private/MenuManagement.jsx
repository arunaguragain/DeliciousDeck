import React, { useState, useEffect } from "react";
import axios from "axios";

const MenuManagement = () => {
  const [menu, setMenu] = useState([]);
  const [newItem, setNewItem] = useState({ name: "", price: "", category: "" });

  // Fetch menu items
  useEffect(() => {
    axios.get("http://localhost:5000/menu")
      .then(response => setMenu(response.data))
      .catch(error => console.error("Error fetching menu:", error));
  }, []);

  // Add a new menu item
  const addMenuItem = () => {
    axios.post("http://localhost:5000/menu", newItem)
      .then(() => {
        setMenu([...menu, newItem]); // Update UI
        setNewItem({ name: "", price: "", category: "" }); // Reset form
      })
      .catch(error => console.error("Error adding item:", error));
  };

  // Delete a menu item
  const deleteMenuItem = (id) => {
    axios.delete(`http://localhost:5000/menu/${id}`)
      .then(() => setMenu(menu.filter(item => item.id !== id)))
      .catch(error => console.error("Error deleting item:", error));
  };

  return (
    <div>
      <h2>📋 Manage Menu</h2>

      <div>
        <input type="text" placeholder="Name" value={newItem.name} onChange={e => setNewItem({ ...newItem, name: e.target.value })} />
        <input type="text" placeholder="Price" value={newItem.price} onChange={e => setNewItem({ ...newItem, price: e.target.value })} />
        <input type="text" placeholder="Category" value={newItem.category} onChange={e => setNewItem({ ...newItem, category: e.target.value })} />
        <button onClick={addMenuItem}>Add Item</button>
      </div>

      <ul>
        {menu.map(item => (
          <li key={item.id}>
            {item.name} - ${item.price} ({item.category}) 
            <button onClick={() => deleteMenuItem(item.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MenuManagement;
