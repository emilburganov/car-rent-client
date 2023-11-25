import {ISalon} from "@/api/models/ISalon.ts";
import {ErrorsResponse} from "@/api/models/Response/ErrorsResponse.ts";
import SalonService from "@/api/services/SalonService";
import {AxiosError} from "axios";
import {makeAutoObservable} from "mobx";

class SalonStore {
    salons = [] as ISalon[];
    
    constructor() {
        makeAutoObservable(this);
    }
    
    setSalons(salons: ISalon[]) {
        this.salons = salons;
    }
    
    async index() {
        try {
            const response = await SalonService.index();
            this.setSalons(response.data);
        } catch (error: unknown) {
            const axiosError = error as AxiosError<ErrorsResponse>;
            
            if (axiosError.message == "Network Error") {
                return;
            }
            
            console.log(axiosError);
        }
    }
}

export default SalonStore;