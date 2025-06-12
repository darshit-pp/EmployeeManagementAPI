import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { 
  MoreHorizontal, 
  Edit, 
  Trash2, 
  Eye, 
  Mail, 
  Phone, 
  UserCheck, 
  UserX,
  Download,
  Copy
} from 'lucide-react';
import { useDeleteEmployee, useUpdateEmployee } from '@/hooks/useEmployees';
import { useToast } from '@/hooks/useToast';

const EmployeeActions = ({ employee, onEdit, onView, compact = false }) => {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showStatusDialog, setShowStatusDialog] = useState(false);
  
  const { toast } = useToast();
  const deleteEmployee = useDeleteEmployee();
  const updateEmployee = useUpdateEmployee();

  const handleDelete = async () => {
    try {
      await deleteEmployee.mutateAsync(employee.employeeId);
      setShowDeleteDialog(false);
    } catch (error) {
      console.error('Error deleting employee:', error);
    }
  };

  const handleStatusToggle = async () => {
    try {
      await updateEmployee.mutateAsync({
        id: employee.employeeId,
        data: {
          ...employee,
          status: !employee.status,
        },
      });
      setShowStatusDialog(false);
      toast({
        title: "Status Updated",
        description: `Employee ${employee.status ? 'deactivated' : 'activated'} successfully.`,
      });
    } catch (error) {
      console.error('Error updating employee status:', error);
    }
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(employee.email);
    toast({
      title: "Email Copied",
      description: "Employee email copied to clipboard.",
    });
  };

  const handleSendEmail = () => {
    window.open(`mailto:${employee.email}`, '_blank');
  };

  const handleExportProfile = () => {
    const profileData = {
      name: employee.name,
      email: employee.email,
      role: employee.role,
      department: employee.departmentName,
      salary: employee.salary,
      status: employee.status ? 'Active' : 'Inactive',
      joiningDate: employee.joiningDate,
    };
    
    const dataStr = JSON.stringify(profileData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${employee.name.replace(/\s+/g, '_')}_profile.json`;
    link.click();
  };

  if (compact) {
    return (
      <div className="flex space-x-1">
        <Button variant="ghost" size="icon" onClick={() => onView?.(employee)}>
          <Eye className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" onClick={() => onEdit?.(employee)}>
          <Edit className="h-4 w-4" />
        </Button>
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => setShowDeleteDialog(true)}
          className="text-red-600 hover:text-red-700"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    );
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuItem onClick={() => onView?.(employee)}>
            <Eye className="mr-2 h-4 w-4" />
            View Details
          </DropdownMenuItem>
          
          <DropdownMenuItem onClick={() => onEdit?.(employee)}>
            <Edit className="mr-2 h-4 w-4" />
            Edit Employee
          </DropdownMenuItem>
          
          <DropdownMenuSeparator />
          
          <DropdownMenuItem onClick={handleSendEmail}>
            <Mail className="mr-2 h-4 w-4" />
            Send Email
          </DropdownMenuItem>
          
          <DropdownMenuItem onClick={handleCopyEmail}>
            <Copy className="mr-2 h-4 w-4" />
            Copy Email
          </DropdownMenuItem>
          
          <DropdownMenuSeparator />
          
          <DropdownMenuItem onClick={() => setShowStatusDialog(true)}>
            {employee.status ? (
              <>
                <UserX className="mr-2 h-4 w-4" />
                Deactivate
              </>
            ) : (
              <>
                <UserCheck className="mr-2 h-4 w-4" />
                Activate
              </>
            )}
          </DropdownMenuItem>
          
          <DropdownMenuItem onClick={handleExportProfile}>
            <Download className="mr-2 h-4 w-4" />
            Export Profile
          </DropdownMenuItem>
          
          <DropdownMenuSeparator />
          
          <DropdownMenuItem 
            onClick={() => setShowDeleteDialog(true)}
            className="text-red-600 focus:text-red-600"
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Delete Employee
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete <strong>{employee.name}</strong> from the system. 
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleDelete}
              className="bg-red-600 hover:bg-red-700"
              disabled={deleteEmployee.isPending}
            >
              {deleteEmployee.isPending ? 'Deleting...' : 'Delete'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Status Change Confirmation Dialog */}
      <AlertDialog open={showStatusDialog} onOpenChange={setShowStatusDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {employee.status ? 'Deactivate' : 'Activate'} Employee
            </AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to {employee.status ? 'deactivate' : 'activate'} <strong>{employee.name}</strong>?
              {employee.status && ' They will no longer have access to company systems.'}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleStatusToggle}
              disabled={updateEmployee.isPending}
            >
              {updateEmployee.isPending ? 'Updating...' : 'Confirm'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default EmployeeActions;