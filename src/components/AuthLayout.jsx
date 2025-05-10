import React from 'react';
import KahfLogo from '../assets/Kahflogo';

const AuthLayout = ({ children, sidebarText, greeting }) => {
  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* Sidebar (atas di mobile, kiri di desktop) */}
      <div className="w-full md:w-2/3 bg-kahf-green text-white p-8 flex flex-col items-center justify-center text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">{greeting}</h2>
        <p className="text-sm md:text-base max-w-xl">{sidebarText}</p>
      </div>

      {/* Main Content (bawah di mobile, kanan di desktop) */}
      <div className="w-full md:w-1/3 p-6 md:p-8 flex flex-col items-center justify-center">
        <div className="w-full max-w-md">
          <div className="mb-8 flex justify-center">
            <KahfLogo />
          </div>
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
