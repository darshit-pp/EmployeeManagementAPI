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
  UserCheck, 
  UserX,
  Download,
  Copy
} from 'lucide-react';
import { deleteEmployee, updateEmployee } from '@/services/api/api-employee';
import { toast } from 'react-hot-toast';

const EmployeeActions = ({ employee, onEdit, onView, onDelete, compact = false }) => {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showStatusDialog, setShowStatusDialog] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await deleteEmployee(employee.employeeId);
      toast.success('Employee deleted successfully!');
      setShowDeleteDialog(false);
      onDelete?.();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to delete employee');
    } finally {
      setDeleting(false);
    }
  };

  const handleStatusToggle = async () => {
    setUpdating(true);
    try {
      await updateEmployee(employee.employeeId, {
        ...employee,
        status: !employee.status,
      });
      toast.success(`Employee ${employee.status ? 'deactivated' : 'activated'} successfully!`);
      setShowStatusDialog(false);
      onDelete?.(); // Refresh the list
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update employee status');
    } finally {
      setUpdating(false);
    }
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(employee.email);
    toast.success('Email copied to clipboard!');
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
    toast.success('Profile exported successfully!');
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
       <AlertDialogContent className="w-[30rem] bg-white border-slate-200 shadow-xl">
      <AlertDialogHeader className="border-b border-slate-100 pb-4">
        <AlertDialogTitle className="text-xl font-semibold text-slate-900">Are you sure?</AlertDialogTitle>
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
              disabled={deleting}
            >
              {deleting ? 'Deleting...' : 'Delete'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

     {/* Status Change Confirmation Dialog */}
  <AlertDialog open={showStatusDialog} onOpenChange={setShowStatusDialog}>
    <AlertDialogContent className="w-[30rem] bg-white border-slate-200 shadow-xl">
      <AlertDialogHeader className="border-b border-slate-100 pb-4">
        <AlertDialogTitle className="text-xl font-semibold text-slate-900">
          {employee.status ? 'Deactivate' : 'Activate'} Employee
        </AlertDialogTitle>
        <AlertDialogDescription className="text-xl font-semibold text-slate-900">
          Are you sure you want to {employee.status ? 'deactivate' : 'activate'} <strong>{employee.name}</strong>?
          {employee.status && ' They will no longer have access to company systems.'}
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <AlertDialogAction 
          onClick={handleStatusToggle}
          disabled={updating}
        >
          {updating ? 'Updating...' : 'Confirm'}
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
</>
);
};
export default EmployeeActions;