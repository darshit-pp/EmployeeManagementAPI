// API Configuration
export const API_CONFIG = {
  BASE_URL: 'https://localhost:7170/api',
  TIMEOUT: 10000,
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY: 1000,
};

// Employee Status
export const EMPLOYEE_STATUS = {
  ACTIVE: true,
  INACTIVE: false,
};

export const EMPLOYEE_STATUS_LABELS = {
  [EMPLOYEE_STATUS.ACTIVE]: 'Active',
  [EMPLOYEE_STATUS.INACTIVE]: 'Inactive',
};

export const EMPLOYEE_STATUS_COLORS = {
  [EMPLOYEE_STATUS.ACTIVE]: 'green',
  [EMPLOYEE_STATUS.INACTIVE]: 'gray',
};

// Common Job Roles
export const JOB_ROLES = [
  'Software Developer',
  'Senior Software Developer',
  'Lead Developer',
  'Frontend Developer',
  'Backend Developer',
  'Full Stack Developer',
  'DevOps Engineer',
  'Data Scientist',
  'Product Manager',
  'Project Manager',
  'Team Lead',
  'Engineering Manager',
  'HR Manager',
  'HR Specialist',
  'Recruiter',
  'Financial Analyst',
  'Accountant',
  'Marketing Manager',
  'Marketing Specialist',
  'Sales Manager',
  'Sales Representative',
  'UI/UX Designer',
  'Graphic Designer',
  'Quality Assurance Engineer',
  'Business Analyst',
  'System Administrator',
  'Database Administrator',
];

// Department Names
export const DEPARTMENT_NAMES = [
  'Information Technology',
  'Human Resources',
  'Finance',
  'Marketing',
  'Sales',
  'Operations',
  'Customer Support',
  'Research and Development',
  'Quality Assurance',
  'Legal',
  'Administration',
  'Security',
];

// Salary Ranges (in USD)
export const SALARY_RANGES = {
  'Software Developer': { min: 50000, max: 120000 },
  'Senior Software Developer': { min: 80000, max: 180000 },
  'Lead Developer': { min: 100000, max: 200000 },
  'Product Manager': { min: 90000, max: 180000 },
  'HR Manager': { min: 60000, max: 120000 },
  'Financial Analyst': { min: 55000, max: 100000 },
};

// Pagination
export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 10,
  PAGE_SIZE_OPTIONS: [5, 10, 20, 50, 100],
  MAX_PAGE_SIZE: 100,
};

// Date Formats
export const DATE_FORMATS = {
  DISPLAY: 'MMM dd, yyyy',
  INPUT: 'yyyy-MM-dd',
  FULL: 'MMMM dd, yyyy',
  SHORT: 'MM/dd/yyyy',
  ISO: "yyyy-MM-dd'T'HH:mm:ss.SSSxxx",
};

// File Upload
export const FILE_UPLOAD = {
  MAX_SIZE: 5 * 1024 * 1024, // 5MB
  ALLOWED_TYPES: ['image/jpeg', 'image/png', 'image/gif', 'application/pdf'],
  ALLOWED_EXTENSIONS: ['.jpg', '.jpeg', '.png', '.gif', '.pdf'],
};

// Notification Types
export const NOTIFICATION_TYPES = {
  SUCCESS: 'success',
  ERROR: 'error',
  WARNING: 'warning',
  INFO: 'info',
};

// Theme Colors
export const THEME_COLORS = {
  primary: '#3b82f6',
  secondary: '#6b7280',
  success: '#10b981',
  warning: '#f59e0b',
  error: '#ef4444',
  info: '#3b82f6',
};

// Query Stale Times (in milliseconds)
export const STALE_TIME = {
  SHORT: 2 * 60 * 1000,    // 2 minutes
  MEDIUM: 5 * 60 * 1000,   // 5 minutes
  LONG: 10 * 60 * 1000,    // 10 minutes
  VERY_LONG: 30 * 60 * 1000, // 30 minutes
};

// Local Storage Keys
export const STORAGE_KEYS = {
  THEME:# Missing Frontend Files - Complete Code

## 📄 Pages

### src/pages/NotFound.jsx
```jsx
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Home, ArrowLeft, Search } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardContent className="p-8 text-center space-y-6">
          {/* 404 Illustration */}
          <div className="text-6xl font-bold text-gray-300">404</div>
          
          {/* Icon */}
          <div className="w-16 h-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center">
            <Search className="h-8 w-8 text-gray-400" />
          </div>
          
          {/* Title and Description */}
          <div className="space-y-2">
            <h1 className="text-2xl font-bold text-gray-900">Page Not Found</h1>
            <p className="text-gray-500">
              The page you're looking for doesn't exist or has been moved.
            </p>
          </div>
          
          {/* Action Buttons */}
          <div className="space-y-3">
            <Button 
              onClick={() => navigate(-1)} 
              variant="outline" 
              className="w-full"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Go Back
            </Button>
            
            <Button asChild className="w-full">
              <Link to="/">
                <Home className="mr-2 h-4 w-4" />
                Back to Dashboard
              </Link>
            </Button>
          </div>
          
          {/* Quick Links */}
          <div className="pt-4 border-t border-gray-200">
            <p className="text-sm text-gray-500 mb-3">Quick Links</p>
            <div className="flex justify-center space-x-4">
              <Link 
                to="/employees" 
                className="text-sm text-primary hover:underline"
              >
                Employees
              </Link>
              <Link 
                to="/departments" 
                className="text-sm text-primary hover:underline"
              >
                Departments
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NotFound;