import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import { useAuth } from "../contexts/AuthContext";
import { gamesService } from "@/services/gamesService";
import { savesService } from "@/services/savesService";
import EmailGameComponent from "./EmailGameComponent";
import IframeGameComponent from "./IframeGameComponent";

interface GameControl {
  control_id: number;
  key_image: string;
  description: string;
  order: number;
}

interface GameData {
  game_id: number;
  game_title: string;
  description: string;
  difficulty: number;
  image_url?: string;
  game_url?: string;
  game_type?: string;
  enabled?: boolean;
  controls?: GameControl[];
}

interface LeaderboardEntry {
  highscore_id: number;
  score: number;
  created_at: string;
  save: {
    user: {
      username: string;
      full_name: string;
      role?: string;
    };
  };
  position?: number;
}

export default function Game() {
  const { gameId } = useParams<{ gameId: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [gameData, setGameData] = useState<GameData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);

  async function getLeaderBoard() {
    try {
      // Busca um número maior de entradas para encontrar a posição do usuário
      const leaderboardData = await savesService.getLeaderboard(
        Number(gameId),
        100,
      );

      // Encontra a posição do usuário atual no ranking
      const userIndex = leaderboardData.findIndex(
        (entry: LeaderboardEntry) =>
          entry.save.user.username === user?.username,
      );

      let displayLeaderboard: LeaderboardEntry[] = [];

      if (userIndex === -1) {
        // Usuário não tem pontuação, mostra apenas o top 10
        displayLeaderboard = leaderboardData
          .slice(0, 10)
          .map((entry: LeaderboardEntry, index: number) => ({
            ...entry,
            position: index + 1,
          }));
      } else if (userIndex < 10) {
        // Usuário está no top 10, mostra o top 10
        displayLeaderboard = leaderboardData
          .slice(0, 10)
          .map((entry: LeaderboardEntry, index: number) => ({
            ...entry,
            position: index + 1,
          }));
      } else {
        // Usuário não está no top 10, mostra top 9 + usuário
        const top9 = leaderboardData
          .slice(0, 9)
          .map((entry: LeaderboardEntry, index: number) => ({
            ...entry,
            position: index + 1,
          }));
        const userEntry = {
          ...leaderboardData[userIndex],
          position: userIndex + 1,
        };
        displayLeaderboard = [...top9, userEntry];
      }

      setLeaderboard(displayLeaderboard);
    } catch (err) {
      console.error("Erro ao carregar highscore:", err);
    }
  }

  useEffect(() => {
    const loadGame = async () => {
      if (!gameId) {
        setError("ID do jogo não fornecido");
        setLoading(false);
        return;
      }

      try {
        console.log(gameId);
        const data = await gamesService.getOne(Number(gameId));
        if (
          data.enabled === false &&
          user?.role !== "ADMIN" &&
          user?.role !== "MODERATOR"
        ) {
          setError("Este jogo está temporariamente desabilitado");
          setLoading(false);
          return;
        }
        setGameData(data);
        if (data.game_type === "local") {
          getLeaderBoard();
        }
      } catch (err) {
        console.error("Erro ao carregar jogo:", err);
        setError("Não foi possível carregar o jogo");
      } finally {
        setLoading(false);
      }
    };

    loadGame();
  }, [gameId, user]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#2B71A3] flex items-center justify-center">
        <div className="text-white text-xl">Carregando jogo...</div>
      </div>
    );
  }

  if (error || !gameData) {
    const isDisabledGame =
      error === "Este jogo está temporariamente desabilitado";

    return (
      <div className="min-h-screen bg-[#2B71A3] flex flex-col items-center justify-center gap-4 px-4">
        <div
          className={`${isDisabledGame ? "bg-red-900/30 border-2 border-red-500" : "bg-[#374B7C]"} rounded-xl p-8 max-w-md text-center`}
        >
          <div className="text-6xl mb-4">{isDisabledGame ? "🔒" : "❌"}</div>
          <div className="text-white text-xl mb-2 font-semibold">
            {isDisabledGame ? "Jogo Desabilitado" : "Erro"}
          </div>
          <div className="text-gray-300 mb-6">
            {error || "Jogo não encontrado"}
          </div>
          <button
            onClick={() => navigate("/games")}
            className="px-6 py-3 bg-[#2563EB] text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Voltar para Jogos
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#2B71A3] overflow-x-hidden">
      <Navigation username={user?.username} showGamesLink={true} />

      <div className="pt-6 px-4 sm:px-6 overflow-x-hidden">
        <div
          className={`grid grid-cols-1 gap-4 w-full ${
            gameData.game_type === "local" &&
            gameData.controls &&
            gameData.controls.length > 0
              ? "2xl:grid-cols-[300px,1fr,280px] xl:grid-cols-[260px,1fr,260px] lg:grid-cols-1"
              : gameData.game_type === "local"
                ? "2xl:grid-cols-[1fr,280px] xl:grid-cols-[1fr,260px] lg:grid-cols-1"
                : gameData.controls && gameData.controls.length > 0
                  ? "2xl:grid-cols-[300px,1fr] xl:grid-cols-[260px,1fr] lg:grid-cols-1"
                  : ""
          }`}
        >
          <div className="w-full">
            {gameData.controls && gameData.controls.length > 0 && (
              <div className="bg-[#374B7C] rounded-2xl p-3 sm:p-5 h-fit order-1 w-full">
                <h2 className="text-white text-lg font-semibold mb-5">
                  Controles
                </h2>

                <div className="space-y-3">
                  {gameData.controls.map((control) => (
                    <div
                      key={control.control_id}
                      className="bg-[#2B3E68] rounded-xl p-3"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <img
                          src={`/keys/${control.key_image}.png`}
                          alt={control.description}
                          className="flex-shrink-0"
                          style={{
                            imageRendering: "pixelated",
                            width: 62,
                            height: 62,
                          }}
                        />
                        <span className="text-white text-base font-medium break-words overflow-wrap-anywhere flex-1 min-w-0">
                          {control.description}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="bg-[#374B7C] rounded-2xl p-3 sm:p-5 order-2 w-full overflow-hidden h-fit">
            {gameData.enabled === false &&
              (user?.role === "ADMIN" || user?.role === "MODERATOR") && (
                <div className="mb-4 bg-red-900/30 border-2 border-red-500 rounded-lg p-3 flex items-center gap-2">
                  <div>
                    <div className="text-red-400 font-semibold text-sm">
                      JOGO DESABILITADO
                    </div>
                    <div className="text-red-300 text-xs">
                      Você está visualizando este jogo como
                      administrador/moderador
                    </div>
                  </div>
                </div>
              )}

            <div className="bg-[#1a2744] rounded-lg overflow-hidden flex items-center justify-center w-full">
              {gameData.game_id == 1 ? (
                <EmailGameComponent
                  leaderboardUpdate={getLeaderBoard}
                ></EmailGameComponent>
              ) : (
                <IframeGameComponent gameUrl={gameData.game_url} />
              )}
            </div>
          </div>

          {gameData.game_type === "local" && (
            <div className="space-y-4 order-3 w-full">
              <div className="bg-[#374B7C] rounded-2xl p-3 sm:p-5 w-full">
                <h2 className="text-white text-lg font-semibold mb-5 flex items-center gap-2">
                  Placar
                </h2>

                <div className="space-y-2">
                  {leaderboard.length > 0 ? (
                    leaderboard.map((entry) => {
                      const position = entry.position || 0;
                      return (
                        <div
                          key={entry.highscore_id}
                          className={`bg-[#2B3E68] rounded-lg p-3 ${
                            entry.save.user.username === user?.username
                              ? "border-2 border-yellow-400"
                              : ""
                          }`}
                        >
                          <div className="flex items-center justify-between gap-2 min-w-0">
                            <div className="flex items-center gap-3 min-w-0 flex-1">
                              <div
                                className={`flex items-center justify-center w-8 h-8 rounded-full font-bold text-sm flex-shrink-0 ${
                                  position === 1
                                    ? "bg-yellow-500 text-white"
                                    : position === 2
                                      ? "bg-gray-400 text-white"
                                      : position === 3
                                        ? "bg-amber-600 text-white"
                                        : "bg-[#4A5D8F] text-gray-300"
                                }`}
                              >
                                {position === 1 ? (
                                  <img
                                    src={"/number_1.png"}
                                    style={{
                                      width: "32px",
                                      height: "32px",
                                      imageRendering: "pixelated",
                                    }}
                                  />
                                ) : position === 2 ? (
                                  <img
                                    src={"/number_2.png"}
                                    style={{
                                      width: "32px",
                                      height: "32px",
                                      imageRendering: "pixelated",
                                    }}
                                  />
                                ) : position === 3 ? (
                                  <img
                                    src={"/number_3.png"}
                                    style={{
                                      width: "32px",
                                      height: "32px",
                                      imageRendering: "pixelated",
                                    }}
                                  />
                                ) : (
                                  position
                                )}
                              </div>
                              <div className="text-white text-sm font-medium truncate min-w-0 flex-1">
                                {entry.save.user.username}
                              </div>
                            </div>
                            <div className="text-yellow-400 font-bold text-lg flex-shrink-0">
                              {entry.score}
                            </div>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <div className="bg-[#2B3E68] rounded-lg p-6 text-center">
                      <p className="text-gray-400 text-sm">
                        Nenhuma pontuação registrada ainda
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
