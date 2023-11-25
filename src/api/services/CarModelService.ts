import {ICarModel} from "@/api/models/ICarModel.ts";
import {AxiosResponse} from "axios";
import $api from "../http/index";

export default class CarModelService {
    static async index(): Promise<AxiosResponse<ICarModel[]>> {
        return $api.get<ICarModel[]>(`car-models`);
    }
}