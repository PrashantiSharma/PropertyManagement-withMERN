import React from 'react';
import { motion } from 'framer-motion';
import '../styles/variables.css'
const AnimatedButton = ({ text, onClick }) => (
  <motion.button 
    className="animated-button"
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.9 }}
    onClick={onClick}
  >
    {text}
  </motion.button>
);

export default AnimatedButton;
