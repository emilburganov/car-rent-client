import {RentCredentials} from "@/api/models/Credentials/RentCredentials.ts";
import {IRent} from "@/api/models/IRent.ts";
import {MessageResponse} from "@/api/models/Response/MessageResponse.ts";
import {RentResponse} from "@/api/models/Response/RentResponse.ts";
import {AxiosResponse} from "axios";
import $api from "../http/index";

export default class RentService {
    static async index(search: string): Promise<AxiosResponse<IRent[]>> {
        return $api.get<IRent[]>(`rentals`, {
            params: {
                search
            },
        });
    }
    
    static async create(credentials: RentCredentials): Promise<AxiosResponse<IRent>> {
        return $api.post<IRent>(`rentals`, credentials);
    }
    
    static async show(id: number): Promise<AxiosResponse<RentResponse>> {
        return $api.get<RentResponse>(`rentals/${id}`);
    }
    
    static async update(id: number, credentials: RentCredentials): Promise<AxiosResponse<MessageResponse>> {
        return $api.patch<MessageResponse>(`rentals/${id}`, credentials);
    }
    
    static async destroy(id: number): Promise<AxiosResponse<MessageResponse>> {
        return $api.delete<MessageResponse>(`rentals/${id}`);
    }
}