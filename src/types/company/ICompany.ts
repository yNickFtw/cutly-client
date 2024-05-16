export interface ICompany {
    id: string;
    name: string;
    email: string;
    password: string;
    logo?: string;
    description?: string;
    website?: string;
    links?: any[];
    slug: string;
    ownerId: string;
    createdAt: Date;
    updatedAt: Date;
}