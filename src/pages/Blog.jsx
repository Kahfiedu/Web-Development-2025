import React, { useState } from "react";
import logo from "../assets/logo.png"; // Import logo.png dari folder assets

const Blog = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    { label: "Beranda", href: "/" },
    { label: "Layanan Kami", href: "/services" },
    { label: "Dashboard", href: "/dashboard" },
    { label: "Blog", href: "/blog" },
    { label: "Daftar Sekarang", href: "/register" },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-md p-4 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto flex items-center justify-between pl-0 pr-4">
          {/* Logo */}
          <div className="flex items-start md:ml-[-120px] ml-0 pl-0">
            <div className="w-20 md:w-24">
              <img src={logo} alt="Logo" width={96} height={96} /> {/* Menampilkan logo */}
            </div>
          </div>

          {/* Hamburger Button */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              ></path>
            </svg>
          </button>

          {/* Menu */}
          <div
            className={`${
              isMenuOpen ? "flex" : "hidden"
            } md:flex flex-col md:flex-row justify-center items-center gap-2 md:gap-4 w-full md:w-auto absolute md:static top-16 left-0 bg-white md:bg-transparent p-4 md:p-0 z-20`}
          >
            {menuItems.map((item) => (
             <a
             key={item.label}
             href={item.href}
             className="px-4 py-2 bg-white text-gray-800 border-2 border-gray-300 rounded-full w-full md:w-auto text-sm md:text-base hover:bg-green-600 hover:text-white hover:border-green-600 transition-colors"
           >
             {item.label}
           </a>
           
            
            ))}
          </div>
        </div>
      </header>

      {/* Spacer if menu open on mobile */}
      {isMenuOpen && <div className="h-64 md:hidden"></div>}

      {/* Search Bar */}
      <div className="flex justify-center my-6 px-4">
        <div className="relative w-full max-w-lg">
          <input
            type="text"
            placeholder="Cari"
            className="w-full p-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-green-600"
          />
          <span className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <svg
              className="w-5 h-5 text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              ></path>
            </svg>
          </span>
        </div>
      </div>

      {/* Blog Cards */}
      <div className="flex flex-wrap justify-center gap-6 px-4 mb-8">
        {/* Card 1 - Green with button */}
        <div className="bg-gradient-to-r from-green-700 to-green-500 text-white p-6 rounded-lg shadow-md w-full max-w-sm">
          <h2 className="text-2xl font-bold mb-4 text-center">Lorem</h2>
          <p className="mb-6 text-center">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua.
          </p>
          <div className="flex justify-center">
            <button className="bg-white text-green-600 px-5 py-2 rounded-full flex items-center space-x-2 hover:bg-gray-100">
              <span>Selengkapnya</span>
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5l7 7-7 7"
                ></path>
              </svg>
            </button>
          </div>
        </div>

        {/* Card 2 - White */}
        <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm">
          <h2 className="text-2xl font-bold mb-4 text-center">Lorem</h2>
          <p className="mb-6 text-center">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua.
          </p>
        </div>

        {/* Card 3 - White */}
        <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm">
          <h2 className="text-2xl font-bold mb-4 text-center">Lorem</h2>
          <p className="mb-6 text-center">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua.
          </p>
        </div>
      </div>

      {/* Color Palette */}
      <div className="flex flex-wrap justify-center gap-4 p-4">
        <div className="w-10 h-10 bg-green-700 rounded-sm"></div>
        <div className="w-10 h-10 bg-green-200 rounded-sm"></div>
        <div className="w-10 h-10 bg-green-100 rounded-sm"></div>
        <div className="w-10 h-10 bg-green-50 rounded-sm"></div>
      </div>
    </div>
  );
};

export default Blog;
