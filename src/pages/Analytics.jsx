import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, DollarSign, Calendar, PieChart, BarChart3 } from 'lucide-react';
import { expensesAPI } from '../services/api';

const Analytics = () => {
  const [analytics, setAnalytics] = useState({
    totalExpenses: 0,
    thisMonth: 0,
    lastMonth: 0,
    averageDaily: 0,
    categories: [],
    monthlyTrend: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      // Mock analytics data - replace with real API call
      const mockData = {
        totalExpenses: 12458.00,
        thisMonth: 3247.00,
        lastMonth: 2890.00,
        averageDaily: 108.23,
        categories: [
          { name: 'Food', amount: 892.50, percentage: 27.5 },
          { name: 'Transport', amount: 456.00, percentage: 14.0 },
          { name: 'Utilities', amount: 678.30, percentage: 20.9 },
          { name: 'Entertainment', amount: 234.20, percentage: 7.2 },
          { name: 'Healthcare', amount: 345.00, percentage: 10.6 },
          { name: 'Other', amount: 641.00, percentage: 19.8 }
        ],
        monthlyTrend: [
          { month: 'Aug', amount: 2100 },
          { month: 'Sep', amount: 2450 },
          { month: 'Oct', amount: 2890 },
          { month: 'Nov', amount: 2670 },
          { month: 'Dec', amount: 3247 }
        ]
      };
      setAnalytics(mockData);
    } catch (error) {
      console.error('Error fetching analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>
        <p className="text-gray-600">Deep insights into your spending patterns</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="card">
          <div className="card-body">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Expenses</p>
                <p className="text-2xl font-bold text-gray-900">${analytics.totalExpenses.toFixed(2)}</p>
              </div>
              <div className="h-12 w-12 rounded-lg bg-blue-100 flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-body">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">This Month</p>
                <p className="text-2xl font-bold text-gray-900">${analytics.thisMonth.toFixed(2)}</p>
                <p className="text-xs text-green-600">+12.4% vs last month</p>
              </div>
              <div className="h-12 w-12 rounded-lg bg-green-100 flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-body">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Average Daily</p>
                <p className="text-2xl font-bold text-gray-900">${analytics.averageDaily.toFixed(2)}</p>
              </div>
              <div className="h-12 w-12 rounded-lg bg-purple-100 flex items-center justify-center">
                <Calendar className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-body">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Categories</p>
                <p className="text-2xl font-bold text-gray-900">{analytics.categories.length}</p>
              </div>
              <div className="h-12 w-12 rounded-lg bg-orange-100 flex items-center justify-center">
                <PieChart className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Category Breakdown */}
        <div className="card">
          <div className="card-header">
            <h3 className="text-lg font-semibold text-gray-900">Category Breakdown</h3>
          </div>
          <div className="card-body">
            <div className="space-y-3">
              {analytics.categories.map((category, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-gray-700">{category.name}</span>
                      <span className="text-sm text-gray-600">{category.percentage}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full" 
                        style={{ width: `${category.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="ml-4 text-right">
                    <p className="text-sm font-semibold text-gray-900">${category.amount.toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Monthly Trend */}
        <div className="card">
          <div className="card-header">
            <h3 className="text-lg font-semibold text-gray-900">Monthly Trend</h3>
          </div>
          <div className="card-body">
            <div className="space-y-4">
              {analytics.monthlyTrend.map((month, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700 w-12">{month.month}</span>
                  <div className="flex-1 mx-4">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-green-600 h-2 rounded-full" 
                        style={{ width: `${(month.amount / 3500) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                  <span className="text-sm font-semibold text-gray-900 w-16 text-right">
                    ${month.amount}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
