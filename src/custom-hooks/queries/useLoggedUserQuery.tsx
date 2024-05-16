import { userServiceFactory } from "@/services/user.service";
import { useQuery } from "@tanstack/react-query";

const userService = userServiceFactory();

export const useLoggedUserQuery = (token: string) => {
  return useQuery({
    queryKey: ["loggedUser"],
    queryFn: async () => {
      return userService.getLoggedUser(token);
    },
  });
};
