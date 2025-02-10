
import '../styles/Menu.css';import React from 'react';
import { useNavigate } from 'react-router-dom';


const Menu = () => {
  const navigate = useNavigate();

  const menuItems = [
    { name: 'Aloo Sadeko', description: 'Spiced boiled potatoes with Nepali herbs.', price: 'Rs. 200', image: 'path_to_image/aloo_sadeko.jpg' },
    // More items here
  ];

  return (
    <div className="menu">
      {menuItems.map((item, index) => (
        <div className="menu-item" key={index}>
          <div className="image-wrapper">
            <img src={item.image} alt={item.name} className="food-image" />
          </div>
          <div className="item-info">
            <h3>{item.name}</h3>
            <p>{item.description}</p>
            <span className="price">{item.price}</span>
            <div className="actions">
              <button onClick={() => console.log(`${item.name} added to cart!`)}>Add to Cart</button>
              <button className="favorite" onClick={() => console.log(`${item.name} added to favorites!`)}>Add to Favorites</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Menu;
