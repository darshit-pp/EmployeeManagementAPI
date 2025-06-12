import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useCreateDepartment, useUpdateDepartment } from '@/hooks/useDepartments';

const DepartmentForm = ({ department, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
  });

  const createDepartment = useCreateDepartment();
  const updateDepartment = useUpdateDepartment();

  const isEditing = !!department;

  useEffect(() => {
    if (department) {
      setFormData({
        name: department.name || '',
      });
    }
  }, [department]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      if (isEditing) {
        await updateDepartment.mutateAsync({
          id: department.departmentId,
          data: formData,
        });
      } else {
        await createDepartment.mutateAsync(formData);
      }
      onClose();
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? 'Edit Department' : 'Add New Department'}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Department Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              placeholder="Enter department name"
              required
            />
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={createDepartment.isPending || updateDepartment.isPending}
            >
              {createDepartment.isPending || updateDepartment.isPending 
                ? 'Saving...' 
                : isEditing ? 'Update' : 'Create'
              }
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default DepartmentForm;