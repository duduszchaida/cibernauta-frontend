import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem('firebase_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('firebase_token');
      localStorage.removeItem('user');
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

export const authService = {
  register: async (data: { user_name: string; user_email: string; password: string }) => {
    const response = await api.post('/auth/register', data);
    return response.data;
  },
  
  login: async (data: { user_email: string; password: string }) => {
    const response = await api.post('/auth/login', data);
    return response.data;
  },
  
  getProfile: async () => {
    const response = await api.get('/auth/me');
    return response.data;
  },
};

export const gamesService = {
  getAll: async () => {
    const response = await api.get('/games');
    return response.data;
  },
  
  getOne: async (id: number) => {
    const response = await api.get(`/games/${id}`);
    return response.data;
  },
  
  create: async (data: {
    game_title: string;
    description: string;
    difficulty: number;
    image_url?: string;
    levels: Array<{ level_title: string; position: number }>;
  }) => {
    const response = await api.post('/games', data);
    return response.data;
  },
  
  update: async (id: number, data: any) => {
    const response = await api.patch(`/games/${id}`, data);
    return response.data;
  },
  
  delete: async (id: number) => {
    const response = await api.delete(`/games/${id}`);
    return response.data;
  },
};