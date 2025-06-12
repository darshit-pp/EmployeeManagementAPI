import { z } from 'zod';

// Employee Validation Schemas
export const createEmployeeSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be less than 100 characters')
    .regex(/^[a-zA-Z\s]+$/, 'Name can only contain letters and spaces'),
  
  email: z
    .string()
    .email('Please enter a valid email address')
    .max(100, 'Email must be less than 100 characters'),
  
  departmentId: z
    .number()
    .int('Department ID must be an integer')
    .positive('Please select a valid department'),
  
  role: z
    .string()
    .min(2, 'Role must be at least 2 characters')
    .max(50, 'Role must be less than 50 characters'),
  
  salary: z
    .number()
    .positive('Salary must be greater than 0')
    .max(10000000, 'Salary seems unreasonably high')
    .refine((val) => Number(val.toFixed(2)) === val, 'Salary can have at most 2 decimal places'),
  
  status: z.boolean(),
  
  joiningDate: z
    .string()
    .refine((date) => {
      const joinDate = new Date(date);
      const today = new Date();
      const minDate = new Date('1900-01-01');
      return joinDate <= today && joinDate >= minDate;
    }, 'Joining date must be in the past and after 1900'),
});

export const updateEmployeeSchema = createEmployeeSchema;

// Department Validation Schemas
export const createDepartmentSchema = z.object({
  name: z
    .string()
    .min(2, 'Department name must be at least 2 characters')
    .max(100, 'Department name must be less than 100 characters')
    .regex(/^[a-zA-Z\s&-]+$/, 'Department name can only contain letters, spaces, & and -'),
});

export const updateDepartmentSchema = createDepartmentSchema;

// Search Validation
export const searchSchema = z.object({
  searchTerm: z
    .string()
    .min(2, 'Search term must be at least 2 characters')
    .max(100, 'Search term must be less than 100 characters'),
});

// Form Validation Functions
export const validateEmployee = (data, isUpdate = false) => {
  try {
    const schema = isUpdate ? updateEmployeeSchema : createEmployeeSchema;
    
    // Transform string values to appropriate types
    const transformedData = {
      ...data,
      departmentId: data.departmentId ? parseInt(data.departmentId, 10) : undefined,
      salary: data.salary ? parseFloat(data.salary) : undefined,
      status: data.status === 'true' || data.status === true,
    };
    
    const result = schema.parse(transformedData);
    return { success: true, data: result, errors: null };
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errors = error.errors.reduce((acc, err) => {
        acc[err.path[0]] = err.message;
        return acc;
      }, {});
      return { success: false, data: null, errors };
    }
    return { success: false, data: null, errors: { general: 'Validation failed' } };
  }
};

export const validateDepartment = (data, isUpdate = false) => {
  try {
    const schema = isUpdate ? updateDepartmentSchema : createDepartmentSchema;
    const result = schema.parse(data);
    return { success: true, data: result, errors: null };
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errors = error.errors.reduce((acc, err) => {
        acc[err.path[0]] = err.message;
        return acc;
      }, {});
      return { success: false, data: null, errors };
    }
    return { success: false, data: null, errors: { general: 'Validation failed' } };
  }
};

export const validateSearch = (searchTerm) => {
  try {
    const result = searchSchema.parse({ searchTerm });
    return { success: true, data: result.searchTerm, errors: null };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { 
        success: false, 
        data: null, 
        errors: { searchTerm: error.errors[0]?.message || 'Invalid search term' } 
      };
    }
    return { success: false, data: null, errors: { searchTerm: 'Validation failed' } };
  }
};

// Field-specific validators
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const isValidPhoneNumber = (phone) => {
  const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
  return phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''));
};

export const isValidSalary = (salary) => {
  const numSalary = parseFloat(salary);
  return !isNaN(numSalary) && numSalary > 0 && numSalary <= 10000000;
};

export const isValidDate = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();
  return date instanceof Date && !isNaN(date) && date <= now;
};

// Form field formatters
export const formatSalaryInput = (value) => {
  // Remove non-numeric characters except decimal point
  const cleaned = value.replace(/[^0-9.]/g, '');
  
  // Ensure only one decimal point
  const parts = cleaned.split('.');
  if (parts.length > 2) {
    return parts[0] + '.' + parts.slice(1).join('');
  }
  
  // Limit decimal places to 2
  if (parts[1] && parts[1].length > 2) {
    return parts[0] + '.' + parts[1].substring(0, 2);
  }
  
  return cleaned;
};

export const formatNameInput = (value) => {
  // Remove numbers and special characters, keep only letters and spaces
  return value.replace(/[^a-zA-Z\s]/g, '');
};

export const formatRoleInput = (value) => {
  // Remove special characters except common ones used in job titles
  return value.replace(/[^a-zA-Z0-9\s\-\.]/g, '');
};

// Custom validation rules
export const customValidationRules = {
  uniqueEmail: async (email, currentEmployeeId = null) => {
    // This would typically make an API call to check email uniqueness
    // For now, returning a promise that resolves to true
    return new Promise((resolve) => {
      setTimeout(() => {
        // Simulate API call
        resolve(true);
      }, 500);
    });
  },
  
  departmentExists: async (departmentId) => {
    // This would typically make an API call to verify department exists
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(true);
      }, 300);
    });
  },
  
  salaryInRange: (salary, role) => {
    // Define salary ranges for different roles
    const salaryRanges = {
      'Software Developer': { min: 40000, max: 150000 },
      'Senior Developer': { min: 70000, max: 200000 },
      'Team Lead': { min: 80000, max: 250000 },
      'Manager': { min: 60000, max: 300000 },
      'HR Manager': { min: 50000, max: 120000 },
      'Financial Analyst': { min: 45000, max: 100000 },
    };
    
    const range = salaryRanges[role];
    if (!range) return true; // No range defined for role
    
    return salary >= range.min && salary <= range.max;
  },
};

// Error message helpers
export const getFieldError = (errors, fieldName) => {
  return errors && errors[fieldName] ? errors[fieldName] : null;
};

export const hasFieldError = (errors, fieldName) => {
  return errors && !!errors[fieldName];
};

export const getFirstError = (errors) => {
  if (!errors || typeof errors !== 'object') return null;
  const keys = Object.keys(errors);
  return keys.length > 0 ? errors[keys[0]] : null;
};