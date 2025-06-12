import { useLocation } from 'react-router-dom';
import { Calendar, Clock } from 'lucide-react';

const Header = () => {
  const location = useLocation();
  
  const getPageTitle = () => {
    switch (location.pathname) {
      case '/': return 'Dashboard';
      case '/employees': return 'Employees';
      case '/departments': return 'Departments';
      case '/analytics': return 'Analytics';
      default: return 'Employee Management';
    }
  };

  const getCurrentDate = () => {
    return new Date().toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getCurrentTime = () => {
    return new Date().toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <header className="bg-white border-b border-slate-200 px-8 py-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">{getPageTitle()}</h1>
          <p className="text-sm text-slate-500 mt-1">
            Manage your workforce efficiently
          </p>
        </div>
        
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-4 text-sm text-slate-600">
            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4" />
              <span>{getCurrentDate()}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4" />
              <span>{getCurrentTime()}</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;