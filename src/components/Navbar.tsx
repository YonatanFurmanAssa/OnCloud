import React from 'react';
import { Link } from 'react-router-dom';
import { Search, AlertTriangle, Receipt, MessageCircleQuestion, Settings } from 'lucide-react';

const navItems = [
  { name: 'Analysis', icon: Search, path: '/analysis' },
  { name: 'Alerts', icon: AlertTriangle, path: '/alerts' },
  { name: 'Budget', icon: Receipt, path: '/budget' },
  { name: 'Recommendations', icon: MessageCircleQuestion, path: '/recommendations' },
  { name: 'Settings', icon: Settings, path: '/settings' },
];

const Navbar: React.FC = () => {
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link to="/" className="text-xl font-bold text-gray-800">FinOps</Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className="text-gray-600 hover:bg-gray-100 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium flex items-center"
                >
                  <item.icon className="mr-2" size={18} />
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="md:hidden">
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className="text-gray-600 hover:bg-gray-100 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium flex items-center"
            >
              <item.icon className="mr-2" size={18} />
              {item.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;