import React, { useState } from 'react';
import { Target, TrendingUp, AlertTriangle, CheckCircle, Plus, Edit2, Trash2 } from 'lucide-react';

const Budget = () => {
  const [budgets, setBudgets] = useState([
    {
      id: 1,
      category: 'Food & Dining',
      allocated: 500,
      spent: 342.50,
      period: 'monthly'
    },
    {
      id: 2,
      category: 'Transportation',
      allocated: 200,
      spent: 156.00,
      period: 'monthly'
    },
    {
      id: 3,
      category: 'Entertainment',
      allocated: 150,
      spent: 189.30,
      period: 'monthly'
    },
    {
      id: 4,
      category: 'Utilities',
      allocated: 300,
      spent: 278.90,
      period: 'monthly'
    },
    {
      id: 5,
      category: 'Healthcare',
      allocated: 100,
      spent: 45.00,
      period: 'monthly'
    }
  ]);

  const [showAddBudget, setShowAddBudget] = useState(false);
  const [newBudget, setNewBudget] = useState({
    category: '',
    allocated: '',
    period: 'monthly'
  });

  const getBudgetStatus = (allocated, spent) => {
    const percentage = (spent / allocated) * 100;
    if (percentage >= 100) return { status: 'exceeded', color: 'red', icon: AlertTriangle };
    if (percentage >= 80) return { status: 'warning', color: 'yellow', icon: AlertTriangle };
    return { status: 'on-track', color: 'green', icon: CheckCircle };
  };

  const getProgressBarColor = (allocated, spent) => {
    const percentage = (spent / allocated) * 100;
    if (percentage >= 100) return 'bg-red-500';
    if (percentage >= 80) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const totalAllocated = budgets.reduce((sum, budget) => sum + budget.allocated, 0);
  const totalSpent = budgets.reduce((sum, budget) => sum + budget.spent, 0);
  const totalRemaining = totalAllocated - totalSpent;

  const handleAddBudget = () => {
    if (newBudget.category && newBudget.allocated) {
      const budget = {
        id: budgets.length + 1,
        category: newBudget.category,
        allocated: parseFloat(newBudget.allocated),
        spent: 0,
        period: newBudget.period
      };
      setBudgets([...budgets, budget]);
      setNewBudget({ category: '', allocated: '', period: 'monthly' });
      setShowAddBudget(false);
    }
  };

  const handleDeleteBudget = (id) => {
    setBudgets(budgets.filter(budget => budget.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Budget</h1>
          <p className="text-gray-600">Manage and track your spending limits</p>
        </div>
        <button
          onClick={() => setShowAddBudget(true)}
          className="btn btn-primary flex items-center space-x-2"
        >
          <Plus className="h-4 w-4" />
          <span>Add Budget</span>
        </button>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="card">
          <div className="card-body">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Budget</p>
                <p className="text-2xl font-bold text-gray-900">${totalAllocated.toFixed(2)}</p>
              </div>
              <div className="h-12 w-12 rounded-lg bg-blue-100 flex items-center justify-center">
                <Target className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-body">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Spent</p>
                <p className="text-2xl font-bold text-gray-900">${totalSpent.toFixed(2)}</p>
              </div>
              <div className="h-12 w-12 rounded-lg bg-orange-100 flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-body">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Remaining</p>
                <p className={`text-2xl font-bold ${totalRemaining >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  ${Math.abs(totalRemaining).toFixed(2)}
                </p>
              </div>
              <div className={`h-12 w-12 rounded-lg flex items-center justify-center ${
                totalRemaining >= 0 ? 'bg-green-100' : 'bg-red-100'
              }`}>
                <CheckCircle className={`h-6 w-6 ${totalRemaining >= 0 ? 'text-green-600' : 'text-red-600'}`} />
              </div>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-body">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Over Budget</p>
                <p className="text-2xl font-bold text-red-600">
                  {budgets.filter(b => b.spent > b.allocated).length}
                </p>
              </div>
              <div className="h-12 w-12 rounded-lg bg-red-100 flex items-center justify-center">
                <AlertTriangle className="h-6 w-6 text-red-600" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Budget List */}
      <div className="card">
        <div className="card-header">
          <h3 className="text-lg font-semibold text-gray-900">Budget Categories</h3>
        </div>
        <div className="card-body">
          <div className="space-y-4">
            {budgets.map((budget) => {
              const percentage = (budget.spent / budget.allocated) * 100;
              const status = getBudgetStatus(budget.allocated, budget.spent);
              const remaining = budget.allocated - budget.spent;

              return (
                <div key={budget.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <status.icon className={`h-5 w-5 text-${status.color}-600`} />
                      <div>
                        <h4 className="font-medium text-gray-900">{budget.category}</h4>
                        <p className="text-sm text-gray-600">{budget.period}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded">
                        <Edit2 className="h-4 w-4" />
                      </button>
                      <button 
                        onClick={() => handleDeleteBudget(budget.id)}
                        className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Spent: ${budget.spent.toFixed(2)}</span>
                      <span className="text-gray-600">Allocated: ${budget.allocated.toFixed(2)}</span>
                    </div>
                    
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full transition-all duration-300 ${getProgressBarColor(budget.allocated, budget.spent)}`}
                        style={{ width: `${Math.min(percentage, 100)}%` }}
                      ></div>
                    </div>

                    <div className="flex justify-between text-sm">
                      <span className={`font-medium ${
                        status.status === 'exceeded' ? 'text-red-600' : 
                        status.status === 'warning' ? 'text-yellow-600' : 'text-green-600'
                      }`}>
                        {percentage.toFixed(1)}% used
                      </span>
                      <span className={`font-medium ${
                        remaining >= 0 ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {remaining >= 0 ? '$' + remaining.toFixed(2) + ' left' : '$' + Math.abs(remaining).toFixed(2) + ' over'}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Add Budget Modal */}
      {showAddBudget && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md mx-4">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Add New Budget</h2>
              <button
                onClick={() => setShowAddBudget(false)}
                className="p-2 rounded-lg text-gray-500 hover:text-gray-700 hover:bg-gray-100"
              >
                ×
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <input
                  type="text"
                  value={newBudget.category}
                  onChange={(e) => setNewBudget({ ...newBudget, category: e.target.value })}
                  className="input"
                  placeholder="e.g., Food & Dining"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Allocated Amount</label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  value={newBudget.allocated}
                  onChange={(e) => setNewBudget({ ...newBudget, allocated: e.target.value })}
                  className="input"
                  placeholder="0.00"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Period</label>
                <select
                  value={newBudget.period}
                  onChange={(e) => setNewBudget({ ...newBudget, period: e.target.value })}
                  className="input"
                >
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                  <option value="yearly">Yearly</option>
                </select>
              </div>

              <div className="flex space-x-3 pt-4">
                <button
                  onClick={() => setShowAddBudget(false)}
                  className="flex-1 btn btn-secondary"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddBudget}
                  className="flex-1 btn btn-primary"
                >
                  Add Budget
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Budget;
