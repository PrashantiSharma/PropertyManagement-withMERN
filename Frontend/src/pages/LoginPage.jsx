import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const username = localStorage.getItem('username');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/login', { email, password });
      localStorage.setItem('token', response.data.token);  // Store token
      localStorage.setItem('username', response.data.username);  // Store username
      alert(`Welcome, ${response.data.username}`);
      navigate('/propertylist');  // Redirect to property list
    } catch (err) {
      console.error(err);
      alert('Invalid email or password');
    }
  };
  

  return (
    <div>
       {username && <h3>Hello, {username || "prash"}</h3>}
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      <input 
        type="email" 
        placeholder="Email" 
        value={email} 
        onChange={(e) => setEmail(e.target.value)} 
        required 
      />
      <input 
        type="password" 
        placeholder="Password" 
        value={password} 
        onChange={(e) => setPassword(e.target.value)} 
        required 
      />
      <button type="submit">Login</button>
    </form>
    </div>
  );
};

export default LoginPage;
