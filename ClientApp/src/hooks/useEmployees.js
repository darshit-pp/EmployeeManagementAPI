import { useState, useEffect } from 'react';
import { 
  getAllEmployees, 
  getEmployeeById, 
  createEmployee, 
  updateEmployee, 
  deleteEmployee,
  getEmployeeStatistics,
  searchEmployees,
  getEmployeesByDepartment,
  getActiveEmployees,
} from '../services/api/api-employee';
import { toast } from 'react-hot-toast';

export const useEmployees = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchEmployees = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getAllEmployees();
      setEmployees(response.data);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const refetch = () => {
    fetchEmployees();
  };

  return {
    data: employees,
    isLoading: loading,
    error,
    refetch,
  };
};

export const useEmployee = (id) => {
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchEmployee = async () => {
    if (!id) return;
    
    setLoading(true);
    setError(null);
    try {
      const response = await getEmployeeById(id);
      setEmployee(response.data);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployee();
  }, [id]);

  return {
    data: employee,
    isLoading: loading,
    error,
    refetch: fetchEmployee,
  };
};

export const useCreateEmployee = () => {
  const [loading, setLoading] = useState(false);

  const mutate = async (employeeData) => {
    setLoading(true);
    try {
      const response = await createEmployee(employeeData);
      toast.success('Employee created successfully!');
      return response.data;
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to create employee');
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

export const useUpdateEmployee = () => {
  const [loading, setLoading] = useState(false);

  const mutate = async ({ id, data }) => {
    setLoading(true);
    try {
      const response = await updateEmployee(id, data);
      toast.success('Employee updated successfully!');
      return response.data;
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update employee');
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

export const useDeleteEmployee = () => {
  const [loading, setLoading] = useState(false);

  const mutate = async (id) => {
    setLoading(true);
    try {
      await deleteEmployee(id);
      toast.success('Employee deleted successfully!');
      return true;
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to delete employee');
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

export const useEmployeeStatistics = () => {
  const [statistics, setStatistics] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchStatistics = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getEmployeeStatistics();
      setStatistics(response.data);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStatistics();
  }, []);

  return {
    data: statistics,
    isLoading: loading,
    error,
    refetch: fetchStatistics,
  };
};