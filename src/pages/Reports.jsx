import React, { useState } from 'react';
import { Download, FileText, Calendar, Filter, TrendingUp, TrendingDown, DollarSign } from 'lucide-react';

const Reports = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('monthly');
  const [reportType, setReportType] = useState('summary');

  const reports = [
    {
      id: 1,
      name: 'Monthly Expense Report',
      type: 'monthly',
      date: '2026-01-01',
      status: 'completed',
      downloadUrl: '#'
    },
    {
      id: 2,
      name: 'Category Analysis',
      type: 'category',
      date: '2026-01-15',
      status: 'completed',
      downloadUrl: '#'
    },
    {
      id: 3,
      name: 'Yearly Summary',
      type: 'yearly',
      date: '2025-12-31',
      status: 'completed',
      downloadUrl: '#'
    }
  ];

  const generateReport = () => {
    // Mock report generation
    alert(`Generating ${reportType} report for ${selectedPeriod} period...`);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Reports</h1>
          <p className="text-gray-600">Generate and download financial reports</p>
        </div>
        <button
          onClick={generateReport}
          className="btn btn-primary flex items-center space-x-2"
        >
          <FileText className="h-4 w-4" />
          <span>Generate Report</span>
        </button>
      </div>

      {/* Report Generation Options */}
      <div className="card">
        <div className="card-header">
          <h3 className="text-lg font-semibold text-gray-900">Generate New Report</h3>
        </div>
        <div className="card-body">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Report Type</label>
              <select
                value={reportType}
                onChange={(e) => setReportType(e.target.value)}
                className="input"
              >
                <option value="summary">Summary Report</option>
                <option value="detailed">Detailed Report</option>
                <option value="category">Category Analysis</option>
                <option value="trend">Trend Analysis</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Period</label>
              <select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="input"
              >
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
                <option value="quarterly">Quarterly</option>
                <option value="yearly">Yearly</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="card">
          <div className="card-body">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Reports</p>
                <p className="text-2xl font-bold text-gray-900">{reports.length}</p>
              </div>
              <div className="h-12 w-12 rounded-lg bg-blue-100 flex items-center justify-center">
                <FileText className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-body">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">This Month</p>
                <p className="text-2xl font-bold text-gray-900">2</p>
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
                <p className="text-sm font-medium text-gray-600">Last Generated</p>
                <p className="text-2xl font-bold text-gray-900">Jan 15</p>
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
                <p className="text-sm font-medium text-gray-600">Downloads</p>
                <p className="text-2xl font-bold text-gray-900">47</p>
              </div>
              <div className="h-12 w-12 rounded-lg bg-orange-100 flex items-center justify-center">
                <Download className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Reports List */}
      <div className="card">
        <div className="card-header">
          <h3 className="text-lg font-semibold text-gray-900">Recent Reports</h3>
        </div>
        <div className="card-body">
          <div className="space-y-4">
            {reports.map((report) => (
              <div key={report.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                <div className="flex items-center space-x-4">
                  <div className="h-10 w-10 rounded-lg bg-blue-100 flex items-center justify-center">
                    <FileText className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{report.name}</p>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className="text-xs text-gray-500">{report.date}</span>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        report.status === 'completed' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {report.status}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button className="btn btn-secondary btn-sm">
                    <Download className="h-4 w-4 mr-1" />
                    Download
                  </button>
                  <button className="btn btn-secondary btn-sm">
                    View
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Report Templates */}
      <div className="card">
        <div className="card-header">
          <h3 className="text-lg font-semibold text-gray-900">Report Templates</h3>
        </div>
        <div className="card-body">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 cursor-pointer transition-colors">
              <div className="flex items-center space-x-3 mb-2">
                <DollarSign className="h-5 w-5 text-green-600" />
                <h4 className="font-medium text-gray-900">Expense Summary</h4>
              </div>
              <p className="text-sm text-gray-600">Monthly overview of all expenses with category breakdown</p>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 cursor-pointer transition-colors">
              <div className="flex items-center space-x-3 mb-2">
                <TrendingUp className="h-5 w-5 text-blue-600" />
                <h4 className="font-medium text-gray-900">Trend Analysis</h4>
              </div>
              <p className="text-sm text-gray-600">Year-over-year comparison and spending trends</p>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 cursor-pointer transition-colors">
              <div className="flex items-center space-x-3 mb-2">
                <FileText className="h-5 w-5 text-purple-600" />
                <h4 className="font-medium text-gray-900">Tax Report</h4>
              </div>
              <p className="text-sm text-gray-600">Tax-deductible expenses and financial summary</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;
