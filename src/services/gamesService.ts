import { api } from "./api";

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
    image_url?: string | null;
    game_url?: string | null;
    game_type?: string;
    enabled?: boolean;
    controls: Array<{ key_image: string; description: string }> | null;
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
