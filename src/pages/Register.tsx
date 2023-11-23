import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {ChangeEvent, FC, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {Alert, Link as MuiLink, Snackbar} from "@mui/material";
import {RegisterCredentials} from "@/api/models/Credentials/RegisterCredentials";
import {useForm} from "react-hook-form";
import * as Yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";
import useStores from "@/hooks/useStores.tsx";

const Register: FC = () => {
    const navigate = useNavigate();
    const {authStore} = useStores()
    const [credentials, setCredentials] = useState<RegisterCredentials>({
        name: "",
        surname: "",
        login: "",
        password: "",
        passwordConfirmation: ""
    });

    const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
    const [snackbarMessage, setSnackbarMessage] = useState<string>("");

    const validationSchema = Yup.object({
        name: Yup
            .string()
            .required()
            .min(3)
            .max(60)
            .label("Name"),
        surname: Yup
            .string()
            .required()
            .min(3)
            .max(60)
            .label("Surname"),
        login: Yup
            .string()
            .required()
            .min(3)
            .max(40)
            .label("Login"),
        password: Yup
            .string()
            .required()
            .min(8)
            .max(100)
            .label("Password"),
        passwordConfirmation: Yup
            .string()
            .required()
            .label("Password Confirmation")
            .oneOf([Yup.ref("password")], "Password Confirmation field must match Password"),
    });

    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm<RegisterCredentials>({
        resolver: yupResolver(validationSchema),
    });

    const handleRegister = async () => {
        const response = await authStore.register(credentials);

        if (response) {
            navigate("/private");
        } else {
            setSnackbarMessage("This login has been already taken.")
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
                    Register
                </Typography>
                <Box
                    component="form"
                    noValidate
                    onSubmit={handleSubmit(handleRegister)}
                    sx={{mt: 3}}
                >
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                {...register("name")}
                                error={!!errors.name}
                                helperText={errors.name?.message}
                                onChange={(event: ChangeEvent<HTMLInputElement>) => {
                                    setCredentials({...credentials, name: event.target.value})
                                }}
                                value={credentials.name}
                                name="name"
                                required
                                fullWidth
                                id="name"
                                label="Name"
                                autoFocus
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                {...register("surname")}
                                error={!!errors.surname}
                                helperText={errors.surname?.message}
                                onChange={(event: ChangeEvent<HTMLInputElement>) => {
                                    setCredentials({...credentials, surname: event.target.value})
                                }}
                                value={credentials.surname}
                                required
                                fullWidth
                                id="surname"
                                label="Surname"
                                name="surname"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                {...register("login")}
                                error={!!errors.login}
                                helperText={errors.login?.message}
                                onChange={(event: ChangeEvent<HTMLInputElement>) => {
                                    setCredentials({...credentials, login: event.target.value})
                                }}
                                value={credentials.login}
                                required
                                fullWidth
                                id="login"
                                label="Login"
                                name="login"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                {...register("password")}
                                error={!!errors.password}
                                helperText={errors.password?.message}
                                onChange={(event: ChangeEvent<HTMLInputElement>) => {
                                    setCredentials({...credentials, password: event.target.value})
                                }}
                                value={credentials.password}
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                {...register("passwordConfirmation")}
                                error={!!errors.passwordConfirmation}
                                helperText={errors.passwordConfirmation?.message}
                                onChange={(event: ChangeEvent<HTMLInputElement>) => {
                                    setCredentials({...credentials, passwordConfirmation: event.target.value})
                                }}
                                value={credentials.passwordConfirmation}
                                required
                                fullWidth
                                name="passwordConfirmation"
                                label="Password Confirmation"
                                type="password"
                                id="passwordConfirmation"
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{mt: 3, mb: 2}}
                    >
                        Register
                    </Button>
                    <Grid item>
                        <Link to="/login">
                            <MuiLink variant="body2">
                                Already have an account? Login
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

export default Register;
