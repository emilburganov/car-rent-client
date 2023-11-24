import CarStore from "@/store/modules/CarStore.ts";
import AuthStore from "./modules/AuthStore";

export interface IRootStore {
    authStore: AuthStore;
    carStore: CarStore;
}

class RootStore {
    authStore: AuthStore;
    carStore: CarStore;
    
    constructor() {
        this.authStore = new AuthStore();
        this.carStore = new CarStore(this);
    }
}

export default RootStore;
