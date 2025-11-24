import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import GameComponent from "./GameComponent";
import { gamesService, savesService } from "../services/api";
import { useAuth } from "../contexts/AuthContext";
import { Mouse, ArrowUp, ArrowDown, ArrowLeft, ArrowRight } from "lucide-react";

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

export default function Game() {
  const { gameId } = useParams<{ gameId: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [gameData, setGameData] = useState<GameData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentScore, setCurrentScore] = useState(0);
  const [highScore, setHighScore] = useState(0);

  const handleScoreUpdate = async (score: number) => {
    setCurrentScore(score);

    // Atualizar highscore se a pontuação atual for maior
    if (score > highScore && gameId) {
      try {
        const response = await savesService.updateHighscore({
          game_id: Number(gameId),
          score: score,
        });
        setHighScore(response.score);
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

        // Se for jogo local, carregar highscore
        if (data.game_type === "local") {
          try {
            const highscoreData = await savesService.getHighscore(
              Number(gameId),
            );
            setHighScore(highscoreData.score || 0);
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
      <Navigation full_name={user?.full_name} showGamesLink={true} />

      <div className="pt-32 pb-12 px-6">
        <div className="max-w-full mx-auto">
          <div className="grid grid-cols-1 xl:grid-cols-[240px,1fr,280px] gap-4 max-w-[1920px] mx-auto">
            <div className="bg-[#374B7C] rounded-2xl p-5 h-fit">
              <h2 className="text-white text-lg font-semibold mb-5">
                Controles
              </h2>

              <div className="space-y-3">
                {gameData.controls && gameData.controls.length > 0 ? (
                  gameData.controls.map((control) => (
                    <div
                      key={control.control_id}
                      className="bg-[#2B3E68] rounded-xl p-3"
                    >
                      <div className="flex items-center gap-3">
                        <div className="bg-[#4A5D8F] p-2 rounded-lg">
                          <img
                            src={`/keys/${control.key_image}.png`}
                            alt={control.description}
                            className="w-7 h-7"
                            style={{ imageRendering: "pixelated" }}
                          />
                        </div>
                        <span className="text-white text-base font-medium">
                          {control.description}
                        </span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="bg-[#2B3E68] rounded-xl p-4">
                    <p className="text-gray-400 text-sm text-center">
                      Sem controles definidos
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="bg-[#374B7C] rounded-2xl p-5">
              {gameData.enabled === false &&
                (user?.role === "ADMIN" || user?.role === "MODERATOR") && (
                  <div className="mb-4 bg-red-900/30 border-2 border-red-500 rounded-lg p-3 flex items-center gap-2">
                    <span className="text-red-400 text-2xl">🔒</span>
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
                  <span className="text-sm">⭐ 0 pontos</span>
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

              <div className="mt-4 flex justify-center">
                <button
                  onClick={() => navigate("/games")}
                  className="px-6 py-2 bg-[#2563EB] text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  Voltar para Jogos
                </button>
              </div>
            </div>

            {gameData.game_type === "local" && (
              <div className="bg-[#374B7C] rounded-2xl p-5 h-fit">
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
                      <span className="text-gray-300 text-sm">Dificuldade</span>
                      <span className="text-white font-semibold">
                        {"⭐".repeat(gameData.difficulty)}
                      </span>
                    </div>
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
