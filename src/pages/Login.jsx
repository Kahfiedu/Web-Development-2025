import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthLayout from '../components/AuthLayout';
import FormInput from '../components/FormInput';
import SocialButton from '../components/SocialButton';

const Login = () => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add login/validation API logic here if needed
    navigate('/blog');
  };

  return (
    <AuthLayout 
      greeting="Selamat Datang"
      sidebarText="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    >
      <h2 className="text-2xl font-bold mb-6 text-center">Log In</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4 w-full">
        <div>
          <label className="block mb-2 text-sm font-medium">Email<span className="text-red-500">*</span></label>
          <FormInput 
            icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" /><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" /></svg>}
            type="email"
            name="email"
            placeholder="Enter your email"
            required
          />
        </div>
        
        <div>
          <label className="block mb-2 text-sm font-medium">Password<span className="text-red-500">*</span></label>
          <FormInput 
            icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" /></svg>}
            type="password"
            name="password"
            placeholder="Enter your password"
            required
          />
          <div className="flex justify-end mt-1">
            <Link to="/forgot-password" className="text-sm text-gray-600 hover:text-kahf-green">
              forgot password?
            </Link>
          </div>
        </div>
        
        <button 
          type="submit" 
          className="w-full py-3 bg-kahf-green text-white rounded-lg hover:bg-green-700 transition-colors"
        >
          Masuk
        </button>
      </form>
      
      <div className="mt-6 w-full">
        <SocialButton 
          icon={<svg className="w-5 h-5" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>}
          provider="Google"
        />
      </div>
      
      <div className="mt-4 text-sm text-center">
        Belum memiliki akun? <Link to="/register" className="text-kahf-green font-medium">Daftar</Link>
      </div>
    </AuthLayout>
  );
};

export default Login;
