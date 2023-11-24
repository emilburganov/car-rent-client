import AdminCars from "@/pages/Admin/AdminCars.tsx";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Profile from "@/pages/Profile";
import Register from "@/pages/Register";

export const publicRoutes = [
    {path: "/", element: <Home/>},
    {path: "/login", element: <Login/>},
    {path: "/register", element: <Register/>},
];

export const clientRoutes = [
    {path: "/profile", element: <Profile/>},
];

export const adminRoutes = [
    {path: "/profile", element: <Profile/>},
    {path: "/cars", element: <AdminCars/>},
];