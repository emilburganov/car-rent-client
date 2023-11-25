import {ICarClass} from "@/api/models/ICarClass.ts";
import {ErrorsResponse} from "@/api/models/Response/ErrorsResponse.ts";
import CarClassService from "@/api/services/CarClassService.ts";
import {AxiosError} from "axios";
import {makeAutoObservable} from "mobx";

class CarClassStore {
    carClasses = [] as ICarClass[];
    
    constructor() {
        makeAutoObservable(this);
    }
    
    setCarClasses(carClasses: ICarClass[]) {
        this.carClasses = carClasses;
    }
    
    async index() {
        try {
            const response = await CarClassService.index();
            this.setCarClasses(response.data);
        } catch (error: unknown) {
            const axiosError = error as AxiosError<ErrorsResponse>;
            
            if (axiosError.message == "Network Error") {
                return;
            }
            
            console.log(axiosError);
        }
    }
}

export default CarClassStore;