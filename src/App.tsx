import useStores from "@/hooks/useStores.tsx";
import StoreProvider from "@/providers/StoreProvider";
import {createTheme, CssBaseline, ThemeProvider, useMediaQuery} from "@mui/material";
import {FC, useEffect, useMemo} from "react";
import AppRouter from "./router/AppRouter";

const App: FC = () => {
    const {authStore} = useStores();
    const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
    
    const theme = useMemo(
        () =>
            createTheme({
                palette: {
                    mode: prefersDarkMode ? "dark" : "light",
                },
            }),
        [prefersDarkMode],
    );
    
    useEffect(() => {
        if (authStore.isAuth) {
            (async () => {
                await authStore.me();
            })();
        }
    });
    
    return (
        <StoreProvider>
            <ThemeProvider theme={theme}>
                <CssBaseline/>
                <AppRouter/>
            </ThemeProvider>
        </StoreProvider>
    );
};

export default App;
