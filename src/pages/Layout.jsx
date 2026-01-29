import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import Sidebar from '../components/common/Sidebar';
import Dashboard from './Dashboard';
import Login from './Login';
import Signup from './Signup';
import Expenses from './Expenses';
import Profile from './Profile';
import Analytics from './Analytics';
import Calendar from './Calendar';
import Reports from './Reports';
import Budget from './Budget';
import Settings from './Settings';
import Help from './Help';

const Layout = () => {
  const [isAuthenticated, setIsAuthenticated] = React.useState(() => {
    const token = localStorage.getItem('token');
    console.log('Initial auth check - token exists:', !!token);
    console.log('Initial token value:', token);
    // Only require token for authentication
    return !!token;
  });
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  React.useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('token');
      const user = localStorage.getItem('user');
      console.log('Auth check - token:', !!token, 'user:', !!user);
      console.log('Token value:', token);
      console.log('User value:', user);

      // Only require token, not user data
      const isAuth = !!token;
      console.log('Setting isAuthenticated to:', isAuth);
      setIsAuthenticated(isAuth);
    };

    checkAuth();

    // Listen for storage changes
    window.addEventListener('storage', checkAuth);

    // Also check periodically for debugging
    const interval = setInterval(checkAuth, 1000);

    return () => {
      window.removeEventListener('storage', checkAuth);
      clearInterval(interval);
    };
  }, []);

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
                  <Route path="/analytics" element={<Analytics />} />
                  <Route path="/calendar" element={<Calendar />} />
                  <Route path="/reports" element={<Reports />} />
                  <Route path="/budget" element={<Budget />} />
                  <Route path="/settings" element={<Settings />} />
                  <Route path="/help" element={<Help />} />
                  <Route path="/profile" element={<Profile />} />
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
