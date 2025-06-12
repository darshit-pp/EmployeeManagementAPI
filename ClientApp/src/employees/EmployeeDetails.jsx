import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { 
  User, 
  Mail, 
  Briefcase, 
  Building2, 
  DollarSign, 
  Calendar, 
  Clock,
  Edit
} from 'lucide-react';

const EmployeeDetails = ({ employee, open, onClose, onEdit }) => {
  if (!employee) return null;

  const InfoRow = ({ icon: Icon, label, value, className = "" }) => (
    <div className="flex items-center space-x-3 py-3">
      <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center">
        <Icon className="h-5 w-5 text-slate-600" />
      </div>
      <div className="flex-1">
        <div className="text-sm text-slate-500">{label}</div>
        <div className={`font-medium text-slate-900 ${className}`}>{value}</div>
      </div>
    </div>
  );

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const calculateTenure = (joiningDate) => {
    const start = new Date(joiningDate);
    const now = new Date();
    const diffTime = Math.abs(now - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 30) {
      return `${diffDays} days`;
    } else if (diffDays < 365) {
      const months = Math.floor(diffDays / 30);
      return `${months} ${months === 1 ? 'month' : 'months'}`;
    } else {
      const years = Math.floor(diffDays / 365);
      const remainingMonths = Math.floor((diffDays % 365) / 30);
      if (remainingMonths === 0) {
        return `${years} ${years === 1 ? 'year' : 'years'}`;
      }
      return `${years}y ${remainingMonths}m`;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="w-full max-w-[50rem] max-h-[90vh] overflow-y-auto bg-white border-slate-200 shadow-xl">
        <DialogHeader className="border-b  border-slate-100 pb-4">
          <DialogTitle className="flex items-center justify-between text-xl font-semibold text-slate-900">
            <span>Employee Details</span>
            <Button variant="outline" size="sm" className="mr-6 cursor-pointer " onClick={() => onEdit?.(employee)}>
              <Edit className="mr-2 h-4 w-4" />
              Edit
            </Button>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 pt-4">
          {/* Profile Header */}
          <Card className="bg-gradient-to-r from-primary-50 to-indigo-50 border-primary-200">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold text-2xl">
                    {employee.name.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-slate-900">{employee.name}</h2>
                  <p className="text-lg text-slate-600">{employee.role}</p>
                  <div className="flex items-center space-x-2 mt-2">
                    <Badge variant={employee.status ? "default" : "secondary"}>
                      {employee.status ? "Active" : "Inactive"}
                    </Badge>
                    <Badge variant="outline">{employee.departmentName}</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Contact Information */}
            <Card className="border-slate-200">
              <CardHeader>
                <CardTitle className="text-lg text-slate-900">Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-1">
                <InfoRow 
                  icon={User} 
                  label="Full Name" 
                  value={employee.name} 
                />
                <InfoRow 
                  icon={Mail} 
                  label="Email Address" 
                  value={employee.email}
                  className="text-primary-600"
                />
              </CardContent>
            </Card>

            {/* Job Information */}
            <Card className="border-slate-200">
              <CardHeader>
                <CardTitle className="text-lg text-slate-900">Job Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-1">
                <InfoRow 
                  icon={Briefcase} 
                  label="Position" 
                  value={employee.role} 
                />
                <InfoRow 
                  icon={Building2} 
                  label="Department" 
                  value={employee.departmentName} 
                />
                <InfoRow 
                  icon={DollarSign} 
                  label="Salary" 
                  value={formatCurrency(employee.salary)}
                  className="text-emerald-600 font-semibold"
                />
              </CardContent>
            </Card>
          </div>

          {/* Employment Details */}
          <Card className="border-slate-200">
            <CardHeader>
              <CardTitle className="text-lg text-slate-900">Employment Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InfoRow 
                  icon={Calendar} 
                  label="Joining Date" 
                  value={formatDate(employee.joiningDate)} 
                />
                <InfoRow 
                  icon={Clock} 
                  label="Tenure" 
                  value={calculateTenure(employee.joiningDate)} 
                />
              </div>
              
              <Separator className="my-4" />
              
              <div className="space-y-3">
                <h4 className="font-medium text-slate-900">Employment Status</h4>
                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                  <span className="text-sm text-slate-600">Current Status</span>
                  <Badge variant={employee.status ? "default" : "secondary"} className="text-sm">
                    {employee.status ? "Active Employee" : "Inactive Employee"}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="border-slate-200">
            <CardHeader>
              <CardTitle className="text-lg text-slate-900">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => window.open(`mailto:${employee.email}`, '_blank')}
                  className="border-slate-300 hover:bg-slate-50"
                >
                  <Mail className="mr-2 h-4 w-4" />
                  Send Email
                </Button>
                
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => onEdit?.(employee)}
                  className="border-slate-300 hover:bg-slate-50"
                >
                  <Edit className="mr-2 h-4 w-4" />
                  Edit Details
                </Button>
                
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => {
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
                  }}
                  className="border-slate-300 hover:bg-slate-50"
                >
                  Export Profile
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EmployeeDetails;