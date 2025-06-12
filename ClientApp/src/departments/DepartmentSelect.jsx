import { useState, useEffect } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Skeleton } from '@/components/ui/skeleton';
import { getAllDepartments } from '@/services/api/api-department';
import { toast } from 'react-hot-toast';

const DepartmentSelect = ({ 
  value, 
  onValueChange, 
  placeholder = "Select department",
  label = "Department",
  required = false,
  disabled = false,
  className = "",
  showLabel = true 
}) => {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await getAllDepartments();
        setDepartments(response.data);
      } catch (err) {
        setError(err.response?.data?.message || err.message);
        toast.error('Failed to load departments');
      } finally {
        setLoading(false);
      }
    };

    fetchDepartments();
  }, []);

  if (error) {
    return (
      <div className="space-y-2">
        {showLabel && <Label>{label}</Label>}
        <div className="text-sm text-red-500">
          Error loading departments: {error}
        </div>
      </div>
    );
  }

  return (
    <div className={`space-y-2 ${className}`}>
      {showLabel && (
        <Label htmlFor="department-select" className="text-sm font-medium text-slate-700">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </Label>
      )}
      
      {loading ? (
        <Skeleton className="h-10 w-full" />
      ) : (
        <Select 
          value={value} 
          onValueChange={onValueChange}
          disabled={disabled}
          required={required}
        >
          <SelectTrigger 
            id="department-select"
            className="border-slate-300 focus:border-primary-500 focus:ring-primary-500"
          >
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
          <SelectContent>
            {departments?.length === 0 ? (
              <div className="p-4 text-sm text-slate-500 text-center">
                No departments available
              </div>
            ) : (
              departments?.map((department) => (
                <SelectItem 
                  key={department.departmentId} 
                  value={department.departmentId.toString()}
                >
                  <div className="flex items-center justify-between w-full">
                    <span>{department.name}</span>
                    <span className="text-xs text-slate-500 ml-2">
                      ({department.employeeCount || 0} employees)
                    </span>
                  </div>
                </SelectItem>
              ))
            )}
          </SelectContent>
        </Select>
      )}
      
      {departments?.length === 0 && !loading && (
        <div className="text-xs text-slate-500">
          No departments found. Create a department first.
        </div>
      )}
    </div>
  );
};

export default DepartmentSelect;