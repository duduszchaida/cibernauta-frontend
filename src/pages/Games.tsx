import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import { gamesService } from "../services/api";
import { useAuth } from "../contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { Plus, MoreVertical, Pencil, Trash2 } from "lucide-react";

interface Game {
  game_id: number;
  game_title: string;
  description: string;
  difficulty: number;
  image_url?: string;
  levels: any[];
}

export default function Games() {
  const [games, setGames] = useState<Game[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    loadGames();
  }, []);

  useEffect(() => {
    const handleClickOutside = () => {
      if (openMenuId !== null) {
        setOpenMenuId(null);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [openMenuId]);

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

  const handleDeleteGame = async (gameId: number, gameTitle: string) => {
    if (!confirm(`Tem certeza que deseja excluir o jogo "${gameTitle}"?`)) {
      return;
    }

    try {
      await gamesService.delete(gameId);
      toast({
        title: "Sucesso!",
        description: "Jogo excluído com sucesso",
      });
      loadGames();
    } catch (error) {
      toast({
        title: "Erro",
        description: "Não foi possível excluir o jogo",
        variant: "destructive",
      });
    } finally {
      setOpenMenuId(null);
    }
  };

  const handleEditGame = (gameId: number) => {
    navigate(`/edit-game/${gameId}`);
    setOpenMenuId(null);
  };

  const handleGameClick = (gameId: number) => {
    navigate(`/game/${gameId}`);
  };

  return (
    <div className="min-h-screen bg-[#2B71A3]">
      <Navigation username={user?.user_name} showGamesLink={false} />

      <div className="mt-[180px] mx-auto px-4 sm:px-6 lg:px-[184px]">
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
                  onClick={() => handleGameClick(game.game_id)}
                  className="bg-[#111827] border border-[#1F2937] rounded-lg overflow-hidden hover:border-gray-700 transition-all duration-300 group cursor-pointer relative"
                >
                  {user?.admin && (
                    <div className="absolute top-4 right-4 z-10">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setOpenMenuId(openMenuId === game.game_id ? null : game.game_id);
                        }}
                        className="bg-[#1F2937] hover:bg-[#374151] p-2 rounded-lg transition-colors"
                      >
                        <MoreVertical className="w-5 h-5 text-white" />
                      </button>

                      {openMenuId === game.game_id && (
                        <div className="absolute right-0 mt-2 w-48 bg-[#1F2937] border border-gray-700 rounded-lg shadow-lg overflow-hidden">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleEditGame(game.game_id);
                            }}
                            className="w-full px-4 py-3 text-left text-white hover:bg-[#374151] transition-colors flex items-center gap-2"
                          >
                            <Pencil className="w-4 h-4" />
                            Editar
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteGame(game.game_id, game.game_title);
                            }}
                            className="w-full px-4 py-3 text-left text-red-400 hover:bg-[#374151] transition-colors flex items-center gap-2"
                          >
                            <Trash2 className="w-4 h-4" />
                            Excluir
                          </button>
                        </div>
                      )}
                    </div>
                  )}

                  <div className="relative h-[240px] flex items-center justify-center bg-[#111827] overflow-hidden">
                    {game.image_url ? (
                      <img
                        src={game.image_url}
                        alt={game.game_title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                          e.currentTarget.parentElement!.innerHTML = '<div class="text-6xl">🎮</div>';
                        }}
                      />
                    ) : (
                      <div className="text-6xl">🎮</div>
                    )}
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