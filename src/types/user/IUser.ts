export interface IUser {
    id: string;
    name: string;
    email: string;
    profilePicture?: string;
    password?: string;
    phone?: string;
    ownedCompanyId?: string;
    companyUnitId?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

