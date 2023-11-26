import StoreProvider from "@/providers/StoreProvider";
import {createTheme, CssBaseline, ThemeProvider, useMediaQuery} from "@mui/material";
import {LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {FC, useMemo} from "react";
import AppRouter from "./router/AppRouter";

const App: FC = () => {
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
    
    return (
        <StoreProvider>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <ThemeProvider theme={theme}>
                    <CssBaseline/>
                    <AppRouter/>
                </ThemeProvider>
            </LocalizationProvider>
        </StoreProvider>
    );
};

export default App;
