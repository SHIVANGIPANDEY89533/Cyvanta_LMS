import axios from 'axios';

const api = axios.create({
  baseURL: 'https://cyvanta-lms-backend.onrender.com/api',
  withCredentials: true
});

export default api;