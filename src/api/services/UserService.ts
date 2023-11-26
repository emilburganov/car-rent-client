import {IUser} from "@/api/models/IUser.ts";
import {AxiosResponse} from "axios";
import $api from "../http/index";

export default class UserService {
    static async index(): Promise<AxiosResponse<IUser[]>> {
        return $api.get<IUser[]>(`users`);
    }
}