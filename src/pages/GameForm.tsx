import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "../contexts/AuthContext";
import { Switch } from "@/components/ui/switch";
import GameSubmissionGuide from "@/components/GameSubmissionGuide";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronDown, Plus, X } from "lucide-react";
import KeySelectorDialog from "@/components/KeySelectorDialog";
import { Button } from "@/components/ui/button";
import { gamesService } from "@/services/gamesService";
import { pendingGamesService } from "@/services/pendingGamesService";

export default function GameForm() {
  const { id } = useParams<{ id: string }>();
  const isEditMode = Boolean(id);
  const [isGuideOpen, setIsGuideOpen] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [gameUrl, setGameUrl] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [enabled, setEnabled] = useState(true);
  const [gameType, setGameType] = useState<"local" | "external">("external");
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [controls, setControls] = useState<
    Array<{ key_image: string; description: string }>
  >([]);
  const [showKeyDialog, setShowKeyDialog] = useState(false);

  useEffect(() => {
    if (isEditMode) {
      loadGame(Number(id));
    }
  }, [id, isEditMode]);

  const loadGame = async (gameId: number) => {
    try {
      setIsFetching(true);
      const game = await gamesService.getOne(gameId);
      setTitle(game.game_title);
      setDescription(game.description);
      setImageUrl(game.image_url || "");
      setGameUrl(game.game_url || "");
      setDifficulty(game.difficulty.toString());
      setEnabled(game.enabled !== undefined ? game.enabled : true);
      setGameType(game.game_type === "local" ? "local" : "external");
      setControls(game.controls || []);
    } catch (error) {
      toast({
        title: "Erro",
        description: "Não foi possível carregar o jogo",
        variant: "destructive",
      });
      navigate("/games");
    } finally {
      setIsFetching(false);
    }
  };

  const handleSave = async () => {
    if (!title.trim()) {
      toast({
        title: "Erro",
        description: "Por favor, insira um título para o jogo",
        variant: "destructive",
      });
      return;
    }

    if (!description.trim()) {
      toast({
        title: "Erro",
        description: "Por favor, insira uma descrição para o jogo",
        variant: "destructive",
      });
      return;
    }

    if (gameType === "external" && gameUrl.trim() == "") {
      toast({
        title: "Erro",
        description: "Por favor, insira uma url para o jogo",
        variant: "destructive",
      });
      return;
    }

    if (
      !difficulty ||
      isNaN(Number(difficulty)) ||
      Number(difficulty) < 1 ||
      Number(difficulty) > 3
    ) {
      toast({
        title: "Erro",
        description: "Por favor, insira um nível de dificuldade válido (1 a 3)",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      if (user?.role === "ADMIN") {
        if (isEditMode) {
          await gamesService.update(Number(id), {
            game_title: title,
            description,
            difficulty: Number(difficulty),
            image_url: imageUrl.trim() || null,
            game_url: gameType == "external" ? gameUrl.trim() || null : null,
            game_type: gameType,
            enabled,
            controls: controls,
          });

          toast({
            title: "Sucesso!",
            description: "Jogo atualizado com sucesso",
          });
        } else {
          await gamesService.create({
            game_title: title,
            description,
            difficulty: Number(difficulty),
            image_url: imageUrl.trim() || null,
            game_url: gameUrl.trim() || null,
            game_type: gameType,
            enabled,
            controls: controls.length > 0 ? controls : null,
          });

          toast({
            title: "Sucesso!",
            description: "Jogo cadastrado com sucesso",
          });
        }
      } else {
        await pendingGamesService.create({
          game_id: isEditMode ? Number(id) : undefined,
          change_type: isEditMode ? "UPDATE" : "CREATE",
          game_title: title,
          description,
          difficulty: Number(difficulty),
          image_url: imageUrl.trim() || undefined,
          game_url: gameUrl.trim() || undefined,
          game_type: gameType,
          enabled,
          controls: controls.length > 0 ? controls : undefined,
        });

        toast({
          title: isEditMode
            ? "Enviado para aprovação!"
            : "Enviado para aprovação!",
          description: isEditMode
            ? "Suas alterações serão revisadas por um administrador"
            : "Seu jogo será revisado por um administrador",
        });
      }

      navigate("/games");
    } catch (error: any) {
      toast({
        title: isEditMode ? "Erro ao atualizar jogo" : "Erro ao cadastrar jogo",
        description:
          error.response?.data?.message || "Tente novamente mais tarde",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    navigate("/games");
  };

  const handleAddControl = (keyImage: string, description: string) => {
    setControls([...controls, { key_image: keyImage, description }]);
  };

  const handleRemoveControl = (index: number) => {
    setControls(controls.filter((_, i) => i !== index));
  };

  if (isFetching) {
    return (
      <div className="min-h-screen bg-[#274584] flex items-center justify-center">
        <div className="text-white text-xl">Carregando...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#274584] px-4 py-12 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-white text-3xl font-normal mb-6">
          {isEditMode ? "Editar jogo" : "Cadastrar jogo"}
        </h1>

        {!isEditMode && user?.role != "ADMIN" && (
          <Collapsible
            open={isGuideOpen}
            onOpenChange={setIsGuideOpen}
            className="mb-8"
          >
            <CollapsibleTrigger className="w-full">
              <div className="bg-[#0A274F] border-2 border-blue-600 rounded-lg p-4 hover:bg-[#0d2f5e] transition-colors cursor-pointer">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-blue-400 text-lg">📚</span>
                    <span className="text-white font-medium">
                      Guia: Como cadastrar um jogo educativo
                    </span>
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 text-blue-400 transition-transform ${
                      isGuideOpen ? "transform rotate-180" : ""
                    }`}
                  />
                </div>
              </div>
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-2">
              <GameSubmissionGuide variant="full" />
            </CollapsibleContent>
          </Collapsible>
        )}

        <div className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-300 text-base font-medium mb-2">
                Título
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Título do jogo"
                disabled={isLoading}
                className="w-full h-[56px] px-5 bg-[#0A274F] border-2 border-[#4C91FF] rounded-lg text-white text-base placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 disabled:opacity-50 transition-all"
              />
            </div>

            <div>
              <label className="block text-gray-300 text-base font-medium mb-2">
                URL da Imagem de capa (370px x 240px)
              </label>
              <input
                type="text"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="https://exemplo.com/imagem.jpg"
                disabled={isLoading}
                className="w-full h-[56px] px-5 bg-[#0A274F] border-2 border-[#4C91FF] rounded-lg text-white text-base placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 disabled:opacity-50 transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-300 text-base font-medium mb-2">
              Tipo de Jogo
            </label>
            <div className="flex gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="gameType"
                  value="external"
                  checked={gameType === "external"}
                  onChange={(e) =>
                    setGameType(e.target.value as "local" | "external")
                  }
                  disabled={isLoading}
                  className="w-4 h-4 text-blue-600 focus:ring-blue-500 focus:ring-2"
                />
                <span className="text-white text-base">Externo (URL)</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="gameType"
                  value="local"
                  checked={gameType === "local"}
                  onChange={(e) =>
                    setGameType(e.target.value as "local" | "external")
                  }
                  disabled={isLoading}
                  className="w-4 h-4 text-blue-600 focus:ring-blue-500 focus:ring-2"
                />
                <span className="text-white text-base">Local (Hospedado)</span>
              </label>
            </div>
            <p className="text-gray-400 text-sm mt-2">
              {gameType === "external"
                ? "O jogo será carregado de uma URL externa via iframe"
                : "O jogo está hospedado localmente na aplicação"}
            </p>
          </div>

          {gameType === "external" && (
            <div>
              <label className="block text-gray-300 text-base font-medium mb-2">
                URL do Jogo
              </label>
              <input
                type="text"
                value={gameUrl}
                onChange={(e) => {
                  setGameUrl(e.target.value);
                }}
                placeholder="https://exemplo.com/jogo"
                disabled={isLoading}
                className="w-full h-[56px] px-5 bg-[#0A274F] border-2 border-[#4C91FF] rounded-lg text-white text-base placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 disabled:opacity-50 transition-all"
              />
            </div>
          )}

          <div>
            <label className="block text-gray-300 text-base font-medium mb-2">
              Descrição
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Descreva o jogo e seus objetivos..."
              rows={6}
              disabled={isLoading}
              className="w-full p-5 bg-[#0A274F] border-2 border-[#4C91FF] rounded-lg text-white text-base placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 resize-none disabled:opacity-50 transition-all"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-300 text-base font-medium mb-2">
                Dificuldade
              </label>
              <input
                type="number"
                min="1"
                max="3"
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
                placeholder="1 a 3"
                disabled={isLoading}
                className="w-full h-[56px] px-5 bg-[#0A274F] border-2 border-[#4C91FF] rounded-lg text-white text-base placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 disabled:opacity-50 transition-all"
              />
              <p className="text-gray-400 text-sm mt-2">
                1 = Fácil{" "}
                <img
                  src={"/diff_1.png"}
                  style={{
                    width: 16,
                    height: 16,
                    imageRendering: "pixelated",
                    display: "inline",
                  }}
                />{" "}
                | 2 = Médio{" "}
                <img
                  src={"/diff_2.png"}
                  style={{
                    width: 16,
                    height: 16,
                    imageRendering: "pixelated",
                    display: "inline",
                  }}
                />
                | 3 = Difícil{" "}
                <img
                  src={"/diff_3.png"}
                  style={{
                    width: 16,
                    height: 16,
                    imageRendering: "pixelated",
                    display: "inline",
                  }}
                />
                |{" "}
              </p>
            </div>

            <div>
              <label className="block text-gray-300 text-base font-medium mb-2">
                Status do Jogo
              </label>
              <div className="flex items-center h-[56px] px-5 bg-[#0A274F] border-2 border-[#4C91FF] rounded-lg">
                <div className="flex items-center gap-3">
                  <Switch
                    checked={enabled}
                    onCheckedChange={setEnabled}
                    disabled={isLoading}
                    className="data-[state=checked]:bg-green-500 data-[state=unchecked]:bg-gray-600"
                  />
                  <span className="text-white text-base">
                    {enabled ? "Jogo habilitado" : "Jogo desabilitado"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-gray-300 text-base font-medium mb-3">
              Controles do Jogo
            </label>
            <p className="text-gray-400 text-sm mb-4">
              Adicione os controles que o jogador utilizará no jogo
            </p>

            <div className="flex flex-wrap gap-4">
              {controls.map((control, index) => (
                <div
                  key={index}
                  className="relative w-[180px] p-4 bg-[#0A274F] border-2 border-[#4C91FF] rounded-lg group hover:border-blue-400 transition-colors"
                >
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => handleRemoveControl(index)}
                    disabled={isLoading}
                    className="absolute top-2 right-2 text-red-400 hover:text-red-300 hover:bg-red-900/20 w-6 h-6 p-0"
                  >
                    <X className="w-4 h-4" />
                  </Button>

                  <div className="flex flex-col items-center gap-3 pt-4">
                    <img
                      src={`/keys/${control.key_image}.png`}
                      alt={control.description}
                      className="w-16 h-16"
                      style={{ imageRendering: "pixelated" }}
                    />
                    <p className="text-white text-sm text-center break-words w-full">
                      {control.description}
                    </p>
                  </div>
                </div>
              ))}

              <button
                type="button"
                onClick={() => setShowKeyDialog(true)}
                disabled={isLoading}
                className="w-[180px] h-[150px] bg-[#0A274F]/30 border-2 border-dashed border-[#4C91FF] rounded-lg hover:bg-[#0A274F]/50 hover:border-blue-400 transition-colors flex items-center justify-center group disabled:opacity-50"
              >
                <Plus className="w-8 h-8 text-[#4C91FF] group-hover:text-blue-400 transition-colors" />
              </button>
            </div>

            {controls.length === 0 && (
              <p className="text-gray-400 text-sm mt-2 ml-1">
                Clique no botão + para adicionar controles
              </p>
            )}
          </div>

          <KeySelectorDialog
            open={showKeyDialog}
            onOpenChange={setShowKeyDialog}
            onSave={handleAddControl}
          />

          <div className="flex flex-col sm:flex-row gap-4 justify-end mt-10 pt-6 border-t border-gray-600">
            <button
              onClick={handleCancel}
              disabled={isLoading}
              className="w-full sm:w-[160px] h-[48px] bg-[#0A274F] text-[#2563EB] rounded-lg hover:bg-[#0d2f5e] transition-colors disabled:opacity-50 font-medium text-base"
            >
              Cancelar
            </button>
            <button
              onClick={handleSave}
              disabled={isLoading}
              className="w-full sm:w-[160px] h-[48px] bg-[#2563EB] text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 font-medium text-base shadow-lg"
            >
              {isLoading
                ? "Salvando..."
                : isEditMode
                  ? "Salvar Alterações"
                  : "Salvar Jogo"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
