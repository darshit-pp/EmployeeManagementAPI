import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
    Plus,
    RefreshCw,
    Users,
    UserCheck,
    UserX,
    Building2,
} from "lucide-react";
import { getAllEmployees } from "@/services/api/api-employee";
import EmployeeCard from "./EmployeeCard";
import EmployeeForm from "./EmployeeForm";
import EmployeeDetails from "./EmployeeDetails";
import { toast } from "react-hot-toast";

const EmployeeList = () => {
    const [showForm, setShowForm] = useState(false);
    const [showDetails, setShowDetails] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);

    const fetchEmployees = async (showLoading = true) => {
        if (showLoading) setLoading(true);
        try {
            const response = await getAllEmployees();
            setEmployees(response.data);
        } catch (error) {
            toast.error("Failed to load employees");
        } finally {
            if (showLoading) setLoading(false);
        }
    };

    const handleRefresh = async () => {
        setRefreshing(true);
        await fetchEmployees(false);
        setRefreshing(false);
        toast.success("Employees refreshed");
    };

    useEffect(() => {
        fetchEmployees();
    }, []);

    const handleEmployeeChange = () => {
        fetchEmployees(false);
    };

    const handleEdit = (employee) => {
        setSelectedEmployee(employee);
        setShowForm(true);
    };

    const handleView = (employee) => {
        setSelectedEmployee(employee);
        setShowDetails(true);
    };

    const handleCloseForm = () => {
        setShowForm(false);
        setSelectedEmployee(null);
        handleEmployeeChange();
    };

    const activeEmployees = employees.filter((emp) => emp.status);
    const inactiveEmployees = employees.filter((emp) => !emp.status);
    const uniqueDepartments = new Set(employees.map((e) => e.departmentName))
        .size;

    if (loading) {
        return (
            <div className="space-y-8">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900">
                            Employees
                        </h1>
                        <p className="text-slate-600 mt-2">
                            Manage your workforce
                        </p>
                    </div>
                </div>
                <div className="text-center py-16">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
                    <p className="mt-4 text-slate-500">Loading employees...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">
                        Employees
                    </h1>
                    <p className="text-slate-600 mt-2">
                        Manage your workforce efficiently
                    </p>
                </div>
                <div className="flex space-x-3">
                    <Button
                        variant="outline"
                        onClick={handleRefresh}
                        disabled={refreshing}
                        className="cursor-pointer border-slate-300 hover:bg-slate-50">
                        <RefreshCw
                            className={`mr-2 h-4 w-4 ${
                                refreshing ? "animate-spin" : ""
                            }`}
                        />
                        Refresh
                    </Button>
                    <Button
                        onClick={() => setShowForm(true)}
                        className="cursor-pointer">
                        <Plus className="mr-2 h-4 w-4" />
                        Add Employee
                    </Button>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200 shadow-soft">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-blue-600">
                                    Total Employees
                                </p>
                                <p className="text-3xl font-bold text-blue-900">
                                    {employees.length}
                                </p>
                                <p className="text-xs text-blue-500 mt-1">
                                    Workforce size
                                </p>
                            </div>
                            <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center">
                                <Users className="w-6 h-6 text-white" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-emerald-50 to-green-50 border-emerald-200 shadow-soft">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-emerald-600">
                                    Active
                                </p>
                                <p className="text-3xl font-bold text-emerald-900">
                                    {activeEmployees.length}
                                </p>
                                <p className="text-xs text-emerald-500 mt-1">
                                    Currently working
                                </p>
                            </div>
                            <div className="w-12 h-12 bg-emerald-500 rounded-xl flex items-center justify-center">
                                <UserCheck className="w-6 h-6 text-white" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-red-50 to-rose-50 border-red-200 shadow-soft">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-red-600">
                                    Inactive
                                </p>
                                <p className="text-3xl font-bold text-red-900">
                                    {inactiveEmployees.length}
                                </p>
                                <p className="text-xs text-red-500 mt-1">
                                    Not active
                                </p>
                            </div>
                            <div className="w-12 h-12 bg-red-500 rounded-xl flex items-center justify-center">
                                <UserX className="w-6 h-6 text-white" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-purple-50 to-violet-50 border-purple-200 shadow-soft">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-purple-600">
                                    Departments
                                </p>
                                <p className="text-3xl font-bold text-purple-900">
                                    {uniqueDepartments}
                                </p>
                                <p className="text-xs text-purple-500 mt-1">
                                    Active departments
                                </p>
                            </div>
                            <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center">
                                <Building2 className="w-6 h-6 text-white" />
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Employee Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {employees.map((employee) => (
                    <EmployeeCard
                        key={employee.employeeId}
                        employee={employee}
                        onEdit={handleEdit}
                        onView={handleView}
                        onDelete={handleEmployeeChange}
                    />
                ))}
            </div>

            {employees.length === 0 && (
                <Card className="bg-white border-slate-200 shadow-soft">
                    <CardContent className="p-16 text-center">
                        <Users className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-slate-900 mb-2">
                            No employees found
                        </h3>
                        <p className="text-slate-500 mb-6">
                            Get started by adding your first employee
                        </p>
                        <Button
                            onClick={() => setShowForm(true)}
                            className="cursor-pointer ">
                            <Plus className="mr-2 h-4 w-4" />
                            Add First Employee
                        </Button>
                    </CardContent>
                </Card>
            )}

            {/* Modals */}
            {showForm && (
                <EmployeeForm
                    employee={selectedEmployee}
                    onClose={handleCloseForm}
                    onSuccess={handleEmployeeChange}
                />
            )}

            {showDetails && selectedEmployee && (
                <EmployeeDetails
                    employee={selectedEmployee}
                    open={showDetails}
                    onClose={() => setShowDetails(false)}
                    onEdit={handleEdit}
                />
            )}
        </div>
    );
};

export default EmployeeList;
