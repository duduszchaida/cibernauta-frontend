import { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, ArrowLeft } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const { requestPasswordReset } = useAuth();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      toast({
        title: "Erro",
        description: "Por favor, insira seu email",
        variant: "destructive",
      });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast({
        title: "Erro",
        description: "Por favor, insira um email válido",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      await requestPasswordReset(email);
      setEmailSent(true);
      toast({
        title: "Email enviado!",
        description: "Verifique sua caixa de entrada para redefinir sua senha",
      });
    } catch (error: any) {
      toast({
        title: "Erro ao enviar email",
        description: error.message || "Tente novamente mais tarde",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#274584] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="flex flex-col items-center mb-12">
          <img
            src="/logo-cibernauta.png"
            alt="Cibernauta"
            className="w-[114px] h-[114px] mb-4"
          />
          <h1 className="text-white text-3xl font-normal mb-2">
            Esqueci minha senha
          </h1>
          <p className="text-gray-400 text-sm text-center">
            {emailSent
              ? "Um email foi enviado com instruções para redefinir sua senha"
              : "Digite seu email para receber instruções de redefinição"}
          </p>
        </div>

        {!emailSent ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-gray-300 text-sm mb-1">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-[17px] h-[13px] text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="seu@email.com"
                  disabled={isLoading}
                  className="w-full h-[50px] pl-10 pr-4 bg-[#0A274F] border border-[#4C91FF] rounded-lg text-gray-500 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full h-[46px] bg-[#2563EB] text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Enviando..." : "Enviar Link de Recuperação"}
            </button>
          </form>
        ) : (
          <div className="space-y-6">
            <div className="p-4 bg-green-900/30 border border-green-500/50 rounded-lg">
              <p className="text-green-400 text-sm text-center">
                Se o email estiver cadastrado, você receberá as instruções em
                alguns minutos. Verifique também sua pasta de spam.
              </p>
            </div>

            <button
              onClick={() => {
                setEmailSent(false);
                setEmail("");
              }}
              className="w-full h-[46px] bg-[#2563EB] text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Enviar novamente
            </button>
          </div>
        )}

        <div className="mt-6">
          <Link
            to="/"
            className="flex items-center justify-center gap-2 text-blue-400 hover:underline"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar para o login
          </Link>
        </div>
      </div>
    </div>
  );
}
