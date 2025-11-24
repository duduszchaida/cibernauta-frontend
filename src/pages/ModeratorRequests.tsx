import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle, XCircle, Clock, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "../contexts/AuthContext";
import Navigation from "@/components/Navigation";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { moderatorRequestsService } from "@/services/moderatorRequestsService";

interface ModeratorRequest {
  request_id: number;
  user_id: number;
  reason?: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
  created_at: string;
  reviewed_at?: string;
  user: {
    user_id: number;
    username: string;
    full_name: string;
    user_email: string;
    role: string;
  };
  reviewer?: {
    user_id: number;
    username: string;
    full_name: string;
  };
}

export default function ModeratorRequests() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();
  const [allRequests, setAllRequests] = useState<ModeratorRequest[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedRequest, setSelectedRequest] =
    useState<ModeratorRequest | null>(null);
  const [isReviewDialogOpen, setIsReviewDialogOpen] = useState(false);
  const [reviewAction, setReviewAction] = useState<
    "APPROVED" | "REJECTED" | null
  >(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (user?.role !== "ADMIN") {
      navigate("/games");
      return;
    }
    loadRequests();
  }, [user, navigate]);

  const loadRequests = async () => {
    try {
      setIsLoading(true);
      const data = await moderatorRequestsService.getAll();
      setAllRequests(data);
    } catch (error: any) {
      toast({
        title: "Erro",
        description: "Não foi possível carregar as solicitações",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleReviewClick = (
    request: ModeratorRequest,
    action: "APPROVED" | "REJECTED",
  ) => {
    setSelectedRequest(request);
    setReviewAction(action);
    setIsReviewDialogOpen(true);
  };

  const handleReviewSubmit = async () => {
    if (!selectedRequest || !reviewAction) return;

    setIsSubmitting(true);
    try {
      await moderatorRequestsService.review(
        selectedRequest.request_id,
        reviewAction,
      );
      toast({
        title: "Sucesso!",
        description: `Solicitação ${reviewAction === "APPROVED" ? "aprovada" : "rejeitada"} com sucesso`,
      });
      setIsReviewDialogOpen(false);
      loadRequests();
    } catch (error: any) {
      toast({
        title: "Erro",
        description:
          error.response?.data?.message ||
          "Não foi possível processar a solicitação",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "PENDING":
        return (
          <Badge className="bg-yellow-600 hover:bg-yellow-700">
            <Clock className="w-3 h-3 mr-1" /> Pendente
          </Badge>
        );
      case "APPROVED":
        return (
          <Badge className="bg-green-600 hover:bg-green-700">
            <CheckCircle className="w-3 h-3 mr-1" /> Aprovada
          </Badge>
        );
      case "REJECTED":
        return (
          <Badge className="bg-red-600 hover:bg-red-700">
            <XCircle className="w-3 h-3 mr-1" /> Rejeitada
          </Badge>
        );
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const pendingRequests = allRequests.filter((r) => r.status === "PENDING");
  const reviewedRequests = allRequests.filter((r) => r.status !== "PENDING");

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#2B71A3]">
        <Navigation username={user?.username} />
        <div className="mt-[180px] mx-auto px-4 sm:px-6 lg:px-[184px]">
          <div className="bg-[#274584] rounded-t-[25px] min-h-[861px] pt-[103px] px-4 sm:px-8 lg:px-[143px] flex items-center justify-center">
            <div className="text-white text-xl">Carregando solicitações...</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#2B71A3]">
      <Navigation username={user?.username} />

      <div className="mt-[180px] mx-auto px-4 sm:px-6 lg:px-[184px]">
        <div className="bg-[#274584] rounded-t-[25px] min-h-[861px] pt-[103px] px-4 sm:px-8 lg:px-[143px]">
          <div className="mb-8">
            <h1 className="text-white text-3xl font-bold mb-2">
              Solicitações de Moderador
            </h1>
            <p className="text-gray-400 text-base">
              Analise e responda às solicitações de permissão de moderador
            </p>
          </div>

          <Tabs defaultValue="pending" className="w-full">
            <TabsList className="bg-[#1F2937] border-gray-700">
              <TabsTrigger
                value="pending"
                className="data-[state=active]:bg-blue-600"
              >
                Pendentes ({pendingRequests.length})
              </TabsTrigger>
              <TabsTrigger
                value="reviewed"
                className="data-[state=active]:bg-blue-600"
              >
                Revisadas ({reviewedRequests.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="pending" className="mt-6">
              {pendingRequests.length === 0 ? (
                <div className="bg-[#1F2937] border border-gray-700 rounded-lg p-12 text-center">
                  <Clock className="w-16 h-16 text-gray-500 mx-auto mb-4" />
                  <p className="text-gray-400 text-lg">
                    Nenhuma solicitação pendente
                  </p>
                </div>
              ) : (
                <div className="bg-[#1F2937] border border-gray-700 rounded-lg overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-gray-700 hover:bg-[#1F2937]">
                        <TableHead className="text-gray-300">Usuário</TableHead>
                        <TableHead className="text-gray-300">Email</TableHead>
                        <TableHead className="text-gray-300">Razão</TableHead>
                        <TableHead className="text-gray-300">Data</TableHead>
                        <TableHead className="text-gray-300 text-right">
                          Ações
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {pendingRequests.map((request) => (
                        <TableRow
                          key={request.request_id}
                          className="border-gray-700 hover:bg-[#374151]"
                        >
                          <TableCell className="text-white">
                            <div className="flex items-center gap-2">
                              <User className="w-4 h-4 text-gray-400" />
                              <div>
                                <div className="font-medium">
                                  {request.user.full_name}
                                </div>
                                <div className="text-sm text-gray-400">
                                  @{request.user.username}
                                </div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className="text-gray-300">
                            {request.user.user_email}
                          </TableCell>
                          <TableCell className="text-gray-300 max-w-xs">
                            {request.reason ? (
                              <div className="truncate" title={request.reason}>
                                {request.reason}
                              </div>
                            ) : (
                              <span className="text-gray-500 italic">
                                Não informado
                              </span>
                            )}
                          </TableCell>
                          <TableCell className="text-gray-300">
                            {formatDate(request.created_at)}
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex gap-2 justify-end">
                              <Button
                                size="sm"
                                onClick={() =>
                                  handleReviewClick(request, "APPROVED")
                                }
                                className="bg-green-600 hover:bg-green-700 text-white"
                              >
                                <CheckCircle className="w-4 h-4 mr-1" />
                                Aprovar
                              </Button>
                              <Button
                                size="sm"
                                onClick={() =>
                                  handleReviewClick(request, "REJECTED")
                                }
                                className="bg-red-600 hover:bg-red-700 text-white"
                              >
                                <XCircle className="w-4 h-4 mr-1" />
                                Rejeitar
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </TabsContent>

            <TabsContent value="reviewed" className="mt-6">
              {reviewedRequests.length === 0 ? (
                <div className="bg-[#1F2937] border border-gray-700 rounded-lg p-12 text-center">
                  <p className="text-gray-400 text-lg">
                    Nenhuma solicitação revisada ainda
                  </p>
                </div>
              ) : (
                <div className="bg-[#1F2937] border border-gray-700 rounded-lg overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-gray-700 hover:bg-[#1F2937]">
                        <TableHead className="text-gray-300">Usuário</TableHead>
                        <TableHead className="text-gray-300">Email</TableHead>
                        <TableHead className="text-gray-300">Status</TableHead>
                        <TableHead className="text-gray-300">
                          Revisado por
                        </TableHead>
                        <TableHead className="text-gray-300">
                          Data da Revisão
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {reviewedRequests.map((request) => (
                        <TableRow
                          key={request.request_id}
                          className="border-gray-700 hover:bg-[#374151]"
                        >
                          <TableCell className="text-white">
                            <div className="flex items-center gap-2">
                              <User className="w-4 h-4 text-gray-400" />
                              <div>
                                <div className="font-medium">
                                  {request.user.full_name}
                                </div>
                                <div className="text-sm text-gray-400">
                                  @{request.user.username}
                                </div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className="text-gray-300">
                            {request.user.user_email}
                          </TableCell>
                          <TableCell>
                            {getStatusBadge(request.status)}
                          </TableCell>
                          <TableCell className="text-gray-300">
                            {request.reviewer
                              ? request.reviewer.full_name
                              : "N/A"}
                          </TableCell>
                          <TableCell className="text-gray-300">
                            {request.reviewed_at
                              ? formatDate(request.reviewed_at)
                              : "N/A"}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <Dialog open={isReviewDialogOpen} onOpenChange={setIsReviewDialogOpen}>
        <DialogContent className="bg-[#1F2937] border-gray-700 text-white">
          <DialogHeader>
            <DialogTitle>
              {reviewAction === "APPROVED"
                ? "Aprovar Solicitação"
                : "Rejeitar Solicitação"}
            </DialogTitle>
            <DialogDescription className="text-gray-400">
              {reviewAction === "APPROVED"
                ? `Tem certeza que deseja aprovar a solicitação de ${selectedRequest?.user.full_name}? O usuário será promovido a moderador.`
                : `Tem certeza que deseja rejeitar a solicitação de ${selectedRequest?.user.full_name}?`}
            </DialogDescription>
          </DialogHeader>

          {selectedRequest?.reason && (
            <div className="my-4 p-4 bg-[#111827] border border-gray-700 rounded-lg">
              <p className="text-sm text-gray-400 mb-1">Razão fornecida:</p>
              <p className="text-white">{selectedRequest.reason}</p>
            </div>
          )}

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsReviewDialogOpen(false)}
              className="bg-transparent border-gray-600 text-white hover:bg-gray-800"
            >
              Cancelar
            </Button>
            <Button
              onClick={handleReviewSubmit}
              disabled={isSubmitting}
              className={
                reviewAction === "APPROVED"
                  ? "bg-green-600 hover:bg-green-700 text-white"
                  : "bg-red-600 hover:bg-red-700 text-white"
              }
            >
              {isSubmitting
                ? "Processando..."
                : reviewAction === "APPROVED"
                  ? "Aprovar"
                  : "Rejeitar"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
