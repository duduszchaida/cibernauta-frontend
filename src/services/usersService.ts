import { api } from "./api";

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
