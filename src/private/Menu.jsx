import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Menu.css';

const Menu = () => {
  const navigate = useNavigate();

  const menuItems = {
    appetizers: [
      { name: 'Aloo Sadeko', description: 'Spiced boiled potatoes mixed with mustard oil, chili, and Nepali herbs.', price: 70 },
      { name: 'Bhakka', description: 'Steamed rice flour dumplings from Eastern Nepal, served with tomato achar.', price: 100 },
      { name: 'Chukauni', description: 'Potato and yogurt-based dish from Western Nepal with a tangy and spicy kick.', price: 120 },
      { name: 'Mushroom Choila', description: 'Grilled and spiced mushrooms, a Newari-style dish.', price: 180 },
      { name: 'Bhatmas Sadeko', description: 'Crispy soybeans tossed in mustard oil, onion, and Nepali spices.', price: 130 },
      { name: 'Gundruk Sadeko', description: 'Fermented leafy greens mixed with onions, chili, and a tangy dressing.', price: 150 },
      { name: 'Pani Puri', description: 'Nepali-style spicy and tangy water-filled crispy puris.', price: 90 },
      { name: 'Chatpate', description: 'Street-style spicy puffed rice mix with potatoes, lemon, and secret spices.', price: 60 },
      { name: 'Wai Wai Sadeko', description: 'Crunchy instant noodles mixed with onion, lemon, spices, and achar.', price: 80 },
      { name: 'Aloo Nimki', description: 'Crispy flour crackers served with spiced potato mix.', price: 100 },
      { name: 'Aloo Chop', description: 'Deep-fried mashed potato cutlets with a spiced filling.', price: 120 },
      { name: 'Malpuwa', description: 'Traditional sweet fried pancakes, slightly crispy outside and soft inside.', price: 160 },
      { name: 'Furaula', description: 'Deep-fried lentil fritters, crunchy and flavorful, served with chutney.', price: 120 },
      { name: 'Badam Sadeko', description: 'Spiced peanuts mixed with mustard oil, chili, and herbs for a crunchy, tangy appetizer.', price: 130 },
      { name: 'Bara', description: 'Newari-style savory lentil pancakes, crispy outside and soft inside.', price: 140 },
      { name: 'Makai Sadeko', description: 'Roasted corn tossed with mustard oil, chili, and fresh Nepali herbs.', price: 100 },
      { name: 'Aloo Dum', description: 'Spicy baby potatoes in a rich, tangy tomato-based gravy.', price: 150 },
    ],
    mainCourse: [
      { name: 'Khana Set', description: 'A complete meal with rice, seasonal vegetables, paneer curry, spinach, dal, and pickles.', price: 350 },
      { name: 'Dhido Set', description: 'A traditional Nepali dish with dhido (buckwheat) served with seasonal vegetables, paneer curry, spinach, dal, and pickles.', price: 380 },
      { name: 'Roti Set', description: 'A hearty set with roti, seasonal vegetables, paneer curry, spinach, dal, and pickles.', price: 330 },
      { name: 'Momo', description: 'Nepali-style dumplings filled with a variety of fillings like vegetables or paneer.', price: 150 },
      { name: 'Thukpa', description: 'A delicious soup-based noodle dish with vegetables and spices.', price: 220 },
      { name: 'Relduk', description: 'A traditional Nepali noodle dish with vegetables and a spicy broth.', price: 250 },
    ],
    drinks: [
      { name: 'Lassi', description: 'A refreshing yogurt drink served sweet or salty.', price: 120 },
      { name: 'Masala Chiya', description: 'Traditional spiced tea made with milk, sugar, and a mix of spices.', price: 80 },
      { name: 'Lemonade', description: 'A tangy, sweet drink made with lemon, water, and sugar.', price: 90 },
      { name: 'Sattu Sharbat', description: 'A nutritious drink made from roasted gram flour, sugar, and spices.', price: 110 },
      { name: 'Sugarcane Juice', description: 'Freshly pressed sugarcane juice served chilled.', price: 120 },
      { name: 'Coconut Water', description: 'Fresh coconut water served directly from the coconut.', price: 100 },
    ],
    desserts: [
      { name: 'Yomari', description: 'A traditional steamed dumpling filled with jaggery and sesame or coconut.', price: 150 },
      { name: 'Puwa', description: 'Deep-fried rice flour-based sweet dish, typically served with ghee.', price: 120 },
      { name: 'Halwa', description: 'A sweet dish made from grated carrots, milk, sugar, and ghee.', price: 160 },
      { name: 'Kheer', description: 'Rice pudding made with milk and sugar, flavored with cardamom.', price: 130 },
      { name: 'Juju Dhau', description: 'Nepali-style yogurt, creamy and served in clay pots.', price: 180 },
      { name: 'Kasar', description: 'A sweet Nepali dessert made from rice flour, sugar, and ghee.', price: 140 },
      { name: 'Lakhamari', description: 'A sweet, crunchy treat made from flour, sugar, and ghee, popular in the Newar community.', price: 100 },
      { name: 'Jeri Suwari', description: 'Crispy fried sweet dough, often made with sugar and flavored with cardamom and fennel.', price: 120 },
      { name: 'Kuwa', description: 'Sweetened, syrup-soaked dough, typically fried and served as a dessert.', price: 110 },
      { name: 'Tilauri', description: 'Sesame seed-based sweet, coated in sugar syrup, often enjoyed during festivals.', price: 90 },
    ]
  };

  const handleAddToCart = (item) => {
    alert(`${item.name} added to cart!`);
  };

  const handleAddToFavorites = (item) => {
    alert(`${item.name} added to favorites!`);
  };

  return (
    <div className="menu-page">
      <div className="navbar">
        <div className="logo"></div>
        <div className="nav-links">
          <button onClick={() => navigate("/mainpage")}>Home</button>
          <button onClick={() => navigate("/aboutus")}>About Us</button>
          <button onClick={() => navigate("/contactus")}>Contact Us</button>
        </div>
      </div>

      <main>
        <h1>Delicious Deck Menu</h1>

        {/* Appetizers Section */}
        <section className="category">
          <h2>Appetizers & Starters</h2>
          <div className="menu-items">
            {menuItems.appetizers.map((item, index) => (
              <div className="menu-item" key={index}>
                <h3>{item.name}</h3>
                <p className="description">{item.description}</p>
                <p className="price">Rs. {item.price}</p>
                <button className="add-to-cart" onClick={() => handleAddToCart(item)}>Add to Cart</button>
                <button className="add-to-favorites" onClick={() => handleAddToFavorites(item)}>Add to Favorites</button>
              </div>
            ))}
          </div>
        </section>

        {/* Main Course Section */}
        <section className="category">
          <h2>Main Course</h2>
          <div className="menu-items">
            {menuItems.mainCourse.map((item, index) => (
              <div className="menu-item" key={index}>
                <h3>{item.name}</h3>
                <p className="description">{item.description}</p>
                <p className="price">Rs. {item.price}</p>
                <button className="add-to-cart" onClick={() => handleAddToCart(item)}>Add to Cart</button>
                <button className="add-to-favorites" onClick={() => handleAddToFavorites(item)}>Add to Favorites</button>
              </div>
            ))}
          </div>
        </section>

        {/* Drinks Section */}
        <section className="category">
          <h2>Drinks</h2>
          <div className="menu-items">
            {menuItems.drinks.map((item, index) => (
              <div className="menu-item" key={index}>
                <h3>{item.name}</h3>
                <p className="description">{item.description}</p>
                <p className="price">Rs. {item.price}</p>
                <button className="add-to-cart" onClick={() => handleAddToCart(item)}>Add to Cart</button>
                <button className="add-to-favorites" onClick={() => handleAddToFavorites(item)}>Add to Favorites</button>
              </div>
            ))}
          </div>
        </section>

        {/* Desserts Section */}
        <section className="category">
          <h2>Desserts</h2>
          <div className="menu-items">
            {menuItems.desserts.map((item, index) => (
              <div className="menu-item" key={index}>
                <h3>{item.name}</h3>
                <p className="description">{item.description}</p>
                <p className="price">Rs. {item.price}</p>
                <button className="add-to-cart" onClick={() => handleAddToCart(item)}>Add to Cart</button>
                <button className="add-to-favorites" onClick={() => handleAddToFavorites(item)}>Add to Favorites</button>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Menu;
