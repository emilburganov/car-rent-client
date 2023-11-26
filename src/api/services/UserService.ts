import {IUser} from "@/api/models/IUser.ts";
import {MessageResponse} from "@/api/models/Response/MessageResponse.ts";
import {AxiosResponse} from "axios";
import $api from "../http/index";

export default class UserService {
    static async index(search: string = ""): Promise<AxiosResponse<IUser[]>> {
        return $api.get<IUser[]>(`users`, {
            params: {
                search
            },
        });
    }
    
    static async destroy(id: number): Promise<AxiosResponse<MessageResponse>> {
        return $api.delete<MessageResponse>(`users/${id}`);
    }
}