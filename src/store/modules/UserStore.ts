import {IUser} from "@/api/models/IUser.ts";
import {ErrorsResponse} from "@/api/models/Response/ErrorsResponse.ts";
import UserService from "@/api/services/UserService.ts";
import {AxiosError} from "axios";
import {makeAutoObservable} from "mobx";

class UserStore {
    users = [] as IUser[];
    
    constructor() {
        makeAutoObservable(this);
    }
    
    setUsers(users: IUser[]) {
        this.users = users;
    }
    
    async index(search: string = "") {
        try {
            const response = await UserService.index(search);
            this.setUsers(response.data);
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
            await UserService.destroy(id);
            this.setUsers(this.users.filter((user) => user.id !== id));
        } catch (error: unknown) {
            const axiosError = error as AxiosError<ErrorsResponse>;
            
            if (axiosError.message == "Network Error") {
                return;
            }
            
            console.log(axiosError);
        }
    }
}

export default UserStore;