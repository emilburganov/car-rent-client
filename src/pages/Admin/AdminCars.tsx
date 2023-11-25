import AdminCarsTable from "@/components/Admin/AdminCarsTable.tsx";
import Header from "@/components/Header.tsx";
import Grid from "@mui/material/Grid";

const AdminCars = () => {
    return (
        <div>
            <Header/>
            <Grid
                container
                spacing={0}
                alignItems="center"
                justifyContent="center"
                sx={{minHeight: "100vh"}}
            >
                <Grid
                    display="flex"
                    flexDirection="column"
                    gap={2}
                >
                    <AdminCarsTable/>
                </Grid>
            </Grid>
        </div>
    );
};

export default AdminCars;