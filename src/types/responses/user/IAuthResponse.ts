import { IUser } from "@/types/user/IUser";

export interface IAuthResponse {
    message: string;
    auth: { token: string }
    user: IUser;
}