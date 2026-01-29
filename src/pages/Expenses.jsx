import React, { useState, useEffect } from 'react';
import { Plus, Search, Filter, Download, Calendar, DollarSign, TrendingUp, TrendingDown, X, Camera, Upload } from 'lucide-react';
import { expensesAPI } from '../services/api';

const Expenses = () => {
  const [expenses, setExpenses] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    reason: '',
    amount: '',
    date: new Date().toISOString().split('T')[0],
    receipt: null
  });

  useEffect(() => {
    fetchExpenses();
  }, [selectedDate]);

  const fetchExpenses = async () => {
    try {
      const response = await expensesAPI.getAll(selectedDate);
      setExpenses(response.data);
    } catch (error) {
      console.error('Error fetching expenses:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form submitted with data:', formData);
    setIsLoading(true);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('reason', formData.reason);
      formDataToSend.append('amount', formData.amount);
      formDataToSend.append('date', formData.date);
      if (formData.receipt) {
        formDataToSend.append('receipt', formData.receipt);
      }

      console.log('Sending to API:', formDataToSend);
      const response = await expensesAPI.add(formDataToSend);
      console.log('API Response:', response);

      if (response.status === 200) {
        setShowAddModal(false);
        setFormData({ reason: '', amount: '', date: new Date().toISOString().split('T')[0], receipt: null });
        fetchExpenses();
        alert('Expense added successfully!');
      }
    } catch (error) {
      console.error('Error adding expense:', error);
      alert('Error adding expense: ' + (error.response?.data?.message || error.message));
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, receipt: e.target.files[0] });
  };

  const totalExpenses = expenses.reduce((sum, expense) => sum + parseFloat(expense.amount), 0);
  const filteredExpenses = expenses.filter(expense =>
    expense.reason.toLowerCase().includes(searchTerm.toLowerCase())
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
          onClick={() => {
            console.log('Add Expense button clicked');
            setShowAddModal(true);
          }}
          className="btn btn-primary flex items-center space-x-2"
        >
          <Plus className="h-4 w-4" />
          <span>Add Expense</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card">
          <div className="card-body">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Today's Total</p>
                <p className="text-2xl font-bold text-gray-900">${totalExpenses.toFixed(2)}</p>
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
                <p className="text-sm font-medium text-gray-600">Transactions</p>
                <p className="text-2xl font-bold text-gray-900">{expenses.length}</p>
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
                <p className="text-sm font-medium text-gray-600">Average</p>
                <p className="text-2xl font-bold text-gray-900">
                  ${expenses.length > 0 ? (totalExpenses / expenses.length).toFixed(2) : '0.00'}
                </p>
              </div>
              <div className="h-12 w-12 rounded-lg bg-purple-100 flex items-center justify-center">
                <TrendingDown className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="card">
        <div className="card-body">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search expenses..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="input pl-10"
                />
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="input"
              />
              <button className="btn btn-secondary">
                <Filter className="h-4 w-4" />
              </button>
              <button className="btn btn-secondary">
                <Download className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Expenses List */}
      <div className="card">
        <div className="card-header">
          <h2 className="text-lg font-semibold text-gray-900">Expense List</h2>
        </div>
        <div className="card-body">
          {filteredExpenses.length === 0 ? (
            <div className="text-center py-12">
              <div className="mx-auto h-12 w-12 rounded-lg bg-gray-100 flex items-center justify-center mb-4">
                <DollarSign className="h-6 w-6 text-gray-400" />
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
                      <TrendingUp className="h-5 w-5 text-red-600" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{expense.reason}</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className="text-xs text-gray-500">{expense.expense_date}</span>
                        {expense.receipt_image && (
                          <span className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded-full">
                            📎 Receipt
                          </span>
                        )}
                      </div>
                    </div>
                    {expense.receipt_image && (
                      <div className="ml-4">
                        <img
                          src={`http://localhost:3000/uploads/${expense.receipt_image}`}
                          alt="Receipt"
                          className="h-12 w-12 object-cover rounded border border-gray-200 cursor-pointer hover:scale-105 transition-transform"
                          onClick={() => {
                            window.open(`http://localhost:3000/uploads/${expense.receipt_image}`, '_blank');
                          }}
                        />
                      </div>
                    )}
                  </div>
                  <div className="text-right ml-4">
                    <p className="font-semibold text-red-600">${parseFloat(expense.amount).toFixed(2)}</p>
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
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Add New Expense</h2>
              <button
                onClick={() => {
                  console.log('Close modal clicked');
                  setShowAddModal(false);
                }}
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
                  value={formData.reason}
                  onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                  className="input"
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
                  value={formData.amount}
                  onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                  className="input"
                  placeholder="0.00"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Date *</label>
                <input
                  type="date"
                  required
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="input"
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
                      <div className="flex items-center justify-center space-x-2">
                        <Camera className="h-5 w-5 text-green-600" />
                        <span className="text-sm text-green-600">{formData.receipt.name}</span>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center space-y-2">
                        <Upload className="h-8 w-8 text-gray-400" />
                        <span className="text-sm text-gray-600">Click to upload receipt</span>
                        <span className="text-xs text-gray-500">PNG, JPG up to 10MB</span>
                      </div>
                    )}
                  </label>
                </div>
              </div>

              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 btn btn-secondary"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex-1 btn btn-primary"
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
