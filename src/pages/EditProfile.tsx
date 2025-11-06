import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { User, Mail, Lock, Trash2 } from "lucide-react";
import { usersService, authService } from "../services/api";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "../contexts/AuthContext";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export default function EditProfile() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { logout, refreshUserProfile } = useAuth();
  const [username, setUsername] = useState("");
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [showPasswordDialog, setShowPasswordDialog] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      setIsFetching(true);
      const profile = await usersService.getProfile();
      setUsername(profile.username);
      setUserName(profile.full_name);
      setUserEmail(profile.user_email);
    } catch (error: any) {
      toast({
        title: "Erro",
        description: "Não foi possível carregar o perfil",
        variant: "destructive",
      });
      navigate("/games");
    } finally {
      setIsFetching(false);
    }
  };

  const handleSave = async () => {
    if (!userName.trim()) {
      toast({
        title: "Erro",
        description: "Por favor, insira seu nome completo",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      await usersService.updateProfile({
        full_name: userName,
      });
      await refreshUserProfile();

      toast({
        title: "Sucesso!",
        description: "Perfil atualizado com sucesso",
      });
      navigate("/games");
    } catch (error: any) {
      toast({
        title: "Erro ao atualizar perfil",
        description: error.response?.data?.message || "Tente novamente mais tarde",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    navigate("/games");
  };

  const handleChangePassword = async () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      toast({
        title: "Erro",
        description: "Preencha todos os campos",
        variant: "destructive",
      });
      return;
    }

    if (newPassword !== confirmPassword) {
      toast({
        title: "Erro",
        description: "As senhas não coincidem",
        variant: "destructive",
      });
      return;
    }

    if (newPassword.length < 6) {
      toast({
        title: "Erro",
        description: "A nova senha deve ter no mínimo 6 caracteres",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      await authService.changePassword({
        currentPassword,
        newPassword,
      });
      toast({
        title: "Sucesso!",
        description: "Senha alterada com sucesso",
      });
      setShowPasswordDialog(false);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error: any) {
      toast({
        title: "Erro ao alterar senha",
        description: error.response?.data?.message || "Tente novamente mais tarde",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    setIsLoading(true);
    try {
      await authService.deleteAccount();
      toast({
        title: "Conta deletada",
        description: "Sua conta foi deletada com sucesso",
      });
      logout();
      navigate("/");
    } catch (error: any) {
      toast({
        title: "Erro ao deletar conta",
        description: error.response?.data?.message || "Tente novamente mais tarde",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
      setShowDeleteDialog(false);
    }
  };

  if (isFetching) {
    return (
      <div className="min-h-screen bg-[#274584] flex items-center justify-center">
        <p className="text-white text-xl">Carregando...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#274584] px-4 py-12 sm:px-6">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-white text-3xl font-normal mb-10">Editar Perfil</h1>

        <div className="bg-[#0A274F] border-2 border-[#4C91FF] rounded-lg p-8 space-y-6">
          <div>
            <label className="block text-gray-300 text-base font-medium mb-2">
              Usuário de login
            </label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input
                type="text"
                value={username}
                placeholder="usuario_login"
                maxLength={16}
                disabled
                className="w-full h-[56px] pl-12 pr-5 bg-[#0d1f3d] border-2 border-gray-600 rounded-lg text-gray-500 text-base placeholder:text-gray-600 cursor-not-allowed opacity-75"
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Este campo não pode ser alterado
            </p>
          </div>

          <div>
            <label className="block text-gray-300 text-base font-medium mb-2">
              Nome completo
            </label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="Seu nome completo"
                disabled={isLoading}
                className="w-full h-[56px] pl-12 pr-5 bg-[#1e40af] border-2 border-[#4C91FF] rounded-lg text-white text-base placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 disabled:opacity-50 transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-300 text-base font-medium mb-2">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input
                type="email"
                value={userEmail}
                placeholder="seu@email.com"
                disabled
                className="w-full h-[56px] pl-12 pr-5 bg-[#0d1f3d] border-2 border-gray-600 rounded-lg text-gray-500 text-base placeholder:text-gray-600 cursor-not-allowed opacity-75"
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Este campo não pode ser alterado
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-end pt-6 border-t border-gray-600">
            <button
              onClick={handleCancel}
              disabled={isLoading}
              className="w-full sm:w-[160px] h-[48px] bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors disabled:opacity-50 font-medium text-base"
            >
              Cancelar
            </button>
            <button
              onClick={handleSave}
              disabled={isLoading}
              className="w-full sm:w-[160px] h-[48px] bg-[#2563EB] text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 font-medium text-base shadow-lg"
            >
              {isLoading ? "Salvando..." : "Salvar Perfil"}
            </button>
          </div>
        </div>


        <div className="bg-[#0A274F] border-2 border-[#4C91FF] rounded-lg p-8 mt-6">
          <h2 className="text-white text-xl font-semibold mb-6">Segurança</h2>

          <div className="space-y-4">
            <button
              onClick={() => setShowPasswordDialog(true)}
              className="w-full flex items-center gap-3 p-4 bg-[#1e40af] border-2 border-[#4C91FF] rounded-lg text-white hover:bg-[#1e3a8a] transition-colors"
            >
              <Lock className="w-5 h-5" />
              <span className="font-medium">Alterar Senha</span>
            </button>

            <button
              onClick={() => setShowDeleteDialog(true)}
              className="w-full flex items-center gap-3 p-4 bg-red-900 border-2 border-red-600 rounded-lg text-white hover:bg-red-800 transition-colors"
            >
              <Trash2 className="w-5 h-5" />
              <span className="font-medium">Deletar Conta</span>
            </button>
          </div>
        </div>
      </div>


      <Dialog open={showPasswordDialog} onOpenChange={setShowPasswordDialog}>
        <DialogContent className="bg-[#1a3a52] border border-[#4C91FF] text-gray-300">
          <DialogHeader>
            <DialogTitle className="text-white">Alterar Senha</DialogTitle>
            <DialogDescription className="text-gray-400">
              Insira sua senha atual e a nova senha
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <label className="block text-gray-300 text-sm mb-1">Senha Atual</label>
              <input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="w-full h-[40px] px-4 bg-[#0A274F] border border-[#4C91FF] rounded-lg text-gray-300 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Digite sua senha atual"
              />
            </div>

            <div>
              <label className="block text-gray-300 text-sm mb-1">Nova Senha</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full h-[40px] px-4 bg-[#0A274F] border border-[#4C91FF] rounded-lg text-gray-300 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Digite a nova senha (mínimo 6 caracteres)"
              />
            </div>

            <div>
              <label className="block text-gray-300 text-sm mb-1">Confirmar Nova Senha</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full h-[40px] px-4 bg-[#0A274F] border border-[#4C91FF] rounded-lg text-gray-300 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Digite a nova senha novamente"
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setShowPasswordDialog(false);
                setCurrentPassword("");
                setNewPassword("");
                setConfirmPassword("");
              }}
              disabled={isLoading}
              className="border-[#4C91FF] text-gray-300 hover:bg-[#0A274F]"
            >
              Cancelar
            </Button>
            <Button
              onClick={handleChangePassword}
              disabled={isLoading}
              className="bg-[#2563EB] text-white hover:bg-blue-700"
            >
              {isLoading ? "Alterando..." : "Alterar Senha"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent className="bg-[#1a3a52] border border-red-500 text-gray-300">
          <DialogHeader>
            <DialogTitle className="text-white">Deletar Conta</DialogTitle>
            <DialogDescription className="text-gray-400">
              Esta ação é irreversível. Sua conta e todos os dados associados serão permanentemente removidos. Tem certeza que deseja continuar?
            </DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowDeleteDialog(false)}
              disabled={isLoading}
              className="border-[#4C91FF] text-gray-300 hover:bg-[#0A274F]"
            >
              Cancelar
            </Button>
            <Button
              onClick={handleDeleteAccount}
              disabled={isLoading}
              className="bg-red-600 text-white hover:bg-red-700"
            >
              {isLoading ? "Deletando..." : "Confirmar Exclusão"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
