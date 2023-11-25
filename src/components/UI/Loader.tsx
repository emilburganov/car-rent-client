import CenteredContainer from "@/components/UI/CenteredContainer.tsx";
import {CircularProgress} from "@mui/material";
import {FC} from "react";

const Loader: FC = () => {
    return (
        <CenteredContainer>
            <CircularProgress/>
        </CenteredContainer>
    );
};

export default Loader;