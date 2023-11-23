import RootStore, {IRootStore} from "@/store/RootStore";
import {createContext} from "react";

const StoreContext = createContext<IRootStore>(new RootStore);

export default StoreContext;
