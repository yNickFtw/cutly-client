import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import useAuth from "@/contexts/auth-context";
import { useCompany } from "@/contexts/company-context";
import { companyServiceFactory } from "@/services/company.service";
import { doIfError } from "@/utils/app-error/AppError";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export function createCompanyMutation() {
    const { addCompany } = useCompany();

    const navigate = useNavigate();

    const { logout } = useAuth();

    return useMutation({
        mutationFn: async (data: { name: string, slug: string, token: string }) => {
            return await companyServiceFactory().createCompany(data.name, data.slug, data.token);
        },
        onSuccess: (data) => {
            console.log(data);
            addCompany(data.company);
            navigate(`/${data.company.slug}`);
        },
        onError: (error: any) => {

            const { serverError, unauthorized, badRequest, forbidden } = doIfError(error);

            if (serverError) {
                toast({
                    title: "Erro ao criar empresa",
                    description: error.response.data.message,
                    variant: "destructive",
                });
            }

            if (unauthorized) {
                toast({
                    title: "Sessão expirada",
                    description: "Sua sessão expirou, por favor, faça login novamente",
                    variant: "destructive",
                });

                logout();
            }

            if (badRequest) {
                toast({
                    title: "Erro ao criar empresa",
                    description: error.response.data.message,
                    variant: "destructive",
                });
            }

            if(forbidden) {
                toast({
                    title: "Você chegou ao limite de empresas criadas permitido pelo plano",
                    description: "Você pode atualizar o plano para criar mais empresas",
                    action: <Button onClick={() => navigate("/plans")}>Atualizar plano</Button>,
                    variant: "destructive",
                });
            }

        },
    })
}

