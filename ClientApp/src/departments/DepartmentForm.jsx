import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    createDepartment,
    updateDepartment,
} from "@/services/api/api-department";
import { toast } from "react-hot-toast";

const DepartmentForm = ({ department, onClose, onSuccess }) => {
    const [formData, setFormData] = useState({
        name: "",
    });
    const [loading, setLoading] = useState(false);

    const isEditing = !!department;

    useEffect(() => {
        if (department) {
            setFormData({
                name: department.name || "",
            });
        }
    }, [department]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            if (isEditing) {
                await updateDepartment(department.departmentId, formData);
                toast.success("Department updated successfully!");
            } else {
                await createDepartment(formData);
                toast.success("Department created successfully!");
            }
            onSuccess?.();
            onClose();
        } catch (error) {
            toast.error(
                error.response?.data?.message ||
                    `Failed to ${isEditing ? "update" : "create"} department`
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
            <DialogContent className="w-[30rem] bg-white border-slate-200 shadow-xl">
                <DialogHeader className="border-b border-slate-100 pb-4">
                    <DialogTitle className="text-xl font-semibold text-slate-900">
                        {isEditing ? "Edit Department" : "Add New Department"}
                    </DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-6 pt-4">
                    <div className="space-y-2">
                        <Label
                            htmlFor="name"
                            className="text-sm font-medium text-slate-700">
                            Department Name
                        </Label>
                        <Input
                            id="name"
                            value={formData.name}
                            onChange={(e) =>
                                handleChange("name", e.target.value)
                            }
                            placeholder="Enter department name"
                            className="border-slate-300 outline-none "
                            required
                        />
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

export default DepartmentForm;
