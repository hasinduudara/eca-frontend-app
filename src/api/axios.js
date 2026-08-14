import axios from 'axios';

// API Gateway එකේ URL එක මෙතනට ලබාදෙන්න (දැනට Localhost, පසුව GCP Load Balancer/Gateway IP එක)
const API_BASE_URL = import.meta.env.VITE_API_GATEWAY_URL || 'http://localhost:8080';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Accept': 'application/json',
  }
});

// Request එකක් යැවීමට පෙර Access Token එක එක් කිරීම
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default apiClient;