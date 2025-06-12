import axios from 'axios';
import urls from './urls';
import { getApiUrl, getDepartmentApiUrl } from './api-services';

export const getAllDepartments = () => {
  const url = urls.departments;
  return axios.get(getDepartmentApiUrl(url));
};

export const getDepartmentById = (id) => {
  const url = `${urls.departmentById}/${id}`;
  return axios.get(getApiUrl(url));
};

export const createDepartment = (departmentData) => {
  const url = urls.createDepartment;
  return axios.post(getApiUrl(url), departmentData);
};

export const updateDepartment = (id, departmentData) => {
  const url = `${urls.updateDepartment}/${id}`;
  return axios.put(getApiUrl(url), departmentData);
};

export const deleteDepartment = (id) => {
  const url = `${urls.deleteDepartment}/${id}`;
  return axios.delete(getApiUrl(url));
};