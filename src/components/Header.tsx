import useStores from "@/hooks/useStores.tsx";
import {Roles} from "@/router/AppRouter";
import MenuIcon from "@mui/icons-material/Menu";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import * as React from "react";
import {FC, useState} from "react";
import {useNavigate} from "react-router-dom";

const publicPages = [
    {label: "Profile", path: "/profile"},
];

const adminPages = [
    {label: "Cars", path: "/cars"},
];

const Header: FC = () => {
    const {authStore} = useStores();
    const navigate = useNavigate();
    
    const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };
    
    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };
    
    const handleLogout = async () => {
        await authStore.logout();
        navigate("/login");
    };
    
    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Typography
                        variant="h6"
                        noWrap
                        sx={{
                            mr: 2,
                            display: {xs: "none", md: "flex"},
                            fontFamily: "monospace",
                            fontWeight: 700,
                            letterSpacing: ".3rem",
                            color: "inherit",
                            textDecoration: "none",
                        }}
                    >
                        CarRent
                    </Typography>
                    
                    <Box sx={{flexGrow: 1, display: {xs: "flex", md: "none"}}}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon/>
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: "bottom",
                                horizontal: "left",
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "left",
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: {xs: "block", md: "none"},
                            }}
                        >
                            {publicPages.map((page, index) => (
                                <MenuItem key={index} onClick={handleCloseNavMenu}>
                                    <Typography onClick={() => navigate(page.path)} textAlign="center">
                                        {page.label}
                                    </Typography>
                                </MenuItem>
                            ))}
                            {authStore.user.role === Roles.ADMIN && adminPages.map((page, index) => (
                                <MenuItem key={index} onClick={handleCloseNavMenu}>
                                    <Typography onClick={() => navigate(page.path)} textAlign="center">
                                        {page.label}
                                    </Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                    <Typography
                        variant="h5"
                        noWrap
                        sx={{
                            mr: 2,
                            display: {xs: "flex", md: "none"},
                            flexGrow: 1,
                            fontFamily: "monospace",
                            fontWeight: 700,
                            letterSpacing: ".3rem",
                            color: "inherit",
                            textDecoration: "none",
                        }}
                    >
                        CarRent
                    </Typography>
                    <Box sx={{flexGrow: 1, display: {xs: "none", md: "flex"}}}>
                        {publicPages.map((page, index) => (
                            <Button
                                key={index}
                                onClick={handleCloseNavMenu}
                                sx={{my: 2, color: "white", display: "block"}}
                            >
                                <Typography onClick={() => navigate(page.path)} textAlign="center">
                                    {page.label}
                                </Typography>
                            </Button>
                        ))}
                        {authStore.user.role === Roles.ADMIN && adminPages.map((page, index) => (
                            <Button
                                key={index}
                                onClick={handleCloseNavMenu}
                                sx={{my: 2, color: "white", display: "block"}}
                            >
                                <Typography onClick={() => navigate(page.path)} textAlign="center">
                                    {page.label}
                                </Typography>
                            </Button>
                        ))}
                    </Box>
                    <Button
                        variant="outlined"
                        onClick={handleLogout}
                    >
                        Logout
                    </Button>
                </Toolbar>
            </Container>
        </AppBar>
    );
};
export default Header;
