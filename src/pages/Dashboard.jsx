import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, DollarSign, CreditCard, Calendar, ArrowUpRight, ArrowDownRight, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { expensesAPI } from '../services/api';

const Dashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalExpenses: 0,
    thisMonth: 0,
    budgetUsed: 0,
    savings: 0
  });
  const [recentTransactions, setRecentTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();

    // Set up real-time updates every 30 seconds
    const interval = setInterval(fetchDashboardData, 30000);

    return () => clearInterval(interval);
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);

      // Fetch today's expenses
      const today = new Date().toISOString().split('T')[0];
      const expensesResponse = await expensesAPI.getAll(today);
      const expenses = expensesResponse.data || [];

      // Calculate stats from real data
      const totalExpenses = expenses.reduce((sum, expense) => sum + parseFloat(expense.amount), 0);
      const thisMonth = expenses.reduce((sum, expense) => sum + parseFloat(expense.amount), 0);

      // Mock budget data (replace with real API call)
      const budgetAllocated = 5000;
      const budgetUsed = (thisMonth / budgetAllocated) * 100;
      const savings = budgetAllocated - thisMonth;

      setStats({
        totalExpenses: totalExpenses,
        thisMonth: thisMonth,
        budgetUsed: budgetUsed,
        savings: savings > 0 ? savings : 0
      });

      // Format recent transactions
      const formattedTransactions = expenses.slice(0, 5).map(expense => ({
        id: expense.id,
        name: expense.reason,
        amount: parseFloat(expense.amount),
        date: expense.expense_date,
        category: 'Expense',
        trend: 'up',
        receiptImage: expense.receipt_image
      }));

      setRecentTransactions(formattedTransactions);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getCategoryColor = (category) => {
    const colors = {
      'Food': 'bg-blue-100 text-blue-800',
      'Transport': 'bg-green-100 text-green-800',
      'Utilities': 'bg-yellow-100 text-yellow-800',
      'Income': 'bg-purple-100 text-purple-800',
      'Entertainment': 'bg-pink-100 text-pink-800',
      'Healthcare': 'bg-red-100 text-red-800'
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">
            Welcome back! Here's your financial overview.
            {loading && <span className="ml-2 text-xs text-blue-600">Updating...</span>}
          </p>
        </div>
        <button
          onClick={() => navigate('/expenses')}
          className="btn btn-primary flex items-center space-x-2"
        >
          <Plus className="h-4 w-4" />
          <span>Add Expense</span>
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="card">
          <div className="card-body">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Today's Total</p>
                <p className="text-2xl font-bold text-gray-900">${stats.totalExpenses.toFixed(2)}</p>
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
                <p className="text-2xl font-bold text-gray-900">${stats.thisMonth.toFixed(2)}</p>
              </div>
              <div className="h-12 w-12 rounded-lg bg-green-100 flex items-center justify-center">
                <Calendar className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-body">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Budget Used</p>
                <p className="text-2xl font-bold text-gray-900">{stats.budgetUsed.toFixed(1)}%</p>
              </div>
              <div className="h-12 w-12 rounded-lg bg-yellow-100 flex items-center justify-center">
                <CreditCard className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-body">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Savings</p>
                <p className="text-2xl font-bold text-gray-900">${stats.savings.toFixed(2)}</p>
              </div>
              <div className="h-12 w-12 rounded-lg bg-purple-100 flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="card">
        <div className="card-header">
          <h2 className="text-lg font-semibold text-gray-900">Recent Transactions</h2>
        </div>
        <div className="card-body">
          {recentTransactions.length === 0 ? (
            <div className="text-center py-12">
              <div className="mx-auto h-12 w-12 rounded-lg bg-gray-100 flex items-center justify-center mb-4">
                <DollarSign className="h-6 w-6 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No transactions yet</h3>
              <p className="text-gray-600 mb-4">Start tracking your expenses to see them here</p>
              <button
                onClick={() => navigate('/expenses')}
                className="btn btn-primary"
              >
                Add Your First Expense
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {recentTransactions.map((transaction) => (
                <div key={transaction.id} className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className={`h-10 w-10 rounded-full flex items-center justify-center ${transaction.trend === 'up' ? 'bg-red-100' : 'bg-green-100'
                      }`}>
                      {transaction.trend === 'up' ? (
                        <ArrowUpRight className="h-5 w-5 text-red-600" />
                      ) : (
                        <ArrowDownRight className="h-5 w-5 text-green-600" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{transaction.name}</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className="text-xs px-2 py-1 rounded-full font-medium bg-gray-100 text-gray-800">
                          {transaction.category}
                        </span>
                        <span className="text-xs text-gray-500">
                          {new Date(transaction.date).toLocaleDateString()}
                        </span>
                        {transaction.receiptImage && (
                          <span className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded-full">
                            📎 Receipt
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`font-semibold ${transaction.trend === 'up' ? 'text-red-600' : 'text-green-600'
                      }`}>
                      {transaction.trend === 'up' ? '-' : '+'}${transaction.amount.toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
