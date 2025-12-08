import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Trash2, Edit2, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "../contexts/AuthContext";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { usersService } from "@/services/usersService";

interface User {
  user_id: number;
  username: string;
  full_name: string;
  user_email: string;
  admin: boolean;
  role: "USER" | "MODERATOR" | "ADMIN";
  created_at: string;
}

interface EditingUser extends User {
  originalLoginUsername?: string;
  originalFullName?: string;
  originalEmail?: string;
}

export default function ManageUsers() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user, refreshUserProfile } = useAuth();
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingUser, setEditingUser] = useState<EditingUser | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<number | null>(null);
  const [isDeletingUser, setIsDeletingUser] = useState(false);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      setIsLoading(true);
      const data = await usersService.getAll();
      setUsers(data);
    } catch (error: any) {
      toast({
        title: "Erro",
        description: "Não foi possível carregar os usuários",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditClick = (user: User) => {
    setEditingUser({
      ...user,
      originalLoginUsername: user.username,
      originalFullName: user.full_name,
      originalEmail: user.user_email,
    });
    setIsEditDialogOpen(true);
  };

  const handleSaveEdit = async () => {
    if (!editingUser) return;

    try {
      await usersService.update(editingUser.user_id, {
        full_name: editingUser.full_name,
        role: editingUser.role,
      });

      toast({
        title: "Sucesso!",
        description: "Usuário atualizado com sucesso",
      });

      setIsEditDialogOpen(false);
      setEditingUser(null);

      if (editingUser.user_id === user?.user_id) {
        await refreshUserProfile();
      }

      loadUsers();
    } catch (error: any) {
      toast({
        title: "Erro ao atualizar usuário",
        description:
          error.response?.data?.message || "Tente novamente mais tarde",
        variant: "destructive",
      });
    }
  };

  const handleDeleteClick = (userId: number) => {
    setUserToDelete(userId);
    setIsDeleteConfirmOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!userToDelete) return;

    try {
      setIsDeletingUser(true);
      await usersService.delete(userToDelete);

      toast({
        title: "Sucesso!",
        description: "Usuário excluído com sucesso",
      });

      setIsDeleteConfirmOpen(false);
      setUserToDelete(null);
      loadUsers();
    } catch (error: any) {
      toast({
        title: "Erro ao excluir usuário",
        description:
          error.response?.data?.message || "Tente novamente mais tarde",
        variant: "destructive",
      });
    } finally {
      setIsDeletingUser(false);
    }
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case "ADMIN":
        return "bg-blue-600";
      case "MODERATOR":
        return "bg-purple-600";
      default:
        return "bg-gray-600";
    }
  };

  const getRoleLabel = (role: string) => {
    switch (role) {
      case "ADMIN":
        return "Admin";
      case "MODERATOR":
        return "Moderador";
      default:
        return "Usuário";
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#274584] flex items-center justify-center">
        <p className="text-white text-xl">Carregando usuários...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#274584] p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-white text-4xl font-bold mb-2">
              Gerenciamento de Usuários
            </h1>
            <p className="text-gray-400">
              Gerencie usuários, permissões e acesso ao sistema
            </p>
          </div>
          <button
            onClick={() => navigate("/games")}
            className="px-6 py-2 bg-[#2563EB] text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Voltar
          </button>
        </div>

        <div className="bg-[#1a3a52] rounded-lg border border-[#4C91FF] overflow-hidden">
          <Table>
            <TableHeader className="bg-[#0A274F]">
              <TableRow className="border-b border-[#4C91FF] hover:bg-[#0A274F]">
                <TableHead className="text-gray-300">Usuário Login</TableHead>
                <TableHead className="text-gray-300">Nome</TableHead>
                <TableHead className="text-gray-300">E-mail</TableHead>
                <TableHead className="text-gray-300">Status</TableHead>
                <TableHead className="text-gray-300">Cadastrado em</TableHead>
                <TableHead className="text-gray-300">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow
                  key={user.user_id}
                  className="border-b border-[#2a5a7a] hover:bg-[#0A274F] transition-colors"
                >
                  <TableCell className="text-gray-300 font-medium">
                    {user.username}
                  </TableCell>
                  <TableCell className="text-gray-400">
                    {user.full_name}
                  </TableCell>
                  <TableCell className="text-gray-400">
                    {user.user_email}
                  </TableCell>
                  <TableCell>
                    <Badge
                      className={`${getRoleBadgeColor(user.role)} text-white`}
                    >
                      {getRoleLabel(user.role)}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-gray-400">
                    {new Date(user.created_at).toLocaleDateString("pt-BR")}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEditClick(user)}
                        className="inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium text-gray-300 hover:text-white hover:bg-[#2563EB] p-2 transition-colors"
                        title="Editar usuário"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => handleDeleteClick(user.user_id)}
                        className="inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium text-red-400 hover:text-white hover:bg-red-900 p-2 transition-colors"
                        title="Excluir usuário"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {users.length === 0 && (
            <div className="p-8 text-center">
              <p className="text-gray-400">Nenhum usuário encontrado</p>
            </div>
          )}
        </div>

        <div className="mt-4 text-gray-400 text-sm">
          Total de usuários:{" "}
          <span className="font-bold text-white">{users.length}</span>
        </div>
      </div>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="bg-[#1a3a52] border border-[#4C91FF] text-gray-300">
          <DialogHeader>
            <DialogTitle className="text-white">Editar Usuário</DialogTitle>
            <DialogDescription className="text-gray-400">
              Atualize as informações do usuário abaixo
            </DialogDescription>
          </DialogHeader>

          {editingUser && (
            <div className="space-y-4">
              <div>
                <label className="block text-gray-300 text-sm mb-1">
                  Usuário de Login
                </label>
                <input
                  type="text"
                  value={editingUser.username}
                  disabled
                  className="w-full h-[40px] px-4 bg-[#0d1f3d] border border-gray-600 rounded-lg text-gray-500 cursor-not-allowed opacity-75"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Este campo não pode ser alterado
                </p>
              </div>

              <div>
                <label className="block text-gray-300 text-sm mb-1">
                  Nome Completo
                </label>
                <input
                  type="text"
                  value={editingUser.full_name}
                  onChange={(e) =>
                    setEditingUser({
                      ...editingUser,
                      full_name: e.target.value,
                    })
                  }
                  className="w-full h-[40px] px-4 bg-[#0A274F] border border-[#4C91FF] rounded-lg text-gray-300 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-gray-300 text-sm mb-1">
                  E-mail
                </label>
                <input
                  type="email"
                  value={editingUser.user_email}
                  disabled
                  className="w-full h-[40px] px-4 bg-[#0d1f3d] border border-gray-600 rounded-lg text-gray-500 cursor-not-allowed opacity-75"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Este campo não pode ser alterado
                </p>
              </div>

              <div>
                <label className="block text-gray-300 text-sm mb-1">
                  Cargo
                </label>
                <div className="flex gap-2">
                  <button
                    onClick={() =>
                      setEditingUser({
                        ...editingUser,
                        role: "USER",
                        admin: false,
                      })
                    }
                    className={`flex-1 h-[40px] rounded-lg font-medium transition-colors ${
                      editingUser.role === "USER"
                        ? "bg-gray-600 text-white"
                        : "bg-[#0A274F] text-gray-400 border border-[#4C91FF]"
                    }`}
                  >
                    Usuário
                  </button>
                  <button
                    onClick={() =>
                      setEditingUser({
                        ...editingUser,
                        role: "MODERATOR",
                        admin: false,
                      })
                    }
                    className={`flex-1 h-[40px] rounded-lg font-medium transition-colors ${
                      editingUser.role === "MODERATOR"
                        ? "bg-purple-600 text-white"
                        : "bg-[#0A274F] text-gray-400 border border-[#4C91FF]"
                    }`}
                  >
                    Moderador
                  </button>
                  <button
                    onClick={() =>
                      setEditingUser({
                        ...editingUser,
                        role: "ADMIN",
                        admin: true,
                      })
                    }
                    className={`flex-1 h-[40px] rounded-lg font-medium transition-colors ${
                      editingUser.role === "ADMIN"
                        ? "bg-blue-600 text-white"
                        : "bg-[#0A274F] text-gray-400 border border-[#4C91FF]"
                    }`}
                  >
                    Admin
                  </button>
                </div>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsEditDialogOpen(false)}
              className="border-[#4C91FF] text-gray-300 hover:bg-[#0A274F]"
            >
              Cancelar
            </Button>
            <Button
              onClick={handleSaveEdit}
              className="bg-[#2563EB] text-white hover:bg-blue-700"
            >
              Salvar Alterações
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isDeleteConfirmOpen} onOpenChange={setIsDeleteConfirmOpen}>
        <DialogContent className="bg-[#1a3a52] border border-red-500 text-gray-300">
          <DialogHeader>
            <DialogTitle className="text-white">Confirmar Exclusão</DialogTitle>
            <DialogDescription className="text-gray-400">
              Esta ação não pode ser desfeita. O usuário será permanentemente
              removido do sistema.
            </DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDeleteConfirmOpen(false)}
              disabled={isDeletingUser}
              className="border-[#4C91FF] text-gray-300 hover:bg-[#0A274F]"
            >
              Cancelar
            </Button>
            <Button
              onClick={handleConfirmDelete}
              disabled={isDeletingUser}
              className="bg-red-600 text-white hover:bg-red-700"
            >
              {isDeletingUser ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Excluindo...
                </>
              ) : (
                "Confirmar Exclusão"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
