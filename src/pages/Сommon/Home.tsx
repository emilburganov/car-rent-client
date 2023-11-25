import CenteredContainer from "@/components/UI/CenteredContainer.tsx";
import Button from "@mui/material/Button";
import {useNavigate} from "react-router-dom";

const Home = () => {
    const navigate = useNavigate();
    
    return (
        <CenteredContainer>
            <Button
                fullWidth
                variant="contained"
                onClick={() => navigate("/login")}
            >
                Login
            </Button>
            <Button
                fullWidth
                variant="contained"
                onClick={() => navigate("/register")}
            >
                Register
            </Button>
        </CenteredContainer>
    );
};

export default Home;
