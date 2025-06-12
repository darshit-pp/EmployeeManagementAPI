// import apiClient from './axios';

// export const employeeApi = {
//   // Get all employees
//   getAll: async () => {
//     const response = await apiClient.get('/employees');
//     return response.data;
//   },

//   // Get employee by ID
//   getById: async (id) => {
//     const response = await apiClient.get(`/employees/${id}`);
//     return response.data;
//   },

//   // Create new employee
//   create: async (employeeData) => {
//     const response = await apiClient.post('/employees', employeeData);
//     return response.data;
//   },

//   // Update employee
//   update: async (id, employeeData) => {
//     const response = await apiClient.put(`/employees/${id}`, employeeData);
//     return response.data;
//   },

//   // Delete employee
//   delete: async (id) => {
//     const response = await apiClient.delete(`/employees/${id}`);
//     return response.data;
//   },

//   // Search employees
//   search: async (searchTerm) => {
//     const response = await apiClient.get(`/employees/search?searchTerm=${searchTerm}`);
//     return response.data;
//   },

//   // Get employees by department
//   getByDepartment: async (departmentId) => {
//     const response = await apiClient.get(`/employees/by-department/${departmentId}`);
//     return response.data;
//   },

//   // Get active employees
//   getActive: async () => {
//     const response = await apiClient.get('/employees/active');
//     return response.data;
//   },

//   // Get employee statistics
//   getStatistics: async () => {
//     const response = await apiClient.get('/employees/statistics');
//     return response.data;
//   },
// };