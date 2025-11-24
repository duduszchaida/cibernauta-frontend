import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import GameComponent from "./GameComponent";
import { useAuth } from "../contexts/AuthContext";
import { gamesService } from "@/services/gamesService";
import { savesService } from "@/services/savesService";

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
}

export default function Game() {
  const { gameId } = useParams<{ gameId: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [gameData, setGameData] = useState<GameData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentScore, setCurrentScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);

  const handleScoreUpdate = async (score: number) => {
    setCurrentScore(score);

    if (score > highScore && gameId) {
      try {
        const response = await savesService.updateHighscore({
          game_id: Number(gameId),
          score: score,
        });
        setHighScore(response.score);

        const leaderboardData = await savesService.getLeaderboard(
          Number(gameId),
          10,
        );
        setLeaderboard(leaderboardData);
      } catch (err) {
        console.error("Erro ao atualizar highscore:", err);
      }
    }
  };

  useEffect(() => {
    const loadGame = async () => {
      if (!gameId) {
        setError("ID do jogo não fornecido");
        setLoading(false);
        return;
      }

      try {
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
          try {
            const highscoreData = await savesService.getHighscore(
              Number(gameId),
            );
            setHighScore(highscoreData.score || 0);

            const leaderboardData = await savesService.getLeaderboard(
              Number(gameId),
              10,
            );
            setLeaderboard(leaderboardData);
          } catch (err) {
            console.error("Erro ao carregar highscore:", err);
          }
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
    <div className="min-h-screen bg-[#2B71A3]">
      <Navigation username={user?.username} showGamesLink={true} />

      <div className="pt-6 pb-12 px-6">
        <div className="max-w-full mx-auto">
          <div
            className={`grid grid-cols-1 gap-4 max-w-[1920px] mx-auto ${
              gameData.game_type === "local" &&
              gameData.controls &&
              gameData.controls.length > 0
                ? "xl:grid-cols-[240px,1fr,280px]"
                : gameData.game_type === "local"
                  ? "xl:grid-cols-[1fr,280px]"
                  : gameData.controls && gameData.controls.length > 0
                    ? "xl:grid-cols-[240px,1fr]"
                    : ""
            }`}
          >
            {gameData.controls && gameData.controls.length > 0 && (
              <div className="bg-[#374B7C] rounded-2xl p-5 h-fit order-1 xl:order-1">
                <h2 className="text-white text-lg font-semibold mb-5">
                  Controles
                </h2>

                <div className="space-y-3">
                  {gameData.controls.map((control) => (
                    <div
                      key={control.control_id}
                      className="bg-[#2B3E68] rounded-xl p-3"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={`/keys/${control.key_image}.png`}
                          alt={control.description}
                          style={{
                            imageRendering: "pixelated",
                            width: 62,
                            height: 62,
                          }}
                        />
                        <span className="text-white text-base font-medium">
                          {control.description}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="bg-[#374B7C] rounded-2xl p-5 order-2 xl:order-2">
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

              <div className="flex items-center justify-between mb-3">
                <div>
                  <h1 className="text-white text-xl font-semibold">
                    {gameData.game_title}
                  </h1>
                  <p className="text-gray-300 text-sm">Nível: Iniciante</p>
                </div>
                <div className="flex items-center gap-2 text-yellow-400">
                  <span className="text-sm"> 0 pontos</span>
                </div>
              </div>

              <div className="bg-[#1a2744] rounded-lg overflow-hidden border-4 border-[#2B3E68] flex items-center justify-center">
                <GameComponent
                  gameUrl={gameData.game_url}
                  gameType={gameData.game_type}
                  gameId={gameData.game_id}
                  userId={user?.user_id}
                  onScoreUpdate={
                    gameData.game_type === "local"
                      ? handleScoreUpdate
                      : undefined
                  }
                />
              </div>
            </div>

            {gameData.game_type === "local" && (
              <div className="space-y-4 order-3 xl:order-3">
                <div className="bg-[#374B7C] rounded-2xl p-5">
                  <h2 className="text-white text-lg font-semibold mb-5">
                    Sua Pontuação Recorde
                  </h2>

                  <div className="bg-[#2B3E68] rounded-xl p-6 text-center">
                    <div className="text-[#5B7FC7] text-7xl font-bold mb-2">
                      {highScore}
                    </div>
                    <p className="text-gray-400 text-sm">pontos recorde</p>
                  </div>

                  <div className="mt-5 space-y-3">
                    <div className="bg-[#2B3E68] rounded-lg p-3">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300 text-sm">
                          Pontuação Atual
                        </span>
                        <span className="text-white font-semibold">
                          {currentScore}
                        </span>
                      </div>
                    </div>
                    <div className="bg-[#2B3E68] rounded-lg p-3">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300 text-sm">
                          Melhor Pontuação
                        </span>
                        <span className="text-yellow-400 font-semibold">
                          {highScore}
                        </span>
                      </div>
                    </div>
                    <div className="bg-[#2B3E68] rounded-lg p-3">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300 text-sm">
                          Dificuldade
                        </span>
                        <span className="text-white font-semibold">
                          {"⭐".repeat(gameData.difficulty)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-[#374B7C] rounded-2xl p-5">
                  <h2 className="text-white text-lg font-semibold mb-5 flex items-center gap-2">
                    Ranking
                  </h2>

                  <div className="space-y-2">
                    {leaderboard.length > 0 ? (
                      leaderboard.map((entry, index) => (
                        <div
                          key={entry.highscore_id}
                          className={`bg-[#2B3E68] rounded-lg p-3 ${
                            entry.save.user.username === user?.username
                              ? "border-2 border-yellow-400"
                              : ""
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div
                                className={`flex items-center justify-center w-8 h-8 rounded-full font-bold text-sm ${
                                  index === 0
                                    ? "bg-yellow-500 text-white"
                                    : index === 1
                                      ? "bg-gray-400 text-white"
                                      : index === 2
                                        ? "bg-amber-600 text-white"
                                        : "bg-[#4A5D8F] text-gray-300"
                                }`}
                              >
                                {index === 0
                                  ? "🥇"
                                  : index === 1
                                    ? "🥈"
                                    : index === 2
                                      ? "🥉"
                                      : index + 1}
                              </div>
                              <div className="text-white text-sm font-medium">
                                {entry.save.user.username}
                              </div>
                            </div>
                            <div className="text-yellow-400 font-bold text-lg">
                              {entry.score}
                            </div>
                          </div>
                        </div>
                      ))
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
    </div>
  );
}
