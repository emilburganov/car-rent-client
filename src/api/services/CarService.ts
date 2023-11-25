import {ICar} from "@/api/models/ICar.ts";
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
    
    static async destroy(id: number): Promise<AxiosResponse<MessageResponse>> {
        return $api.delete<MessageResponse>(`cars/${id}`);
    }
}