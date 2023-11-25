import {ICarClass} from "@/api/models/ICarClass.ts";
import {AxiosResponse} from "axios";
import $api from "../http/index";

export default class CarClassService {
    static async index(): Promise<AxiosResponse<ICarClass[]>> {
        return $api.get<ICarClass[]>(`car-classes`);
    }
}