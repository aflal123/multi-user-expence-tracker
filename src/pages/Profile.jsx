import React, { useState } from 'react';
import { User, Mail, Lock, Bell, Shield, CreditCard, HelpCircle, LogOut, Camera, Edit2, Check, X } from 'lucide-react';

const Profile = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'billing', label: 'Billing', icon: CreditCard },
    { id: 'help', label: 'Help', icon: HelpCircle },
  ];

  const handleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleSave = () => {
    setIsEditing(false);
    // Handle save logic here
  };

  const renderProfileTab = () => (
    <div className="space-y-6">
      {/* Profile Picture */}
      <div className="flex items-center space-x-6">
        <div className="relative">
          <div className="h-24 w-24 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center">
            <User className="h-12 w-12 text-white" />
          </div>
          <button className="absolute bottom-0 right-0 p-2 bg-white rounded-full shadow-lg border border-gray-200 hover:bg-gray-50">
            <Camera className="h-4 w-4 text-gray-600" />
          </button>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Profile Picture</h3>
          <p className="text-sm text-gray-600">JPG, GIF or PNG. Max size of 2MB</p>
        </div>
      </div>

      {/* Personal Information */}
      <div className="card">
        <div className="card-header flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">Personal Information</h3>
          <button
            onClick={isEditing ? handleSave : handleEdit}
            className={`btn ${isEditing ? 'btn-success' : 'btn-secondary'} flex items-center space-x-2`}
          >
            {isEditing ? (
              <>
                <Check className="h-4 w-4" />
                <span>Save</span>
              </>
            ) : (
              <>
                <Edit2 className="h-4 w-4" />
                <span>Edit</span>
              </>
            )}
          </button>
        </div>
        <div className="card-body space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              disabled={!isEditing}
              className={`input ${!isEditing ? 'bg-gray-50' : ''}`}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              disabled={!isEditing}
              className={`input ${!isEditing ? 'bg-gray-50' : ''}`}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
            <input
              type="tel"
              value="+1 (555) 123-4567"
              disabled={!isEditing}
              className={`input ${!isEditing ? 'bg-gray-50' : ''}`}
            />
          </div>
        </div>
      </div>

      {/* Account Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card">
          <div className="card-body text-center">
            <div className="text-2xl font-bold text-blue-600">247</div>
            <div className="text-sm text-gray-600">Total Transactions</div>
          </div>
        </div>
        <div className="card">
          <div className="card-body text-center">
            <div className="text-2xl font-bold text-green-600">18</div>
            <div className="text-sm text-gray-600">Months Active</div>
          </div>
        </div>
        <div className="card">
          <div className="card-body text-center">
            <div className="text-2xl font-bold text-purple-600">$12.5k</div>
            <div className="text-sm text-gray-600">Total Saved</div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSecurityTab = () => (
    <div className="space-y-6">
      <div className="card">
        <div className="card-header">
          <h3 className="text-lg font-semibold text-gray-900">Change Password</h3>
        </div>
        <div className="card-body space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
            <input
              type="password"
              value={formData.currentPassword}
              onChange={(e) => setFormData({ ...formData, currentPassword: e.target.value })}
              className="input"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
            <input
              type="password"
              value={formData.newPassword}
              onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
              className="input"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Confirm New Password</label>
            <input
              type="password"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              className="input"
            />
          </div>
          <button className="btn btn-primary">Update Password</button>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h3 className="text-lg font-semibold text-gray-900">Two-Factor Authentication</h3>
        </div>
        <div className="card-body">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900">Enable 2FA</p>
              <p className="text-sm text-gray-600">Add an extra layer of security to your account</p>
            </div>
            <button className="btn btn-secondary">Enable</button>
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
          {[
            { label: 'Email notifications for new expenses', enabled: true },
            { label: 'Push notifications for budget alerts', enabled: true },
            { label: 'Weekly expense reports', enabled: false },
            { label: 'Monthly account summaries', enabled: true },
            { label: 'Security alerts', enabled: true },
          ].map((item, index) => (
            <div key={index} className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">{item.label}</p>
              </div>
              <button
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  item.enabled ? 'bg-blue-600' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    item.enabled ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderBillingTab = () => (
    <div className="space-y-6">
      <div className="card">
        <div className="card-header">
          <h3 className="text-lg font-semibold text-gray-900">Current Plan</h3>
        </div>
        <div className="card-body">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h4 className="text-lg font-semibold text-gray-900">Premium Plan</h4>
              <p className="text-gray-600">$9.99/month</p>
            </div>
            <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">Active</span>
          </div>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Check className="h-4 w-4 text-green-600" />
              <span className="text-sm text-gray-700">Unlimited expenses</span>
            </div>
            <div className="flex items-center space-x-2">
              <Check className="h-4 w-4 text-green-600" />
              <span className="text-sm text-gray-700">Advanced analytics</span>
            </div>
            <div className="flex items-center space-x-2">
              <Check className="h-4 w-4 text-green-600" />
              <span className="text-sm text-gray-700">Priority support</span>
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
            <h4 className="font-medium text-gray-900">Getting Started Guide</h4>
            <p className="text-sm text-gray-600 mt-1">Learn the basics of ExpenseTracker</p>
          </div>
          <div className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
            <h4 className="font-medium text-gray-900">FAQ</h4>
            <p className="text-sm text-gray-600 mt-1">Frequently asked questions</p>
          </div>
          <div className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
            <h4 className="font-medium text-gray-900">Contact Support</h4>
            <p className="text-sm text-gray-600 mt-1">Get help from our support team</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return renderProfileTab();
      case 'security':
        return renderSecurityTab();
      case 'notifications':
        return renderNotificationsTab();
      case 'billing':
        return renderBillingTab();
      case 'help':
        return renderHelpTab();
      default:
        return renderProfileTab();
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Profile Settings</h1>
        <p className="text-gray-600">Manage your account settings and preferences</p>
      </div>

      {/* Tabs */}
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

      {/* Tab Content */}
      {renderTabContent()}
    </div>
  );
};

export default Profile;
