import {RentCredentials} from "@/api/models/Credentials/RentCredentials.ts";
import Loader from "@/components/UI/Loader.tsx";
import useStores from "@/hooks/useStores.tsx";
import {yupResolver} from "@hookform/resolvers/yup";
import {
    Container,
    FormControl,
    FormHelperText,
    InputLabel,
    Link as MuiLink,
    Select,
    SelectChangeEvent
} from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import {DatePicker} from "@mui/x-date-pickers";
import {FC, useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {Link, useNavigate} from "react-router-dom";
import * as Yup from "yup";

const AdminAddRent: FC = () => {
    const navigate = useNavigate();
    const [credentials, setCredentials] = useState<RentCredentials>({
        car_id: 1,
        user_id: 1,
        start: "",
        end: "",
    });
    
    const validationSchema = Yup.object({
        car_id: Yup
            .number()
            .typeError("Car is a required field")
            .required()
            .label("Car"),
        user_id: Yup
            .number()
            .typeError("Client is a required field")
            .required()
            .label("Client"),
        start: Yup
            .date()
            .required()
            .label("Start Date"),
        end: Yup
            .date()
            .required()
            .label("End Date"),
    });
    
    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm<RentCredentials>({
        resolver: yupResolver(validationSchema),
    });
    
    const [isLoading, setLoading] = useState<boolean>(false);
    const {
        carStore,
        userStore,
        rentStore,
    } = useStores();
    
    useEffect(() => {
        (async () => {
            setLoading(true);
            await carStore.index();
            await userStore.index();
            setLoading(false);
        })();
    }, []);
    
    if (isLoading) {
        return <Loader/>;
    }
    
    const handleAdd = async () => {
        const response = await rentStore.create(credentials);
        
        if (response) {
            navigate("/rentals");
        }
    };
    
    return (
        <Container component="main" maxWidth="sm">
            <Box
                sx={{
                    marginTop: 8,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <Typography component="h1" variant="h5">
                    Add Rent Form
                </Typography>
                <Box
                    component="form"
                    noValidate
                    onSubmit={handleSubmit(handleAdd)}
                    sx={{mt: 1}}
                >
                    <FormControl
                        error={!!errors.car_id}
                        margin="normal"
                        fullWidth
                    >
                        <InputLabel id="car-select-label">
                            Car
                        </InputLabel>
                        <Select
                            {...register("car_id")}
                            error={!!errors.car_id}
                            onChange={(event: SelectChangeEvent<HTMLSelectElement>) => {
                                setCredentials({...credentials, car_id: Number(event.target.value)});
                            }}
                            labelId="car-select-label"
                            id="car-select"
                            label="Car"
                        >
                            {carStore.cars.map((car) =>
                                <MenuItem key={car.id} value={car.id}>
                                    {car.name}
                                </MenuItem>
                            )}
                        </Select>
                        {!!errors.car_id &&
							<FormHelperText error>
                                {errors.car_id?.message}
							</FormHelperText>
                        }
                    </FormControl>
                    <FormControl
                        error={!!errors.user_id}
                        margin="normal"
                        fullWidth
                    >
                        <InputLabel id="user-select-label">
                            Client
                        </InputLabel>
                        <Select
                            {...register("user_id")}
                            error={!!errors.user_id}
                            onChange={(event: SelectChangeEvent<HTMLSelectElement>) => {
                                setCredentials({...credentials, user_id: Number(event.target.value)});
                            }}
                            labelId="user-select-label"
                            id="user-select"
                            label="Client"
                        >
                            {userStore.users.map((user) =>
                                <MenuItem
                                    key={user.id}
                                    value={user.id}
                                >
                                    {user.name}
                                </MenuItem>
                            )}
                        </Select>
                        {!!errors.user_id &&
							<FormHelperText error>
                                {errors.user_id?.message}
							</FormHelperText>
                        }
                    </FormControl>
                    <FormControl
                        error={!!errors.start}
                        margin="normal"
                        fullWidth
                    >
                        <DatePicker
                            format="YYYY-MM-DD"
                            {...register("start")}
                            onChange={(event) => {
                                setCredentials({...credentials, start: event.target.value});
                            }}
                            value={credentials.start}
                            label="Start Date"
                        />
                        {!!errors.start &&
							<FormHelperText error>
                                {errors.start?.message}
							</FormHelperText>
                        }
                    </FormControl>
                    <FormControl
                        error={!!errors.end}
                        margin="normal"
                        fullWidth
                    >
                        <DatePicker
                            format="YYYY-MM-DD"
                            {...register("end")}
                            onChange={(event) => {
                                setCredentials({...credentials, end: event.target.value});
                            }}
                            value={credentials.end}
                            label="End Date"
                        />
                        {!!errors.end &&
							<FormHelperText error>
                                {errors.end?.message}
							</FormHelperText>
                        }
                    </FormControl>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{mt: 3, mb: 2}}
                    >
                        Add
                    </Button>
                    <Grid item>
                        <Link to="/rentals">
                            <MuiLink variant="body2">
                                Back to the list of rentals
                            </MuiLink>
                        </Link>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
};

export default AdminAddRent;