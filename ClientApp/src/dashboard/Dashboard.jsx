import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Building2, UserCheck, TrendingUp } from 'lucide-react';
import { useEmployees } from '@/hooks/useEmployees';
import { useDepartments } from '@/hooks/useDepartments';
import { useEmployeeStatistics } from '@/hooks/useEmployees';
import StatsCard from './StatsCard';
import QuickActions from './QuickActions';

const Dashboard = () => {
  const { data: employees, isLoading: employeesLoading } = useEmployees();
  const { data: departments, isLoading: departmentsLoading } = useDepartments();
  const { data: stats, isLoading: statsLoading } = useEmployeeStatistics();

  if (employeesLoading || departmentsLoading || statsLoading) {
    return <div>Loading dashboard...</div>;
  }

  const statsCards = [
    {
      title: 'Total Employees',
      value: stats?.totalEmployees || 0,
      icon: Users,
      description: '+2.5% from last month',
      color: 'blue',
    },
    {
      title: 'Active Employees',
      value: stats?.activeEmployees || 0,
      icon: UserCheck,
      description: `${stats?.inactiveEmployees || 0} inactive`,
      color: 'green',
    },
    {
      title: 'Departments',
      value: departments?.length || 0,
      icon: Building2,
      description: 'Across organization',
      color: 'purple',
    },
    {
      title: 'Avg. Salary',
      value: `$${stats?.averageSalary?.toLocaleString() || 0}`,
      icon: TrendingUp,
      description: '+5.2% from last year',
      color: 'orange',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <QuickActions />
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsCards.map((stat, index) => (
          <StatsCard key={index} {...stat} />
        ))}
      </div>

      {/* Department Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Department Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {stats?.departmentDistribution?.map((dept, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm font-medium">{dept.department}</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-24 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-primary h-2 rounded-full"
                        style={{
                          width: `${(dept.count / stats.totalEmployees) * 100}%`,
                        }}
                      />
                    </div>
                    <span className="text-sm text-gray-500">{dept.count}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full" />
                <span className="text-sm">New employee John Doe added</span>
                <span className="text-xs text-gray-500 ml-auto">2 hours ago</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full" />
                <span className="text-sm">IT Department updated</span>
                <span className="text-xs text-gray-500 ml-auto">5 hours ago</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-yellow-500 rounded-full" />
                <span className="text-sm">Employee Jane Smith promoted</span>
                <span className="text-xs text-gray-500 ml-auto">1 day ago</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;