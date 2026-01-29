import React, { useState, useEffect } from 'react';
import { Plus, X, Camera, Upload } from 'lucide-react';

const Expenses = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [isLoading, setIsLoading] = useState(false);
  const [expenses, setExpenses] = useState([]);
  const [formData, setFormData] = useState({
    reason: '',
    amount: '',
    date: new Date().toISOString().split('T')[0],
    receipt: null
  });

  // Load expenses from localStorage
  useEffect(() => {
    const savedExpenses = localStorage.getItem('userTransactions');
    if (savedExpenses) {
      const expenses = JSON.parse(savedExpenses);
      // Add receipt data to expenses
      const expensesWithReceipts = expenses.map(expense => ({
        ...expense,
        receiptData: localStorage.getItem(`receipt_${expense.id}`)
      }));
      setExpenses(expensesWithReceipts);
    }
  }, []);

  // Listen for new expenses
  useEffect(() => {
    const handleStorageChange = () => {
      const savedExpenses = localStorage.getItem('userTransactions');
      if (savedExpenses) {
        const expenses = JSON.parse(savedExpenses);
        // Add receipt data to expenses
        const expensesWithReceipts = expenses.map(expense => ({
          ...expense,
          receiptData: localStorage.getItem(`receipt_${expense.id}`)
        }));
        setExpenses(expensesWithReceipts);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('transactionAdded', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('transactionAdded', handleStorageChange);
    };
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, receipt: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Create new transaction
    const newTransaction = {
      id: Date.now(),
      reason: formData.reason,
      amount: formData.amount,
      date: formData.date,
      receipt: formData.receipt ? formData.receipt.name : null,
      receiptFile: formData.receipt || null
    };

    // Get existing transactions from localStorage
    const existingTransactions = localStorage.getItem('userTransactions');
    let transactions = existingTransactions ? JSON.parse(existingTransactions) : [];

    // Add new transaction
    transactions.push(newTransaction);

    // Save to localStorage (without the file object, just the name)
    const transactionsToSave = transactions.map(t => ({
      id: t.id,
      reason: t.reason,
      amount: t.amount,
      date: t.date,
      receipt: t.receipt
    }));
    localStorage.setItem('userTransactions', JSON.stringify(transactionsToSave));

    // Store the file object separately for Dashboard display
    if (formData.receipt) {
      const reader = new FileReader();
      reader.onload = function (e) {
        localStorage.setItem(`receipt_${newTransaction.id}`, e.target.result);
      };
      reader.readAsDataURL(formData.receipt);
    }

    // Trigger custom event to notify Dashboard
    window.dispatchEvent(new Event('transactionAdded'));

    // Simulate API call
    setTimeout(() => {
      setShowAddModal(false);
      setFormData({ reason: '', amount: '', date: new Date().toISOString().split('T')[0], receipt: null });
      setIsLoading(false);
      alert('Expense added successfully!');
    }, 500);
  };

  const filteredExpenses = expenses.filter(expense =>
    expense.date === selectedDate
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Expenses</h1>
          <p className="text-gray-600">Track and manage your daily expenses</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="button button-primary flex items-center space-x-2"
        >
          <Plus className="h-4 w-4" />
          <span>Add Expense</span>
        </button>
      </div>

      {/* Filters */}
      <div className="panel">
        <div className="panel-body">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
            <div className="flex items-center space-x-3">
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="form-input"
              />
              <button className="button button-secondary">
                <Filter className="h-4 w-4" />
              </button>
              <button className="button button-secondary">
                <Download className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Expenses List */}
      <div className="panel">
        <div className="panel-header">
          <h2 className="text-lg font-semibold text-gray-900">Expense List</h2>
        </div>
        <div className="panel-body">
          {filteredExpenses.length === 0 ? (
            <div className="text-center py-12">
              <div className="mx-auto h-12 w-12 rounded-lg bg-gray-100 flex items-center justify-center mb-4">
                <Plus className="h-6 w-6 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No expenses found</h3>
              <p className="text-gray-600">Get started by adding your first expense.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredExpenses.map((expense) => (
                <div key={expense.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                  <div className="flex items-center space-x-4">
                    <div className="h-10 w-10 rounded-lg bg-red-100 flex items-center justify-center">
                      <Plus className="h-5 w-5 text-red-600" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{expense.reason}</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className="text-xs text-gray-500">{expense.date}</span>
                        {expense.receipt && (
                          <span className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded-full">
                            📎 Receipt
                          </span>
                        )}
                      </div>
                    </div>
                    {expense.receiptData && (
                      <div className="ml-4">
                        <img
                          src={expense.receiptData}
                          alt="Receipt"
                          className="h-12 w-12 object-cover rounded border border-gray-200 cursor-pointer hover:scale-105 transition-transform"
                          onClick={() => {
                            // Open receipt in new tab
                            const newWindow = window.open();
                            newWindow.document.write(`<img src="${expense.receiptData}" style="max-width:100%; height:auto;" />`);
                          }}
                        />
                      </div>
                    )}
                  </div>
                  <div className="text-right ml-4">
                    <p className="font-semibold text-red-600">Rs.{parseFloat(expense.amount).toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Add Expense Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md mx-4">
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-xl font-semibold text-gray-900">Add New Expense</h2>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-2 rounded-lg text-gray-500 hover:text-gray-700 hover:bg-gray-100"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Reason *</label>
                <input
                  type="text"
                  required
                  name="reason"
                  value={formData.reason}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="e.g., Lunch at restaurant"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Amount ($) *</label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  required
                  name="amount"
                  value={formData.amount}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="0.00"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Date *</label>
                <input
                  type="date"
                  required
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="form-input"
                  max={new Date().toISOString().split('T')[0]}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Receipt (Optional)</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-gray-400 transition-colors">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                    id="receipt-upload"
                  />
                  <label htmlFor="receipt-upload" className="cursor-pointer">
                    {formData.receipt ? (
                      <div className="space-y-2">
                        <div className="mx-auto h-12 w-12 rounded-lg bg-blue-100 flex items-center justify-center">
                          <Camera className="h-6 w-6 text-blue-600" />
                        </div>
                        <p className="text-sm text-gray-600">{formData.receipt.name}</p>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <Upload className="mx-auto h-12 w-12 text-gray-400" />
                        <p className="text-sm text-gray-600">Click to upload receipt image</p>
                        <p className="text-xs text-gray-500">PNG, JPG up to 10MB</p>
                      </div>
                    )}
                  </label>
                </div>
              </div>

              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 button button-secondary"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex-1 button button-primary"
                >
                  {isLoading ? 'Adding...' : 'Add Expense'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Expenses;
