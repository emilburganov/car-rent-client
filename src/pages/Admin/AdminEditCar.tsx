import {CarCredentials} from "@/api/models/Credentials/CarCredentials.ts";
import CenteredContainer from "@/components/UI/CenteredContainer";
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
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import {ChangeEvent, FC, useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {Link, useNavigate, useParams} from "react-router-dom";
import * as Yup from "yup";

const AdminEditCar: FC = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const [credentials, setCredentials] = useState<CarCredentials>({
        car_class_id: 1,
        car_model_id: 1,
        consumption: 10,
        horsepower: 100,
        name: "",
        salon_id: 1,
        year: 2023,
    });
    
    const validationSchema = Yup.object({
        car_class_id: Yup
            .number()
            .typeError("CarClass is a required field")
            .required()
            .label("CarClass"),
        car_model_id: Yup
            .number()
            .typeError("CarModel is a required field")
            .required()
            .label("CarModel"),
        consumption: Yup
            .number()
            .typeError("Consumption must be a number")
            .required()
            .min(1)
            .max(200)
            .label("Consumption"),
        name: Yup
            .string()
            .required()
            .min(3)
            .max(40)
            .label("Name"),
        horsepower: Yup
            .number()
            .typeError("Horsepower must be a number")
            .required()
            .min(1)
            .max(1000)
            .label("Horsepower"),
        salon_id: Yup
            .number()
            .typeError("Salon is a required field")
            .required()
            .label("Salon"),
        year: Yup
            .number()
            .typeError("Year must be a number")
            .required()
            .min(1800)
            .max(new Date().getFullYear())
            .label("Year"),
    });
    
    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm<CarCredentials>({
        resolver: yupResolver(validationSchema),
    });
    
    const [isLoading, setLoading] = useState<boolean>(false);
    const {
        carStore,
        carModelStore,
        carClassStore,
        salonStore
    } = useStores();
    
    useEffect(() => {
        (async () => {
            setLoading(true);
            
            const response = await carStore.show(Number(id));
            if (response) {
                setCredentials((({id, ...response}) => response)(response));
            }
            
            setLoading(false);
        })();
    }, []);
    
    if (isLoading) {
        return <Loader/>;
    }
    
    const handleUpdate = async () => {
        const response = await carStore.create(credentials);
        
        if (response) {
            navigate("/cars");
        }
    };
    
    return (
        <CenteredContainer>
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
                        Edit Car Form
                    </Typography>
                    <Box
                        component="form"
                        noValidate
                        onSubmit={handleSubmit(handleUpdate)}
                        sx={{mt: 1}}
                    >
                        <FormControl
                            error={!!errors.car_model_id}
                            margin="normal"
                            fullWidth
                        >
                            <InputLabel id="car-model-select-label">
                                CarModel
                            </InputLabel>
                            <Select
                                {...register("car_model_id")}
                                error={!!errors.car_model_id}
                                onChange={(event: SelectChangeEvent<HTMLSelectElement>) => {
                                    setCredentials({...credentials, car_model_id: Number(event.target.value)});
                                }}
                                labelId="car-model-select-label"
                                id="car-model-select"
                                label="CarModel"
                            >
                                {carModelStore.carModels.map((carModel) =>
                                    <MenuItem key={carModel.id} value={carModel.id}>
                                        {carModel.name}
                                    </MenuItem>
                                )}
                            </Select>
                            {!!errors.car_model_id &&
								<FormHelperText error>
                                    {errors.car_model_id?.message}
								</FormHelperText>
                            }
                        </FormControl>
                        <TextField
                            {...register("year")}
                            error={!!errors.year}
                            helperText={errors.year?.message}
                            onChange={(event: ChangeEvent<HTMLInputElement>) => {
                                setCredentials({...credentials, year: Number(event.target.value)});
                            }}
                            value={credentials.year}
                            margin="normal"
                            required
                            fullWidth
                            id="year"
                            label="Year"
                            name="year"
                            autoFocus
                            type="number"
                        />
                        <TextField
                            {...register("name")}
                            error={!!errors.name}
                            helperText={errors.name?.message}
                            onChange={(event: ChangeEvent<HTMLInputElement>) => {
                                setCredentials({...credentials, name: event.target.value});
                            }}
                            value={credentials.name}
                            margin="normal"
                            required
                            fullWidth
                            id="name"
                            label="Name"
                            name="name"
                            type="text"
                        />
                        <TextField
                            {...register("consumption")}
                            error={!!errors.consumption}
                            helperText={errors.consumption?.message}
                            onChange={(event: ChangeEvent<HTMLInputElement>) => {
                                setCredentials({...credentials, consumption: Number(event.target.value)});
                            }}
                            value={credentials.consumption}
                            margin="normal"
                            required
                            fullWidth
                            id="consumption"
                            label="Consumption"
                            name="consumption"
                            autoFocus
                            type="number"
                        />
                        <TextField
                            {...register("horsepower")}
                            error={!!errors.horsepower}
                            helperText={errors.horsepower?.message}
                            onChange={(event: ChangeEvent<HTMLInputElement>) => {
                                setCredentials({...credentials, horsepower: Number(event.target.value)});
                            }}
                            value={credentials.horsepower}
                            margin="normal"
                            required
                            fullWidth
                            id="horsepower"
                            label="Horsepower"
                            name="horsepower"
                            autoFocus
                            type="number"
                        />
                        <FormControl
                            error={!!errors.car_class_id}
                            margin="normal"
                            fullWidth
                        >
                            <InputLabel id="car-class-select-label">
                                CarClass
                            </InputLabel>
                            <Select
                                {...register("car_class_id")}
                                error={!!errors.car_class_id}
                                onChange={(event: SelectChangeEvent<HTMLSelectElement>) => {
                                    setCredentials({...credentials, car_class_id: Number(event.target.value)});
                                }}
                                labelId="car-class-select-label"
                                id="car-class-select"
                                label="CarClass"
                            >
                                {carClassStore.carClasses.map((carClass) =>
                                    <MenuItem
                                        key={carClass.id}
                                        value={carClass.id}
                                    >
                                        {carClass.name}
                                    </MenuItem>
                                )}
                            </Select>
                            {!!errors.car_class_id &&
								<FormHelperText error>
                                    {errors.car_class_id?.message}
								</FormHelperText>
                            }
                        </FormControl>
                        <FormControl
                            error={!!errors.salon_id}
                            margin="normal"
                            fullWidth
                        >
                            <InputLabel id="salon-select-label">
                                Salon
                            </InputLabel>
                            <Select
                                required
                                {...register("salon_id")}
                                onChange={(event: SelectChangeEvent<HTMLSelectElement>) => {
                                    setCredentials({...credentials, salon_id: Number(event.target.value)});
                                }}
                                labelId="salon-select-label"
                                id="salon-select"
                                label="Salon"
                            >
                                {salonStore.salons.map((salon) =>
                                    <MenuItem
                                        key={salon.id}
                                        value={salon.id}
                                    >
                                        {salon.name}
                                    </MenuItem>
                                )}
                            </Select>
                            {!!errors.salon_id && <FormHelperText error>
                                {errors.salon_id?.message}
							</FormHelperText>}
                        </FormControl>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{mt: 3, mb: 2}}
                        >
                            Edit
                        </Button>
                        <Grid item>
                            <Link to="/cars">
                                <MuiLink variant="body2">
                                    Back to the list of cars
                                </MuiLink>
                            </Link>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </CenteredContainer>
    );
};

export default AdminEditCar;