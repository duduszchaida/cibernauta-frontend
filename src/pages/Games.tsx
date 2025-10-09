import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import { gamesService } from "../services/api";
import { useAuth } from "../contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { Plus } from "lucide-react";

interface Game {
  game_id: number;
  game_title: string;
  description: string;
  difficulty: number;
  levels: any[];
}

export default function Games() {
  const [games, setGames] = useState<Game[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    loadGames();
  }, []);

  const loadGames = async () => {
    try {
      const data = await gamesService.getAll();
      setGames(data);
    } catch (error) {
      toast({
        title: "Erro",
        description: "Não foi possível carregar os jogos",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getDifficultyStars = (difficulty: number) => {
    return Array(difficulty).fill("⭐").join("");
  };

  return (
    <div className="min-h-screen bg-[#2B71A3]">
      <Navigation username={user?.user_name} showGamesLink={false} />

      <div className="mt-[269px] mx-auto px-4 sm:px-6 lg:px-[184px]">
        <div className="bg-[#274584] rounded-t-[25px] min-h-[861px] pt-[103px] px-4 sm:px-8 lg:px-[143px]">
          <div className="mb-[107px] flex justify-between items-start">
            <div>
              <h1 className="text-white text-3xl font-bold mb-2">
                Jogos Educativos
              </h1>
              <p className="text-gray-400 text-base">
                Aprenda segurança digital de forma prática e divertida
              </p>
            </div>
            
            {user?.admin && (
              <button
                onClick={() => navigate("/create-game")}
                className="flex items-center gap-2 px-4 py-2 bg-[#2563EB] text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Plus className="w-5 h-5" />
                Cadastrar Jogo
              </button>
            )}
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="text-white text-xl">Carregando jogos...</div>
            </div>
          ) : games.length === 0 ? (
            <div className="flex justify-center items-center h-64">
              <div className="text-gray-400 text-xl">
                Nenhum jogo cadastrado ainda
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-[1205px]">
              {games.map((game) => (
                <div
                  key={game.game_id}
                  className="bg-[#111827] border border-[#1F2937] rounded-lg overflow-hidden hover:border-gray-700 transition-all duration-300 group cursor-pointer"
                >
                  <div className="relative h-[240px] flex items-center justify-center bg-[#111827]">
                    <div className="text-6xl">🎮</div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-white text-lg font-normal mb-2">
                      {game.game_title}
                    </h3>

                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-sm text-gray-400">Dificuldade:</span>
                      <span className="text-sm">{getDifficultyStars(game.difficulty)}</span>
                    </div>

                    {game.levels && game.levels.length > 0 && (
                      <div className="flex items-center gap-2 mb-4">
                        <span className="text-sm text-gray-400">
                          {game.levels.length} {game.levels.length === 1 ? "nível" : "níveis"}
                        </span>
                      </div>
                    )}

                    <p className="text-gray-400 text-sm leading-5">
                      {game.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}