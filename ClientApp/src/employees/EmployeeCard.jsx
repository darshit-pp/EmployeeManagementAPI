import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { MoreHorizontal, Edit, Trash2, Mail, Eye } from 'lucide-react';
import { deleteEmployee } from '@/services/api/api-employee';
import { toast } from 'react-hot-toast';

const EmployeeCard = ({ employee, onEdit, onView, onDelete }) => {
  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      try {
        await deleteEmployee(employee.employeeId);
        toast.success('Employee deleted successfully!');
        onDelete?.();
      } catch (error) {
        toast.error(error.response?.data?.message || 'Failed to delete employee');
      }
    }
  };

  const formatSalary = (salary) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(salary);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <Card className="bg-white border-slate-200 shadow-soft hover:shadow-glow transition-all duration-300 group">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center text-white font-semibold text-lg group-hover:scale-105 transition-transform">
              {employee.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <h3 className="font-semibold text-lg text-slate-900">{employee.name}</h3>
              <p className="text-sm text-slate-500">{employee.role}</p>
            </div>
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100 transition-opacity">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-slate-50 border-slate-300" align="end">
              <DropdownMenuItem className="hover:bg-slate-100" onClick={() => onView?.(employee)}>
                <Eye className="mr-2 h-4 w-4" />
                View Details
              </DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-slate-100" onClick={() => onEdit?.(employee)}>
                <Edit className="mr-2 h-4 w-4" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={handleDelete}
                 className="hover:bg-slate-100 text-red-600"
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <Mail className="h-4 w-4 text-slate-400" />
            <span className="text-sm text-slate-600 truncate">{employee.email}</span>
          </div>
          
          <div className="flex items-center justify-between">
            <Badge 
              variant={employee.status ? "default" : "secondary"}
              className={employee.status ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-700"}
            >
              {employee.status ? "Active" : "Inactive"}
            </Badge>
            <span className="text-sm font-semibold text-emerald-600">
              {formatSalary(employee.salary)}
            </span>
          </div>
          
          <div className="pt-3 border-t border-slate-100">
            <div className="flex items-center justify-between text-sm text-slate-500">
              <span>{employee.departmentName}</span>
              <span>Joined {formatDate(employee.joiningDate)}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EmployeeCard;