import React, { useState } from 'react';
import { AlertTriangle, AlertCircle, AlertOctagon, ChevronRight, X } from 'lucide-react';

interface Alert {
  id: number;
  severity: 'critical' | 'warning' | 'info';
  message: string;
  timestamp: string;
  details: string;
  suggestion: string;
}

const mockAlerts: Alert[] = [
  {
    id: 1,
    severity: 'critical',
    message: 'AWS EC2 costs exceeded monthly budget by 30%',
    timestamp: '2024-03-15 09:30:00',
    details: 'The t3.xlarge instances in the us-west-2 region have shown unusually high usage over the past 48 hours.',
    suggestion: 'Consider scaling down underutilized instances or switching to reserved instances for consistent workloads.'
  },
  {
    id: 2,
    severity: 'warning',
    message: 'Azure Storage approaching 90% of allocated budget',
    timestamp: '2024-03-14 14:45:00',
    details: 'The increase in storage costs is primarily due to the retention of unnecessary backup data.',
    suggestion: 'Review and optimize your data retention policies. Consider implementing lifecycle management for older data.'
  },
  {
    id: 3,
    severity: 'info',
    message: 'Google Cloud network egress costs increased by 15%',
    timestamp: '2024-03-13 11:20:00',
    details: 'There has been a significant increase in data transfer from GCP to external networks over the past week.',
    suggestion: "Analyze your application's data transfer patterns and consider using a CDN for frequently accessed content."
  },
  {
    id: 4,
    severity: 'warning',
    message: 'On-premises server utilization below 30%',
    timestamp: '2024-03-12 16:10:00',
    details: 'Several on-premises servers have shown consistently low utilization over the past month.',
    suggestion: 'Evaluate workloads for potential consolidation or migration to cloud services to reduce operational costs.'
  },
  {
    id: 5,
    severity: 'critical',
    message: 'Unexpected spike in data processing costs',
    timestamp: '2024-03-11 08:55:00',
    details: 'A sudden increase in data processing costs has been detected across multiple cloud providers.',
    suggestion: 'Investigate recent changes in data workflows and optimize query patterns to reduce processing overhead.'
  }
];

const severityIcons = {
  critical: <AlertOctagon className="text-red-500" />,
  warning: <AlertTriangle className="text-yellow-500" />,
  info: <AlertCircle className="text-blue-500" />
};

const severityColors = {
  critical: 'bg-red-100 border-red-300',
  warning: 'bg-yellow-100 border-yellow-300',
  info: 'bg-blue-100 border-blue-300'
};

const Alerts: React.FC = () => {
  const [selectedAlert, setSelectedAlert] = useState<Alert | null>(null);

  const handleAlertClick = (alert: Alert) => {
    setSelectedAlert(alert);
  };

  const closeDetails = () => {
    setSelectedAlert(null);
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Cost Alerts</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
              <h2 className="text-xl font-semibold">Recent Alerts</h2>
            </div>
            <ul className="divide-y divide-gray-200">
              {mockAlerts.map((alert) => (
                <li 
                  key={alert.id}
                  className={`px-6 py-4 hover:bg-gray-50 cursor-pointer ${severityColors[alert.severity]} border-l-4`}
                  onClick={() => handleAlertClick(alert)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      {severityIcons[alert.severity]}
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">{alert.message}</p>
                        <p className="text-sm text-gray-500">{alert.timestamp}</p>
                      </div>
                    </div>
                    <ChevronRight className="text-gray-400" />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="md:col-span-1">
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Alert Summary</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="flex items-center">
                  <AlertOctagon className="text-red-500 mr-2" />
                  Critical
                </span>
                <span className="font-semibold">{mockAlerts.filter(a => a.severity === 'critical').length}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center">
                  <AlertTriangle className="text-yellow-500 mr-2" />
                  Warning
                </span>
                <span className="font-semibold">{mockAlerts.filter(a => a.severity === 'warning').length}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center">
                  <AlertCircle className="text-blue-500 mr-2" />
                  Info
                </span>
                <span className="font-semibold">{mockAlerts.filter(a => a.severity === 'info').length}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {selectedAlert && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full" id="my-modal">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3 text-center">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg leading-6 font-medium text-gray-900">Alert Details</h3>
                <button onClick={closeDetails} className="text-gray-400 hover:text-gray-500">
                  <X size={24} />
                </button>
              </div>
              <div className="mt-2 px-7 py-3">
                <p className="text-sm text-gray-500 mb-4">
                  {selectedAlert.message}
                </p>
                <p className="text-sm text-gray-700 mb-2 font-semibold">Details:</p>
                <p className="text-sm text-gray-500 mb-4">
                  {selectedAlert.details}
                </p>
                <p className="text-sm text-gray-700 mb-2 font-semibold">Suggestion:</p>
                <p className="text-sm text-gray-500">
                  {selectedAlert.suggestion}
                </p>
              </div>
              <div className="items-center px-4 py-3">
                <button
                  id="ok-btn"
                  className="px-4 py-2 bg-blue-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
                  onClick={closeDetails}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Alerts;