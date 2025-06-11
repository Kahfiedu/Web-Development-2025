import React, { useState } from 'react';
import { Search, Download, FileSpreadsheet, Home, Users, Puzzle, GraduationCap, FileText, Settings, Bell, User, Edit, Trash2, ChevronRight, MoreHorizontal, MessageCircle, List } from 'lucide-react';
import KahfLogo from '../components/Kahflogo';

const InvoiceList = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [showUserMenu, setShowUserMenu] = useState(false);

  // Mock data based on the screenshot
  const paymentData = [
    {
      id: 1,
      invoice: '#P060525A1',
      issued: 'Jhone Doe',
      paymentMethod: 'Payment Method: Transfer',
      class: 'Mengaji - Kelas A',
      status: 'Disetujui',
      date: '06 Feb 2025',
      total: 'Rp. 150.000'
    },
    {
      id: 2,
      invoice: '#P060525A1',
      issued: 'Jhone Doe',
      paymentMethod: 'Payment Method: Transfer',
      class: 'Mengaji - Kelas A',
      status: 'Disetujui',
      date: '06 Feb 2025',
      total: 'Rp. 150.000'
    },
    {
      id: 3,
      invoice: '#P060525A1',
      issued: 'Jhone Doe',
      paymentMethod: 'Payment Method: Transfer',
      class: 'Mengaji - Kelas A',
      status: 'Diproses',
      date: '06 Feb 2025',
      total: 'Rp. 150.000'
    },
    {
      id: 4,
      invoice: '#P060525A1',
      issued: 'Jhone Doe',
      paymentMethod: 'Payment Method: Transfer',
      class: 'Mengaji - Kelas A',
      status: 'Disetujui',
      date: '06 Feb 2025',
      total: 'Rp. 150.000'
    },
    {
      id: 5,
      invoice: '#P060525A1',
      issued: 'Jhone Doe',
      paymentMethod: 'Payment Method: Transfer',
      class: 'Mengaji - Kelas A',
      status: 'Disetujui',
      date: '06 Feb 2025',
      total: 'Rp. 150.000'
    },
    {
      id: 6,
      invoice: '#P060525A1',
      issued: 'Jhone Doe',
      paymentMethod: 'Payment Method: Transfer',
      class: 'Mengaji - Kelas A',
      status: 'Disetujui',
      date: '06 Feb 2025',
      total: 'Rp. 150.000'
    },
    {
      id: 7,
      invoice: '#P060525A1',
      issued: 'Jhone Doe',
      paymentMethod: 'Payment Method: Transfer',
      class: 'Mengaji - Kelas A',
      status: 'Disetujui',
      date: '06 Feb 2025',
      total: 'Rp. 150.000'
    },
    {
      id: 8,
      invoice: '#P060525A1',
      issued: 'Jhone Doe',
      paymentMethod: 'Payment Method: Transfer',
      class: 'Mengaji - Kelas A',
      status: 'Ditolak',
      date: '06 Feb 2025',
      total: 'Rp. 150.000'
    },
    {
      id: 9,
      invoice: '#P060525A1',
      issued: 'Jhone Doe',
      paymentMethod: 'Payment Method: Transfer',
      class: 'Mengaji - Kelas A',
      status: 'Disetujui',
      date: '06 Feb 2025',
      total: 'Rp. 150.000'
    },
    {
      id: 10,
      invoice: '#P060525A1',
      issued: 'Jhone Doe',
      paymentMethod: 'Payment Method: Transfer',
      class: 'Mengaji - Kelas A',
      status: 'Disetujui',
      date: '06 Feb 2025',
      total: 'Rp. 150.000'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Disetujui':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'Diproses':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'Ditolak':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const filteredData = paymentData.filter(item =>
    item.issued.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.invoice.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paginatedData = filteredData.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  // Calculate statistics
  const approvedCount = paymentData.filter(item => item.status === 'Disetujui').length;
  const processedCount = paymentData.filter(item => item.status === 'Diproses').length;
  const rejectedCount = paymentData.filter(item => item.status === 'Ditolak').length;

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-4">
              <KahfLogo />
              <div className="flex items-center space-x-2 ml-4">
                <button className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors">
                  <List className="h-5 w-5" />
                </button>
                <button className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors">
                  <MessageCircle className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Search Bar */}
            <div className="flex-1 max-w-md mx-8">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Searching"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
            </div>

            {/* User Actions */}
            <div className="flex items-center space-x-4">
              <button className="relative p-2 text-gray-600 hover:text-gray-800">
                <Bell className="h-6 w-6" />
                <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">4</span>
              </button>
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="p-2 text-gray-600 hover:text-gray-800"
                >
                  <User className="h-6 w-6" />
                </button>
                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Profile</a>
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Settings</a>
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Logout</a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white border-b">
        <div className="px-6">
          <div className="flex space-x-8">
            <button className="flex items-center space-x-2 px-4 py-4 text-gray-600 hover:text-gray-800 border-b-2 border-transparent hover:border-green-500">
              <Home className="h-5 w-5" />
              <span>Dashboard</span>
            </button>
            <button className="flex items-center space-x-2 px-4 py-4 text-gray-600 hover:text-gray-800 border-b-2 border-transparent hover:border-green-500">
              <Users className="h-5 w-5" />
              <span>Pengguna</span>
            </button>
            <button className="flex items-center space-x-2 px-4 py-4 text-gray-600 hover:text-gray-800 border-b-2 border-transparent hover:border-green-500">
              <Puzzle className="h-5 w-5" />
              <span>Program</span>
            </button>
            <button className="flex items-center space-x-2 px-4 py-4 text-gray-600 hover:text-gray-800 border-b-2 border-transparent hover:border-green-500">
              <GraduationCap className="h-5 w-5" />
              <span>Kelas</span>
            </button>
            <button className="flex items-center space-x-2 px-4 py-4 text-gray-600 hover:text-gray-800 border-b-2 border-transparent hover:border-green-500">
              <FileText className="h-5 w-5" />
              <span>Blog</span>
            </button>
            <button className="flex items-center space-x-2 px-4 py-4 text-gray-600 hover:text-gray-800 border-b-2 border-transparent hover:border-green-500">
              <Settings className="h-5 w-5" />
              <span>Setting</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="px-6 py-6">
        {/* Breadcrumbs */}
        <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-6">
          <Home className="h-4 w-4" />
          <span>Pembayaran</span>
          <ChevronRight className="h-4 w-4" />
          <span className="text-gray-900">Data Pembayaran</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-sm">
              {/* Header */}
              <div className="p-6 border-b">
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="text-xl font-bold text-gray-900 mb-1">Data Pembayaran</h1>
                    <p className="text-sm text-gray-600">Export Data pembayaran ke CSV Excel</p>
                  </div>
                  <div className="flex space-x-3">
                    <button className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                      <Download className="h-4 w-4" />
                      <span>Export</span>
                    </button>
                    <button className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                      <FileSpreadsheet className="h-4 w-4" />
                      <span>Excel</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Search */}
              <div className="p-6 border-b">
                <div className="flex items-center justify-between">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Cari nama pengguna"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                    <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                  </div>
                </div>
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">#</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Invoice</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Issued</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kelas</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tanggal</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {paginatedData.map((row, index) => (
                      <tr key={row.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {page * rowsPerPage + index + 1}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {row.invoice}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900">{row.issued}</div>
                            <div className="text-sm text-gray-500">{row.paymentMethod}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {row.class}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full border ${getStatusColor(row.status)}`}>
                            {row.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {row.date}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {row.total}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <div className="flex space-x-2">
                            <button className="text-orange-600 hover:text-orange-800">
                              <Edit className="h-4 w-4" />
                            </button>
                            <button className="text-red-600 hover:text-red-800">
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div className="px-6 py-4 border-t">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-700">
                    Showing {page * rowsPerPage + 1} to {Math.min((page + 1) * rowsPerPage, filteredData.length)} of {filteredData.length} results
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setPage(Math.max(0, page - 1))}
                      disabled={page === 0}
                      className="px-3 py-1 border border-gray-300 rounded-md text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                    >
                      Previous
                    </button>
                    <button
                      onClick={() => setPage(Math.min(totalPages - 1, page + 1))}
                      disabled={page >= totalPages - 1}
                      className="px-3 py-1 border border-gray-300 rounded-md text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                    >
                      Next
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="space-y-4">
              {/* Daftar Pembayaran Button */}
              <button className="w-full bg-green-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-green-700 transition-colors">
                Daftar Pembayaran
              </button>

              {/* Statistics Cards */}
              <div className="bg-green-600 text-white rounded-lg p-6 text-center">
                <div className="text-4xl font-bold mb-2">{approvedCount}</div>
                <div className="text-lg">Disetujui</div>
              </div>

              <div className="bg-orange-500 text-white rounded-lg p-6 text-center">
                <div className="text-4xl font-bold mb-2">{processedCount}</div>
                <div className="text-lg">Diproses</div>
              </div>

              <div className="bg-red-500 text-white rounded-lg p-6 text-center">
                <div className="text-4xl font-bold mb-2">{rejectedCount}</div>
                <div className="text-lg">Ditolak</div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-green-600 text-white text-center py-4 mt-8">
        <p className="text-sm">
          Copyright © 2025 Kahf Education, All rights Reserved | Bug report to Phone: +6288987167784
        </p>
      </footer>
    </div>
  );
};

export default InvoiceList;