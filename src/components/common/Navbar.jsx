import React from 'react';
import { Menu, LogOut } from 'lucide-react';

const Navbar = ({ isAuthenticated, setIsAuthenticated, setSidebarOpen, onLogout }) => {
  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    } else {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      setIsAuthenticated(false);
    }
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left side */}
          <div className="flex items-center">
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 rounded-lg text-gray-500 hover:text-gray-700 hover:bg-gray-100 lg:hidden"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>

          {/* Right side */}
          <div className="flex items-center space-x-4">
            {/* Logout */}
            <button
              onClick={handleLogout}
              className="button button-secondary flex items-center space-x-2"
            >
              <LogOut className="h-4 w-4" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
