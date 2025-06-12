import { NavLink, useLocation } from 'react-router-dom';
import { LayoutDashboard, Users, Building2, BarChart3 } from 'lucide-react';
import { cn } from '@/lib/utils';

const navigation = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
  { name: 'Employees', href: '/employees', icon: Users },
  { name: 'Departments', href: '/departments', icon: Building2 },
  { name: 'Analytics', href: '/analytics', icon: BarChart3 },
];

const Sidebar = () => {
  const location = useLocation();

  return (
    <div className="fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-slate-200 shadow-sm">
      {/* Logo */}
      <div className="flex items-center justify-center h-16 px-6 border-b border-slate-200">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg flex items-center justify-center">
            <Users className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900">EmployeeMS</h2>
            <p className="text-xs text-slate-500">Management System</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="p-6 space-y-2">
        {navigation.map((item) => {
          const isActive = item.href === '/' 
            ? location.pathname === '/' 
            : location.pathname.startsWith(item.href);
          
          return (
            <NavLink
              key={item.name}
              to={item.href}
              className={cn(
                "flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 group",
                isActive
                  ? "bg-primary-50 text-primary-700 shadow-sm border border-primary-100"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              )}
            >
              <item.icon className={cn(
                "mr-3 h-5 w-5 transition-colors",
                isActive ? "text-primary-600" : "text-slate-400 group-hover:text-slate-600"
              )} />
              {item.name}
              {isActive && (
                <div className="ml-auto w-2 h-2 bg-primary-500 rounded-full"></div>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="absolute bottom-6 left-6 right-6">
        <div className="bg-gradient-to-r from-primary-50 to-indigo-50 p-4 rounded-xl border border-primary-100">
          <div className="text-sm text-slate-600">
            <p className="font-medium text-slate-900">Need Help?</p>
            <p className="text-xs mt-1">Contact support team</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;