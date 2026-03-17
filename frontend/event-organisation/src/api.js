import axios from 'axios';

const api = axios.create({
 baseURL: 'https://event-orgaisation-system.onrender.com/api',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',  
  },
});
api.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

export default api;
