import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Login from './pages/Login';
import Register from './pages/Register';
import OTP from './pages/OTP';
import Blog from './pages/Blog';
import ResetPassword from './pages/ResetPassword';
import ForgotPassword from './pages/ForgotPassword';
import ProfileDetail from './pages/ProfileDetail';
import ProfileEdit from './pages/ProfileEdit';
import Profile from './pages/Profile'; 

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/otp" element={<OTP />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        
        {/* Student routes */}
        <Route path="/profile-detail" element={<ProfileDetail />} />
        <Route path="/profile-edit" element={<ProfileEdit />} />
        <Route path="/profile" element={<Profile />} />
        
        {/* Rute default ke login */}
        <Route path="/" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;