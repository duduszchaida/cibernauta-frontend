import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Pencil, Trash2, Eye } from "lucide-react";
import { pendingGamesService } from "../services/api";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface PendingGame {
  change_id: number;
  game_id: number | null;
  change_type: 'CREATE' | 'UPDATE';
  game_title: string;
  description: string;
  difficulty: number;
  image_url?: string;
  game_url?: string;
  enabled: boolean;
  created_at: string;
}

export default function MyPendingGames() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [pendingGames, setPendingGames] = useState<PendingGame[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedGame, setSelectedGame] = useState<PendingGame | null>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editFormData, setEditFormData] = useState({
    game_title: '',
    description: '',
    difficulty: 1,
    image_url: '',
    game_url: '',
    enabled: true,
  });

  useEffect(() => {
    loadPendingGames();
  }, []);

  const loadPendingGames = async () => {
    try {
      setIsLoading(true);
      const data = await pendingGamesService.getMyPending();
      setPendingGames(data);
    } catch (error: any) {
      toast({
        title: "Erro",
        description: "Não foi possível carregar seus jogos pendentes",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleView = (game: PendingGame) => {
    setSelectedGame(game);
    setIsViewDialogOpen(true);
  };

  const handleEditClick = (game: PendingGame) => {
    setSelectedGame(game);
    setEditFormData({
      game_title: game.game_title,
      description: game.description,
      difficulty: game.difficulty,
      image_url: game.image_url || '',
      game_url: game.game_url || '',
      enabled: game.enabled,
    });
    setIsEditDialogOpen(true);
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedGame) return;

    try {
      await pendingGamesService.update(selectedGame.change_id, editFormData);
      toast({
        title: "Sucesso!",
        description: "Jogo atualizado com sucesso",
      });
      setIsEditDialogOpen(false);
      loadPendingGames();
    } catch (error: any) {
      toast({
        title: "Erro ao atualizar",
        description: error.response?.data?.message || "Tente novamente mais tarde",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (changeId: number, gameTitle: string) => {
    if (!confirm(`Tem certeza que deseja excluir "${gameTitle}"?`)) {
      return;
    }

    try {
      await pendingGamesService.delete(changeId);
      toast({
        title: "Sucesso!",
        description: "Jogo excluído com sucesso",
      });
      loadPendingGames();
    } catch (error: any) {
      toast({
        title: "Erro ao excluir",
        description: error.response?.data?.message || "Tente novamente mais tarde",
        variant: "destructive",
      });
    }
  };

  const getDifficultyStars = (difficulty: number) => {
    return "⭐".repeat(difficulty);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#274584] flex items-center justify-center">
        <p className="text-white text-xl">Carregando seus jogos pendentes...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#274584] p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-white text-4xl font-bold mb-2">
              Meus Jogos Pendentes
            </h1>
            <p className="text-gray-400">
              Gerencie os jogos que você cadastrou e estão aguardando aprovação
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
            <p className="text-gray-400 text-lg">Você não tem jogos pendentes de aprovação</p>
          </div>
        ) : (
          <div className="bg-[#1a3a52] rounded-lg border border-[#4C91FF] overflow-hidden">
            <Table>
              <TableHeader className="bg-[#0A274F]">
                <TableRow className="border-b border-[#4C91FF] hover:bg-[#0A274F]">
                  <TableHead className="text-gray-300">Tipo</TableHead>
                  <TableHead className="text-gray-300">Título</TableHead>
                  <TableHead className="text-gray-300">Dificuldade</TableHead>
                  <TableHead className="text-gray-300">Data</TableHead>
                  <TableHead className="text-gray-300">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pendingGames.map((game) => (
                  <TableRow
                    key={game.change_id}
                    className="border-b border-[#2a5a7a] hover:bg-[#0A274F] transition-colors"
                  >
                    <TableCell>
                      <Badge className={game.change_type === 'CREATE' ? 'bg-green-600' : 'bg-yellow-600'}>
                        {game.change_type === 'CREATE' ? 'Criar' : 'Editar'}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-gray-300 font-medium">
                      {game.game_title}
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
                          onClick={() => handleEditClick(game)}
                          className="inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium text-blue-400 hover:text-white hover:bg-blue-900 p-2 transition-colors"
                          title="Editar"
                        >
                          <Pencil className="w-4 h-4" />
                        </button>

                        <button
                          onClick={() => handleDelete(game.change_id, game.game_title)}
                          className="inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium text-red-400 hover:text-white hover:bg-red-900 p-2 transition-colors"
                          title="Excluir"
                        >
                          <Trash2 className="w-4 h-4" />
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
          Total de jogos pendentes:{" "}
          <span className="font-bold text-white">{pendingGames.length}</span>
        </div>
      </div>

      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="bg-[#1a3a52] border border-[#4C91FF] text-gray-300 max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-white">Detalhes do Jogo Pendente</DialogTitle>
            <DialogDescription className="text-gray-400">
              {selectedGame?.change_type === 'CREATE' ? 'Novo jogo aguardando aprovação' : 'Edição aguardando aprovação'}
            </DialogDescription>
          </DialogHeader>

          {selectedGame && (
            <div className="space-y-4">
              <div>
                <label className="block text-gray-400 text-sm mb-1">Título</label>
                <p className="text-white text-lg font-semibold">{selectedGame.game_title}</p>
              </div>

              <div>
                <label className="block text-gray-400 text-sm mb-1">Descrição</label>
                <p className="text-gray-300">{selectedGame.description}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-400 text-sm mb-1">Dificuldade</label>
                  <p className="text-white">{getDifficultyStars(selectedGame.difficulty)}</p>
                </div>

                <div>
                  <label className="block text-gray-400 text-sm mb-1">Status</label>
                  <p className="text-white">{selectedGame.enabled ? 'Habilitado' : 'Desabilitado'}</p>
                </div>
              </div>

              {selectedGame.image_url && (
                <div>
                  <label className="block text-gray-400 text-sm mb-1">URL da Imagem</label>
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
                  <label className="block text-gray-400 text-sm mb-1">URL do Jogo</label>
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
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="bg-[#1a3a52] border border-[#4C91FF] text-gray-300 max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-white">Editar Jogo Pendente</DialogTitle>
            <DialogDescription className="text-gray-400">
              Faça as alterações necessárias no jogo antes da aprovação
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleEditSubmit}>
            <div className="space-y-4">
              <div>
                <Label htmlFor="game_title" className="text-gray-300">Título do Jogo</Label>
                <Input
                  id="game_title"
                  value={editFormData.game_title}
                  onChange={(e) => setEditFormData({ ...editFormData, game_title: e.target.value })}
                  required
                  maxLength={50}
                  className="bg-[#0A274F] border-[#4C91FF] text-white"
                />
              </div>

              <div>
                <Label htmlFor="description" className="text-gray-300">Descrição</Label>
                <Textarea
                  id="description"
                  value={editFormData.description}
                  onChange={(e) => setEditFormData({ ...editFormData, description: e.target.value })}
                  required
                  rows={4}
                  className="bg-[#0A274F] border-[#4C91FF] text-white"
                />
              </div>

              <div>
                <Label htmlFor="difficulty" className="text-gray-300">
                  Dificuldade (1-3)
                </Label>
                <Input
                  id="difficulty"
                  type="number"
                  min="1"
                  max="3"
                  value={editFormData.difficulty}
                  onChange={(e) => setEditFormData({ ...editFormData, difficulty: parseInt(e.target.value) })}
                  required
                  className="bg-[#0A274F] border-[#4C91FF] text-white"
                />
              </div>

              <div>
                <Label htmlFor="image_url" className="text-gray-300">URL da Imagem (opcional)</Label>
                <Input
                  id="image_url"
                  type="url"
                  value={editFormData.image_url}
                  onChange={(e) => setEditFormData({ ...editFormData, image_url: e.target.value })}
                  className="bg-[#0A274F] border-[#4C91FF] text-white"
                />
              </div>

              <div>
                <Label htmlFor="game_url" className="text-gray-300">URL do Jogo (opcional)</Label>
                <Input
                  id="game_url"
                  type="url"
                  value={editFormData.game_url}
                  onChange={(e) => setEditFormData({ ...editFormData, game_url: e.target.value })}
                  className="bg-[#0A274F] border-[#4C91FF] text-white"
                />
              </div>

              <div className="flex items-center space-x-2">
                <input
                  id="enabled"
                  type="checkbox"
                  checked={editFormData.enabled}
                  onChange={(e) => setEditFormData({ ...editFormData, enabled: e.target.checked })}
                  className="w-4 h-4"
                />
                <Label htmlFor="enabled" className="text-gray-300">Jogo Habilitado</Label>
              </div>
            </div>

            <DialogFooter className="mt-6">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsEditDialogOpen(false)}
                className="border-[#4C91FF] text-gray-300 hover:bg-[#0A274F]"
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                className="bg-[#2563EB] text-white hover:bg-blue-700"
              >
                Salvar Alterações
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
