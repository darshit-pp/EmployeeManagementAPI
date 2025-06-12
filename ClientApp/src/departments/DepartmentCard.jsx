import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { MoreHorizontal, Edit, Trash2, Users, Building2 } from 'lucide-react';
import { useDeleteDepartment } from '@/hooks/useDepartments';

const DepartmentCard = ({ department, onEdit }) => {
  const deleteDepartment = useDeleteDepartment();

  const handleDelete = () => {
    if (department.employeeCount > 0) {
      alert('Cannot delete department with employees. Please move employees to other departments first.');
      return;
    }
    
    if (window.confirm('Are you sure you want to delete this department?')) {
      deleteDepartment.mutate(department.departmentId);
    }
  };

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
              <Building2 className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-lg">{department.name}</h3>
              <p className="text-sm text-gray-500">Department</p>
            </div>
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onEdit(department)}>
                <Edit className="mr-2 h-4 w-4" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={handleDelete}
                className="text-red-600"
                disabled={department.employeeCount > 0}
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Users className="h-4 w-4 text-gray-400" />
              <span className="text-sm text-gray-600">
                {department.employeeCount} {department.employeeCount === 1 ? 'Employee' : 'Employees'}
              </span>
            </div>
          </div>
          
          <div className="pt-2 border-t">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-primary h-2 rounded-full transition-all duration-300"
                style={{
                  width: `${Math.min((department.employeeCount / 50) * 100, 100)}%`,
                }}
              />
            </div>
            <div className="text-xs text-gray-500 mt-1">
              Capacity: {department.employeeCount}/50
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DepartmentCard;