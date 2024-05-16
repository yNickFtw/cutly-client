import { companyServiceFactory } from "@/services/company.service";
import { useQuery } from "@tanstack/react-query";

const companyService = companyServiceFactory();

export const useCompanies = (token: string) => {
    return useQuery({
        queryKey: ["companies", token],
        queryFn: async () =>
            companyService.getAll(token),
    });
};
