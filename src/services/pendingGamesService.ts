import { api } from "./api";

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
    const response = await api.get("/games/all/my");
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
