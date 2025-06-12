import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { MoreHorizontal, Edit, Trash2, Users, Building2 } from 'lucide-react';
import { deleteDepartment } from '@/services/api/api-department';
import { toast } from 'react-hot-toast';

const DepartmentCard = ({ department, onEdit, onDelete }) => {
  const handleDelete = async () => {
    if (department.employeeCount > 0) {
      toast.error('Cannot delete department with employees. Please move employees to other departments first.');
      return;
    }
    
    if (window.confirm('Are you sure you want to delete this department?')) {
      try {
        await deleteDepartment(department.departmentId);
        toast.success('Department deleted successfully!');
        onDelete?.();
      } catch (error) {
        if (error.response?.status === 400) {
          toast.error('Cannot delete department with employees assigned to it.');
        } else {
          toast.error(error.response?.data?.message || 'Failed to delete department');
        }
      }
    }
  };

  return (
    <Card className="bg-white border-slate-200 shadow-soft hover:shadow-glow transition-all duration-300 group">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform">
              <Building2 className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-lg text-slate-900">{department.name}</h3>
              <p className="text-sm text-slate-500">Department</p>
            </div>
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100 transition-opacity">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-slate-50 border-slate-300" align="end">
              <DropdownMenuItem className="hover:bg-slate-100"  onClick={() => onEdit?.(department)}>
                <Edit className="mr-2 h-4 w-4" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={handleDelete}
                className="hover:bg-slate-100 text-red-600"
                disabled={department.employeeCount > 0}
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Users className="h-4 w-4 text-slate-400" />
              <span className="text-sm text-slate-600">
                {department.employeeCount || 0} {(department.employeeCount || 0) === 1 ? 'Employee' : 'Employees'}
              </span>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="w-full bg-slate-200 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-indigo-500 to-purple-600 h-2 rounded-full transition-all duration-300"
                style={{
                  width: `${Math.min(((department.employeeCount || 0) / 50) * 100, 100)}%`,
                }}
              />
            </div>
            <div className="text-xs text-slate-500">
              Capacity: {department.employeeCount || 0}/50 employees
            </div>
          </div>

          {department.employeeCount > 0 && (
            <div className="pt-3 border-t border-slate-100">
              <div className="text-xs text-slate-500">
                {department.employeeCount > 40 ? 'Near capacity' : 
                 department.employeeCount > 20 ? 'Growing team' : 
                 'Small team'}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default DepartmentCard;