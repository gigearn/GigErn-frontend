import React, { useState, useEffect } from 'react';
import Icon from '../../components/elements/Icon';

const AdminReports = () => {
  const [reportType, setReportType] = useState('users');
  const [dateRange, setDateRange] = useState('7days');
  const [isGenerating, setIsGenerating] = useState(false);

  const reportTypes = [
    { id: 'users', label: 'Users Report', description: 'All registered users and their status' },
    { id: 'jobs', label: 'Jobs Report', description: 'All jobs and their completion status' },
    { id: 'payments', label: 'Payments Report', description: 'All transactions and payment status' }
  ];

  const dateRanges = [
    { id: 'today', label: 'Today', days: 1 },
    { id: '7days', label: 'Last 7 Days', days: 7 },
    { id: '30days', label: 'Last 30 Days', days: 30 },
    { id: '90days', label: 'Last 90 Days', days: 90 },
    { id: 'all', label: 'All Time', days: 3650 }
  ];

  const generateMockData = (type, days) => {
    const today = new Date();
    const startDate = new Date(today.getTime() - (days * 24 * 60 * 60 * 1000));
    
    switch (type) {
      case 'users':
        return [
          ['User ID', 'Name', 'Email', 'Phone', 'Role', 'Status', 'Verification Status', 'Registered Date', 'Last Active'],
          ['user_001', 'Raj Kumar', 'raj@example.com', '9876543211', 'gig', 'active', 'verified', '2024-01-15', '2024-01-30'],
          ['user_002', 'Priya Singh', 'priya@example.com', '9876543212', 'gig', 'active', 'verified', '2024-01-10', '2024-01-30'],
          ['user_003', 'FreshMart Grocery', 'contact@freshmart.com', '9876543213', 'store', 'active', 'verified', '2024-01-05', '2024-01-30'],
          ['user_004', 'Quick Delivery', 'info@quickdelivery.com', '9876543214', 'store', 'suspended', 'verified', '2024-01-20', '2024-01-28']
        ];
      
      case 'jobs':
        return [
          ['Job ID', 'Store Name', 'Worker Name', 'Status', 'Created Date', 'Completed Date', 'Amount', 'Location'],
          ['job_001', 'FreshMart Grocery', 'Raj Kumar', 'completed', '2024-01-30 14:30', '2024-01-30 16:45', '350', 'Andheri, Mumbai'],
          ['job_002', 'Quick Delivery', 'Priya Singh', 'failed', '2024-01-30 12:15', '', '200', 'Bandra, Mumbai'],
          ['job_003', 'Spice Kitchen', 'Amit Kumar', 'completed', '2024-01-30 10:00', '2024-01-30 11:30', '450', 'Powai, Mumbai'],
          ['job_004', 'E-Commerce Store', 'Suresh Patel', 'stuck', '2024-01-30 09:30', '', '150', 'Thane, Mumbai']
        ];
      
      case 'payments':
        return [
          ['Payment ID', 'Job ID', 'Worker Name', 'Amount', 'Fee', 'Net Amount', 'Status', 'Payment Method', 'Transaction Date'],
          ['pay_001', 'job_001', 'Raj Kumar', '350', '35', '315', 'completed', 'UPI', '2024-01-30 16:50'],
          ['pay_002', 'job_002', 'Priya Singh', '200', '20', '180', 'failed', 'Wallet', '2024-01-30 15:25'],
          ['pay_003', 'job_003', 'Amit Kumar', '450', '45', '405', 'completed', 'Wallet', '2024-01-30 11:35'],
          ['pay_004', 'job_004', 'Suresh Patel', '150', '15', '135', 'stuck', 'UPI', '2024-01-30 13:05']
        ];
      
      default:
        return [];
    }
  };

  const downloadCSV = (data, filename) => {
    const csvContent = data.map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  const handleGenerateReport = async () => {
    setIsGenerating(true);
    
    // Simulate report generation delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const data = generateMockData(reportType, dateRanges.find(r => r.id === dateRange)?.days || 7);
    const filename = `${reportType}_report_${dateRange}_${new Date().toISOString().split('T')[0]}.csv`;
    
    downloadCSV(data, filename);
    setIsGenerating(false);
  };

  const getReportIcon = (type) => {
    switch (type) {
      case 'users': return 'Users';
      case 'jobs': return 'Briefcase';
      case 'payments': return 'CreditCard';
      default: return 'FileText';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Simple CSV Exports</h1>
          <p className="text-muted-foreground">Download system data as CSV files</p>
        </div>
      </div>

      {/* Report Type Selection */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h2 className="text-lg font-semibold text-foreground mb-4">Select Report Type</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {reportTypes.map((type) => (
            <button
              key={type.id}
              onClick={() => setReportType(type.id)}
              className={`p-4 border rounded-lg transition-colors text-left ${
                reportType === type.id
                  ? 'border-primary bg-primary/5'
                  : 'border-border hover:bg-muted/50'
              }`}
            >
              <div className="flex items-center gap-3 mb-2">
                <Icon name={getReportIcon(type.id)} size={20} className={reportType === type.id ? 'text-primary' : 'text-muted-foreground'} />
                <h3 className="font-medium text-foreground">{type.label}</h3>
              </div>
              <p className="text-sm text-muted-foreground">{type.description}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Date Range Selection */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h2 className="text-lg font-semibold text-foreground mb-4">Select Date Range</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {dateRanges.map((range) => (
            <button
              key={range.id}
              onClick={() => setDateRange(range.id)}
              className={`px-4 py-2 border rounded-lg transition-colors ${
                dateRange === range.id
                  ? 'border-primary bg-primary text-primary-foreground'
                  : 'border-border hover:bg-muted'
              }`}
            >
              {range.label}
            </button>
          ))}
        </div>
      </div>

      {/* Report Preview */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h2 className="text-lg font-semibold text-foreground mb-4">Report Preview</h2>
        <div className="bg-muted/20 rounded-lg p-4">
          <div className="text-sm text-muted-foreground space-y-2">
            <p><strong>Report Type:</strong> {reportTypes.find(t => t.id === reportType)?.label}</p>
            <p><strong>Date Range:</strong> {dateRanges.find(r => r.id === dateRange)?.label}</p>
            <p><strong>Format:</strong> CSV (Comma Separated Values)</p>
            <p><strong>Columns:</strong> {generateMockData(reportType, 7)[0]?.join(', ')}</p>
          </div>
        </div>
      </div>

      {/* Generate Button */}
      <div className="flex justify-center">
        <button
          onClick={handleGenerateReport}
          disabled={isGenerating}
          className="px-8 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          {isGenerating ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-foreground"></div>
              Generating Report...
            </>
          ) : (
            <>
              <Icon name="Download" size={20} />
              Generate & Download CSV
            </>
          )}
        </button>
      </div>

      {/* Instructions */}
      <div className="bg-muted/20 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-3">How to Use Reports</h3>
        <div className="space-y-3 text-sm text-muted-foreground">
          <div className="flex items-start gap-3">
            <Icon name="CheckCircle" size={16} className="text-success mt-0.5" />
            <div>
              <strong>Select Report Type:</strong> Choose between Users, Jobs, or Payments reports
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Icon name="CheckCircle" size={16} className="text-success mt-0.5" />
            <div>
              <strong>Choose Date Range:</strong> Select the time period for the report data
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Icon name="CheckCircle" size={16} className="text-success mt-0.5" />
            <div>
              <strong>Generate & Download:</strong> Click the button to create and download the CSV file
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Icon name="CheckCircle" size={16} className="text-success mt-0.5" />
            <div>
              <strong>Open in Excel:</strong> CSV files can be opened in Excel, Google Sheets, or any spreadsheet application
            </div>
          </div>
        </div>
      </div>

      {/* Recent Downloads */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Recent Downloads</h3>
        <div className="text-center py-8">
          <Icon name="Download" size={48} className="text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">No recent downloads</p>
          <p className="text-sm text-muted-foreground mt-2">Generated reports will appear here</p>
        </div>
      </div>
    </div>
  );
};

export default AdminReports;
