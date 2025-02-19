import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Button, Container, Row, Col, Form } from "react-bootstrap";
import axios from "axios"; // Import axios
import "../styles/Menu.css";

const Menu = () => {
  const [menuItems, setMenuItems] = useState([]);  // Changed to array as the response is an array of items
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [sortOption, setSortOption] = useState("default");
  const [cart, setCart] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);  // To handle loading state
  const [error, setError] = useState("");  // To handle errors

  const navigate = useNavigate();

  // Fetch menu items from the backend
  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await axios.get("http://localhost:5001/menu"); // Adjust your backend URL here
        setMenuItems(response.data); // The response is a flat array of items
      } catch (err) {
        setError("Failed to load menu items.");
      } finally {
        setLoading(false);
      }
    };

    fetchMenuItems();
  }, []);

  // Function to get filtered items based on category and search term
  const getFilteredItems = () => {
    let filteredItems = menuItems;  // Start with all items

    // Apply category filter
    if (categoryFilter !== "All") {
      filteredItems = filteredItems.filter(item => item.category === categoryFilter);
    }

    // Apply search term filtering
    if (searchTerm) {
      filteredItems = filteredItems.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return filteredItems;
  };

  const sortedItems = getFilteredItems().sort((a, b) => {
    if (sortOption === "priceLowHigh") return a.price - b.price;
    if (sortOption === "priceHighLow") return b.price - a.price;
    if (sortOption === "name") return a.name.localeCompare(b.name);
    return 0;
  });

  const handleAddToCart = (item) => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
  
    const existingItem = cart.find(cartItem => cartItem.name === item.name);
  
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      const itemWithQuantity = { ...item, quantity: 1 };
      cart.push(itemWithQuantity);
    }
  
    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Item added to cart!");
  };

  if (loading) return <p>Loading...</p>; // Show loading state
  if (error) return <p className="text-danger">{error}</p>; // Show error message

  return (
    <Container className="menucontainer">
      {/* Search, Sorting & Filtering */}
      <div className="navbar">
        <div className="logo"></div>
        <div className="nav-links">
          <button onClick={() => navigate("/mycart")}>My Cart</button>
          <button onClick={() => navigate("/mainpage")}>Home</button>
          <button onClick={() => navigate("/aboutus")}>About Us</button>
          <button onClick={() => navigate("/contactus")}>Contact Us</button>
        </div>
      </div>

      <Container className="menu-container">
        <div className="menu-filters">
          <Form.Control
            type="text"
            placeholder="Search"
            className="custom-search"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="category-buttons">
            <Button variant="outline-secondary" onClick={() => setCategoryFilter("All")}>
              All
            </Button>
            <Button variant="outline-secondary" onClick={() => setCategoryFilter("Appetizers")}>
              Appetizers
            </Button>
            <Button variant="outline-secondary" onClick={() => setCategoryFilter("Maincourse")}>
              Main Course
            </Button>
            <Button variant="outline-secondary" onClick={() => setCategoryFilter("Drinks")}>
              Drinks
            </Button>
            <Button variant="outline-secondary" onClick={() => setCategoryFilter("Desserts")}>
              Desserts
            </Button>
          </div>

          <Form.Select onChange={(e) => setSortOption(e.target.value)}>
            <option value="default">Sort By</option>
            <option value="priceLowHigh">Price: Low to High</option>
            <option value="priceHighLow">Price: High to Low</option>
            <option value="name">Name</option>
          </Form.Select>
        </div>

        <Row>
          {sortedItems.map((item, index) => (
            <Col md={4} key={index} className="mb-4">
              <Card className="menu-card">
                <Card.Body>
                  <Card.Title>{item.name}</Card.Title>
                  <Card.Text>{item.description}</Card.Text>
                  <Card.Text>Price: Rs. {item.price}</Card.Text>
                  <div className="d-flex justify-content-between">
                    <Button variant="primary" onClick={() => handleAddToCart(item)}>
                      Add to Cart
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </Container>
  );
};

export default Menu;
