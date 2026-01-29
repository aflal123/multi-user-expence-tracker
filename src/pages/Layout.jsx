import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import Sidebar from '../components/common/Sidebar';
import Dashboard from './Dashboard';
import Login from './Login';
import Signup from './Signup';
import Expenses from './Expenses';

const Layout = () => {
  const [isAuthenticated, setIsAuthenticated] = React.useState(() => {
    const token = localStorage.getItem('token');
    return !!token;
  });
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        {isAuthenticated ? (
          <div className="flex">
            <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
            <div className="flex-1 flex flex-col">
              <Navbar
                isAuthenticated={isAuthenticated}
                setIsAuthenticated={setIsAuthenticated}
                setSidebarOpen={setSidebarOpen}
                onLogout={handleLogout}
              />
              <main className="flex-1 p-6">
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/expenses" element={<Expenses />} />
                </Routes>
              </main>
            </div>
          </div>
        ) : (
          <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
            <Routes>
              <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="*" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
            </Routes>
          </div>
        )}
      </div>
    </Router>
  );
};

export default Layout;
