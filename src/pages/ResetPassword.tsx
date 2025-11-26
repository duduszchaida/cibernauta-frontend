import { useState, useEffect } from "react";
import { useSearchParams, useNavigate, Link } from "react-router-dom";
import { Lock, Eye, ArrowLeft } from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";

export default function ResetPassword() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [isVerifying, setIsVerifying] = useState(true);
  const [validToken, setValidToken] = useState(false);

  const oobCode = searchParams.get("oobCode");

  useEffect(() => {
    const verifyToken = async () => {
      if (!oobCode) {
        setError("Código de redefinição não encontrado");
        setIsVerifying(false);
        return;
      }

      try {
        const response = await fetch(
          `${API_URL}/auth/verify-reset-token?oobCode=${oobCode}`,
          {
            method: "GET",
          },
        );

        if (!response.ok) {
          setError("Código inválido ou expirado");
          setValidToken(false);
        } else {
          setValidToken(true);
        }
      } catch (err) {
        setError("Erro ao verificar código");
        setValidToken(false);
      } finally {
        setIsVerifying(false);
      }
    };

    verifyToken();
  }, [oobCode]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("As senhas não coincidem");
      return;
    }

    if (password.length < 6) {
      setError("A senha deve ter pelo menos 6 caracteres");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(`${API_URL}/auth/reset-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: oobCode,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Erro ao resetar senha");
      } else {
        navigate("/reset-password-success");
      }
    } catch (err) {
      setError("Erro ao conectar com o servidor");
    } finally {
      setIsLoading(false);
    }
  };

  if (isVerifying) {
    return (
      <div className="min-h-screen bg-[#274584] flex items-center justify-center px-4">
        <div className="text-center">
          <p className="text-gray-300">Verificando token...</p>
        </div>
      </div>
    );
  }

  if (!validToken) {
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
            <div className="p-4 bg-red-900 bg-opacity-50 border border-red-500 rounded-lg text-red-300 text-sm text-center">
              {error || "Token inválido ou expirado"}
            </div>
            <Link
              to="/"
              className="flex items-center text-blue-400 hover:underline mt-6"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar ao login
            </Link>
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
            src="/logo-cibernauta.png"
            alt="Cibernauta"
            className="w-[256px] h-[256px] mb-4"
            style={{ imageRendering: "pixelated" }}
          />
          <h1 className="text-white text-3xl font-normal mb-2">
            Redefinir Senha
          </h1>
          <p className="text-gray-400 text-sm text-center">
            Digite sua nova senha
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-300 text-sm mb-1">
              Nova Senha
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-[15px] h-[17px] text-gray-400" />
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Sua nova senha"
                required
                className="w-full h-[50px] pl-10 pr-12 bg-[#0A274F] border border-[#4C91FF] rounded-lg text-gray-500 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2"
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
                placeholder="Confirme sua nova senha"
                required
                className="w-full h-[50px] pl-10 pr-12 bg-[#0A274F] border border-[#4C91FF] rounded-lg text-gray-500 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2"
              >
                <Eye className="w-[17px] h-[12px] text-gray-400" />
              </button>
            </div>
          </div>

          {error && (
            <div className="p-3 bg-red-900 bg-opacity-50 border border-red-500 rounded-lg text-red-300 text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full h-[46px] bg-[#2563EB] text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Redefinindo..." : "Redefinir Senha"}
          </button>
        </form>

        <div className="mt-6 flex items-center justify-center">
          <Link
            to="/"
            className="flex items-center text-blue-400 hover:underline"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar ao login
          </Link>
        </div>
      </div>
    </div>
  );
}
