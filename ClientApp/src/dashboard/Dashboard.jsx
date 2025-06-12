import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, Building2, UserCheck, TrendingUp, Plus, ArrowUpRight } from 'lucide-react';
import { getAllEmployees } from '@/services/api/api-employee';
import { getAllDepartments } from '@/services/api/api-department';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const Dashboard = () => {
  const [employees, setEmployees] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [employeesRes, departmentsRes] = await Promise.all([
          getAllEmployees(),
          getAllDepartments()
        ]);
        setEmployees(employeesRes.data);
        setDepartments(departmentsRes.data);
      } catch (error) {
        toast.error('Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="space-y-8">
        <div className="text-center py-16">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-slate-500">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  const activeEmployees = employees.filter(emp => emp.status);
  const totalSalary = employees.reduce((sum, emp) => sum + emp.salary, 0);
  const avgSalary = employees.length > 0 ? totalSalary / employees.length : 0;

  const recentEmployees = employees
    .sort((a, b) => new Date(b.joiningDate) - new Date(a.joiningDate))
    .slice(0, 5);

  const departmentStats = departments.map(dept => ({
    ...dept,
    employees: employees.filter(emp => emp.departmentId === dept.departmentId)
  }));

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-purple-400 to-indigo-600 rounded-2xl p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Welcome back!</h1>
            <p className="text-primary-100">Here's what's happening with your workforce today.</p>
          </div>
          <div className="hidden md:block">
            <div className="w-32 h-32 bg-white/10 rounded-full flex items-center justify-center">
              <Users className="w-16 h-16 text-white/80" />
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200 shadow-soft hover:shadow-glow transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-600">Total Employees</p>
                <p className="text-3xl font-bold text-blue-900">{employees.length}</p>
                <p className="text-xs text-blue-500 mt-1">+2.5% from last month</p>
              </div>
              <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center">
                <Users className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-emerald-50 to-green-50 border-emerald-200 shadow-soft hover:shadow-glow transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-emerald-600">Active Employees</p>
                <p className="text-3xl font-bold text-emerald-900">{activeEmployees.length}</p>
                <p className="text-xs text-emerald-500 mt-1">{employees.length - activeEmployees.length} inactive</p>
              </div>
              <div className="w-12 h-12 bg-emerald-500 rounded-xl flex items-center justify-center">
                <UserCheck className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-violet-50 border-purple-200 shadow-soft hover:shadow-glow transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-600">Departments</p>
                <p className="text-3xl font-bold text-purple-900">{departments.length}</p>
                <p className="text-xs text-purple-500 mt-1">Across organization</p>
              </div>
              <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center">
                <Building2 className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-amber-50 border-orange-200 shadow-soft hover:shadow-glow transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-orange-600">Avg. Salary</p>
                <p className="text-3xl font-bold text-orange-900">
                  ${avgSalary.toLocaleString('en-US', { maximumFractionDigits: 0 })}
                </p>
                <p className="text-xs text-orange-500 mt-1">+5.2% from last year</p>
              </div>
              <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Employees */}
        <Card className="bg-white border-slate-200 shadow-soft">
          <CardHeader className="border-b border-slate-100">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-semibold text-slate-900">Recent Hires</CardTitle>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => navigate('/employees')}
                className="cursor-pointer text-primary-600 hover:text-primary-700"
              >
                View All
                <ArrowUpRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              {recentEmployees.map((employee) => (
                <div key={employee.employeeId} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-slate-50 transition-colors">
                  <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg flex items-center justify-center text-primary font-medium">
                    {employee.name.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-slate-900 truncate">{employee.name}</p>
                    <p className="text-sm text-slate-500 truncate">{employee.role}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-slate-600">{employee.departmentName}</p>
                    <p className="text-xs text-slate-400">
                      {new Date(employee.joiningDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Department Overview */}
        <Card className="bg-white border-slate-200 shadow-soft">
          <CardHeader className="border-b border-slate-100">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-semibold text-slate-900">Department Overview</CardTitle>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => navigate('/departments')}
                className="cursor-pointer text-primary-600 hover:text-primary-700"
              >
                View All
                <ArrowUpRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              {departmentStats.map((dept) => (
                <div key={dept.departmentId} className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-50 transition-colors">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                    <span className="font-medium text-slate-900">{dept.name}</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                         <p className="text-sm font-medium text-slate-600">{dept.employeeCount || 0} employees</p>
                </div>
                <div className="w-16 bg-slate-200 rounded-full h-2">
                  <div
                    className="bg-primary-500 h-2 rounded-full transition-all duration-300"
                    style={{
                      width: `${Math.min((dept.employeeCount / Math.max(...departmentStats.map(d => d.employeeCount || 0))) * 100, 100)}%`,
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  </div>

  {/* Quick Actions */}
  <Card className="bg-gradient-to-r from-slate-50 to-white border-slate-200 shadow-soft">
    <CardHeader>
      <CardTitle className="text-lg font-semibold text-slate-900">Quick Actions</CardTitle>
    </CardHeader>
    <CardContent className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Button 
          onClick={() => navigate('/employees')}
          className="cursor-pointer"
        >
          <Plus className="h-5 w-5" />
          <span>Add Employee</span>
        </Button>
        <Button 
          onClick={() => navigate('/departments')}
          variant="outline"
          className="cursor-pointer border-slate-300 hover:bg-slate-50 h-12 justify-start space-x-3"
        >
          <Building2 className="h-5 w-5" />
          <span>Manage Departments</span>
        </Button>
        <Button 
          onClick={() => navigate('/analytics')}
          variant="outline"
          className="cursor-pointer border-slate-300 hover:bg-slate-50 h-12 justify-start space-x-3"
        >
          <TrendingUp className="h-5 w-5" />
          <span>View Analytics</span>
        </Button>
      </div>
    </CardContent>
  </Card>
</div>
);
};
export default Dashboard;