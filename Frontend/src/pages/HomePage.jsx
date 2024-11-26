import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import './HomePage.css';
import property1 from './img/6ff49ff281920a122acaa51fdf5ee83c.jpg';
import property2 from './img/apartment-building-what-makes-good-apartment-building-scaled.jpg';
import property3 from './img/Portada.jpg';
import property4 from './img/tjp_1333_4700_5x.jpg';

const HomePage = () => (
  <motion.div 
  className="home-container"
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  exit={{ opacity: 0 }}
  >
    <div className="image-collage">
      <img src={property4} alt="Property 1" />
      <img src={property2} alt="Property 2" />
      <img src={property1} alt="Property 3" />
      <img src={property3} alt="Property 4" />
    </div>
    <div className="text-section">
      <h1>Exploring Property</h1>
      <p>Find the best properties tailored for your needs.</p>
      <Link to="/properties">
        <button className="explore-button">Explore</button>
      </Link>
    </div>
  </motion.div>
);

export default HomePage;

