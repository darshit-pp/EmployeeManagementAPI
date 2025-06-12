import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, RefreshCw, Building2, Users, TrendingUp } from "lucide-react";
import { getAllDepartments } from "@/services/api/api-department";
import DepartmentCard from "./DepartmentCard";
import DepartmentForm from "./DepartmentForm";
import { toast } from "react-hot-toast";

const DepartmentList = () => {
    const [showForm, setShowForm] = useState(false);
    const [selectedDepartment, setSelectedDepartment] = useState(null);
    const [departments, setDepartments] = useState([]);
    const [loading, setLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);

    const fetchDepartments = async (showLoading = true) => {
        if (showLoading) setLoading(true);
        try {
            const response = await getAllDepartments();
            setDepartments(response.data);
        } catch (error) {
            toast.error("Failed to load departments");
        } finally {
            if (showLoading) setLoading(false);
        }
    };

    const handleRefresh = async () => {
        setRefreshing(true);
        await fetchDepartments(false);
        setRefreshing(false);
        toast.success("Departments refreshed");
    };

    useEffect(() => {
        fetchDepartments();
    }, []);

    const handleDepartmentChange = () => {
        fetchDepartments(false);
    };

    const handleEdit = (department) => {
        setSelectedDepartment(department);
        setShowForm(true);
    };

    const handleCloseForm = () => {
        setShowForm(false);
        setSelectedDepartment(null);
        handleDepartmentChange();
    };

    const totalEmployees = departments.reduce(
        (sum, dept) => sum + (dept.employeeCount || 0),
        0
    );
    const avgEmployeesPerDept =
        departments.length > 0
            ? Math.round(totalEmployees / departments.length)
            : 0;

    if (loading) {
        return (
            <div className="space-y-8">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900">
                            Departments
                        </h1>
                        <p className="text-slate-600 mt-2">
                            Organize your workforce
                        </p>
                    </div>
                </div>
                <div className="text-center py-16">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
                    <p className="mt-4 text-slate-500">
                        Loading departments...
                    </p>
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
                        Departments
                    </h1>
                    <p className="text-slate-600 mt-2">
                        Organize your workforce by departments
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
                        Add Department
                    </Button>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200 shadow-soft">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-blue-600">
                                    Total Departments
                                </p>
                                <p className="text-3xl font-bold text-blue-900">
                                    {departments.length}
                                </p>
                                <p className="text-xs text-blue-500 mt-1">
                                    Active departments
                                </p>
                            </div>
                            <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center">
                                <Building2 className="w-6 h-6 text-white" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-emerald-50 to-green-50 border-emerald-200 shadow-soft">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-emerald-600">
                                    Total Employees
                                </p>
                                <p className="text-3xl font-bold text-emerald-900">
                                    {totalEmployees}
                                </p>
                                <p className="text-xs text-emerald-500 mt-1">
                                    Across all departments
                                </p>
                            </div>
                            <div className="w-12 h-12 bg-emerald-500 rounded-xl flex items-center justify-center">
                                <Users className="w-6 h-6 text-white" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-purple-50 to-violet-50 border-purple-200 shadow-soft">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-purple-600">
                                    Avg. per Department
                                </p>
                                <p className="text-3xl font-bold text-purple-900">
                                    {avgEmployeesPerDept}
                                </p>
                                <p className="text-xs text-purple-500 mt-1">
                                    Employees per dept
                                </p>
                            </div>
                            <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center">
                                <TrendingUp className="w-6 h-6 text-white" />
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Department Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {departments.map((department) => (
                    <DepartmentCard
                        key={department.departmentId}
                        department={department}
                        onEdit={handleEdit}
                        onDelete={handleDepartmentChange}
                    />
                ))}
            </div>

            {departments.length === 0 && (
                <Card className="bg-white border-slate-200 shadow-soft">
                    <CardContent className="p-16 text-center">
                        <Building2 className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-slate-900 mb-2">
                            No departments found
                        </h3>
                        <p className="text-slate-500 mb-6">
                            Create your first department to organize employees
                        </p>
                        <Button
                            onClick={() => setShowForm(true)}
                            className="cursor-pointer">
                            <Plus className="mr-2 h-4 w-4" />
                            Add First Department
                        </Button>
                    </CardContent>
                </Card>
            )}

            {/* Department Form Modal */}
            {showForm && (
                <DepartmentForm
                    department={selectedDepartment}
                    onClose={handleCloseForm}
                    onSuccess={handleDepartmentChange}
                />
            )}
        </div>
    );
};

export default DepartmentList;
