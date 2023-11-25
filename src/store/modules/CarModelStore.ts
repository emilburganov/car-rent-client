import {ICarModel} from "@/api/models/ICarModel.ts";
import {ErrorsResponse} from "@/api/models/Response/ErrorsResponse.ts";
import CarModelService from "@/api/services/CarModelService.ts";
import {AxiosError} from "axios";
import {makeAutoObservable} from "mobx";

class CarModelStore {
    carModels = [] as ICarModel[];
    
    constructor() {
        makeAutoObservable(this);
    }
    
    setCarModels(carModels: ICarModel[]) {
        this.carModels = carModels;
    }
    
    async index() {
        try {
            const response = await CarModelService.index();
            this.setCarModels(response.data);
        } catch (error: unknown) {
            const axiosError = error as AxiosError<ErrorsResponse>;
            
            if (axiosError.message == "Network Error") {
                return;
            }
            
            console.log(axiosError);
        }
    }
}

export default CarModelStore;