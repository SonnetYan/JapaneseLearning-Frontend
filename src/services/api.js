import axios from 'axios';

const API_URL = 'http://localhost:5001/api';

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true
});

// Add response interceptor for better error handling
api.interceptors.response.use(
  response => response,
  error => {
    if (error.message === 'Network Error') {
      console.error('CORS or network issue detected:', error);
      // You can add custom handling here, like showing a user-friendly message
    }
    return Promise.reject(error);
  }
);

// Helper function to handle API errors
const handleApiError = async (apiCall) => {
  try {
    return await apiCall();
  } catch (error) {
    console.error('API Error:', error.message);
    throw error;
  }
};

// Vocabulary Service
export const vocabularyService = {
  // Get all vocabulary words
  getAll: () => handleApiError(() => api.get('/vocabulary')),
  
  // Get a specific vocabulary word by ID
  getById: (id) => handleApiError(() => api.get(`/vocabulary/${id}`)),
  
  // Create a new vocabulary word
  create: (word) => handleApiError(() => api.post('/vocabulary', word)),
  
  // Update a vocabulary word
  update: (id, word) => handleApiError(() => api.put(`/vocabulary/${id}`, word)),
  
  // Delete a vocabulary word
  delete: (id) => handleApiError(() => api.delete(`/vocabulary/${id}`))
};

// User Progress Service
export const progressService = {
  // Get progress for a specific user
  getProgress: (userId) => handleApiError(() => api.get(`/progress/user/${userId}`)),
  
  // Update progress for a vocabulary word
  updateProgress: (progressData) => handleApiError(() => api.post('/progress/update', progressData)),
  
  // Get words due for review
  getReviewWords: (userId) => handleApiError(() => api.get(`/progress/review/${userId}`))
}; 