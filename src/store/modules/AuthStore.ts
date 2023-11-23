import {makeAutoObservable} from "mobx";
import {LoginCredentials} from "@/api/models/Credentials/LoginCredentials";
import AuthService from "@/api/services/AuthService";
import {RegisterCredentials} from "@/api/models/Credentials/RegisterCredentials";
import {ErrorsResponse} from "@/api/models/Response/ErrorsResponse";
import {AxiosError} from "axios";

class AuthStore {
    isAuth = !!localStorage.getItem("token");

    constructor() {
        makeAutoObservable(this);
    }

    setAuth(bool: boolean) {
        this.isAuth = bool;
    }

    async login(credentials: LoginCredentials) {
        try {
            const response = await AuthService.login(credentials);
            localStorage.setItem("token", response.data.token);
            this.setAuth(true);

            return response;
        } catch (error: unknown) {
            const axiosError = error as AxiosError<ErrorsResponse>;

            if (axiosError.message == "Network Error") {
                return;
            }

            if (axiosError.response) {
                if (axiosError.response.status === 401) {
                    console.log(axiosError.response.data.message);
                }
            }
        }
    }

    async register(credentials: RegisterCredentials) {
        try {
            const response = await AuthService.register(credentials);
            localStorage.setItem("token", response.data.token);
            this.setAuth(true);

            return response;
        } catch (error: unknown) {
            const axiosError = error as AxiosError<ErrorsResponse>;

            if (axiosError.message == "Network Error") {
                return;
            }

            if (axiosError.response) {
                if (axiosError.response.status === 422) {
                    console.log(axiosError.response.data.message);
                }
            }
        }
    }

    async logout() {
        try {
            await AuthService.logout();
        } catch (error: unknown) {
            const axiosError = error as AxiosError<ErrorsResponse>;

            if (axiosError.message == "Network Error") {
                return;
            }

            if (axiosError.response) {
                if (axiosError.response.status === 422) {
                    console.log(axiosError.response.data.message);
                }
            }
        } finally {
            this.setAuth(false);
            localStorage.removeItem("token");
        }
    }

    async me() {
        try {
            await AuthService.me();
        } catch (error: unknown) {
            const axiosError = error as AxiosError<ErrorsResponse>;

            if (axiosError.message == "Network Error") {
                return;
            }

            console.log(axiosError);
        }
    }
}

export default AuthStore;
