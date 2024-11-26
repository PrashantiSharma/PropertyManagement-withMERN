import React, { useState } from 'react';
import axios from 'axios';
import './Register.css';
import AnimatedButton from '../components/AnimatedButton';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    Username: '', // Changed to match MySQL column name
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    try {
      // Send POST request to the backend
      const response = await axios.post('http://localhost:3001/register', {
        Username: formData.Username,
        email: formData.email,
        password: formData.password
      });
      alert(response.data.message); // Success message
    } catch (error) {
      console.error(error);
      alert('Registration failed');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Register</h3>
      <input
        type="text"
        name="Username" // Changed to match MySQL column name
        value={formData.Username}
        onChange={handleChange}
        placeholder="Full Name"
        required
      />
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email"
        required
      />
      <input
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        placeholder="Password"
        required
      />
      <input
        type="password"
        name="confirmPassword"
        value={formData.confirmPassword}
        onChange={handleChange}
        placeholder="Confirm Password"
        required
      />
      <AnimatedButton text="Register" type="SubmitButton" />
    </form>
  );
};

export default RegisterPage;

