import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Login from './pages/Login';
import Register from './pages/Register';
import OTP from './pages/OTP';
import Blog from './pages/Blog';
import BlogList from './pages/BlogList'; 
import BlogDetail from './pages/BlogDetail'; 
import ResetPassword from './pages/ResetPassword';
import ForgotPassword from './pages/ForgotPassword';

import ProfileEdit from './pages/ProfileEdit';
import Profile from './pages/Profile'; 

// Import the invoice components
import InvoiceList from './pages/InvoiceList';
import InvoiceDetail from './pages/InvoiceDetail';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/otp" element={<OTP />} />
        
        {/* Blog routes */}
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/list" element={<BlogList />} />
        <Route path="/blog/:id" element={<BlogDetail />} />
        
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        
        {/* Student routes */}
        <Route path="/profile-edit" element={<ProfileEdit />} />
        <Route path="/profile" element={<Profile />} />
        
        {/* Invoice/Payment routes */}
        <Route path="/pembayaran" element={<InvoiceList />} />
        <Route path="/pembayaran/detail/:id" element={<InvoiceDetail />} />
        
        {/* Default route to login */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        
        {/* Catch all route - redirect to login if route not found */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;