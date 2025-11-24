import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ChevronLeft, ChevronRight } from "lucide-react";

const AVAILABLE_KEYS = [
  "arrows", "click_l", "click_r",
  "key_a", "key_b", "key_c", "key_d", "key_e", "key_f",
  "key_g", "key_h", "key_i", "key_j", "key_k", "key_l",
  "key_m", "key_n", "key_o", "key_p", "key_q", "key_r",
  "key_s", "key_t", "key_u", "key_v", "key_w", "key_x",
  "key_y", "key_z",
  "mouse", "mouse_movement", "scroll", "wasd"
];

const KEYS_PER_PAGE = 9;

interface KeySelectorDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (keyImage: string, description: string) => void;
}

export default function KeySelectorDialog({
  open,
  onOpenChange,
  onSave,
}: KeySelectorDialogProps) {
  const [selectedKey, setSelectedKey] = useState<string | null>(null);
  const [description, setDescription] = useState("");
  const [currentPage, setCurrentPage] = useState(0);

  const totalPages = Math.ceil(AVAILABLE_KEYS.length / KEYS_PER_PAGE);
  const startIndex = currentPage * KEYS_PER_PAGE;
  const endIndex = startIndex + KEYS_PER_PAGE;
  const currentKeys = AVAILABLE_KEYS.slice(startIndex, endIndex);

  const handleSave = () => {
    if (selectedKey && description.trim()) {
      onSave(selectedKey, description);
 
      setSelectedKey(null);
      setDescription("");
      setCurrentPage(0);
      onOpenChange(false);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Adicionar Controle do Jogo</DialogTitle>
          <DialogDescription>
            Selecione uma tecla ou controle e adicione uma descrição
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
       
          <div className="space-y-3">
            <Label>Selecione o controle</Label>


            <div className="grid grid-cols-3 gap-3 p-4 bg-gray-50 rounded-lg min-h-[240px]">
              {currentKeys.map((key) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setSelectedKey(key)}
                  className={`
                    p-3 rounded-lg border-2 transition-all hover:scale-105
                    ${
                      selectedKey === key
                        ? "border-blue-500 bg-blue-50 shadow-lg"
                        : "border-gray-300 bg-white hover:border-gray-400"
                    }
                  `}
                >
                  <img
                    src={`/keys/${key}.png`}
                    alt={key}
                    className="w-full h-auto pixelated"
                    style={{ imageRendering: "pixelated" }}
                  />
                </button>
              ))}
            </div>

            
            <div className="flex items-center justify-between">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handlePreviousPage}
                disabled={currentPage === 0}
              >
                <ChevronLeft className="w-4 h-4 mr-1" />
                Anterior
              </Button>

              <span className="text-sm text-gray-600">
                Página {currentPage + 1} de {totalPages}
              </span>

              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleNextPage}
                disabled={currentPage === totalPages - 1}
              >
                Próxima
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          </div>


          <div className="space-y-2">
            <Label htmlFor="description">Descrição do controle</Label>
            <Input
              id="description"
              placeholder="Ex: Movimento, Pular, Atirar..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              maxLength={100}
            />
            <p className="text-xs text-gray-500">
              {description.length}/100 caracteres
            </p>
          </div>

     
          {selectedKey && (
            <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm font-medium text-blue-900 mb-2">
                Selecionado:
              </p>
              <div className="flex items-center gap-3">
                <img
                  src={`/keys/${selectedKey}.png`}
                  alt={selectedKey}
                  className="w-12 h-12 pixelated"
                  style={{ imageRendering: "pixelated" }}
                />
                <span className="text-sm text-gray-700">
                  {description || "(adicione uma descrição)"}
                </span>
              </div>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
          >
            Cancelar
          </Button>
          <Button
            type="button"
            onClick={handleSave}
            disabled={!selectedKey || !description.trim()}
          >
            Adicionar Controle
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
