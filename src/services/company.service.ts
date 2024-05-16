import { api } from "@/api";
import { ICompany } from "@/types/company/ICompany";

interface ICompanyService {
    createCompany: (name: string, slug: string, token: string) => Promise<{ message: string; company: ICompany }>;
    getAll: (token: string) => Promise<ICompany[]>;
}

export const companyServiceFactory = (): ICompanyService => {
    return new CompanyService();
};

export class CompanyService implements ICompanyService {
    public async createCompany(name: string, slug: string, token: string): Promise<{ message: string; company: ICompany }> {
        return (await api.post("/company/create", { name, slug }, { headers: { Authorization: `Bearer ${token}` } })).data;
    }

    public async getAll(token: string): Promise<ICompany[]> {
        return (await api.get("/company/all", { headers: { Authorization: `Bearer ${token}` } })).data;
    }
}
