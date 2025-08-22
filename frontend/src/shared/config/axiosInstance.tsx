import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/api", // 👈 match your backend port
  withCredentials: true,
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // ✅ fixed
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.clear();
      window.location.href = "/login"; // ✅ direct redirect
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
