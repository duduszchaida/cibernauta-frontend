import { api } from "./api";

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
