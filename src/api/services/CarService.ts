import {CarCredentials} from "@/api/models/Credentials/CarCredentials.ts";
import {ICar} from "@/api/models/ICar.ts";
import {CarResponse} from "@/api/models/Response/CarResponse.ts";
import {MessageResponse} from "@/api/models/Response/MessageResponse.ts";
import {AxiosResponse} from "axios";
import $api from "../http/index";

export default class CarService {
    static async index(search: string): Promise<AxiosResponse<ICar[]>> {
        return $api.get<ICar[]>(`cars`, {
            params: {
                search
            },
        });
    }
    
    static async create(credentials: CarCredentials): Promise<AxiosResponse<ICar>> {
        return $api.post<ICar>(`cars`, credentials);
    }
    
    static async show(id: number): Promise<AxiosResponse<CarResponse>> {
        return $api.get<CarResponse>(`cars/${id}`);
    }
    
    static async update(id: number, credentials: CarCredentials): Promise<AxiosResponse<MessageResponse>> {
        return $api.patch<MessageResponse>(`cars/${id}`, credentials);
    }
    
    static async destroy(id: number): Promise<AxiosResponse<MessageResponse>> {
        return $api.delete<MessageResponse>(`cars/${id}`);
    }
}