import {ISalon} from "@/api/models/ISalon.ts";
import {AxiosResponse} from "axios";
import $api from "../http/index";

export default class SalonService {
    static async index(): Promise<AxiosResponse<ISalon[]>> {
        return $api.get<ISalon[]>(`salons`);
    }
}