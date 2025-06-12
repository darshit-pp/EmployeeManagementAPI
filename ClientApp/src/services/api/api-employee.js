import axios from 'axios';
import urls from './urls';
import { getApiUrl,getEmployeeApiUrl } from './api-services';

export const getCaseCounts = () => {
  const url = `${urls.employees}${urls.employeeStatistics}`;
  return axios.get(getApiUrl(url));
};

export const getAllEmployees = () => {
  const url = urls.employees;
  return axios.get(getEmployeeApiUrl(url));
};

export const getEmployeeById = (id) => {
  const url = `${urls.employeeById}/${id}`;
  return axios.get(getApiUrl(url));
};

export const createEmployee = (employeeData) => {
  const url = urls.createEmployee;
  return axios.post(getApiUrl(url), employeeData);
};

export const updateEmployee = (id, employeeData) => {
  const url = `${urls.updateEmployee}/${id}`;
  return axios.put(getApiUrl(url), employeeData);
};

export const deleteEmployee = (id) => {
  const url = `${urls.deleteEmployee}/${id}`;
  return axios.delete(getApiUrl(url));
};

export const searchEmployees = (searchTerm) => {
  const url = `${urls.searchEmployees}?searchTerm=${searchTerm}`;
  return axios.get(getApiUrl(url));
};

export const getEmployeesByDepartment = (departmentId) => {
  const url = `${urls.employeesByDepartment}/${departmentId}`;
  return axios.get(getApiUrl(url));
};

export const getActiveEmployees = () => {
  const url = urls.activeEmployees;
  return axios.get(getApiUrl(url));
};

export const getEmployeeStatistics = () => {
  const url = urls.employeeStatistics;
  return axios.get(getApiUrl(url));
};