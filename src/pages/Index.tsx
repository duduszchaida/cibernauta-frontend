import { useState, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Eye, Mail, Lock, AlertTriangle, CheckCircle2 } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { applyActionCode } from "firebase/auth";
import { auth } from "../config/firebase";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export default function Index() {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showEmailVerificationDialog, setShowEmailVerificationDialog] =
    useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { login } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    const mode = searchParams.get("mode");
    const oobCode = searchParams.get("oobCode");

    if (mode === "resetPassword" && oobCode) {
      navigate(`/reset-password?oobCode=${oobCode}`, { replace: true });
      return;
    }

    if (mode === "verifyEmail" && oobCode) {
      setIsVerifying(true);
      applyActionCode(auth, oobCode)
        .then(() => {
          toast({
            title: "Email verificado!",
            description:
              "Sua conta foi ativada com sucesso. Agora você pode fazer login.",
          });

          navigate("/", { replace: true });
        })
        .catch((error) => {
          console.error("Erro ao verificar email:", error);
          let errorMessage =
            "Erro ao verificar email. O link pode estar expirado.";

          if (error.code === "auth/invalid-action-code") {
            errorMessage = "O link de verificação é inválido ou já foi usado.";
          } else if (error.code === "auth/expired-action-code") {
            errorMessage =
              "O link de verificação expirou. Por favor, solicite um novo.";
          }

          toast({
            title: "Erro na verificação",
            description: errorMessage,
            variant: "destructive",
          });
          navigate("/", { replace: true });
        })
        .finally(() => {
          setIsVerifying(false);
        });
    }
  }, [searchParams, navigate, toast]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!identifier || !password) {
      toast({
        title: "Erro",
        description: "Por favor, preencha todos os campos",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      await login(identifier, password);
      toast({
        title: "Sucesso!",
        description: "Login realizado com sucesso",
      });
      navigate("/games");
    } catch (error: any) {
      const errorMessage = error.message || "Verifique suas credenciais";

      if (
        errorMessage.includes("Email não verificado") ||
        errorMessage.includes("não verificado")
      ) {
        setUserEmail(identifier.includes("@") ? identifier : "");
        setShowEmailVerificationDialog(true);
      } else {
        toast({
          title: "Erro ao fazer login",
          description: errorMessage,
          variant: "destructive",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (isVerifying) {
    return (
      <div className="min-h-screen bg-[#274584] flex items-center justify-center px-4">
        <div className="w-full max-w-md text-center">
          <div className="flex flex-col items-center">
            <div className="bg-blue-500 rounded-full p-4 mb-4 animate-pulse">
              <CheckCircle2 className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-white text-2xl font-normal mb-2">
              Verificando seu email...
            </h1>
            <p className="text-gray-300 text-sm">
              Por favor, aguarde um momento
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#274584] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="flex flex-col items-center mb-12">
          <img
            src="logo-cibernauta.png"
            alt="Cibernauta"
            className="w-[114px] h-[114px] mb-4"
          />
          <h1 className="text-white text-3xl font-normal mb-2">Entrar</h1>
          <p className="text-gray-400 text-sm">
            Aprenda segurança digital de forma divertida
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-300 text-sm mb-1">
              Email ou usuário
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-[17px] h-[13px] text-gray-400" />
              <input
                type="text"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                placeholder="Email ou nome de usuário"
                disabled={isLoading}
                className="w-full h-[50px] pl-10 pr-4 bg-[#0A274F] border border-[#4C91FF] rounded-lg text-gray-500 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-300 text-sm mb-1">Senha</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-[15px] h-[17px] text-gray-400" />
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Sua senha"
                disabled={isLoading}
                className="w-full h-[50px] pl-10 pr-12 bg-[#0A274F] border border-[#4C91FF] rounded-lg text-gray-500 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2"
                disabled={isLoading}
              >
                <Eye className="w-[17px] h-[12px] text-gray-400" />
              </button>
            </div>
            <div className="mt-2 text-right">
              <Link
                to="/forgot-password"
                className="text-blue-400 text-xs hover:underline"
              >
                Esqueci minha senha
              </Link>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full h-[46px] bg-[#2563EB] text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Entrando..." : "Entrar"}
          </button>
        </form>

        <p className="text-center mt-6 text-gray-400">
          Não tem uma conta?{" "}
          <Link to="/signup" className="text-blue-400 hover:underline">
            Cadastre-se
          </Link>
        </p>
      </div>

      <AlertDialog
        open={showEmailVerificationDialog}
        onOpenChange={setShowEmailVerificationDialog}
      >
        <AlertDialogContent className="bg-[#0A274F] border-[#4C91FF]">
          <AlertDialogHeader>
            <div className="flex items-center gap-3 mb-2">
              <div className="bg-yellow-500/20 p-2 rounded-full">
                <AlertTriangle className="w-6 h-6 text-yellow-500" />
              </div>
              <AlertDialogTitle className="text-white text-xl">
                Email não verificado
              </AlertDialogTitle>
            </div>
            <AlertDialogDescription className="text-gray-300 text-base">
              Você precisa verificar seu email antes de fazer login. Verifique
              sua caixa de entrada e clique no link de verificação que enviamos.
            </AlertDialogDescription>
            {userEmail && (
              <p className="text-blue-400 text-sm mt-2">Email: {userEmail}</p>
            )}
          </AlertDialogHeader>
          <AlertDialogFooter className="flex-col sm:flex-row gap-2">
            <AlertDialogAction
              onClick={() => {
                setShowEmailVerificationDialog(false);
                navigate("/verify-email", { state: { email: userEmail } });
              }}
              className="bg-[#2563EB] text-white hover:bg-blue-700"
            >
              Ir para página de verificação
            </AlertDialogAction>
            <AlertDialogAction
              onClick={() => setShowEmailVerificationDialog(false)}
              className="bg-gray-700 text-white hover:bg-gray-600"
            >
              Fechar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
