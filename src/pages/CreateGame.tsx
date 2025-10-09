import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { X, Plus } from "lucide-react";
import { gamesService } from "../services/api";
import { useToast } from "@/hooks/use-toast";

interface Level {
  id: string;
  title: string;
  position: string;
}

export default function CreateGame() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [levels, setLevels] = useState<Level[]>([
    { id: "1", title: "", position: "1" },
  ]);

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
    // Validações
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

    // Validar níveis
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
      await gamesService.create({
        game_title: title,
        description,
        difficulty: Number(difficulty),
        levels: levels.map((level) => ({
          level_title: level.title,
          position: Number(level.position),
        })),
      });

      toast({
        title: "Sucesso!",
        description: "Jogo cadastrado com sucesso",
      });
      navigate("/games");
    } catch (error: any) {
      toast({
        title: "Erro ao cadastrar jogo",
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

  return (
    <div className="min-h-screen bg-[#274584] px-4 py-8 sm:px-6 lg:px-[619px]">
      <div className="max-w-[681px]">
        <h1 className="text-white text-3xl font-normal mb-8">
          Cadastrar jogo
        </h1>

        <div className="space-y-6">
          <div>
            <label className="block text-gray-300 text-sm mb-1">Título</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Título do jogo"
              disabled={isLoading}
              className="w-full h-[50px] px-5 bg-[#0A274F] border border-[#4C91FF] rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
            />
          </div>

          <div>
            <label className="block text-gray-300 text-sm mb-1">
              Descrição
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Texto..."
              rows={5}
              disabled={isLoading}
              className="w-full p-6 bg-[#0A274F] border border-[#4C91FF] rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none disabled:opacity-50"
            />
          </div>

          <div>
            <label className="block text-gray-300 text-sm mb-1">
              Dificuldade
            </label>
            <input
              type="number"
              min="1"
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
              placeholder="Nível de dificuldade (1-5)"
              disabled={isLoading}
              className="w-full h-[50px] px-4 bg-[#0A274F] border border-[#4C91FF] rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
            />
          </div>

          <div className="space-y-4">
            <h3 className="text-white text-xl font-normal">Níveis</h3>
            {levels.map((level, index) => (
              <div
                key={level.id}
                className="bg-[#2563EB] rounded-lg p-4 relative"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-white text-xl font-normal">Nível {index + 1}</h3>
                  {levels.length > 1 && (
                    <button
                      onClick={() => removeLevel(level.id)}
                      disabled={isLoading}
                      className="text-white hover:text-gray-300 disabled:opacity-50"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-[1fr,auto] gap-3">
                  <div>
                    <label className="block text-gray-300 text-sm mb-1">
                      Título
                    </label>
                    <input
                      type="text"
                      value={level.title}
                      onChange={(e) =>
                        updateLevel(level.id, "title", e.target.value)
                      }
                      placeholder="Título do nível"
                      disabled={isLoading}
                      className="w-full h-[50px] px-2 bg-[#0A274F] border border-[#4C91FF] rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
                    />
                  </div>

                  <div className="w-full sm:w-[83px]">
                    <label className="block text-gray-300 text-sm mb-1">
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
                      className="w-full h-[50px] px-2 bg-[#0A274F] border border-[#4C91FF] rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
                    />
                  </div>
                </div>
              </div>
            ))}

            <button
              onClick={addLevel}
              disabled={isLoading}
              className="w-[46px] h-[39px] bg-[#2563EB] rounded-lg flex items-center justify-center hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              <Plus className="w-6 h-6 text-white" strokeWidth={3} />
            </button>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-end mt-8">
            <button
              onClick={handleCancel}
              disabled={isLoading}
              className="w-full sm:w-[116px] h-[41px] bg-[#0A274F] text-[#2563EB] rounded-lg hover:bg-[#0d2f5e] transition-colors disabled:opacity-50"
            >
              Voltar
            </button>
            <button
              onClick={handleSave}
              disabled={isLoading}
              className="w-full sm:w-[116px] h-[41px] bg-[#2563EB] text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              {isLoading ? "Salvando..." : "Salvar"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}