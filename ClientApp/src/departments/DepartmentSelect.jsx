import { useDepartments } from '@/hooks/useDepartments';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Skeleton } from '@/components/ui/skeleton';

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
  const { data: departments, isLoading, error } = useDepartments();

  if (error) {
    return (
      <div className="space-y-2">
        {showLabel && <Label>{label}</Label>}
        <div className="text-sm text-red-500">
          Error loading departments: {error.message}
        </div>
      </div>
    );
  }

  return (
    <div className={`space-y-2 ${className}`}>
      {showLabel && (
        <Label htmlFor="department-select">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </Label>
      )}
      
      {isLoading ? (
        <Skeleton className="h-10 w-full" />
      ) : (
        <Select 
          value={value} 
          onValueChange={onValueChange}
          disabled={disabled}
          required={required}
        >
          <SelectTrigger id="department-select">
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
          <SelectContent>
            {departments?.length === 0 ? (
              <div className="p-4 text-sm text-gray-500 text-center">
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
                    <span className="text-xs text-gray-500 ml-2">
                      ({department.employeeCount} employees)
                    </span>
                  </div>
                </SelectItem>
              ))
            )}
          </SelectContent>
        </Select>
      )}
      
      {departments?.length === 0 && !isLoading && (
        <div className="text-xs text-gray-500">
          No departments found. Create a department first.
        </div>
      )}
    </div>
  );
};

export default DepartmentSelect;