import {CarCredentials} from "@/api/models/Credentials/CarCredentials.ts";
import {ICar} from "@/api/models/ICar.ts";
import {ErrorsResponse} from "@/api/models/Response/ErrorsResponse.ts";
import CarService from "@/api/services/CarService.ts";
import {AxiosError} from "axios";
import {makeAutoObservable} from "mobx";

class CarStore {
    cars = [] as ICar[];
    
    constructor() {
        makeAutoObservable(this);
    }
    
    setCars(cars: ICar[]) {
        this.cars = cars;
    }
    
    async index(search: string = "") {
        try {
            const response = await CarService.index(search);
            this.setCars(response.data);
        } catch (error: unknown) {
            const axiosError = error as AxiosError<ErrorsResponse>;
            
            if (axiosError.message == "Network Error") {
                return;
            }
            
            console.log(axiosError);
        }
    }
    
    async show(id: number) {
        try {
            const response = await CarService.show(id);
            return response.data;
        } catch (error: unknown) {
            const axiosError = error as AxiosError<ErrorsResponse>;
            
            if (axiosError.message == "Network Error") {
                return;
            }
            
            console.log(axiosError);
        }
    }
    
    async create(credentials: CarCredentials) {
        try {
            const response = await CarService.create(credentials);
            return response.data;
        } catch (error: unknown) {
            const axiosError = error as AxiosError<ErrorsResponse>;
            
            if (axiosError.message == "Network Error") {
                return;
            }
            
            console.log(axiosError);
        }
    }
    
    async update(id: number, credentials: CarCredentials) {
        try {
            const response = await CarService.update(id, credentials);
            return response.data;
        } catch (error: unknown) {
            const axiosError = error as AxiosError<ErrorsResponse>;
            
            if (axiosError.message == "Network Error") {
                return;
            }
            
            console.log(axiosError);
        }
    }
    
    async destroy(id: number) {
        try {
            await CarService.destroy(id);
            this.setCars(this.cars.filter((car) => car.id !== id));
        } catch (error: unknown) {
            const axiosError = error as AxiosError<ErrorsResponse>;
            
            if (axiosError.message == "Network Error") {
                return;
            }
            
            console.log(axiosError);
        }
    }
}

export default CarStore;