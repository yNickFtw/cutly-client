import { create } from "zustand";

import { ICompany } from "@/types/company/ICompany";

type IUseCompany = {
    companySelected: ICompany | null;
    companies: ICompany[];
    loading: boolean;
    addCompany: (company: ICompany) => void;
    setCompanySelected: (company: ICompany | null) => void;
    getCompanySelected: () => ICompany | null;
    getCompanies: () => ICompany[];
    setCompanies: (companies: ICompany[]) => void;
    getCompanyBySlug: (slug: string) => ICompany | null;
    setLoading: (loading: boolean) => void;
    getLoading: () => boolean;
}

export const useCompany = create<IUseCompany>((set, get) => ({
    companySelected: null,
    companies: [],
    loading: true,
    addCompany(company: ICompany) {
        set({ companies: [...get().companies, company] });
    },
    setCompanySelected(company: ICompany | null) {
        set({ companySelected: company });
    },
    getCompanySelected: () => get().companySelected,
    getCompanies: () => get().companies,
    setCompanies: (companies: ICompany[]) => set({ companies }),
    getCompanyBySlug(slug: string) {
        return get().companies.find((company) => company.slug === slug) ?? null;
    },
    setLoading(loading: boolean) {
        set({ loading });
    },
    getLoading: () => get().loading,
}));
