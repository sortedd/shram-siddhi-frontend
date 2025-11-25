import axios from 'axios';

// API base configuration - Removed /api prefix since our backend routes don't include it
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || import.meta.env.REACT_APP_API_BASE_URL || 'http://localhost:3001';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem('auth-token');
    if (token) {
      config.headers.Authorization = Bearer ;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      sessionStorage.removeItem('auth-token');
      sessionStorage.removeItem('user-role');
      window.location.href = '/admin-login';
    }
    return Promise.reject(error);
  }
);

// API service methods
export const apiService = {
  // Health check
  health: () => api.get('/'),

  // Authentication
  auth: {
    login: (credentials) => api.post('/api/auth/login', credentials),
    logout: () => {
      sessionStorage.removeItem('auth-token');
      sessionStorage.removeItem('user-role');
      return Promise.resolve();
    }
  },

  // Workers
  workers: {
    getAll: () => api.get('/api/workers'),
    getById: (id) => api.get(/workers/),
    create: (workerData) => api.post('/api/workers/create', workerData),
    updateStatus: (id, status) => api.put(/workers//status, { status }),
    updateVerification: (id, verified) => api.put(/workers//verification, { verified }),
    exportCSV: () => api.get('/workers/export/csv', { responseType: 'blob' })
  },

  // Client requests
  clientRequests: {
    getAll: () => api.get('/client-requests'),
    create: (requestData) => api.post('/api/client-requests/create', requestData),
    updateStatus: (id, status) => api.put(/client-requests//status, { status })
  },

  // Contact messages
  contact: {
    create: (messageData) => api.post('/api/contact/create', messageData)
  }
};

// Helper functions for error handling
export const handleApiError = (error) => {
  if (error.response) {
    // Server responded with error status
    return {
      message: error.response.data?.error || 'Server error occurred',
      status: error.response.status
    };
  } else if (error.request) {
    // Request was made but no response received
    return {
      message: 'Network error - please check your connection',
      status: 0
    };
  } else {
    // Something else happened
    return {
      message: error.message || 'An unexpected error occurred',
      status: -1
    };
  }
};

// Utility function to check if API is available
export const checkApiHealth = async () => {
  try {
    await apiService.health();
    return true;
  } catch (error) {
    console.error('API health check failed:', error);
    return false;
  }
};

export default api;
