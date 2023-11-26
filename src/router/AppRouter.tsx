import Loader from "@/components/UI/Loader.tsx";
import useStores from "@/hooks/useStores";
import Home from "@/pages/Сommon/Home.tsx";
import Profile from "@/pages/Сommon/Profile.tsx";
import {Route, Router} from "electron-router-dom";
import {observer} from "mobx-react-lite";
import {FC, useEffect, useState} from "react";
import {adminRoutes, clientRoutes, publicRoutes} from "./Routes";

export enum Roles {
    ADMIN = "Admin",
    CLIENT = "Client",
}

const AppRouter: FC = observer(() => {
    const {authStore} = useStores();
    const [isLoading, setLoading] = useState<boolean>(false);
    
    useEffect(() => {
        if (authStore.isAuth) {
            (async () => {
                setLoading(true);
                await authStore.me();
                setLoading(false);
            })();
        }
    }, []);
    
    if (isLoading) {
        return <Loader/>;
    }
    
    if (authStore.isAuth && authStore.user.role === Roles.ADMIN) {
        return (
            <Router
                main={
                    <>
                        {adminRoutes.map((route) =>
                            <Route key={route.path} {...route}/>,
                        )}
                        <Route path="*" element={<Profile/>}/>,
                    </>
                }
            />
        );
    }
    
    if (authStore.isAuth && authStore.user.role === Roles.CLIENT) {
        return (
            <Router
                main={
                    <>
                        {clientRoutes.map((route) =>
                            <Route key={route.path} {...route}/>,
                        )}
                        <Route path="*" element={<Profile/>}/>,
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
