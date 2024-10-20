import React, { useState } from 'react';
import { Calendar, Filter, ChevronDown, ChevronRight } from 'lucide-react';

interface CostItem {
  id: string;
  name: string;
  category: string;
  provider: string;
  cost: number;
}

const mockData: CostItem[] = [
  { id: '1', name: 'EC2 Instances', category: 'Compute', provider: 'AWS', cost: 5000 },
  { id: '2', name: 'S3 Storage', category: 'Storage', provider: 'AWS', cost: 2000 },
  { id: '3', name: 'Azure VMs', category: 'Compute', provider: 'Azure', cost: 4500 },
  { id: '4', name: 'On-Prem Servers', category: 'Compute', provider: 'On-Premises', cost: 3000 },
  { id: '5', name: 'Network Devices', category: 'Networking', provider: 'On-Premises', cost: 1500 },
];

const Analysis: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState('Last 30 days');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedProvider, setSelectedProvider] = useState('All');
  const [expandedItem, setExpandedItem] = useState<string | null>(null);

  const filteredData = mockData.filter(item => 
    (selectedCategory === 'All' || item.category === selectedCategory) &&
    (selectedProvider === 'All' || item.provider === selectedProvider)
  );

  const totalCost = filteredData.reduce((sum, item) => sum + item.cost, 0);

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Cost Analysis</h1>
      
      <div className="mb-6 flex flex-wrap gap-4">
        <div className="relative">
          <select
            className="appearance-none bg-white border border-gray-300 rounded-md py-2 pl-3 pr-10 text-sm leading-5 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          >
            <option>Last 7 days</option>
            <option>Last 30 days</option>
            <option>Last 3 months</option>
            <option>Last 12 months</option>
          </select>
          <Calendar className="absolute right-3 top-2 pointer-events-none" size={20} />
        </div>
        
        <div className="relative">
          <select
            className="appearance-none bg-white border border-gray-300 rounded-md py-2 pl-3 pr-10 text-sm leading-5 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option>All</option>
            <option>Compute</option>
            <option>Storage</option>
            <option>Networking</option>
          </select>
          <Filter className="absolute right-3 top-2 pointer-events-none" size={20} />
        </div>
        
        <div className="relative">
          <select
            className="appearance-none bg-white border border-gray-300 rounded-md py-2 pl-3 pr-10 text-sm leading-5 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={selectedProvider}
            onChange={(e) => setSelectedProvider(e.target.value)}
          >
            <option>All</option>
            <option>AWS</option>
            <option>Azure</option>
            <option>On-Premises</option>
          </select>
          <Filter className="absolute right-3 top-2 pointer-events-none" size={20} />
        </div>
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 font-semibold text-lg">
          Total Cost: ${totalCost.toLocaleString()}
        </div>
        <ul>
          {filteredData.map((item) => (
            <li key={item.id} className="border-b border-gray-200 last:border-b-0">
              <div 
                className="px-6 py-4 flex items-center justify-between cursor-pointer hover:bg-gray-50"
                onClick={() => setExpandedItem(expandedItem === item.id ? null : item.id)}
              >
                <div>
                  <h3 className="text-lg font-semibold">{item.name}</h3>
                  <p className="text-sm text-gray-600">{item.category} | {item.provider}</p>
                </div>
                <div className="flex items-center">
                  <span className="font-semibold mr-4">${item.cost.toLocaleString()}</span>
                  {expandedItem === item.id ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
                </div>
              </div>
              {expandedItem === item.id && (
                <div className="px-6 py-4 bg-gray-50">
                  <p className="text-sm text-gray-700">
                    Detailed usage statistics and further breakdown would be displayed here.
                    This could include graphs, usage patterns, and cost optimization recommendations.
                  </p>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Analysis;