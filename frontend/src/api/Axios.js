// Simple axios setup.
// Right now the backend is not built yet, so this file is kept ready and
// the app uses mock data from data.js. Once the Spring Boot API is ready,
// we just set the baseURL and start calling these functions.

import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080/api',
});

// attach the saved token to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
