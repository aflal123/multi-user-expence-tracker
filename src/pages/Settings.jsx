import React, { useState } from 'react';
import { User, Bell, Shield, CreditCard, Globe, HelpCircle, Moon, Sun } from 'lucide-react';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    weekly: false,
    monthly: true
  });

  const tabs = [
    { id: 'general', label: 'General', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'billing', label: 'Billing', icon: CreditCard },
    { id: 'help', label: 'Help', icon: HelpCircle }
  ];

  const handleNotificationChange = (key) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const renderGeneralTab = () => (
    <div className="space-y-6">
      <div className="card">
        <div className="card-header">
          <h3 className="text-lg font-semibold text-gray-900">General Settings</h3>
        </div>
        <div className="card-body space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900">Dark Mode</p>
              <p className="text-sm text-gray-600">Use dark theme across the application</p>
            </div>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                darkMode ? 'bg-blue-600' : 'bg-gray-200'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  darkMode ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Language</label>
            <select className="input">
              <option>English</option>
              <option>Spanish</option>
              <option>French</option>
              <option>German</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Currency</label>
            <select className="input">
              <option>USD ($)</option>
              <option>EUR (€)</option>
              <option>GBP (£)</option>
              <option>JPY (¥)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Date Format</label>
            <select className="input">
              <option>MM/DD/YYYY</option>
              <option>DD/MM/YYYY</option>
              <option>YYYY-MM-DD</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );

  const renderNotificationsTab = () => (
    <div className="space-y-6">
      <div className="card">
        <div className="card-header">
          <h3 className="text-lg font-semibold text-gray-900">Notification Preferences</h3>
        </div>
        <div className="card-body space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900">Email Notifications</p>
              <p className="text-sm text-gray-600">Receive updates via email</p>
            </div>
            <button
              onClick={() => handleNotificationChange('email')}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                notifications.email ? 'bg-blue-600' : 'bg-gray-200'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  notifications.email ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900">Push Notifications</p>
              <p className="text-sm text-gray-600">Receive browser push notifications</p>
            </div>
            <button
              onClick={() => handleNotificationChange('push')}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                notifications.push ? 'bg-blue-600' : 'bg-gray-200'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  notifications.push ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900">Weekly Reports</p>
              <p className="text-sm text-gray-600">Get weekly expense summaries</p>
            </div>
            <button
              onClick={() => handleNotificationChange('weekly')}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                notifications.weekly ? 'bg-blue-600' : 'bg-gray-200'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  notifications.weekly ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900">Monthly Reports</p>
              <p className="text-sm text-gray-600">Get monthly financial reports</p>
            </div>
            <button
              onClick={() => handleNotificationChange('monthly')}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                notifications.monthly ? 'bg-blue-600' : 'bg-gray-200'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  notifications.monthly ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSecurityTab = () => (
    <div className="space-y-6">
      <div className="card">
        <div className="card-header">
          <h3 className="text-lg font-semibold text-gray-900">Security Settings</h3>
        </div>
        <div className="card-body space-y-6">
          <div>
            <h4 className="font-medium text-gray-900 mb-4">Password</h4>
            <button className="btn btn-secondary">Change Password</button>
          </div>

          <div>
            <h4 className="font-medium text-gray-900 mb-4">Two-Factor Authentication</h4>
            <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div>
                <p className="font-medium text-gray-900">Enable 2FA</p>
                <p className="text-sm text-gray-600">Add an extra layer of security</p>
              </div>
              <button className="btn btn-primary">Enable</button>
            </div>
          </div>

          <div>
            <h4 className="font-medium text-gray-900 mb-4">Active Sessions</h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">Chrome on macOS</p>
                  <p className="text-sm text-gray-600">Current session • Active now</p>
                </div>
                <span className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded-full">Current</span>
              </div>
              <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">Safari on iPhone</p>
                  <p className="text-sm text-gray-600">Last active 2 hours ago</p>
                </div>
                <button className="text-sm text-red-600 hover:text-red-700">Revoke</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderBillingTab = () => (
    <div className="space-y-6">
      <div className="card">
        <div className="card-header">
          <h3 className="text-lg font-semibold text-gray-900">Billing Information</h3>
        </div>
        <div className="card-body space-y-6">
          <div className="p-4 border border-gray-200 rounded-lg">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-medium text-gray-900">Premium Plan</h4>
              <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">Active</span>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Monthly Price</span>
                <span className="font-medium">$9.99</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Next Billing Date</span>
                <span className="font-medium">Feb 1, 2026</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Payment Method</span>
                <span className="font-medium">•••• 4242</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-medium text-gray-900 mb-3">Payment Methods</h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-8 bg-blue-600 rounded flex items-center justify-center">
                    <span className="text-white text-xs font-bold">VISA</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Visa ending in 4242</p>
                    <p className="text-sm text-gray-600">Expires 12/25</p>
                  </div>
                </div>
                <button className="text-sm text-blue-600 hover:text-blue-700">Edit</button>
              </div>
            </div>
            <button className="btn btn-secondary mt-3">Add Payment Method</button>
          </div>

          <div>
            <h4 className="font-medium text-gray-900 mb-3">Billing History</h4>
            <div className="space-y-2">
              <div className="flex justify-between p-3 border border-gray-200 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">Premium Plan</p>
                  <p className="text-sm text-gray-600">Jan 1, 2026</p>
                </div>
                <span className="font-medium">$9.99</span>
              </div>
              <div className="flex justify-between p-3 border border-gray-200 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">Premium Plan</p>
                  <p className="text-sm text-gray-600">Dec 1, 2025</p>
                </div>
                <span className="font-medium">$9.99</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderHelpTab = () => (
    <div className="space-y-6">
      <div className="card">
        <div className="card-header">
          <h3 className="text-lg font-semibold text-gray-900">Help & Support</h3>
        </div>
        <div className="card-body space-y-4">
          <div className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
            <h4 className="font-medium text-gray-900 mb-2">Getting Started Guide</h4>
            <p className="text-sm text-gray-600 mb-3">Learn the basics of ExpenseTracker</p>
            <button className="btn btn-secondary btn-sm">View Guide</button>
          </div>

          <div className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
            <h4 className="font-medium text-gray-900 mb-2">Frequently Asked Questions</h4>
            <p className="text-sm text-gray-600 mb-3">Find answers to common questions</p>
            <button className="btn btn-secondary btn-sm">View FAQ</button>
          </div>

          <div className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
            <h4 className="font-medium text-gray-900 mb-2">Contact Support</h4>
            <p className="text-sm text-gray-600 mb-3">Get help from our support team</p>
            <button className="btn btn-primary btn-sm">Contact Support</button>
          </div>

          <div className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
            <h4 className="font-medium text-gray-900 mb-2">Video Tutorials</h4>
            <p className="text-sm text-gray-600 mb-3">Watch step-by-step video guides</p>
            <button className="btn btn-secondary btn-sm">Watch Videos</button>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h3 className="text-lg font-semibold text-gray-900">System Information</h3>
        </div>
        <div className="card-body">
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Version</span>
              <span className="font-medium">2.1.0</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Last Updated</span>
              <span className="font-medium">Jan 15, 2026</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Browser</span>
              <span className="font-medium">Chrome 108.0</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'general': return renderGeneralTab();
      case 'notifications': return renderNotificationsTab();
      case 'security': return renderSecurityTab();
      case 'billing': return renderBillingTab();
      case 'help': return renderHelpTab();
      default: return renderGeneralTab();
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600">Manage your account settings and preferences</p>
      </div>

      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors
                ${activeTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }
              `}
            >
              <tab.icon className="h-4 w-4" />
              <span>{tab.label}</span>
            </button>
          ))}
        </nav>
      </div>

      {renderTabContent()}
    </div>
  );
};

export default Settings;
