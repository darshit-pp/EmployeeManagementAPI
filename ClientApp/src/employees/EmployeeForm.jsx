import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { CalendarIcon } from "lucide-react";
import { createEmployee, updateEmployee } from "@/services/api/api-employee";
import { getAllDepartments } from "@/services/api/api-department";
import { toast } from "react-hot-toast";

const EmployeeForm = ({ employee, onClose, onSuccess }) => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        departmentId: "",
        role: "",
        salary: "",
        status: true,
        joiningDate: "",
    });

    const [departments, setDepartments] = useState([]);
    const [loading, setLoading] = useState(false);
    const [departmentsLoading, setDepartmentsLoading] = useState(true);

    const isEditing = !!employee;

    // Fetch departments
    useEffect(() => {
        const fetchDepartments = async () => {
            try {
                const response = await getAllDepartments();
                setDepartments(response.data);
            } catch (error) {
                toast.error("Failed to load departments");
            } finally {
                setDepartmentsLoading(false);
            }
        };

        fetchDepartments();
    }, []);

    // Set form data if editing
    useEffect(() => {
        if (employee) {
            setFormData({
                name: employee.name || "",
                email: employee.email || "",
                departmentId: employee.departmentId?.toString() || "",
                role: employee.role || "",
                salary: employee.salary?.toString() || "",
                status: employee.status ?? true,
                joiningDate: employee.joiningDate?.split("T")[0] || "",
            });
        }
    }, [employee]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const submitData = {
            ...formData,
            departmentId: parseInt(formData.departmentId),
            salary: parseFloat(formData.salary),
            joiningDate: new Date(formData.joiningDate).toISOString(),
        };

        try {
            if (isEditing) {
                await updateEmployee(employee.employeeId, submitData);
                toast.success("Employee updated successfully!");
            } else {
                await createEmployee(submitData);
                toast.success("Employee created successfully!");
            }
            onSuccess?.();
            onClose();
        } catch (error) {
            toast.error(
                error.response?.data?.message ||
                    `Failed to ${isEditing ? "update" : "create"} employee`
            );
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (field, value) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    return (
        <Dialog open onOpenChange={onClose}>
            <DialogContent className="w-[50rem] bg-white border-slate-200 shadow-xl">
                <DialogHeader className="border-b border-slate-100 pb-4">
                    <DialogTitle className="text-xl font-semibold text-slate-900">
                        {isEditing ? "Edit Employee" : "Add New Employee"}
                    </DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-6 pt-4">
                    <div className="space-y-2">
                        <Label
                            htmlFor="name"
                            className="text-sm font-medium text-slate-700">
                            Full Name
                        </Label>
                        <Input
                            id="name"
                            value={formData.name}
                            onChange={(e) =>
                                handleChange("name", e.target.value)
                            }
                            placeholder="Enter full name"
                            className="border-slate-300 focus:border-primary-500 focus:ring-primary-500"
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <Label
                            htmlFor="email"
                            className="text-sm font-medium text-slate-700">
                            Email Address
                        </Label>
                        <Input
                            id="email"
                            type="email"
                            value={formData.email}
                            onChange={(e) =>
                                handleChange("email", e.target.value)
                            }
                            placeholder="Enter email address"
                            className="border-slate-300 focus:border-primary-500 focus:ring-primary-500"
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <Label
                            htmlFor="role"
                            className="text-sm font-medium text-slate-700">
                            Job Role
                        </Label>
                        <Input
                            id="role"
                            value={formData.role}
                            onChange={(e) =>
                                handleChange("role", e.target.value)
                            }
                            placeholder="Enter job role"
                            className="border-slate-300 focus:border-primary-500 focus:ring-primary-500"
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <Label
                            htmlFor="department"
                            className="text-sm font-medium text-slate-700">
                            Department
                        </Label>
                        {departmentsLoading ? (
                            <div className="h-10 bg-slate-100 rounded-md animate-pulse"></div>
                        ) : (
                            <Select
                                value={formData.departmentId}
                                onValueChange={(value) =>
                                    handleChange("departmentId", value)
                                }>
                                <SelectTrigger className="border-slate-300 focus:border-primary-500 focus:ring-primary-500">
                                    <SelectValue placeholder="Select department" />
                                </SelectTrigger>
                                <SelectContent  className="bg-slate-50 border-slate-300" >
                                    {departments?.map((dept) => (
                                        <SelectItem
                                            key={dept.departmentId}
                                            value={dept.departmentId.toString()}>
                                            {dept.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label
                            htmlFor="salary"
                            className="text-sm font-medium text-slate-700">
                            Salary
                        </Label>
                        <Input
                            id="salary"
                            type="number"
                            value={formData.salary}
                            onChange={(e) =>
                                handleChange("salary", e.target.value)
                            }
                            placeholder="Enter salary"
                            className="border-slate-300 focus:border-primary-500 focus:ring-primary-500"
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <Label
                            htmlFor="joiningDate"
                            className="text-sm font-medium text-slate-700">
                            Joining Date
                        </Label>
                        <Input
                            id="joiningDate"
                            type="date"
                            value={formData.joiningDate}
                            onChange={(e) =>
                                handleChange("joiningDate", e.target.value)
                            }
                            className="border-slate-300 focus:border-primary-500 focus:ring-primary-500"
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <Label
                            htmlFor="status"
                            className="text-sm font-medium text-slate-700">
                            Status
                        </Label>
                        <Select
                            value={formData.status.toString()}
                            onValueChange={(value) =>
                                handleChange("status", value === "true")
                            }>
                            <SelectTrigger className="border-slate-300 focus:border-primary-500 focus:ring-primary-500">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent  className="bg-slate-50 border-slate-300" >
                                <SelectItem value="true">Active</SelectItem>
                                <SelectItem value="false">Inactive</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="flex justify-end space-x-3 pt-6 border-t border-slate-100">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={onClose}
                            className="border-slate-300 hover:bg-slate-50">
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            disabled={loading}
                            className="cursor-pointer">
                            {loading
                                ? "Saving..."
                                : isEditing
                                ? "Update"
                                : "Create"}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default EmployeeForm;
