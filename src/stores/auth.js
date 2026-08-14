import { defineStore } from 'pinia';
import apiClient from '../api/axios';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: JSON.parse(localStorage.getItem('user')) || null,
    accessToken: localStorage.getItem('accessToken') || null,
  }),
  actions: {
    async login(email, password) {
      const response = await apiClient.post('/api/v1/users/login', { email, password });
      this.accessToken = response.data.accessToken;
      localStorage.setItem('accessToken', this.accessToken);
      
      // User තොරතුරු ලබාගැනීම (Payload එකෙන් හෝ වෙනම API එකෙන්)
      if (response.data.userId) {
        const userRes = await apiClient.get(`/api/v1/users/${response.data.userId}`);
        this.user = userRes.data;
        localStorage.setItem('user', JSON.stringify(this.user));
      }
      return response.data;
    },
    logout() {
      this.user = null;
      this.accessToken = null;
      localStorage.removeItem('accessToken');
      localStorage.removeItem('user');
    }
  }
});