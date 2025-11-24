import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Check, X, Eye } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { pendingGamesService } from "@/services/pendingGamesService";

interface PendingGame {
  request_id: number;
  game_id: number | null;
  change_type: "CREATE" | "UPDATE";
  game_title: string;
  description: string;
  difficulty: number;
  image_url?: string;
  game_url?: string;
  enabled: boolean;
  created_at: string;
  createdBy?: {
    user_id: number;
    username: string;
    email: string;
  };
}

export default function PendingGames() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [pendingGames, setPendingGames] = useState<PendingGame[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedGame, setSelectedGame] = useState<PendingGame | null>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);

  useEffect(() => {
    loadPendingGames();
  }, []);

  const loadPendingGames = async () => {
    try {
      setIsLoading(true);
      const data = await pendingGamesService.getAll();
      setPendingGames(data);
    } catch (error: any) {
      toast({
        title: "Erro",
        description: "Não foi possível carregar as pendências",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleApprove = async (requestId: number) => {
    try {
      await pendingGamesService.approve(requestId, "APPROVED");
      toast({
        title: "Sucesso!",
        description: "Jogo aprovado com sucesso",
      });
      loadPendingGames();
    } catch (error: any) {
      toast({
        title: "Erro ao aprovar",
        description:
          error.response?.data?.message || "Tente novamente mais tarde",
        variant: "destructive",
      });
    }
  };

  const handleReject = async (requestId: number) => {
    try {
      await pendingGamesService.approve(changeId, "REJECTED");
      toast({
        title: "Rejeitado",
        description: "Alteração rejeitada",
      });
      loadPendingGames();
    } catch (error: any) {
      toast({
        title: "Erro ao rejeitar",
        description:
          error.response?.data?.message || "Tente novamente mais tarde",
        variant: "destructive",
      });
    }
  };

  const handleView = (game: PendingGame) => {
    setSelectedGame(game);
    setIsViewDialogOpen(true);
  };

  const getDifficultyStars = (difficulty: number) => {
    return "⭐".repeat(difficulty);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#274584] flex items-center justify-center">
        <p className="text-white text-xl">Carregando pendências...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#274584] p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-white text-4xl font-bold mb-2">
              Jogos Pendentes de Aprovação
            </h1>
            <p className="text-gray-400">
              Revise e aprove alterações propostas por moderadores
            </p>
          </div>
          <button
            onClick={() => navigate("/games")}
            className="px-6 py-2 bg-[#2563EB] text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Voltar
          </button>
        </div>

        {pendingGames.length === 0 ? (
          <div className="bg-[#1a3a52] rounded-lg border border-[#4C91FF] p-12 text-center">
            <p className="text-gray-400 text-lg">
              Nenhum jogo pendente de aprovação
            </p>
          </div>
        ) : (
          <div className="bg-[#1a3a52] rounded-lg border border-[#4C91FF] overflow-hidden">
            <Table>
              <TableHeader className="bg-[#0A274F]">
                <TableRow className="border-b border-[#4C91FF] hover:bg-[#0A274F]">
                  <TableHead className="text-gray-300">Tipo</TableHead>
                  <TableHead className="text-gray-300">Título</TableHead>
                  <TableHead className="text-gray-300">
                    Solicitado por
                  </TableHead>
                  <TableHead className="text-gray-300">Dificuldade</TableHead>
                  <TableHead className="text-gray-300">Data</TableHead>
                  <TableHead className="text-gray-300">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pendingGames.map((game) => (
                  <TableRow
                    key={game.request_id}
                    className="border-b border-[#2a5a7a] hover:bg-[#0A274F] transition-colors"
                  >
                    <TableCell>
                      <Badge
                        className={
                          game.change_type === "CREATE"
                            ? "bg-green-600"
                            : "bg-yellow-600"
                        }
                      >
                        {game.change_type === "CREATE" ? "Criar" : "Editar"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-gray-300 font-medium">
                      {game.game_title}
                    </TableCell>
                    <TableCell className="text-gray-400">
                      {game.createdBy?.username || "Desconhecido"}
                    </TableCell>
                    <TableCell className="text-gray-400">
                      {getDifficultyStars(game.difficulty)}
                    </TableCell>
                    <TableCell className="text-gray-400">
                      {new Date(game.created_at).toLocaleDateString("pt-BR")}
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleView(game)}
                          className="inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium text-gray-300 hover:text-white hover:bg-[#2563EB] p-2 transition-colors"
                          title="Visualizar detalhes"
                        >
                          <Eye className="w-4 h-4" />
                        </button>

                        <button
                          onClick={() => handleApprove(game.request_id)}
                          className="inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium text-green-400 hover:text-white hover:bg-green-900 p-2 transition-colors"
                          title="Aprovar"
                        >
                          <Check className="w-4 h-4" />
                        </button>

                        <button
                          onClick={() => handleReject(game.request_id)}
                          className="inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium text-red-400 hover:text-white hover:bg-red-900 p-2 transition-colors"
                          title="Rejeitar"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}

        <div className="mt-4 text-gray-400 text-sm">
          Total de pendências:{" "}
          <span className="font-bold text-white">{pendingGames.length}</span>
        </div>
      </div>

      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="bg-[#1a3a52] border border-[#4C91FF] text-gray-300 max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-white">
              Detalhes da Alteração
            </DialogTitle>
            <DialogDescription className="text-gray-400">
              {selectedGame?.change_type === "CREATE"
                ? "Novo jogo proposto"
                : "Edição de jogo existente"}
            </DialogDescription>
          </DialogHeader>

          {selectedGame && (
            <div className="space-y-4">
              <div>
                <label className="block text-gray-400 text-sm mb-1">
                  Título
                </label>
                <p className="text-white text-lg font-semibold">
                  {selectedGame.game_title}
                </p>
              </div>

              <div>
                <label className="block text-gray-400 text-sm mb-1">
                  Solicitado por
                </label>
                <p className="text-white">
                  {selectedGame.createdBy?.username || "Desconhecido"}
                </p>
              </div>

              <div>
                <label className="block text-gray-400 text-sm mb-1">
                  Descrição
                </label>
                <p className="text-gray-300">{selectedGame.description}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-400 text-sm mb-1">
                    Dificuldade
                  </label>
                  <p className="text-white">
                    {getDifficultyStars(selectedGame.difficulty)}
                  </p>
                </div>

                <div>
                  <label className="block text-gray-400 text-sm mb-1">
                    Status
                  </label>
                  <p className="text-white">
                    {selectedGame.enabled ? "Habilitado" : "Desabilitado"}
                  </p>
                </div>
              </div>

              {selectedGame.image_url && (
                <div>
                  <label className="block text-gray-400 text-sm mb-1">
                    URL da Imagem
                  </label>
                  <a
                    href={selectedGame.image_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-300 underline break-all"
                  >
                    {selectedGame.image_url}
                  </a>
                </div>
              )}

              {selectedGame.game_url && (
                <div>
                  <label className="block text-gray-400 text-sm mb-1">
                    URL do Jogo
                  </label>
                  <a
                    href={selectedGame.game_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-300 underline break-all"
                  >
                    {selectedGame.game_url}
                  </a>
                </div>
              )}
            </div>
          )}

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsViewDialogOpen(false)}
              className="border-[#4C91FF] text-gray-300 hover:bg-[#0A274F]"
            >
              Fechar
            </Button>
            {selectedGame && (
              <>
                <Button
                  onClick={() => {
                    handleReject(selectedGame.request_id);
                    setIsViewDialogOpen(false);
                  }}
                  className="bg-red-600 text-white hover:bg-red-700"
                >
                  Rejeitar
                </Button>
                <Button
                  onClick={() => {
                    handleApprove(selectedGame.request_id);
                    setIsViewDialogOpen(false);
                  }}
                  className="bg-green-600 text-white hover:bg-green-700"
                >
                  Aprovar
                </Button>
              </>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
