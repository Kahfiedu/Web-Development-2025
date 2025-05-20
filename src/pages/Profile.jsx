import React from "react";
import { Link, useNavigate } from "react-router-dom";
import KahfLogo from "../components/Kahflogo";
import { FiBell, FiUser } from "react-icons/fi";
import { MdOutlineEmail, MdOutlineSchool, MdOutlineClass, MdLocationOn } from "react-icons/md";

const Profile = () => {
  const navigate = useNavigate();
  
  const userData = {
    name: "John Bee",
    program: "Program Tahfidz",
    class: "Kelas 2",
    location: "Bali, Indonesia",
    email: "john@gmail.com"
  };

  const messages = [
    {
      sender: "Kahfi Edu",
      subject: "Briefing pertemuan pertama",
      day: "Today",
      time: "10:40"
    },
    {
      sender: "Kahfi Edu",
      subject: "Virtual meeting jilid 1, dan jilid 2",
      day: "Fri",
      time: "09:00"
    },
    {
      sender: "Kahfi Edu",
      subject: "Zoom meeting orang tua",
      day: "Thu",
      time: "12:30"
    }
  ];

  const handleViewDetail = () => {
    navigate("/profile-detail");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Header */}
      <header className="bg-white flex justify-between items-center p-4 border-b shadow-sm">
        <div className="flex items-center gap-4">
          <button className="text-2xl p-2">≡</button>
          <div className="w-24">
            <KahfLogo />
          </div>
        </div>
        <div className="flex gap-4 items-center">
          <div className="relative">
            <input
              type="text"
              placeholder="Cari"
              className="border rounded-full px-4 py-1 text-sm w-48"
            />
            <button className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>
          <FiBell className="text-2xl" />
          <Link to="/profile">
            <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
              <FiUser className="text-lg" />
            </div>
          </Link>
        </div>
      </header>

      {/* Hero Banner - Gradient background */}
      <div className="h-60 bg-gradient-to-r from-blue-400 to-green-300"></div>

      {/* Main Content */}
      <div className="container mx-auto px-4 -mt-20">
        <div className="max-w-4xl mx-auto">
          {/* Side by side layout */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Profile Section - Takes 1/3 of the space */}
            <div className="md:col-span-1 flex flex-col items-center">
              {/* Profile Image */}
              <div className="mb-4">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/4333/4333609.png"
                  alt="Profile"
                  className="w-36 h-36 rounded-full bg-blue-100 border-4 border-white"
                />
              </div>
              
              {/* Profile Info */}
              <h1 className="text-3xl font-bold text-center mb-2">{userData.name}</h1>
              
              <div className="flex flex-col items-center space-y-1 mb-4 text-gray-700">
                <div className="flex items-center gap-2">
                  <MdOutlineSchool />
                  <span>{userData.program}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MdOutlineClass />
                  <span>{userData.class}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MdLocationOn />
                  <span>{userData.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MdOutlineEmail />
                  <span>{userData.email}</span>
                </div>
              </div>
              
              {/* View Detail Button */}
              <button
                onClick={handleViewDetail}
                className="border border-black rounded-full px-6 py-2 text-sm hover:bg-gray-50"
                >
                 view detail
                </button>

            </div>

            {/* Inbox Section - Takes 2/3 of the space */}
            <div className="md:col-span-2 bg-white rounded-lg overflow-hidden shadow-sm mb-8">
              <div className="px-6 py-3 border-b font-semibold">Inbox</div>
              <div>
                {messages.map((message, index) => (
                  <div 
                    key={index} 
                    className="border-b last:border-b-0 py-4 px-6 hover:bg-gray-50 cursor-pointer"
                    onClick={() => console.log("Message clicked:", message.subject)}
                  >
                    <div className="flex justify-between">
                      <div>
                        <h3 className="font-medium">{message.sender}</h3>
                        <p className="text-green-600">{message.subject}</p>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">{message.day}</div>
                        <div className="text-gray-600">{message.time}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-green-100 text-center py-4 text-sm text-gray-700 mt-auto">
        Copyright © 2025 Kahfi Education, All rights Reserved | Bug report to Phone: +6288987167784
      </footer>
    </div>
  );
};

export default Profile;