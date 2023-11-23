import $api from "../http/index";
import {LoginCredentials} from "../models/Credentials/LoginCredentials";
import {RegisterCredentials} from "../models/Credentials/RegisterCredentials";
import {MessageResponse} from "../models/Response/MessageResponse";
import {TokenResponse} from "../models/Response/TokenResponse";
import {AxiosResponse} from "axios";
import {IUser} from "@/api/models/IUser.ts";

export default class AuthService {
    static async login(credentials: LoginCredentials): Promise<AxiosResponse<TokenResponse>> {
        return $api.post<TokenResponse>("/login", {
            login: credentials.login,
            password: credentials.password
        });
    }

    static async register(credentials: RegisterCredentials): Promise<AxiosResponse<TokenResponse>> {
        return $api.post<TokenResponse>("/register", {
            name: credentials.name,
            surname: credentials.surname,
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
