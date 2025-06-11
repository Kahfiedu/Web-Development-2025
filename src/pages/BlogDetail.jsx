import React, { useState } from 'react';
import { ArrowLeft, Edit, Trash2, Calendar, Tag, User, Clock, Search, Bell, Menu, Home, Users, BookOpen, CreditCard, Settings, ChevronDown, MessageCircle } from 'lucide-react';

import KahfLogo from "../components/Kahflogo";

const BlogDetail = () => {
  const [blogData] = useState({
    id: 1,
    title: 'Title',
    date: '03 Mei 2023, oleh Kahfi Edu',
    status: 'Publish',
    image: 'https://via.placeholder.com/400x300/4caf50/ffffff?text=Blog+Image',
    basicInfo: {
      judul: 'Title',
      slug: 'title'
    },
    description: `Tincidunt Donec ex ac porta enim, efficitur, at odio Sed id dui ac tortor. Ut faucibus placerat non nibh efficitur, eget elit elit sed nisl gravida molestusada ac Lorem vitae non, sapien commodo Nunc Ut eget locus urna. Donec Nam faucibus. Tincidunt Donec ex ac porta enim, efficitur, at odio Sed id dui ac tortor. Ut faucibus placerat non nibh efficitur, eget elit elit sed nisl gravida molestusada ac Lorem vitae non, sapien commodo Nunc Ut eget locus urna. Donec Nam faucibus. Tincidunt Donec ex ac porta enim, efficitur, at odio Sed id dui ac tortor. Ut faucibus placerat non nibh efficitur, eget elit elit sed nisl gravida molestusada ac Lorem vitae non, sapien commodo Nunc Ut eget locus urna. Donec Nam faucibus. Tincidunt Donec ex ac porta enim, efficitur, at odio Sed id dui ac tortor. Ut faucibus placerat non nibh efficitur, eget elit elit sed nisl gravida molestusada ac Lorem vitae non, sapien commodo Nunc Ut eget locus urna. Donec Nam faucibus. Tincidunt Donec ex ac porta enim, efficitur, at odio Sed id dui ac tortor. Ut faucibus placerat non nibh efficitur, eget elit elit sed nisl gravida molestusada ac Lorem vitae non, sapien commodo Nunc Ut eget locus urna. Donec Nam faucibus.`,
    statusInfo: {
      status: 'Featured',
      publish: 'Active'
    },
    dateInfo: {
      createdDate: '3/3/2023',
      updateDate: '12/6/2023',
      deleteDate: '6/7/2023'
    },
    tags: ['#Education', '#Information']
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [activeNav, setActiveNav] = useState('Blog');

  const getStatusColor = (status) => {
    switch (status) {
      case 'Publish': return 'bg-green-500 text-white';
      case 'Featured': return 'bg-orange-500 text-white';
      case 'Draft': return 'bg-gray-500 text-white';
      default: return 'bg-blue-500 text-white';
    }
  };

  const getPublishColor = (publish) => {
    switch (publish) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Inactive': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const navItems = [
    { name: 'Dashboard', icon: Home, active: false },
    { name: 'Pengguna', icon: Users, active: false },
    { name: 'Kelas', icon: BookOpen, active: false },
    { name: 'Kelas', icon: BookOpen, active: false },
    { name: 'Blog', icon: Edit, active: true },
    { name: 'Pembayaran', icon: CreditCard, active: false },
    { name: 'Setting', icon: Settings, active: false, dropdown: true }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navbar */}
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="w-full px-6">
          <div className="flex items-center justify-between h-16">
            {/* Left side - Logo only */}
            <div className="flex items-center">
              <KahfLogo />
            </div>

            {/* Center - Search Bar */}
            <div className="flex-1 flex justify-center">
              <div className="w-full max-w-md relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Searching"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="block w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500 transition-colors"
                />
              </div>
            </div>

            {/* Right side - Notifications, Messages and Profile */}
            <div className="flex items-center space-x-3">
              <button className="relative p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                <MessageCircle className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-blue-500 rounded-full"></span>
              </button>
              <button className="relative p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                <User className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Navigation Menu */}
        <div className="border-t border-gray-100 bg-gray-50">
          <div className="w-full px-6">
            <div className="flex items-center justify-center space-x-2 py-3">
              {navItems.map((item, index) => (
                <div key={index} className="relative">
                  <button
                    onClick={() => setActiveNav(item.name)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      item.active || activeNav === item.name
                        ? 'bg-green-500 text-white shadow-sm'
                        : 'text-gray-600 hover:text-gray-800 hover:bg-white hover:shadow-sm'
                    }`}
                  >
                    <item.icon className="w-4 h-4" />
                    <span>{item.name}</span>
                    {item.dropdown && <ChevronDown className="w-3 h-3 ml-1" />}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-full mx-auto px-6 py-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <button className="flex items-center gap-2 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors shadow-sm">
            <ArrowLeft size={16} />
            Back
          </button>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors shadow-sm">
              <Edit size={16} />
              Edit
            </button>
            <button className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors shadow-sm">
              <Trash2 size={16} />
              Delete
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Image and Basic Info */}
          <div className="lg:col-span-1 space-y-6">
            {/* Image Section */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold text-gray-800">Image</h3>
                <span className={`px-2 py-1 rounded text-xs font-semibold ${getStatusColor(blogData.status)}`}>
                  {blogData.status}
                </span>
              </div>
              <div className="relative">
                <img
                  src={blogData.image}
                  alt="Blog"
                  className="w-full h-48 object-cover rounded-lg"
                />
              </div>
            </div>

            {/* Basic Information */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <h3 className="font-semibold text-gray-800 mb-4">Basic Information</h3>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Judul</label>
                  <input
                    type="text"
                    value={blogData.basicInfo.judul}
                    readOnly
                    className="w-full p-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-700"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Slug</label>
                  <input
                    type="text"
                    value={blogData.basicInfo.slug}
                    readOnly
                    className="w-full p-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-700"
                  />
                </div>
              </div>
            </div>

            {/* Status Information */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <h3 className="font-semibold text-gray-800 mb-4">Status Information</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-600">Status</span>
                  <span className={`px-2 py-1 rounded text-xs font-semibold ${getStatusColor(blogData.statusInfo.status)}`}>
                    {blogData.statusInfo.status}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-600">Publish</span>
                  <span className={`px-2 py-1 rounded text-xs font-semibold ${getPublishColor(blogData.statusInfo.publish)}`}>
                    {blogData.statusInfo.publish}
                  </span>
                </div>
              </div>
            </div>

            {/* Date Information */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <h3 className="font-semibold text-gray-800 mb-4">Date Information</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-600 flex items-center gap-2">
                    <Calendar size={14} />
                    Created Date
                  </span>
                  <span className="text-sm text-gray-700">{blogData.dateInfo.createdDate}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-600 flex items-center gap-2">
                    <Clock size={14} />
                    Update Date
                  </span>
                  <span className="text-sm text-gray-700">{blogData.dateInfo.updateDate}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-600 flex items-center gap-2">
                    <Trash2 size={14} />
                    Delete Date
                  </span>
                  <span className="text-sm text-gray-700">{blogData.dateInfo.deleteDate}</span>
                </div>
              </div>
            </div>

            {/* Tags Information */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <Tag size={16} />
                Tags Information
              </h3>
              <div className="space-y-2">
                <span className="block text-sm font-medium text-gray-600">Tags</span>
                <div className="flex flex-wrap gap-2">
                  {blogData.tags.map((tag, index) => (
                    <span 
                      key={index} 
                      className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded border"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              {/* Blog Header */}
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h1 className="text-2xl font-bold text-gray-800 mb-2">{blogData.title}</h1>
                    <div className="flex items-center text-sm text-gray-600 gap-4">
                      <span className="flex items-center gap-1">
                        <Calendar size={14} />
                        {blogData.date}
                      </span>
                    </div>
                  </div>
                  <div className="ml-4">
                    <img
                      src={blogData.image}
                      alt="Blog preview"
                      className="w-32 h-24 object-cover rounded-lg shadow-sm"
                    />
                  </div>
                </div>
              </div>

              {/* Blog Content */}
              <div className="p-6">
                <h3 className="font-semibold text-gray-800 mb-4">Description</h3>
                <div className="prose prose-gray max-w-none">
                  <p className="text-gray-700 leading-relaxed text-justify">
                    {blogData.description}
                  </p>
                </div>

                {/* Tags at bottom */}
                <div className="mt-6 pt-4 border-t border-gray-200">
                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                    <Tag size={14} />
                    <span className="font-medium">Tags:</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {blogData.tags.map((tag, index) => (
                      <span 
                        key={index} 
                        className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full border hover:bg-gray-200 transition-colors"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-green-500 text-white text-center py-4 mt-8 rounded-lg">
          <p className="text-sm">
            Copyright © 2025 Kahfi Education, All rights Reserved | Bug report to Phone: +6289987167784
          </p>
        </div>
      </div>
    </div>
  );
};

export default BlogDetail;