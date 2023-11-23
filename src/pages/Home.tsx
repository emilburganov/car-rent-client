import {useNavigate} from 'react-router-dom';
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";

const Home = () => {
    const navigate = useNavigate();

    return (
        <Grid
            container
            spacing={0}
            alignItems="center"
            justifyContent="center"
            sx={{minHeight: '100vh'}}
        >
            <Grid
                display="flex"
                flexDirection="column"
                gap={2}
            >
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
            </Grid>
        </Grid>
    );
};

export default Home;
