import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {Link, useNavigate} from "react-router-dom";
import {ChangeEvent, FC, useState} from "react";
import {Alert, Link as MuiLink, Snackbar} from "@mui/material";
import {LoginCredentials} from "@/api/models/Credentials/LoginCredentials";
import * as Yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";
import {useForm} from "react-hook-form";
import useStores from "@/hooks/useStores";

const Login: FC = () => {
    const navigate = useNavigate();
    const {authStore} = useStores()
    const [credentials, setCredentials] = useState<LoginCredentials>({
        login: "",
        password: "",
    });

    const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
    const [snackbarMessage, setSnackbarMessage] = useState<string>("");

    const validationSchema = Yup.object({
        login: Yup.string().required().label("Login"),
        password: Yup.string().required().label("Password"),
    });

    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm<LoginCredentials>({
        resolver: yupResolver(validationSchema),
    });

    const handleLogin = async () => {
        const response = await authStore.login(credentials);

        if (response) {
            navigate("/private");
        } else {
            setSnackbarMessage("Invalid login or password.")
            setSnackbarOpen(true);
        }
    };

    return (
        <Container component="main" maxWidth="sm">
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Typography component="h1" variant="h5">
                    Login
                </Typography>
                <Box
                    component="form"
                    onSubmit={handleSubmit(handleLogin)}
                    noValidate
                    sx={{mt: 1}}
                >
                    <TextField
                        {...register("login")}
                        error={!!errors.login}
                        helperText={errors.login?.message}
                        onChange={(event: ChangeEvent<HTMLInputElement>) => {
                            setCredentials({...credentials, login: event.target.value})
                        }}
                        value={credentials.login}
                        margin="normal"
                        required
                        fullWidth
                        id="login"
                        label="Login"
                        name="login"
                        autoFocus></TextField>
                    <TextField
                        {...register("password")}
                        error={!!errors.password}
                        helperText={errors.password?.message}
                        onChange={(event: ChangeEvent<HTMLInputElement>) => {
                            setCredentials({...credentials, password: event.target.value})
                        }}
                        value={credentials.password}
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{mt: 3, mb: 2}}
                    >
                        Login
                    </Button>
                    <Grid item>
                        <Link to="/register">
                            <MuiLink variant="body2">
                                {"Don't have an account? Register"}
                            </MuiLink>
                        </Link>
                    </Grid>
                </Box>
            </Box>
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={2000}
                onClose={() => setSnackbarOpen(false)}
            >
                <Alert severity="error">
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Container>
    );
};

export default Login;
