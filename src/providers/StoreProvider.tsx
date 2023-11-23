import StoreContext from "@/context/StoreContext";
import RootStore from "@/store/RootStore";
import {FC, ReactElement} from "react";

interface StoreProviderProps {
    children: ReactElement;
}

const StoreProvider: FC<StoreProviderProps> = ({children}) => {
    const store = new RootStore();

    return (
        <StoreContext.Provider value={store}>
            {children}
        </StoreContext.Provider>
    );
};


export default StoreProvider;
