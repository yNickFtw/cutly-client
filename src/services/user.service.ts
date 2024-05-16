import { api } from "@/api";
import { IUser } from "@/types/user/IUser";
import { IAuthResponse } from "@/types/responses/user/IAuthResponse";

interface IUserService {
    create(data: { name: string, email: string, password: string, confirmPassword: string }): Promise<IAuthResponse>
    login(data: { email: string, password: string }): Promise<IAuthResponse>
    getLoggedUser(token: string): Promise<IUser>
}

export const userServiceFactory = (): IUserService => { return new UserService() }

export class UserService implements IUserService {
    

    public async create(data: { name: string; email: string; password: string; confirmPassword: string; }): Promise<IAuthResponse> {
        return (await api.post<IAuthResponse>('/users/create', data)).data;
    }

    public async login(data: { email: string, password: string }): Promise<IAuthResponse> {
        return (await api.post<IAuthResponse>('/users/login', data)).data;
    }

    public async getLoggedUser(token: string): Promise<IUser> {
        return (await api.get<IUser>('/users/logged', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })).data;
    }
}

