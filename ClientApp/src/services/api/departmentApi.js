// import apiClient from './axios';

// export const departmentApi = {
//   // Get all departments
//   getAll: async () => {
//     const response = await apiClient.get('/departments');
//     return response.data;
//   },

//   // Get department by ID
//   getById: async (id) => {
//     const response = await apiClient.get(`/departments/${id}`);
//     return response.data;
//   },

//   // Create new department
//   create: async (departmentData) => {
//     const response = await apiClient.post('/departments', departmentData);
//     return response.data;
//   },

//   // Update department
//   update: async (id, departmentData) => {
//     const response = await apiClient.put(`/departments/${id}`, departmentData);
//     return response.data;
//   },

//   // Delete department
//   delete: async (id) => {
//     const response = await apiClient.delete(`/departments/${id}`);
//     return response.data;
//   },
// };