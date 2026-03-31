import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL!,
  withCredentials: true,
});
api.interceptors.request.use((config) => {
  config.withCredentials = true;
  return config;
});
export default api;
