import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Search, Plus, RefreshCw } from 'lucide-react';
import { getAllDepartments } from '@/services/api/api-department';
import DepartmentCard from './DepartmentCard';
import DepartmentForm from './DepartmentForm';
import { toast } from 'react-hot-toast';

const DepartmentList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const fetchDepartments = async (showLoading = true) => {
    if (showLoading) setLoading(true);
    setError(null);
    try {
      const response = await getAllDepartments();
      setDepartments(response.data);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
      toast.error('Failed to load departments');
    } finally {
      if (showLoading) setLoading(false);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchDepartments(false);
    setRefreshing(false);
    toast.success('Department list refreshed');
  };

  useEffect(() => {
    fetchDepartments();
  }, []);

  const handleDepartmentChange = () => {
    fetchDepartments(false); // Refetch without showing loading spinner
  };

  const handleEdit = (department) => {
    setSelectedDepartment(department);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setSelectedDepartment(null);
    handleDepartmentChange(); // Refresh list after form close
  };

  const filteredDepartments = departments?.filter(department =>
    department.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">Departments</h1>
          <Button disabled>
            <Plus className="mr-2 h-4 w-4" />
            Add Department
          </Button>
        </div>
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-2 text-gray-500">Loading departments...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">Departments</h1>
          <Button onClick={() => setShowForm(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Add Department
          </Button>
        </div>
        <Card>
          <CardContent className="p-12 text-center">
            <div className="text-red-500 mb-4">
              <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Error Loading Departments</h3>
            <p className="text-gray-500 mb-4">{error}</p>
            <Button onClick={() => fetchDepartments()}>
              <RefreshCw className="mr-2 h-4 w-4" />
              Try Again
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Departments</h1>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={handleRefresh} disabled={refreshing}>
            <RefreshCw className={`mr-2 h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          <Button onClick={() => setShowForm(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Add Department
          </Button>
        </div>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="p-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search departments..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Department Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">{departments?.length || 0}</div>
            <div className="text-sm text-gray-500">Total Departments</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-blue-600">
              {departments?.reduce((sum, dept) => sum + (dept.employeeCount || 0), 0) || 0}
            </div>
            <div className="text-sm text-gray-500">Total Employees</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-green-600">
              {departments?.length > 0 
                ? Math.round(departments.reduce((sum, dept) => sum + (dept.employeeCount || 0), 0) / departments.length)
                : 0
              }
            </div>
            <div className="text-sm text-gray-500">Avg. Employees per Dept</div>
          </CardContent>
        </Card>
      </div>

      {/* Department Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDepartments?.map((department) => (
          <DepartmentCard
            key={department.departmentId}
            department={department}
            onEdit={handleEdit}
            onDelete={handleDepartmentChange} // Refresh list after delete
          />
        ))}
      </div>

      {filteredDepartments?.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <div className="text-gray-500">
              {searchTerm ? 'No departments found matching your search.' : 'No departments found.'}
            </div>
            {!searchTerm && (
              <Button 
                className="mt-4" 
                onClick={() => setShowForm(true)}
              >
                <Plus className="mr-2 h-4 w-4" />
                Add First Department
              </Button>
            )}
          </CardContent>
        </Card>
      )}

      {/* Department Form Modal */}
      {showForm && (
        <DepartmentForm
          department={selectedDepartment}
          onClose={handleCloseForm}
          onSuccess={handleDepartmentChange}
        />
      )}
    </div>
  );
};

export default DepartmentList;