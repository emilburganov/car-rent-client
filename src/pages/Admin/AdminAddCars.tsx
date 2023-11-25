import useStores from "@/hooks/useStores.tsx";
import {FormControl, InputLabel, Link as MuiLink, Select} from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import {FC, useEffect, useState} from "react";
import {Link} from "react-router-dom";

const AdminAddCars: FC = () => {
    const [isLoading, setLoading] = useState<boolean>(false);
    const {
        carModelStore,
        carClassStore,
        salonStore
    } = useStores();
    
    useEffect(() => {
        (async () => {
            setLoading(true);
            await carModelStore.index();
            await carClassStore.index();
            await salonStore.index();
            setLoading(false);
        })();
    }, []);
    
    if (isLoading) {
        return;
    }
    
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
                    Add Cars Form
                </Typography>
                <Box
                    component="form"
                    noValidate
                    sx={{mt: 1}}
                >
                    <FormControl margin="normal" fullWidth>
                        <InputLabel id="demo-simple-select-label">
                            CarModel
                        </InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            label="CarModel"
                        >
                            {carModelStore.carModels.map((carModel) =>
                                <MenuItem value={carModel.id}>{carModel.name}</MenuItem>
                            )}
                        </Select>
                    </FormControl>
                    <TextField
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
                        margin="normal"
                        required
                        fullWidth
                        id="name"
                        label="Name"
                        name="name"
                        type="text"
                    />
                    <TextField
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
                        margin="normal"
                        required
                        fullWidth
                        id="horsepower"
                        label="Horsepower"
                        name="horsepower"
                        autoFocus
                        type="number"
                    />
                    <FormControl margin="normal" fullWidth>
                        <InputLabel id="demo-simple-select-label">
                            CarClass
                        </InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            label="CarClass"
                        >
                            {carClassStore.carClasses.map((carClass) =>
                                <MenuItem value={carClass.id}>{carClass.name}</MenuItem>
                            )}
                        </Select>
                    </FormControl>
                    <FormControl margin="normal" fullWidth>
                        <InputLabel id="demo-simple-select-label">
                            Salon
                        </InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            label="Salon"
                        >
                            {salonStore.salons.map((salon) =>
                                <MenuItem value={salon.id}>{salon.name}</MenuItem>
                            )}
                        </Select>
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
                        <Link to="/cars">
                            <MuiLink variant="body2">
                                Back to the list of cars
                            </MuiLink>
                        </Link>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
};

export default AdminAddCars;