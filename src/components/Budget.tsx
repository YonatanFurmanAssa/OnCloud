import React, { useState } from 'react';
import { DollarSign, Cloud, Server, Bell, Plus, Edit2 } from 'lucide-react';

interface BudgetItem {
  id: number;
  service: string;
  environment: 'cloud' | 'on-premises';
  budget: number;
  spent: number;
  alertThreshold: number;
}

const initialBudgets: BudgetItem[] = [
  { id: 1, service: 'AWS EC2', environment: 'cloud', budget: 10000, spent: 8500, alertThreshold: 80 },
  { id: 2, service: 'Azure Storage', environment: 'cloud', budget: 5000, spent: 3200, alertThreshold: 75 },
  { id: 3, service: 'On-Prem Servers', environment: 'on-premises', budget: 15000, spent: 12000, alertThreshold: 85 },
  { id: 4, service: 'Google Cloud Networking', environment: 'cloud', budget: 3000, spent: 1800, alertThreshold: 70 },
];

const Budget: React.FC = () => {
  const [budgets, setBudgets] = useState<BudgetItem[]>(initialBudgets);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBudget, setEditingBudget] = useState<BudgetItem | null>(null);

  const handleEditBudget = (budget: BudgetItem) => {
    setEditingBudget(budget);
    setIsModalOpen(true);
  };

  const handleAddNewBudget = () => {
    setEditingBudget(null);
    setIsModalOpen(true);
  };

  const handleSaveBudget = (updatedBudget: BudgetItem) => {
    if (editingBudget) {
      setBudgets(budgets.map(b => b.id === updatedBudget.id ? updatedBudget : b));
    } else {
      setBudgets([...budgets, { ...updatedBudget, id: budgets.length + 1 }]);
    }
    setIsModalOpen(false);
  };

  const getBudgetStatus = (spent: number, budget: number) => {
    const percentage = (spent / budget) * 100;
    if (percentage < 70) return 'bg-green-500';
    if (percentage < 90) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Budget Management</h1>
        <button
          onClick={handleAddNewBudget}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded flex items-center"
        >
          <Plus size={20} className="mr-2" />
          Add New Budget
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {budgets.map((budget) => (
          <div key={budget.id} className="bg-white shadow-md rounded-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold flex items-center">
                {budget.environment === 'cloud' ? <Cloud className="mr-2" /> : <Server className="mr-2" />}
                {budget.service}
              </h2>
              <button
                onClick={() => handleEditBudget(budget)}
                className="text-gray-500 hover:text-gray-700"
              >
                <Edit2 size={20} />
              </button>
            </div>
            <div className="mb-4">
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Budget</span>
                <span className="font-semibold">${budget.budget.toLocaleString()}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Spent</span>
                <span className="font-semibold">${budget.spent.toLocaleString()}</span>
              </div>
              <div className="relative pt-1">
                <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-200">
                  <div
                    style={{ width: `${(budget.spent / budget.budget) * 100}%` }}
                    className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center ${getBudgetStatus(budget.spent, budget.budget)}`}
                  ></div>
                </div>
              </div>
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <Bell size={16} className="mr-2" />
              Alert at {budget.alertThreshold}% of budget
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full" id="my-modal">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <BudgetForm
              budget={editingBudget}
              onSave={handleSaveBudget}
              onCancel={() => setIsModalOpen(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

interface BudgetFormProps {
  budget: BudgetItem | null;
  onSave: (budget: BudgetItem) => void;
  onCancel: () => void;
}

const BudgetForm: React.FC<BudgetFormProps> = ({ budget, onSave, onCancel }) => {
  const [formData, setFormData] = useState<Partial<BudgetItem>>(
    budget || { service: '', environment: 'cloud', budget: 0, spent: 0, alertThreshold: 80 }
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: name === 'budget' || name === 'alertThreshold' ? Number(value) : value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData as BudgetItem);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-xl font-bold mb-4">{budget ? 'Edit Budget' : 'Add New Budget'}</h2>
      <div>
        <label className="block text-sm font-medium text-gray-700">Service</label>
        <input
          type="text"
          name="service"
          value={formData.service}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Environment</label>
        <select
          name="environment"
          value={formData.environment}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
        >
          <option value="cloud">Cloud</option>
          <option value="on-premises">On-Premises</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Budget ($)</label>
        <input
          type="number"
          name="budget"
          value={formData.budget}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          required
          min="0"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Alert Threshold (%)</label>
        <input
          type="number"
          name="alertThreshold"
          value={formData.alertThreshold}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          required
          min="0"
          max="100"
        />
      </div>
      <div className="flex justify-end space-x-2">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          Save
        </button>
      </div>
    </form>
  );
};

export default Budget;