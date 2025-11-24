import { api } from "./api";

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
