import {FC, useMemo} from "react";
import AppRouter from "./router/AppRouter";
import {createTheme, CssBaseline, ThemeProvider, useMediaQuery} from "@mui/material";
import StoreProvider from "@/providers/StoreProvider";

const App: FC = () => {
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

    const theme = useMemo(
        () =>
            createTheme({
                palette: {
                    mode: prefersDarkMode ? 'dark' : 'light',
                },
            }),
        [prefersDarkMode],
    );

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
