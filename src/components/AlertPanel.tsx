import React from 'react';
import { AlertCircle } from 'lucide-react';

const alerts = [
  { id: 1, message: 'Unusual spike in cloud compute costs detected', timestamp: '2024-03-15 09:30:00' },
  { id: 2, message: 'On-premises storage approaching capacity limit', timestamp: '2024-03-14 14:45:00' },
  { id: 3, message: 'Network traffic costs exceeded monthly budget', timestamp: '2024-03-13 11:20:00' },
];

const AlertPanel: React.FC = () => {
  return (
    <div className="space-y-4">
      {alerts.map((alert) => (
        <div key={alert.id} className="flex items-start p-4 bg-red-100 rounded-lg">
          <AlertCircle className="text-red-600 mr-3 flex-shrink-0" size={24} />
          <div>
            <p className="text-red-800 font-semibold">{alert.message}</p>
            <p className="text-red-600 text-sm">{alert.timestamp}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AlertPanel;