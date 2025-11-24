import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem("firebase_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const isAuthRoute =
      error.config?.url?.includes("/auth/login") ||
      error.config?.url?.includes("/auth/register") ||
      error.config?.url?.includes("/auth/resend-verification") ||
      error.config?.url?.includes("/auth/forgot-password");

    console.log("[Interceptor] Error:", {
      status: error.response?.status,
      url: error.config?.url,
      isAuthRoute,
      willRedirect: error.response?.status === 401 && !isAuthRoute,
    });

    if (error.response?.status === 401 && !isAuthRoute) {
      console.log("[Interceptor] Redirecting to login - session expired");
      localStorage.removeItem("firebase_token");
      localStorage.removeItem("user");
      window.location.href = "/";
    }
    return Promise.reject(error);
  },
);
