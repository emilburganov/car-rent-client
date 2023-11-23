import AuthStore from "./modules/AuthStore";

export interface IRootStore {
    authStore: AuthStore;
}

class RootStore {
    authStore: AuthStore;

    constructor() {
        this.authStore = new AuthStore();
    }
}

export default RootStore
