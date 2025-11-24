import { Link } from "react-router-dom";
import { CheckCircle } from "lucide-react";

export default function ResetPasswordSuccess() {
  return (
    <div className="min-h-screen bg-[#274584] flex items-center justify-center px-4">
      <div className="w-full max-w-md text-center">
        <div className="flex flex-col items-center mb-8">
          <img
            src="/logo-cibernauta.png"
            alt="Cibernauta"
            className="w-[128px] h-[128px] mb-4"
          />
          <CheckCircle className="w-16 h-16 text-green-500 mb-4" />
          <h1 className="text-white text-3xl font-normal mb-2">
            Senha Redefinida
          </h1>
          <p className="text-gray-400 text-sm">
            Sua senha foi redefinida com sucesso. Você já pode fazer login com
            sua nova senha.
          </p>
        </div>

        <Link
          to="/"
          className="inline-block w-full h-[46px] bg-[#2563EB] text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
        >
          Voltar ao Login
        </Link>
      </div>
    </div>
  );
}
