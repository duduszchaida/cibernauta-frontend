import { Link, useNavigate } from "react-router-dom";
import {
  LogOut,
  Gamepad2,
  User,
  Settings,
  Users,
  ChevronDown,
  UserCheck,
} from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface NavigationProps {
  full_name?: string;
  showGamesLink?: boolean;
}

export default function Navigation({
  full_name,
  showGamesLink = false,
}: NavigationProps) {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <nav className="w-full h-[73px] border-b border-gray-800 bg-[#274584] flex items-center justify-between px-8">
      <div className="flex items-center gap-3">
        <Link
          to="/games"
          className="flex items-center gap-3 hover:opacity-80 transition-opacity"
        >
          <img
            src="logo-cibernauta.png"
            alt="Cibernauta"
            className="w-[58px] h-[58px]"
            style={{ imageRendering: "pixelated" }}
          />
          <span className="text-white text-xl font-bold">Cibernauta</span>
        </Link>
        {showGamesLink && (
          <Link
            to="/games"
            className="ml-4 flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-800 text-blue-400 hover:bg-gray-700 transition-colors"
          >
            <Gamepad2 className="w-4 h-4" />
            <span>Jogos</span>
          </Link>
        )}
      </div>

      {full_name && (
        <div className="flex items-center gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#2B71A3] text-gray-300 hover:bg-[#1f5a85] transition-colors focus:outline-none">
              <User className="w-4 h-4" />
              <span className="text-base">{full_name}</span>
              <ChevronDown className="w-4 h-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-[#0A274F] border border-[#4C91FF] text-white">
              <DropdownMenuItem
                onClick={() => navigate("/edit-profile")}
                className="cursor-pointer hover:bg-[#1e40af] focus:bg-[#1e40af]"
              >
                <Settings className="w-4 h-4 mr-2" />
                Editar Perfil
              </DropdownMenuItem>
              {user?.role === "ADMIN" && (
                <>
                  <DropdownMenuItem
                    onClick={() => navigate("/manage-users")}
                    className="cursor-pointer hover:bg-[#1e40af] focus:bg-[#1e40af]"
                  >
                    <Users className="w-4 h-4 mr-2" />
                    Gerenciar Usuários
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => navigate("/moderator-requests")}
                    className="cursor-pointer hover:bg-[#1e40af] focus:bg-[#1e40af]"
                  >
                    <UserCheck className="w-4 h-4 mr-2" />
                    Solicitações de Moderador
                  </DropdownMenuItem>
                </>
              )}
              <DropdownMenuSeparator className="bg-[#4C91FF]" />
              <DropdownMenuItem
                onClick={handleLogout}
                className="cursor-pointer hover:bg-[#1e40af] focus:bg-[#1e40af]"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Sair
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )}
    </nav>
  );
}
