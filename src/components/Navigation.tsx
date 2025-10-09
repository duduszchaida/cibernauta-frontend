import { Link, useNavigate } from "react-router-dom";
import { LogOut, Gamepad2, User } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";

interface NavigationProps {
  username?: string;
  showGamesLink?: boolean;
}

export default function Navigation({ username, showGamesLink = false }: NavigationProps) {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <nav className="w-full h-[73px] border-b border-gray-800 bg-[#274584] flex items-center justify-between px-8">
      <div className="flex items-center gap-3">
        <img
          src="https://api.builder.io/api/v1/image/assets/TEMP/489086856670080d0a47f111f00ed5055c0230ef?width=116"
          alt="Cibernauta"
          className="w-[58px] h-[58px]"
        />
        <span className="text-white text-xl font-bold">Cibernauta</span>
      </div>

      {showGamesLink && (
        <Link
          to="/games"
          className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-800 text-blue-400 hover:bg-gray-700 transition-colors"
        >
          <Gamepad2 className="w-4 h-4" />
          <span>Jogos</span>
        </Link>
      )}

      {username && (
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-gray-300">
            <User className="w-4 h-4" />
            <span className="text-base">{username}</span>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#2B71A3] text-gray-300 hover:bg-[#1f5a85] transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Sair</span>
          </button>
        </div>
      )}
    </nav>
  );
}