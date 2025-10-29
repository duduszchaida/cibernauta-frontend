import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { X, Plus } from "lucide-react";
import { gamesService } from "../services/api";
import { useToast } from "@/hooks/use-toast";

interface Level {
  id: string;
  title: string;
  position: string;
}

export default function EditGame() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [levels, setLevels] = useState<Level[]>([
    { id: "1", title: "", position: "1" },
  ]);

  useEffect(() => {
    if (id) {
      loadGame(Number(id));
    }
  }, [id]);

  const loadGame = async (gameId: number) => {
    try {
      setIsFetching(true);
      const game = await gamesService.getOne(gameId);
      setTitle(game.game_title);
      setDescription(game.description);
      setImageUrl(game.image_url || "");
      setDifficulty(game.difficulty.toString());

      if (game.levels && game.levels.length > 0) {
        setLevels(
          game.levels.map((level: any, index: number) => ({
            id: level.level_id?.toString() || Date.now().toString() + index,
            title: level.level_title,
            position: (index + 1).toString(),
          }))
        );
      }
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

  const addLevel = () => {
    const nextPosition = levels.length + 1;
    setLevels([
      ...levels,
      { id: Date.now().toString(), title: "", position: nextPosition.toString() },
    ]);
  };

  const removeLevel = (id: string) => {
    if (levels.length > 1) {
      setLevels(levels.filter((level) => level.id !== id));
    }
  };

  const updateLevel = (id: string, field: "title" | "position", value: string) => {
    setLevels(
      levels.map((level) =>
        level.id === id ? { ...level, [field]: value } : level
      )
    );
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

    if (!difficulty || isNaN(Number(difficulty)) || Number(difficulty) < 1) {
      toast({
        title: "Erro",
        description: "Por favor, insira um nível de dificuldade válido (número maior que 0)",
        variant: "destructive",
      });
      return;
    }

    
    for (const level of levels) {
      if (!level.title.trim()) {
        toast({
          title: "Erro",
          description: "Todos os níveis devem ter um título",
          variant: "destructive",
        });
        return;
      }
      if (!level.position || isNaN(Number(level.position))) {
        toast({
          title: "Erro",
          description: "Todos os níveis devem ter uma posição válida",
          variant: "destructive",
        });
        return;
      }
    }

    setIsLoading(true);
    try {
      await gamesService.update(Number(id), {
        game_title: title,
        description,
        difficulty: Number(difficulty),
        image_url: imageUrl.trim() || undefined,
        levels: levels.map((level) => ({
          level_title: level.title,
          position: Number(level.position),
        })),
      });

      toast({
        title: "Sucesso!",
        description: "Jogo atualizado com sucesso",
      });
      navigate("/games");
    } catch (error: any) {
      toast({
        title: "Erro ao atualizar jogo",
        description: error.response?.data?.message || "Tente novamente mais tarde",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    navigate("/games");
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
        <h1 className="text-white text-3xl font-normal mb-10">
          Editar jogo
        </h1>

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
                URL da Imagem
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

       
          <div className="max-w-xs">
            <label className="block text-gray-300 text-base font-medium mb-2">
              Dificuldade
            </label>
            <input
              type="number"
              min="1"
              max="5"
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
              placeholder="1 a 5"
              disabled={isLoading}
              className="w-full h-[56px] px-5 bg-[#0A274F] border-2 border-[#4C91FF] rounded-lg text-white text-base placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 disabled:opacity-50 transition-all"
            />
            <p className="text-gray-400 text-sm mt-2">
              ⭐ 1 = Fácil | ⭐⭐⭐⭐⭐ 5 = Muito Difícil
            </p>
          </div>

        
          <div className="space-y-5">
            <div className="flex items-center justify-between">
              <h3 className="text-white text-xl font-normal">Níveis do Jogo</h3>
              <button
                onClick={addLevel}
                disabled={isLoading}
                className="flex items-center gap-2 px-4 py-2 bg-[#2563EB] rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
              >
                <Plus className="w-5 h-5 text-white" />
                <span className="text-white font-medium">Adicionar Nível</span>
              </button>
            </div>

            <div className="space-y-4">
              {levels.map((level, index) => (
                <div
                  key={level.id}
                  className="bg-[#2563EB] rounded-lg p-6 relative shadow-lg"
                >
                  <div className="flex items-center justify-between mb-5">
                    <h4 className="text-white text-lg font-medium">
                      Nível {index + 1}
                    </h4>
                    {levels.length > 1 && (
                      <button
                        onClick={() => removeLevel(level.id)}
                        disabled={isLoading}
                        className="text-white hover:text-red-300 disabled:opacity-50 transition-colors p-1"
                        title="Remover nível"
                      >
                        <X className="w-6 h-6" />
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-[1fr,180px] gap-4">
                    <div>
                      <label className="block text-gray-200 text-sm font-medium mb-2">
                        Título do Nível
                      </label>
                      <input
                        type="text"
                        value={level.title}
                        onChange={(e) =>
                          updateLevel(level.id, "title", e.target.value)
                        }
                        placeholder="Ex: Introdução à Segurança"
                        disabled={isLoading}
                        className="w-full h-[52px] px-4 bg-[#0A274F] border-2 border-[#1e40af] rounded-lg text-white text-base placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-300 disabled:opacity-50 transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-200 text-sm font-medium mb-2">
                        Posição
                      </label>
                      <input
                        type="number"
                        min="1"
                        value={level.position}
                        onChange={(e) =>
                          updateLevel(level.id, "position", e.target.value)
                        }
                        placeholder="Número"
                        disabled={isLoading}
                        className="w-full h-[52px] px-4 bg-[#0A274F] border-2 border-[#1e40af] rounded-lg text-white text-base placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-300 disabled:opacity-50 transition-all text-center"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

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
              {isLoading ? "Salvando..." : "Salvar Alterações"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
