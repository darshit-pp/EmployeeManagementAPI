import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  AreaChart,
  Area
} from 'recharts';
import { Users, Building2, TrendingUp, DollarSign } from 'lucide-react';
import { getAllEmployees } from '@/services/api/api-employee';
import { getAllDepartments } from '@/services/api/api-department';
import { toast } from 'react-hot-toast';

const Analytics = () => {
  const [employees, setEmployees] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);

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
        toast.error('Failed to load analytics data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Data processing for charts
  const departmentData = departments.map(dept => ({
    name: dept.name,
    employees: dept.employeeCount || 0,
    fill: `hsl(${Math.random() * 360}, 70%, 60%)`
  }));

  const salaryData = employees
    .reduce((acc, emp) => {
      const range = getSalaryRange(emp.salary);
      const existing = acc.find(item => item.range === range);
      if (existing) {
        existing.count += 1;
      } else {
        acc.push({ range, count: 1 });
      }
      return acc;
    }, [])
    .sort((a, b) => a.range.localeCompare(b.range));

  const statusData = [
    {
      name: 'Active',
      value: employees.filter(emp => emp.status).length,
      fill: '#10b981'
    },
    {
      name: 'Inactive',
      value: employees.filter(emp => !emp.status).length,
      fill: '#ef4444'
    }
  ];

  const monthlyHires = getMonthlyHires(employees);

  function getSalaryRange(salary) {
    if (salary < 40000) return '$0-40K';
    if (salary < 60000) return '$40K-60K';
    if (salary < 80000) return '$60K-80K';
    if (salary < 100000) return '$80K-100K';
    return '$100K+';
  }

  function getMonthlyHires(employees) {
    const months = {};
    employees.forEach(emp => {
      const month = new Date(emp.joiningDate).toLocaleDateString('en-US', { 
        month: 'short', 
        year: 'numeric' 
      });
      months[month] = (months[month] || 0) + 1;
    });
    
    return Object.entries(months)
      .map(([month, count]) => ({ month, hires: count }))
      .sort((a, b) => new Date(a.month) - new Date(b.month))
      .slice(-6); // Last 6 months
  }

  const totalSalary = employees.reduce((sum, emp) => sum + emp.salary, 0);
  const avgSalary = employees.length > 0 ? totalSalary / employees.length : 0;

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-2 text-slate-500">Loading analytics...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Analytics Dashboard</h1>
        <p className="text-slate-600 mt-2">Insights and trends for your workforce</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-600">Total Employees</p>
                <p className="text-3xl font-bold text-blue-900">{employees.length}</p>
                <p className="text-xs text-blue-500 mt-1">Active workforce</p>
              </div>
              <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center">
                <Users className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-emerald-50 to-green-50 border-emerald-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-emerald-600">Departments</p>
                <p className="text-3xl font-bold text-emerald-900">{departments.length}</p>
                <p className="text-xs text-emerald-500 mt-1">Active departments</p>
              </div>
              <div className="w-12 h-12 bg-emerald-500 rounded-xl flex items-center justify-center">
                <Building2 className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-violet-50 border-purple-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-600">Avg. Salary</p>
                <p className="text-3xl font-bold text-purple-900">
                  ${avgSalary.toLocaleString('en-US', { maximumFractionDigits: 0 })}
                </p>
                <p className="text-xs text-purple-500 mt-1">Per employee</p>
              </div>
              <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-amber-50 border-orange-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-orange-600">Active Rate</p>
                <p className="text-3xl font-bold text-orange-900">
                  {((employees.filter(e => e.status).length / employees.length) * 100).toFixed(1)}%
                </p>
                <p className="text-xs text-orange-500 mt-1">Employee activity</p>
              </div>
              <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <Tabs defaultValue="overview" className="space-y-6 ">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview" className="cursor-pointer focus:bg-gradient-to-br from-blue-50 to-indigo-50 ">Overview</TabsTrigger>
          <TabsTrigger value="departments" className="cursor-pointer focus:bg-gradient-to-br from-blue-50 to-indigo-50 ">Departments</TabsTrigger>
          <TabsTrigger value="salary" className="cursor-pointer focus:bg-gradient-to-br from-blue-50 to-indigo-50 ">Salary Analysis</TabsTrigger>
          <TabsTrigger value="trends" className="cursor-pointer focus:bg-gradient-to-br from-blue-50 to-indigo-50 ">Hiring Trends</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6 ">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Employee Status Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={statusData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {statusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Department Employee Count</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={departmentData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="employees" fill="#6366f1" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="departments" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Department Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <PieChart>
                  <Pie
                    data={departmentData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, employees }) => `${name}: ${employees}`}
                    outerRadius={120}
                    fill="#8884d8"
                    dataKey="employees"
                  >
                    {departmentData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="salary" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Salary Range Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={salaryData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="range" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="count" fill="#10b981" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trends" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Monthly Hiring Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <AreaChart data={monthlyHires}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Area 
                    type="monotone" 
                    dataKey="hires" 
                    stroke="#6366f1" 
                    fill="#6366f1"
                    fillOpacity={0.3}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Analytics;