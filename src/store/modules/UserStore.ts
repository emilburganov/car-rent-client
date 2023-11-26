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
    
    async index() {
        try {
            const response = await UserService.index();
            this.setUsers(response.data);
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