import { AlertCircle, CheckCircle, FileText, Gamepad2, List } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface GameSubmissionGuideProps {
  variant?: 'full' | 'summary';
  className?: string;
}

export default function GameSubmissionGuide({ variant = 'full', className = '' }: GameSubmissionGuideProps) {
  if (variant === 'summary') {
    return (
      <Alert className={`bg-blue-900/30 border-blue-700 ${className}`}>
        <AlertCircle className="h-4 w-4 text-blue-400" />
        <AlertDescription className="text-gray-300 ml-2">
          <p className="font-medium mb-2">Como moderador, você poderá:</p>
          <ul className="list-disc list-inside space-y-1 text-sm">
            <li>Cadastrar jogos educativos hospedados (Netlify, GitHub Pages, etc.)</li>
            <li>Definir título, descrição, dificuldade (1-3) e controles do jogo</li>
            <li>Seus jogos serão revisados por um administrador antes de serem publicados</li>
          </ul>
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className={`bg-[#0A274F] border-2 border-blue-700/50 rounded-lg p-6 ${className}`}>
      <div className="flex items-center gap-2 mb-4">
        <FileText className="w-5 h-5 text-blue-400" />
        <h3 className="text-white text-lg font-semibold">Guia de Cadastro de Jogos</h3>
      </div>

      <div className="space-y-4 text-gray-300">
        {/* Requisitos do Jogo */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Gamepad2 className="w-4 h-4 text-green-400" />
            <h4 className="text-white font-medium">Solicitação de Jogo</h4>
          </div>
          <p className="text-sm mb-2">
            Para cadastrar um jogo, ele deve existir de forma funcional, hospedado em serviços como
            <span className="text-blue-400 font-medium"> Netlify</span> ou
            <span className="text-blue-400 font-medium"> GitHub Pages</span>.
          </p>
        </div>

        {/* Campos Obrigatórios */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle className="w-4 h-4 text-green-400" />
            <h4 className="text-white font-medium">Campos Obrigatórios</h4>
          </div>
          <ul className="list-disc list-inside space-y-1 text-sm">
            <li><span className="text-white">Título do jogo</span> - Nome que aparecerá na listagem</li>
            <li><span className="text-white">URL da capa</span> - Caminho da imagem de capa para a listagem</li>
            <li><span className="text-white">Nível de dificuldade</span> - Um número de 1 a 3 (⭐ Fácil, ⭐⭐ Médio, ⭐⭐⭐ Difícil)</li>
            <li><span className="text-white">Descrição</span> - Explique o objetivo e mecânicas do jogo</li>
            <li><span className="text-white">URL do jogo</span> - Link onde o jogo está hospedado</li>
          </ul>
        </div>

        {/* Lista de Controles */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <List className="w-4 h-4 text-green-400" />
            <h4 className="text-white font-medium">Lista de Controles</h4>
          </div>
          <p className="text-sm mb-2">
            A lista de controles consiste de uma série de cadastros, cada um contendo:
          </p>
          <ul className="list-disc list-inside space-y-1 text-sm ml-4">
            <li>
              <span className="text-white">Input</span> - Uma tecla específica, série padrão de teclas
              (setas, WASD), click do mouse, etc. Define o ícone na tela do jogo
            </li>
            <li>
              <span className="text-white">Descrição</span> - O texto que acompanha o ícone
            </li>
          </ul>
        </div>

        {/* Processo de Avaliação */}
        <div className="bg-yellow-900/20 border border-yellow-700/50 rounded p-3 mt-4">
          <div className="flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="text-white font-medium text-sm mb-1">Processo de Avaliação</h4>
              <p className="text-sm text-gray-300">
                Os jogos sugeridos ficam <span className="text-yellow-400 font-medium">inativos</span> até
                um administrador recusar a sugestão ou aprovar o jogo, tornando-o uma nova inserção na plataforma.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
