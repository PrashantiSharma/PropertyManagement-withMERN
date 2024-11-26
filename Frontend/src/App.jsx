import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import PropertyListPage from './pages/PropertyListPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Services from './pages/Services';
import ToastNotification from './components/ToastNotification';
import './styles/global.css';

const App = () => {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <ToastNotification />
        <main className="content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/properties" element={<PropertyListPage />} />
            <Route path="/services" element={<Services />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
