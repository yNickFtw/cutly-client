import { toast } from "@/components/ui/use-toast";
import useAuth from "@/contexts/auth-context";
import useUser from "@/contexts/user-contexts";
import { userServiceFactory } from "@/services/user.service";
import { useMutation } from "@tanstack/react-query";

const userService = userServiceFactory();

export const loginMutation = () => {

    const { setIsLoggedIn } = useAuth();
    const { setUser } = useUser();

    return useMutation({
        mutationFn: async (data: {
            email: string;
            password: string;
        }) => await userService.login(data),
        onSuccess: (data) => {
            toast({
                title: data.message,
                description: "Você foi logado com sucesso",
                variant: "default"
            });

            setUser(data.user);
            setIsLoggedIn(data.auth.token);
        },

        onError(error: any) {
            console.log(error);
            toast({
                title: "Parece que houve um erro ao tentar logar",
                description: error.response.data.message ?? "Ocorreu um erro",
                variant: "destructive"
            });
        },
    });
}

