import React, { useState, useEffect } from 'react';
import { DollarSign, ArrowUpRight, Plus, Camera } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  const [recentTransactions, setRecentTransactions] = useState([]);

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

      {/* Recent Transactions */}
      <div className="panel">
        <div className="panel-header">
          <h2 className="text-lg font-semibold text-gray-900">Recent Transactions</h2>
        </div>
        <div className="panel-body">
          {recentTransactions.length === 0 ? (
            <div className="text-center py-12">
              <div className="mx-auto h-12 w-12 rounded-lg bg-gray-100 flex items-center justify-center mb-4">
                <DollarSign className="h-6 w-6 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No transactions yet</h3>
              <p className="text-gray-600 mb-4">Start tracking your expenses to see them here</p>
              <button
                onClick={() => navigate('/expenses')}
                className="button button-primary"
              >
                Add Your First Expense
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {recentTransactions.slice(-6).reverse().map((transaction) => (
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
                          {transaction.receiptData ? (
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
                          ) : (
                            <div className="h-full w-full bg-gray-100 flex items-center justify-center">
                              <Camera className="h-4 w-4 text-gray-400" />
                            </div>
                          )}
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
