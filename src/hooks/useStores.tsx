import StoreContext from "@/context/StoreContext";
import {IRootStore} from "@/store/RootStore";
import {useContext} from "react";

const useStores = (): IRootStore => {
    return useContext(StoreContext);
};

export default useStores;
