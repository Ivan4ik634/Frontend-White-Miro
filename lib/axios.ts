import axios from 'axios';

const api = axios.create({
  baseURL: 'https://whitemirobackend.onrender.com',
  withCredentials: true,
});
api.interceptors.request.use((config) => {
  config.withCredentials = true;
  return config;
});
export default api;
