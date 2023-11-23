import useStores from "@/hooks/useStores";
import {observer} from "mobx-react-lite";
import {FC} from "react";
import {privateRoutes, publicRoutes} from "./Routes";
import {Route, Router} from "electron-router-dom";
import Home from "@/pages/Home";
import Private from "@/pages/Private";

const AppRouter: FC = observer(() => {
    const {authStore} = useStores();

    if (authStore.isAuth) {
        return (
            <Router
                main={
                    <>
                        {privateRoutes.map((route) =>
                            <Route key={route.path} {...route}/>,
                        )}
                        <Route path="*" element={<Private/>}/>,
                    </>
                }
            />
        );
    }

    return (
        <Router
            main={
                <>
                    {publicRoutes.map((route) =>
                        <Route key={route.path} {...route}/>,
                    )}
                    <Route path="*" element={<Home/>}/>,
                </>
            }
        />
    );
});

export default AppRouter;
