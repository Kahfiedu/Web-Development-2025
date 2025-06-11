import React, { useState } from 'react';
import { Filter, X, MoreVertical, ChevronLeft, ChevronRight, Search, Bell, Menu, Home, Users, BookOpen, CreditCard, Settings, ChevronDown, MessageCircle, User, Edit } from 'lucide-react';

import KahfLogo from "../components/Kahflogo";

const BlogList = () => {
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);
  const [filters, setFilters] = useState({
    search: '',
    category: '',
    year: '',
    status: 'Semua'
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeNav, setActiveNav] = useState('Blog');
  const itemsPerPage = 9;

  // Sample blog data
  const blogData = Array.from({ length: 13 }, (_, index) => ({
    id: index + 1,
    title: 'Title',
    date: '03 Mei 2023, oleh Kahfi Edu',
    description: 'Tincidunt Donec ex ac porta enim, efficitur, at odio Sed id dui ac tortor. Ut faucibus placerat non nibh efficitur, eget elit elit sed nisl gravida molestusada ac Lorem vitae non, sapien commodo Nunc Ut eget locus urna. Donec Nam faucibus',
    tags: ['#Education', '#Information'],
    status: index % 3 === 0 ? 'Published' : index % 3 === 1 ? 'Featured' : 'Publish',
    image: `/api/placeholder/300/200`
  }));

  const getStatusColor = (status) => {
    switch (status) {
      case 'Published': return 'bg-green-500 text-white';
      case 'Featured': return 'bg-orange-500 text-white';
      case 'Publish': return 'bg-green-600 text-white';
      default: return 'bg-gray-500 text-white';
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

  const totalPages = Math.ceil(blogData.length / itemsPerPage);
  const currentItems = blogData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const FilterContent = ({ isMobile = false }) => (
    <div className={`${isMobile ? 'h-full' : ''} bg-orange-500 rounded-lg p-4`}>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-white font-bold text-lg">Filter</h3>
        {isMobile && (
          <button
            onClick={() => setFilterDrawerOpen(false)}
            className="text-white hover:bg-orange-600 p-1 rounded"
          >
            <X size={20} />
          </button>
        )}
      </div>
      
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Cari blog"
          value={filters.search}
          onChange={(e) => setFilters({ ...filters, search: e.target.value })}
          className="w-full p-2 rounded border focus:outline-none focus:ring-2 focus:ring-orange-300"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <select
            value={filters.status}
            onChange={(e) => setFilters({ ...filters, status: e.target.value })}
            className="w-full p-2 rounded border focus:outline-none focus:ring-2 focus:ring-orange-300"
          >
            <option value="Semua">Semua</option>
            <option value="Published">Published</option>
            <option value="Featured">Featured</option>
            <option value="Publish">Publish</option>
          </select>
          
          <select
            value={filters.year}
            onChange={(e) => setFilters({ ...filters, year: e.target.value })}
            className="w-full p-2 rounded border focus:outline-none focus:ring-2 focus:ring-orange-300"
          >
            <option value="">Tahun</option>
            <option value="2023">2023</option>
            <option value="2024">2024</option>
            <option value="2025">2025</option>
          </select>
        </div>

        <button
          onClick={() => setFilters({ search: '', category: '', year: '', status: 'Semua' })}
          className="w-full py-2 px-4 border border-white text-white rounded hover:bg-white hover:text-orange-500 transition-colors"
        >
          Reset Filter
        </button>

        <button className="w-full py-2 px-4 bg-green-500 text-white rounded hover:bg-green-600 transition-colors flex items-center justify-center gap-2">
          <Filter size={16} />
          Tambah
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navbar - Synced from BlogDetail */}
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
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Blog - Data Blog</h1>
          <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors">
            Daftar Blog
          </button>
        </div>

        <div className="flex gap-6">
          {/* Desktop Filter Sidebar */}
          <div className="hidden lg:block w-80 flex-shrink-0">
            <div className="sticky top-6">
              <FilterContent />
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Mobile Filter Button */}
            <div className="lg:hidden mb-4">
              <button
                onClick={() => setFilterDrawerOpen(true)}
                className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition-colors flex items-center gap-2"
              >
                <Filter size={16} />
                Filter
              </button>
            </div>

            {/* Blog Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
              {currentItems.map((blog) => (
                <div 
                  key={blog.id} 
                  className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden"
                >
                  <div className="relative">
                    <img
                      src={`https://via.placeholder.com/300x200/4caf50/ffffff?text=Blog+${blog.id}`}
                      alt={blog.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-2 left-2 flex gap-2">
                      <span className={`px-2 py-1 rounded text-xs font-semibold ${getStatusColor(blog.status)}`}>
                        {blog.status}
                      </span>
                    </div>
                    <button className="absolute top-2 right-2 bg-white p-1 rounded shadow hover:bg-gray-50">
                      <MoreVertical size={16} />
                    </button>
                  </div>
                  
                  <div className="p-4">
                    <h3 className="font-bold text-lg mb-2">{blog.title}</h3>
                    <p className="text-gray-500 text-sm mb-3">{blog.date}</p>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3 leading-relaxed">
                      {blog.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {blog.tags.map((tag, index) => (
                        <span 
                          key={index} 
                          className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded border"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex flex-col items-center space-y-4">
              <p className="text-sm text-gray-600">
                Rows per page: {itemsPerPage} | {((currentPage - 1) * itemsPerPage) + 1} - {Math.min(currentPage * itemsPerPage, blogData.length)} of {blogData.length}
              </p>
              
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                  className="p-2 rounded border disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                >
                  <ChevronLeft size={16} />
                </button>
                
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-3 py-1 rounded border ${
                      currentPage === page 
                        ? 'bg-blue-500 text-white border-blue-500' 
                        : 'hover:bg-gray-50'
                    }`}
                  >
                    {page}
                  </button>
                ))}
                
                <button
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages}
                  className="p-2 rounded border disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Filter Drawer */}
        {filterDrawerOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <div className="absolute inset-0 bg-black bg-opacity-50" onClick={() => setFilterDrawerOpen(false)} />
            <div className="absolute left-0 top-0 h-full w-80 max-w-sm">
              <FilterContent isMobile={true} />
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="bg-green-500 text-white text-center py-4 mt-8 rounded-lg">
          <p className="text-sm">
            Copyright © 2025 Kahfi Education, All rights Reserved | Bug report to Phone: +6289987167784
          </p>
        </div>
      </div>

      <style jsx>{`
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default BlogList;