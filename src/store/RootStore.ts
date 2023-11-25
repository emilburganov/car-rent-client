import CarClassStore from "@/store/modules/CarClassStore.ts";
import CarModelStore from "@/store/modules/CarModelStore.ts";
import CarStore from "@/store/modules/CarStore.ts";
import SalonStore from "@/store/modules/SalonStore.ts";
import AuthStore from "./modules/AuthStore";

export interface IRootStore {
    authStore: AuthStore;
    carStore: CarStore;
    carModelStore: CarModelStore;
    carClassStore: CarClassStore;
    salonStore: SalonStore;
}

class RootStore {
    authStore: AuthStore;
    carStore: CarStore;
    carModelStore: CarModelStore;
    carClassStore: CarClassStore;
    salonStore: SalonStore;
    
    constructor() {
        this.authStore = new AuthStore();
        this.carStore = new CarStore();
        this.carModelStore = new CarModelStore();
        this.carClassStore = new CarClassStore();
        this.salonStore = new SalonStore();
    }
}

export default RootStore;
