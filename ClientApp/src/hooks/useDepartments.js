import { useState, useEffect } from 'react';
import { 
  getAllDepartments, 
  getDepartmentById, 
  createDepartment, 
  updateDepartment, 
  deleteDepartment 
} from '../services/api/api-department';
import { toast } from 'react-hot-toast';

export const useDepartments = () => {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchDepartments = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getAllDepartments();
      setDepartments(response.data);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDepartments();
  }, []);

  const refetch = () => {
    fetchDepartments();
  };

  return {
    data: departments,
    isLoading: loading,
    error,
    refetch,
  };
};

export const useDepartment = (id) => {
  const [department, setDepartment] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchDepartment = async () => {
    if (!id) return;
    
    setLoading(true);
    setError(null);
    try {
      const response = await getDepartmentById(id);
      setDepartment(response.data);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDepartment();
  }, [id]);

  return {
    data: department,
    isLoading: loading,
    error,
    refetch: fetchDepartment,
  };
};

export const useCreateDepartment = () => {
  const [loading, setLoading] = useState(false);

  const mutate = async (departmentData) => {
    setLoading(true);
    try {
      const response = await createDepartment(departmentData);
      toast.success('Department created successfully!');
      return response.data;
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to create department');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const mutateAsync = mutate;

  return {
    mutate,
    mutateAsync,
    isPending: loading,
  };
};

export const useUpdateDepartment = () => {
  const [loading, setLoading] = useState(false);

  const mutate = async ({ id, data }) => {
    setLoading(true);
    try {
      const response = await updateDepartment(id, data);
      toast.success('Department updated successfully!');
      return response.data;
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update department');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const mutateAsync = mutate;

  return {
    mutate,
    mutateAsync,
    isPending: loading,
  };
};

export const useDeleteDepartment = () => {
  const [loading, setLoading] = useState(false);

  const mutate = async (id) => {
    setLoading(true);
    try {
      await deleteDepartment(id);
      toast.success('Department deleted successfully!');
      return true;
    } catch (error) {
      if (error.response?.status === 400) {
        toast.error('Cannot delete department with employees assigned to it.');
      } else {
        toast.error(error.response?.data?.message || 'Failed to delete department');
      }
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const mutateAsync = mutate;

  return {
    mutate,
    mutateAsync,
    isPending: loading,
  };
};