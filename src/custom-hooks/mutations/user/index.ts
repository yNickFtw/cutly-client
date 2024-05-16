import { toast } from "@/components/ui/use-toast";
import useAuth from "@/contexts/auth-context";
import useUser from "@/contexts/user-contexts";
import { userServiceFactory } from "@/services/user.service";
import { useMutation } from "@tanstack/react-query";

export const createUserMutation = () => {
    const instanceOfUserService = userServiceFactory();

    const { setIsLoggedIn } = useAuth();
    const { setUser } = useUser();

    return useMutation({
        mutationFn: async (payload: { name: string, email: string, password: string, confirmPassword: string }) => {
            return await instanceOfUserService.create(payload);
        },

        onError(error: any) {
            console.log(error);

            toast({
                title: error.response.data.message ?? "Algo deu errado",
                variant: 'destructive',
            })
        },

        onSuccess(data) {
            toast({
                title: data.message,
                variant: 'default',
            });

            setIsLoggedIn(data.auth.token);
            setUser(data.user);
        }
    })
}
