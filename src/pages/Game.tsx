import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import GameComponent from "./GameComponent";
import { gamesService } from "../services/api";
import { useAuth } from "../contexts/AuthContext";
import { Mouse, ArrowUp, ArrowDown, ArrowLeft, ArrowRight } from "lucide-react";

interface GameData {
  game_id: number;
  game_title: string;
  description: string;
  difficulty: number;
  image_url?: string;
  levels: any[];
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

  useEffect(() => {
    const loadGame = async () => {
      if (!gameId) {
        setError("ID do jogo não fornecido");
        setLoading(false);
        return;
      }

      try {
        const data = await gamesService.getOne(Number(gameId));
        setGameData(data);
      } catch (err) {
        console.error("Erro ao carregar jogo:", err);
        setError("Não foi possível carregar o jogo");
      } finally {
        setLoading(false);
      }
    };

    loadGame();
  }, [gameId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#2B71A3] flex items-center justify-center">
        <div className="text-white text-xl">Carregando jogo...</div>
      </div>
    );
  }

  if (error || !gameData) {
    return (
      <div className="min-h-screen bg-[#2B71A3] flex flex-col items-center justify-center gap-4">
        <div className="text-white text-xl">
          {error || "Jogo não encontrado"}
        </div>
        <button
          onClick={() => navigate("/games")}
          className="px-4 py-2 bg-[#2563EB] text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Voltar para Jogos
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#2B71A3]">
      <Navigation username={user?.user_name} showGamesLink={true} />

      <div className="pt-6 pb-12 px-6">
        <div className="max-w-full mx-auto">
          <div className="grid grid-cols-1 xl:grid-cols-[240px,1fr,280px] gap-4 max-w-[1920px] mx-auto">
            <div className="bg-[#374B7C] rounded-2xl p-5 h-fit">
              <h2 className="text-white text-lg font-semibold mb-5">
                Controles
              </h2>

              <div className="space-y-4">
                <div className="bg-[#2B3E68] rounded-xl p-3">
                  <div className="flex items-center gap-3">
                    <div className="bg-[#4A5D8F] p-2 rounded-lg">
                      <Mouse className="w-7 h-7 text-white" />
                    </div>
                    <span className="text-white text-base font-medium">
                      Interação
                    </span>
                  </div>
                </div>

                <div className="bg-[#2B3E68] rounded-xl p-3">
                  <div className="flex items-center gap-3">
                    <div className="bg-[#4A5D8F] p-2 rounded-lg">
                      <div className="grid grid-cols-3 gap-1">
                        <div className="w-5 h-5 bg-[#6B7BA8] rounded"></div>
                        <div className="w-5 h-5 bg-[#8B9BBD] rounded flex items-center justify-center">
                          <ArrowUp className="w-3 h-3 text-white" />
                        </div>
                        <div className="w-5 h-5 bg-[#6B7BA8] rounded"></div>
                        <div className="w-5 h-5 bg-[#8B9BBD] rounded flex items-center justify-center">
                          <ArrowLeft className="w-3 h-3 text-white" />
                        </div>
                        <div className="w-5 h-5 bg-[#8B9BBD] rounded flex items-center justify-center">
                          <ArrowDown className="w-3 h-3 text-white" />
                        </div>
                        <div className="w-5 h-5 bg-[#8B9BBD] rounded flex items-center justify-center">
                          <ArrowRight className="w-3 h-3 text-white" />
                        </div>
                      </div>
                    </div>
                    <span className="text-white text-base font-medium">
                      Movimento
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#374B7C] rounded-2xl p-5">
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
                <GameComponent />
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

            <div className="bg-[#374B7C] rounded-2xl p-5 h-fit">
              <h2 className="text-white text-lg font-semibold mb-5">
                Sua Pontuação Recorde
              </h2>

              <div className="bg-[#2B3E68] rounded-xl p-6 text-center">
                <div className="text-[#5B7FC7] text-7xl font-bold mb-2">
                  {highScore}
                </div>
                <p className="text-gray-400 text-sm">pontos atuais</p>
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
          </div>
        </div>
      </div>
    </div>
  );
}
