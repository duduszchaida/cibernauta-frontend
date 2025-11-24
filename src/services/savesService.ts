import { api } from "./api";

export const savesService = {
  getSave: async () => {
    const response = await api.get(`/saves?save_slot=1`);
    return response.data;
  },

  saveGame: async (data: { game_id: number; save_data?: string }) => {
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
