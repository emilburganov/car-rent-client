import {Grid} from "@mui/material";
import {FC, ReactNode} from "react";

interface CenteredContainerProps {
    children: ReactNode;
}

const CenteredContainer: FC<CenteredContainerProps> = ({children}) => {
    return (
        <Grid
            container
            spacing={0}
            alignItems="center"
            justifyContent="center"
            sx={{
                maxWidth: "1440px",
                margin: "0 auto",
                minHeight: "100vh",
                width: "100%",
                display: "flex",
                overflowX: "auto"
            }}
        >
            <Grid
                display="flex"
                flexDirection="column"
                gap={2}
            >
                {children}
            </Grid>
        </Grid>
    );
};

export default CenteredContainer;