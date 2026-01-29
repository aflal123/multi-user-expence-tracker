import React from 'react';
import { HelpCircle, Mail, MessageSquare, Book, Video, Phone } from 'lucide-react';

const Help = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Help Center</h1>
        <p className="text-gray-600">Find answers and get support</p>
      </div>

      {/* Quick Help */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="card hover:shadow-md transition-shadow cursor-pointer">
          <div className="card-body text-center">
            <div className="h-12 w-12 rounded-lg bg-blue-100 flex items-center justify-center mx-auto mb-3">
              <Book className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="font-medium text-gray-900 mb-1">Documentation</h3>
            <p className="text-sm text-gray-600">Browse our help articles</p>
          </div>
        </div>

        <div className="card hover:shadow-md transition-shadow cursor-pointer">
          <div className="card-body text-center">
            <div className="h-12 w-12 rounded-lg bg-green-100 flex items-center justify-center mx-auto mb-3">
              <Video className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="font-medium text-gray-900 mb-1">Video Tutorials</h3>
            <p className="text-sm text-gray-600">Watch step-by-step guides</p>
          </div>
        </div>

        <div className="card hover:shadow-md transition-shadow cursor-pointer">
          <div className="card-body text-center">
            <div className="h-12 w-12 rounded-lg bg-purple-100 flex items-center justify-center mx-auto mb-3">
              <MessageSquare className="h-6 w-6 text-purple-600" />
            </div>
            <h3 className="font-medium text-gray-900 mb-1">FAQ</h3>
            <p className="text-sm text-gray-600">Common questions answered</p>
          </div>
        </div>

        <div className="card hover:shadow-md transition-shadow cursor-pointer">
          <div className="card-body text-center">
            <div className="h-12 w-12 rounded-lg bg-orange-100 flex items-center justify-center mx-auto mb-3">
              <Mail className="h-6 w-6 text-orange-600" />
            </div>
            <h3 className="font-medium text-gray-900 mb-1">Contact Support</h3>
            <p className="text-sm text-gray-600">Get help from our team</p>
          </div>
        </div>
      </div>

      {/* Popular Articles */}
      <div className="card">
        <div className="card-header">
          <h3 className="text-lg font-semibold text-gray-900">Popular Articles</h3>
        </div>
        <div className="card-body">
          <div className="space-y-4">
            <div className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
              <h4 className="font-medium text-gray-900 mb-1">How to add your first expense</h4>
              <p className="text-sm text-gray-600">Learn how to track your daily expenses</p>
            </div>
            <div className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
              <h4 className="font-medium text-gray-900 mb-1">Setting up budget categories</h4>
              <p className="text-sm text-gray-600">Create and manage your budget limits</p>
            </div>
            <div className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
              <h4 className="font-medium text-gray-900 mb-1">Understanding your analytics</h4>
              <p className="text-sm text-gray-600">Get insights from your spending patterns</p>
            </div>
            <div className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
              <h4 className="font-medium text-gray-900 mb-1">Exporting your data</h4>
              <p className="text-sm text-gray-600">Download your expense data in various formats</p>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Support */}
      <div className="card">
        <div className="card-header">
          <h3 className="text-lg font-semibold text-gray-900">Still Need Help?</h3>
        </div>
        <div className="card-body">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
              <div className="h-12 w-12 rounded-lg bg-blue-100 flex items-center justify-center">
                <Mail className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Email Support</h4>
                <p className="text-sm text-gray-600">support@expensetracker.com</p>
                <p className="text-xs text-gray-500">Response within 24 hours</p>
              </div>
            </div>

            <div className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
              <div className="h-12 w-12 rounded-lg bg-green-100 flex items-center justify-center">
                <MessageSquare className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Live Chat</h4>
                <p className="text-sm text-gray-600">Available Mon-Fri, 9am-6pm</p>
                <p className="text-xs text-gray-500">Average response: 2 minutes</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Help;
