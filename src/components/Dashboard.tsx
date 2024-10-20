import React from 'react';
import { BarChart, PieChart, LineChart, AlertTriangle } from 'lucide-react';
import ExpenseBarChart from './ExpenseBarChart';
import BudgetPieChart from './BudgetPieChart';
import SpendingTrendChart from './SpendingTrendChart';
import AlertPanel from './AlertPanel';

const Dashboard: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Hybrid Cloud FinOps Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <BarChart className="mr-2" size={24} />
            Cloud vs On-Premises Expenses
          </h2>
          <ExpenseBarChart />
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <PieChart className="mr-2" size={24} />
            Budget Breakdown
          </h2>
          <BudgetPieChart />
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 md:col-span-2">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <LineChart className="mr-2" size={24} />
            Spending Trends (Last 30 Days)
          </h2>
          <SpendingTrendChart />
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 md:col-span-2">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <AlertTriangle className="mr-2" size={24} />
            Cost Spike Alerts
          </h2>
          <AlertPanel />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;