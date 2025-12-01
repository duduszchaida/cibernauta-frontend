import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import GameSubmissionGuide from "@/components/GameSubmissionGuide";
import { useAuth } from "../contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { Plus, MoreVertical, Pencil, Trash2, Info, X } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { gamesService } from "@/services/gamesService";
import { moderatorRequestsService } from "@/services/moderatorRequestsService";

interface Game {
  game_id: number;
  game_title: string;
  description: string;
  difficulty: number;
  image_url?: string;
  game_url?: string;
  enabled?: boolean;
}

export default function Games() {
  const [games, setGames] = useState<Game[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);
  const [showRequestDialog, setShowRequestDialog] = useState(false);
  const [requestReason, setRequestReason] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [myRequest, setMyRequest] = useState<any>(null);
  const [showBanner, setShowBanner] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    loadGames();
    loadMyRequest();
  }, []);

  useEffect(() => {
    const handleClickOutside = () => {
      if (openMenuId !== null) {
        setOpenMenuId(null);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [openMenuId]);

  const loadMyRequest = async () => {
    if (user?.role !== "USER") return;

    try {
      const data = await moderatorRequestsService.getMyRequest();
      setMyRequest(data);
    } catch (error) {}
  };

  const handleRequestModerator = async () => {
    setIsSubmitting(true);
    try {
      await moderatorRequestsService.create({ reason: requestReason });
      toast({
        title: "Solicitação enviada!",
        description:
          "Sua solicitação será analisada por um administrador em breve.",
      });
      setShowRequestDialog(false);
      setRequestReason("");
      loadMyRequest();
    } catch (error: any) {
      toast({
        title: "Erro",
        description:
          error.response?.data?.message ||
          "Não foi possível enviar a solicitação",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const loadGames = async () => {
    try {
      const data = await gamesService.getAll();
      setGames(
        data.sort((a: Game, b: Game) => {
          return a.game_id - b.game_id;
        }),
      );
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

  const handleGameClick = (gameId: number, enabled?: boolean) => {
    if (enabled === false) return;
    navigate(`/game/${gameId}`);
  };

  return (
    <div className="min-h-screen bg-[#2B71A3]">
      <Navigation username={user?.username} showGamesLink={false} />

      <div className="mt-[180px] mx-auto px-4 sm:px-6 lg:px-[184px]">
        <div className="bg-[#274584] rounded-t-[25px] min-h-[861px] pt-[103px] px-4 sm:px-8 lg:px-[143px] pb-12">
          <div className="mb-8 flex justify-between items-start">
            <div>
              <h1 className="text-white text-3xl font-bold mb-2">
                Jogos Educativos
              </h1>
              <p className="text-gray-400 text-base">
                Aprenda segurança digital de forma prática e divertida
              </p>
            </div>

            {(user?.role === "ADMIN" || user?.role === "MODERATOR") && (
              <div className="flex gap-2">
                {user?.role === "ADMIN" && (
                  <button
                    onClick={() => navigate("/pending-games")}
                    className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                  >
                    Aprovar Jogos
                  </button>
                )}
                {user?.role === "MODERATOR" && (
                  <button
                    onClick={() => navigate("/my-pending-games")}
                    className="flex items-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
                  >
                    Meus Jogos Pendentes
                  </button>
                )}
                <button
                  onClick={() => navigate("/create-game")}
                  className="flex items-center gap-2 px-4 py-2 bg-[#2563EB] text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Plus className="w-5 h-5" />
                  Cadastrar Jogo
                </button>
              </div>
            )}
          </div>

          {user?.role === "USER" &&
            showBanner &&
            (!myRequest || myRequest.status === "APPROVED") && (
              <Alert className="mb-8 bg-blue-900/30 border-blue-700 relative">
                <button
                  onClick={() => setShowBanner(false)}
                  className="absolute top-3 right-3 text-gray-400 hover:text-white transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
                <Info className="h-4 w-4 text-blue-400" />
                <AlertDescription className="text-gray-300 ml-2">
                  Quer criar seus próprios jogos educativos?{" "}
                  <button
                    onClick={() => setShowRequestDialog(true)}
                    className="text-blue-400 hover:text-blue-300 underline font-medium"
                  >
                    Solicite permissão de moderador aqui
                  </button>
                </AlertDescription>
              </Alert>
            )}

          {user?.role === "USER" &&
            myRequest &&
            myRequest.status === "PENDING" && (
              <Alert className="mb-8 bg-yellow-900/30 border-yellow-700">
                <Info className="h-4 w-4 text-yellow-400" />
                <AlertDescription className="text-gray-300 ml-2">
                  Sua solicitação para se tornar moderador está pendente.
                  Aguarde a análise de um administrador.
                </AlertDescription>
              </Alert>
            )}

          {user?.role === "USER" &&
            myRequest &&
            myRequest.status === "REJECTED" && (
              <Alert className="mb-8 bg-red-900/30 border-red-700 relative">
                <button
                  onClick={() => setMyRequest(null)}
                  className="absolute top-3 right-3 text-gray-400 hover:text-white transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
                <Info className="h-4 w-4 text-red-400" />
                <AlertDescription className="text-gray-300 ml-2">
                  Sua solicitação para se tornar moderador foi rejeitada.{" "}
                  <button
                    onClick={() => setShowRequestDialog(true)}
                    className="text-red-400 hover:text-red-300 underline font-medium"
                  >
                    Enviar nova solicitação
                  </button>
                </AlertDescription>
              </Alert>
            )}

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
                  onClick={() => handleGameClick(game.game_id, game.enabled)}
                  className={`bg-[#111827] border border-[#1F2937] rounded-lg overflow-hidden transition-all duration-300 group relative ${
                    game.enabled === false
                      ? "opacity-50 grayscale cursor-not-allowed"
                      : "hover:border-gray-700 cursor-pointer"
                  }`}
                >
                  {(user?.role === "ADMIN" || user?.role === "MODERATOR") && (
                    <div className="absolute top-4 right-4 z-10">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setOpenMenuId(
                            openMenuId === game.game_id ? null : game.game_id,
                          );
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
                          {user?.role === "ADMIN" && (
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
                          )}
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
                          e.currentTarget.style.display = "none";
                          e.currentTarget.parentElement!.innerHTML =
                            '<div class="text-6xl">🎮</div>';
                        }}
                      />
                    ) : (
                      <div className="text-6xl">🎮</div>
                    )}
                    {game.enabled === false && (
                      <div className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 rounded-lg text-sm font-semibold z-10">
                        Desabilitado
                      </div>
                    )}
                  </div>

                  <div className="p-6">
                    <h3 className="text-white text-lg font-normal mb-2">
                      {game.game_title}
                    </h3>

                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-sm text-gray-400">
                        Dificuldade:
                      </span>
                      <img
                        src={"/diff_" + game.difficulty + ".png"}
                        style={{
                          width: 32,
                          height: 32,
                          imageRendering: "pixelated",
                        }}
                      />
                    </div>

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

      <Dialog open={showRequestDialog} onOpenChange={setShowRequestDialog}>
        <DialogContent className="bg-[#1F2937] border-gray-700 text-white max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Solicitar Permissão de Moderador</DialogTitle>
            <DialogDescription className="text-gray-400">
              Preencha o formulário abaixo para solicitar permissão para criar e
              gerenciar jogos educativos. Um administrador irá revisar sua
              solicitação.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 my-4">
            <GameSubmissionGuide variant="summary" />

            <div>
              <label className="text-sm font-medium text-gray-300 mb-2 block">
                Por que você quer ser moderador?
              </label>
              <Textarea
                value={requestReason}
                onChange={(e) => setRequestReason(e.target.value)}
                placeholder="Explique brevemente suas motivações e experiência..."
                className="bg-[#111827] border-gray-700 text-white placeholder:text-gray-500 min-h-[100px]"
                maxLength={500}
              />
              <p className="text-xs text-gray-500 mt-1">
                {requestReason.length}/500 caracteres
              </p>
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setShowRequestDialog(false);
                setRequestReason("");
              }}
              className="bg-transparent border-gray-600 text-white hover:bg-gray-800"
            >
              Cancelar
            </Button>
            <Button
              onClick={handleRequestModerator}
              disabled={isSubmitting}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              {isSubmitting ? "Enviando..." : "Enviar Solicitação"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
