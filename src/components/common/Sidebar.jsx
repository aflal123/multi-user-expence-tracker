import React from 'react';
import { X, Home, Receipt, TrendingUp, CreditCard, Settings, HelpCircle, Calendar, PieChart } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = ({ isOpen, setIsOpen }) => {
  const location = useLocation();

  const menuItems = [
    { icon: Home, label: 'Dashboard', path: '/' },
    { icon: Receipt, label: 'Expenses', path: '/expenses' },
    { icon: TrendingUp, label: 'Analytics', path: '/analytics' },
    { icon: Calendar, label: 'Calendar', path: '/calendar' },
    { icon: PieChart, label: 'Reports', path: '/reports' },
    { icon: CreditCard, label: 'Budget', path: '/budget' },
    { icon: Settings, label: 'Settings', path: '/settings' },
    { icon: HelpCircle, label: 'Help', path: '/help' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-xl border-r border-gray-200 transform transition-transform duration-300 ease-in-out
        lg:translate-x-0 lg:static lg:inset-0
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        {/* Header */}
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center">
              <Receipt className="h-5 w-5 text-white" />
            </div>
            <h1 className="text-xl font-bold text-gray-900">ExpenseTracker</h1>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 rounded-lg text-gray-500 hover:text-gray-700 hover:bg-gray-100 lg:hidden"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-1">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setIsOpen(false)}
              className={`
                flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors
                ${isActive(item.path)
                  ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                  : 'text-gray-700 hover:bg-gray-100'
                }
              `}
            >
              <item.icon className="h-5 w-5" />
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>

        {/* Bottom navigation */}
        <div className="border-t border-gray-200 p-4">
          <div className="flex items-center space-x-2 px-3 py-2 rounded-lg text-sm text-gray-500">
            <span>Version 2.1.0</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
