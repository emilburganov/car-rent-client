import Header from "@/components/Header.tsx";
import UserTable from "@/components/UserTable.tsx";
import Grid from "@mui/material/Grid";

const Profile = () => {
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
                    <UserTable/>
                </Grid>
            </Grid>
        </div>
    );
};

export default Profile;
