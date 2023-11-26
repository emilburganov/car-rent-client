import {IUser} from "@/api/models/IUser.ts";
import {AxiosResponse} from "axios";
import $api from "../http/index";
import {LoginCredentials} from "../models/Credentials/LoginCredentials";
import {RegisterCredentials} from "../models/Credentials/RegisterCredentials";
import {MessageResponse} from "../models/Response/MessageResponse";
import {TokenResponse} from "../models/Response/TokenResponse";

export default class AuthService {
    static async login(credentials: LoginCredentials): Promise<AxiosResponse<TokenResponse>> {
        return $api.post<TokenResponse>("/login", {
            login: credentials.login,
            password: credentials.password
        });
    }
    
    static async register(credentials: RegisterCredentials): Promise<AxiosResponse<TokenResponse>> {
        return $api.post<TokenResponse>("/register", {
            surname: credentials.surname,
            name: credentials.name,
            patronymic: credentials.patronymic,
            login: credentials.login,
            password: credentials.password,
            password_confirmation: credentials.passwordConfirmation
        });
    }
    
    static async logout(): Promise<AxiosResponse<MessageResponse>> {
        return $api.get("/logout");
    }
    
    static async me(): Promise<AxiosResponse<IUser>> {
        return $api.get("/me");
    }
}
