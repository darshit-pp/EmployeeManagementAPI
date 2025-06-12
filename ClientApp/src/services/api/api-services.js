// const API_BASE_URL = 'https://localhost:7170/';
import { API_BASE_URL } from './axios';
export const getApiUrl = (endpoint) => {
  return `${API_BASE_URL}${endpoint}`;
};

export const getEmployeeApiUrl = (endpoint) => {
  return `${API_BASE_URL}/${endpoint}`;
};

export const getDepartmentApiUrl = (endpoint) => {
  return `${API_BASE_URL}/${endpoint}`;
};