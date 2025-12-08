import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Mail, CheckCircle, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { authService } from "@/services/authService";

export default function VerifyEmail() {
  const [isResending, setIsResending] = useState(false);
  const [cooldown, setCooldown] = useState(0);
  const location = useLocation();
  const { toast } = useToast();

  const email = location.state?.email || "";

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (cooldown > 0) {
      timer = setTimeout(() => setCooldown(cooldown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [cooldown]);

  const handleResendEmail = async () => {
    if (!email) {
      toast({
        title: "Erro",
        description:
          "E-mail não fornecido. Por favor, faça o cadastro novamente.",
        variant: "destructive",
      });
      return;
    }

    setIsResending(true);
    try {
      await authService.resendVerificationEmail(email);
      toast({
        title: "E-mail enviado!",
        description: "Verifique sua caixa de entrada e spam",
      });
      setCooldown(60);
    } catch (error: any) {
      toast({
        title: "Erro ao enviar e-mail",
        description:
          error.response?.data?.message || "Tente novamente mais tarde",
        variant: "destructive",
      });
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#274584] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="flex flex-col items-center mb-8">
          <img
            src="/logo-cibernauta.png"
            alt="Cibernauta"
            className="w-[256px] h-[256px] mb-4"
            style={{ imageRendering: "pixelated" }}
          />

          <div className="bg-blue-500 rounded-full p-4 mb-4">
            <Mail className="w-12 h-12 text-white" />
          </div>

          <h1 className="text-white text-3xl font-normal mb-2 text-center">
            Verifique seu E-mail
          </h1>
          <p className="text-gray-300 text-sm text-center max-w-sm">
            Enviamos um e-mail de verificação para
          </p>
          {email && (
            <p className="text-blue-400 font-medium mt-1 text-center">
              {email}
            </p>
          )}
        </div>

        <div className="bg-[#0A274F] border border-[#4C91FF] rounded-lg p-6 mb-6">
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-white text-sm font-medium">Passo 1</p>
                <p className="text-gray-400 text-xs">
                  Abra sua caixa de entrada de e-mail
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-white text-sm font-medium">Passo 2</p>
                <p className="text-gray-400 text-xs">
                  Procure pelo e-mail do Cibernauta IFPR
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-white text-sm font-medium">Passo 3</p>
                <p className="text-gray-400 text-xs">
                  Clique no link de verificação
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-700">
            <div className="flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
              <p className="text-gray-400 text-xs">
                Não encontrou o e-mail? Verifique sua caixa de spam ou clique no
                botão abaixo para reenviar
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={handleResendEmail}
          disabled={isResending || cooldown > 0 || !email}
          className="w-full h-[46px] bg-[#2563EB] text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed mb-4"
        >
          {isResending
            ? "Enviando..."
            : cooldown > 0
              ? `Aguarde ${cooldown}s para reenviar`
              : "Reenviar E-mail de Verificação"}
        </button>

        <p className="text-center text-gray-400 text-sm">
          Após verificar seu e-mail,{" "}
          <Link to="/" className="text-blue-400 hover:underline">
            faça login aqui
          </Link>
        </p>
      </div>
    </div>
  );
}
