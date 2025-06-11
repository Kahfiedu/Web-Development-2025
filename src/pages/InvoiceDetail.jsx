import React, { useState } from 'react';
import { 
  Search, 
  Download, 
  Printer,
  Home, 
  Users, 
  Puzzle, 
  GraduationCap, 
  FileText, 
  Settings, 
  Bell, 
  User,
  ChevronRight,
  List,
  MessageCircle
} from 'lucide-react';

// Mock logo component
import KahfLogo from '../components/Kahflogo';

const InvoiceDetail = () => {
  const [showUserMenu, setShowUserMenu] = useState(false);

  // Invoice data
  const invoiceData = {
    invoiceNumber: '#72997326',
    date: '07 Feb 2025',
    from: {
      name: 'Jhon doe',
      phone: '087582525534',
      email: 'jhonedoe@example.com'
    },
    to: {
      company: 'Kahfi Education',
      method: 'Transfer',
      bank: 'BCA',
      noRek: '700362836',
      account: '002154875412396'
    },
    items: [
      {
        id: 1,
        course: 'Mengaji',
        class: 'Kelas A',
        serialNumber: '#P060525A1',
        quantity: 2,
        price: 150000,
        total: 300000
      }
    ],
    paymentDue: '12 Feb 2025',
    totalAmount: 300000,
    discount: 30000,
    finalAmount: 270000
  };

  const formatCurrency = (amount) => {
    return `Rp. ${amount.toLocaleString('id-ID')}`;
  };

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

      <div className="px-6 py-6">
        {/* Breadcrumbs */}
        <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-6">
          <Home className="h-4 w-4" />
          <span>Pembayaran</span>
          <ChevronRight className="h-4 w-4" />
          <span className="text-gray-900">Detail Pembayaran</span>
        </nav>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-2 mb-6">
          <span className="text-green-600 font-medium">Detail Pembayaran</span>
          <button className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
            <Download className="h-4 w-4" />
            <span>Simpan</span>
          </button>
          <button className="flex items-center space-x-2 bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600">
            <Printer className="h-4 w-4" />
            <span>Print</span>
          </button>
        </div>

        {/* Invoice Content */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-8">
            {/* Invoice Header */}
            <div className="flex justify-between items-start mb-8">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Invoice</h1>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-gray-900">{invoiceData.date}</div>
              </div>
            </div>

            {/* From and To Section */}
            <div className="grid grid-cols-2 gap-8 mb-8">
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-3">From</h3>
                <div className="space-y-1">
                  <div className="font-semibold text-gray-900">{invoiceData.from.name}</div>
                  <div className="text-sm text-gray-600">Phone : {invoiceData.from.phone}</div>
                  <div className="text-sm text-gray-600">Email : {invoiceData.from.email}</div>
                </div>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-3">To</h3>
                <div className="space-y-1">
                  <div className="font-semibold text-gray-900">{invoiceData.to.company}</div>
                  <div className="text-sm text-gray-600">Method : {invoiceData.to.method}</div>
                  <div className="text-sm text-gray-600">Bank : {invoiceData.to.bank}</div>
                  <div className="text-sm text-gray-600">No Rek : {invoiceData.to.noRek}</div>
                </div>
              </div>
            </div>

            {/* Invoice Details */}
            <div className="mb-8">
              <div className="grid grid-cols-3 gap-4 text-sm text-gray-600 mb-4">
                <div>Invoice : {invoiceData.invoiceNumber}</div>
                <div>Method : {invoiceData.to.method}</div>
                <div>Bank : {invoiceData.to.bank}</div>
              </div>
              <div className="text-sm text-gray-600">
                Account : {invoiceData.to.account}
              </div>
            </div>

            {/* Invoice Table */}
            <div className="overflow-x-auto mb-8">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 border-b">
                    <th className="text-left py-3 px-4 font-medium text-gray-900">#</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Course</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Class</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Serial Number</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Quantity</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Price</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {invoiceData.items.map((item, index) => (
                    <tr key={item.id} className="border-b">
                      <td className="py-4 px-4">{index + 1}</td>
                      <td className="py-4 px-4">{item.course}</td>
                      <td className="py-4 px-4">{item.class}</td>
                      <td className="py-4 px-4">{item.serialNumber}</td>
                      <td className="py-4 px-4">{item.quantity}</td>
                      <td className="py-4 px-4">{formatCurrency(item.price)}</td>
                      <td className="py-4 px-4">{formatCurrency(item.total)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Payment Summary */}
            <div className="flex justify-end">
              <div className="w-80 space-y-3">
                <div className="text-sm text-green-600 font-medium">
                  Payment Due {invoiceData.paymentDue}
                </div>
                <div className="flex justify-between text-lg font-semibold">
                  <span>Total : {formatCurrency(invoiceData.totalAmount)}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Disc (10%) : {formatCurrency(invoiceData.discount)}</span>
                </div>
                <div className="border-t pt-3">
                  <div className="flex justify-between text-xl font-bold">
                    <span>Amount {formatCurrency(invoiceData.finalAmount)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-green-600 text-white text-center py-4 mt-8">
        <p className="text-sm">
          Copyright © 2025 Kahfi Education, All rights Reserved | Bug report to Phone: +6288987167784
        </p>
      </footer>
    </div>
  );
};

export default InvoiceDetail;