import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {ChangeEvent, FC, useState} from "react";
import {Link} from "react-router-dom";
import {Link as MuiLink} from "@mui/material";
import {RegisterCredentials} from "@/api/models/Credentials/RegisterCredentials";
import {useForm} from "react-hook-form";
import {LoginCredentials} from "@/api/models/Credentials/LoginCredentials";
import * as Yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";


const Register: FC = () => {
    const [credentials, setCredentials] = useState<RegisterCredentials>({
        firstName: "",
        lastName: "",
        login: "",
        password: "",
        passwordConfirmation: ""
    });


    const validationSchema = Yup.object({
        firstName: Yup
            .string()
            .required()
            .min(3)
            .max(60)
            .label("First Name"),
        lastName: Yup
            .string()
            .required()
            .min(3)
            .max(60)
            .label("Last Name"),
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
        })
    ;

    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm<RegisterCredentials>({
        resolver: yupResolver(validationSchema),
    });

    const handleRegister = () => {

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
                                {...register("firstName")}
                                error={errors.firstName ?? ""}
                                helperText={errors.login?.message}
                                onChange={(event: ChangeEvent<HTMLInputElement>) => {
                                    setCredentials({...credentials, firstName: event.target.value})
                                }}
                                value={credentials.firstName}
                                name="firstName"
                                required
                                fullWidth
                                id="firstName"
                                label="First Name"
                                autoFocus
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                {...register("lastName")}
                                error={errors.lastName ?? ""}
                                helperText={errors.lastName?.message}
                                onChange={(event: ChangeEvent<HTMLInputElement>) => {
                                    setCredentials({...credentials, lastName: event.target.value})
                                }}
                                value={credentials.lastName}
                                required
                                fullWidth
                                id="lastName"
                                label="Last Name"
                                name="lastName"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                {...register("login")}
                                error={errors.login ?? ""}
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
                                error={errors.password ?? ""}
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
                                error={errors.passwordConfirmation ?? ""}
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
        </Container>
    );
};

export default Register;
