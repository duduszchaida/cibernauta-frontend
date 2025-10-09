import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, Mail, Lock, User } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { register } = useAuth();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!username || !email || !password || !confirmPassword) {
      toast({
        title: "Erro",
        description: "Por favor, preencha todos os campos",
        variant: "destructive",
      });
      return;
    }

    if (password !== confirmPassword) {
      toast({
        title: "Erro",
        description: "As senhas não coincidem",
        variant: "destructive",
      });
      return;
    }

    if (password.length < 6) {
      toast({
        title: "Erro",
        description: "A senha deve ter no mínimo 6 caracteres",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      await register(username, email, password);
      toast({
        title: "Sucesso!",
        description: "Conta criada com sucesso",
      });
      navigate("/games");
    } catch (error: any) {
      toast({
        title: "Erro ao criar conta",
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
        <div className="flex flex-col items-center mb-8">
          <img
            src="https://api.builder.io/api/v1/image/assets/TEMP/f90f1003dbb52e5b956aed22fffbc71ded713f9f?width=228"
            alt="Cibernauta"
            className="w-[114px] h-[114px] mb-4"
          />
          <h1 className="text-white text-3xl font-normal mb-2">Criar Conta</h1>
          <p className="text-gray-400 text-sm">
            Junte-se à comunidade Cybernauta
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-gray-300 text-sm mb-1">
              Nome de usuário
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-[12px] h-[15px] text-gray-400" />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Seu nome de usuário"
                disabled={isLoading}
                className="w-full h-[50px] pl-10 pr-4 bg-[#0A274F] border border-[#4C91FF] rounded-lg text-gray-500 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
              />
            </div>
          </div>

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
          </div>

          <div>
            <label className="block text-gray-300 text-sm mb-1">
              Confirmar Senha
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-[15px] h-[17px] text-gray-400" />
              <input
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirme sua senha"
                disabled={isLoading}
                className="w-full h-[50px] pl-10 pr-12 bg-[#0A274F] border border-[#4C91FF] rounded-lg text-gray-500 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2"
                disabled={isLoading}
              >
                <Eye className="w-[17px] h-[12px] text-gray-400" />
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full h-[46px] bg-[#2563EB] text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Criando conta..." : "Criar Conta"}
          </button>
        </form>

        <p className="text-center mt-6 text-gray-400">
          Já tem uma conta?{" "}
          <Link to="/" className="text-blue-400 hover:underline">
            Entre aqui
          </Link>
        </p>
      </div>
    </div>
  );
}