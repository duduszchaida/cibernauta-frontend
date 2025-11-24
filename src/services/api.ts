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

export const authService = {
  register: async (data: {
    username: string;
    full_name: string;
    user_email: string;
    password: string;
  }) => {
    const response = await api.post("/auth/register", data);
    return response.data;
  },

  login: async (data: { identifier: string; password: string }) => {
    const response = await api.post("/auth/login", data);
    return response.data;
  },

  getProfile: async () => {
    const response = await api.get("/auth/me");
    return response.data;
  },

  requestPasswordReset: async (email: string) => {
    const response = await api.post("/auth/forgot-password", {
      user_email: email,
    });
    return response.data;
  },

  resetPassword: async (token: string, newPassword: string) => {
    const response = await api.post("/auth/reset-password", {
      token,
      password: newPassword,
    });
    return response.data;
  },

  changePassword: async (data: {
    currentPassword: string;
    newPassword: string;
  }) => {
    const response = await api.post("/auth/change-password", data);
    return response.data;
  },

  deleteAccount: async () => {
    const response = await api.delete("/auth/delete-account");
    return response.data;
  },

  resendVerificationEmail: async (email: string) => {
    const response = await api.post("/auth/resend-verification-email", {
      user_email: email,
    });
    return response.data;
  },

  checkEmailVerification: async () => {
    const response = await api.get("/auth/check-email-verification");
    return response.data;
  },
};

export const gamesService = {
  getAll: async () => {
    const response = await api.get("/games");
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
    game_url?: string;
    enabled?: boolean;
    controls: Array<{ key_image: string; description: string }> | undefined;
  }) => {
    const response = await api.post("/games", data);
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

export const usersService = {
  getAll: async () => {
    const response = await api.get("/users");
    return response.data;
  },

  getOne: async (id: number) => {
    const response = await api.get(`/users/${id}`);
    return response.data;
  },

  getProfile: async () => {
    const response = await api.get("/users/profile");
    return response.data;
  },

  updateProfile: async (data: {
    user_name?: string;
    user_email?: string;
    full_name?: string;
  }) => {
    const response = await api.patch("/users/profile", data);
    return response.data;
  },

  update: async (
    id: number,
    data: {
      full_name?: string;
      user_name?: string;
      user_email?: string;
      admin?: boolean;
      role?: string;
    },
  ) => {
    const response = await api.patch(`/users/${id}`, data);
    return response.data;
  },

  delete: async (id: number) => {
    const response = await api.delete(`/users/${id}`);
    return response.data;
  },
};

export const pendingGamesService = {
  getAll: async () => {
    const response = await api.get("/games/pending");
    return response.data;
  },

  getMyPending: async () => {
    const response = await api.get("/games/pending/my");
    return response.data;
  },
  
  getMyAll: async () => {
    const response = await api.get('/games/all/my');
    return response.data;
  },

  create: async (data: any) => {
    const response = await api.post("/games/pending", data);
    return response.data;
  },

  update: async (id: number, data: any) => {
    const response = await api.patch(`/games/pending/${id}`, data);
    return response.data;
  },

  approve: async (id: number, status: "APPROVED" | "REJECTED") => {
    const response = await api.patch(`/games/pending/${id}/approve`, {
      status,
    });
    return response.data;
  },

  delete: async (id: number) => {
    const response = await api.delete(`/games/pending/${id}`);
    return response.data;
  },
};

export const moderatorRequestsService = {
  create: async (data: { reason?: string }) => {
    const response = await api.post("/moderator-requests", data);
    return response.data;
  },

  getAll: async () => {
    const response = await api.get("/moderator-requests");
    return response.data;
  },

  getPending: async () => {
    const response = await api.get("/moderator-requests/pending");
    return response.data;
  },

  getMyRequest: async () => {
    const response = await api.get("/moderator-requests/my");
    return response.data;
  },

  review: async (id: number, status: "APPROVED" | "REJECTED") => {
    const response = await api.patch(`/moderator-requests/${id}/review`, {
      status,
    });
    return response.data;
  },

  delete: async (id: number) => {
    const response = await api.delete(`/moderator-requests/${id}`);
    return response.data;
  },
};

export const savesService = {
  getSave: async (saveSlot: number = 1) => {
    const response = await api.get(`/saves?save_slot=${saveSlot}`);
    return response.data;
  },

  saveGame: async (data: {
    game_id: number;
    save_slot: number;
    save_data?: string;
  }) => {
    const response = await api.post("/saves", data);
    return response.data;
  },

  getHighscore: async (gameId: number, saveSlot: number = 1) => {
    const response = await api.get(
      `/saves/highscore/${gameId}?save_slot=${saveSlot}`,
    );
    return response.data;
  },

  updateHighscore: async (
    data: { game_id: number; score: number },
    saveSlot: number = 1,
  ) => {
    const response = await api.post(
      `/saves/highscore?save_slot=${saveSlot}`,
      data,
    );
    return response.data;
  },

  getLeaderboard: async (gameId: number, limit: number = 10) => {
    const response = await api.get(
      `/saves/leaderboard/${gameId}?limit=${limit}`,
    );
    return response.data;
  },
};
