import {RentCredentials} from "@/api/models/Credentials/RentCredentials.ts";
import {IRent} from "@/api/models/IRent.ts";
import {ErrorsResponse} from "@/api/models/Response/ErrorsResponse.ts";
import RentService from "@/api/services/RentService.ts";
import {AxiosError} from "axios";
import {makeAutoObservable} from "mobx";

class RentStore {
    rentals = [] as IRent[];
    
    constructor() {
        makeAutoObservable(this);
    }
    
    setRentals(rentals: IRent[]) {
        this.rentals = rentals;
    }
    
    async index(search: string = "") {
        try {
            const response = await RentService.index(search);
            this.setRentals(response.data);
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
            const response = await RentService.show(id);
            return response.data;
        } catch (error: unknown) {
            const axiosError = error as AxiosError<ErrorsResponse>;
            
            if (axiosError.message == "Network Error") {
                return;
            }
            
            console.log(axiosError);
        }
    }
    
    async create(credentials: RentCredentials) {
        try {
            const response = await RentService.create(credentials);
            return response.data;
        } catch (error: unknown) {
            const axiosError = error as AxiosError<ErrorsResponse>;
            
            if (axiosError.message == "Network Error") {
                return;
            }
            
            console.log(axiosError);
        }
    }
    
    async update(id: number, credentials: RentCredentials) {
        try {
            const response = await RentService.update(id, credentials);
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
            await RentService.destroy(id);
            this.setRentals(this.rentals.filter((rent) => rent.id !== id));
        } catch (error: unknown) {
            const axiosError = error as AxiosError<ErrorsResponse>;
            
            if (axiosError.message == "Network Error") {
                return;
            }
            
            console.log(axiosError);
        }
    }
}

export default RentStore;