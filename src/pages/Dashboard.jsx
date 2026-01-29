import React, { useState, useEffect } from 'react';
import { DollarSign, ArrowUpRight, Plus, Camera } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  const [recentTransactions, setRecentTransactions] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');
  const [showAll, setShowAll] = useState(false);

  // Load transactions from localStorage
  useEffect(() => {
    const savedTransactions = localStorage.getItem('userTransactions');
    if (savedTransactions) {
      const transactions = JSON.parse(savedTransactions);
      // Add receipt data to transactions
      const transactionsWithReceipts = transactions.map(transaction => ({
        ...transaction,
        receiptData: localStorage.getItem(`receipt_${transaction.id}`)
      }));
      setRecentTransactions(transactionsWithReceipts);
    }
  }, []);

  // Listen for new transactions
  useEffect(() => {
    const handleStorageChange = () => {
      const savedTransactions = localStorage.getItem('userTransactions');
      if (savedTransactions) {
        const transactions = JSON.parse(savedTransactions);
        // Add receipt data to transactions
        const transactionsWithReceipts = transactions.map(transaction => ({
          ...transaction,
          receiptData: localStorage.getItem(`receipt_${transaction.id}`)
        }));
        setRecentTransactions(transactionsWithReceipts);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('transactionAdded', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('transactionAdded', handleStorageChange);
    };
  }, []);

  // Function to get filtered transactions
  const getFilteredTransactions = () => {
    if (showAll) {
      return recentTransactions.slice().reverse(); // Show all, newest first
    } else if (selectedDate) {
      return recentTransactions.filter(transaction => transaction.date === selectedDate).reverse();
    } else {
      return recentTransactions.slice(-6).reverse(); // Default: last 6, newest first
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Welcome back! Here's your financial overview.</p>
        </div>
        <button 
          onClick={() => navigate('/expenses')}
          className="button button-primary flex items-center space-x-2"
        >
          <Plus className="h-4 w-4" />
          <span>Add Expense</span>
        </button>
      </div>

      {/* Date Filter */}
      <div className="panel">
        <div className="panel-body">
          <div className="flex items-center space-x-3">
            <label className="text-sm font-medium text-gray-700">Filter by Date:</label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="form-input"
            />
            <button
              onClick={() => {
                setSelectedDate('');
                setShowAll(false);
              }}
              className="button button-secondary"
            >
              Clear Filter
            </button>
            <button
              onClick={() => {
                setSelectedDate('');
                setShowAll(true);
              }}
              className="button button-primary"
            >
              Show All Expenses
            </button>
            <span className="text-sm text-gray-500">
              {getFilteredTransactions().length} transaction{getFilteredTransactions().length !== 1 ? 's' : ''} found
            </span>
          </div>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="panel">
        <div className="panel-header">
          <h2 className="text-lg font-semibold text-gray-900">Recent Transactions</h2>
        </div>
        <div className="panel-body">
          {getFilteredTransactions().length === 0 ? (
            <div className="text-center py-12">
              <div className="mx-auto h-12 w-12 rounded-lg bg-gray-100 flex items-center justify-center mb-4">
                <DollarSign className="h-6 w-6 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {selectedDate ? 'No transactions found for this date' : 'No transactions yet'}
              </h3>
              <p className="text-gray-600 mb-4">
                {selectedDate ? 'Try selecting a different date' : 'Start tracking your expenses to see them here'}
              </p>
              <button 
                onClick={() => navigate('/expenses')}
                className="button button-primary"
              >
                Add Your First Expense
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {getFilteredTransactions().map((transaction) => (
                <div key={transaction.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className="h-10 w-10 rounded-full bg-red-100 flex items-center justify-center">
                        <ArrowUpRight className="h-5 w-5 text-red-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{transaction.reason}</p>
                        <p className="text-xs text-gray-500">
                          {new Date(transaction.date).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-lg text-red-600">
                        -Rs.{parseFloat(transaction.amount).toFixed(2)}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-xs px-2 py-1 rounded-full font-medium bg-gray-100 text-gray-800">
                      Expense
                    </span>
                    {transaction.receiptData && (
                      <div className="flex items-center space-x-2">
                        <span className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded-full">
                          📎 Receipt
                        </span>
                        <div className="h-12 w-12 rounded border border-gray-200 overflow-hidden cursor-pointer hover:scale-105 transition-transform">
                          <img 
                            src={transaction.receiptData} 
                            alt="Receipt" 
                            className="h-full w-full object-cover"
                            onClick={() => {
                              // Open receipt in new tab
                              const newWindow = window.open();
                              newWindow.document.write(`<img src="${transaction.receiptData}" style="max-width:100%; height:auto;" />`);
                            }}
                          />
                        </div>
                      </div>
                    )}
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
