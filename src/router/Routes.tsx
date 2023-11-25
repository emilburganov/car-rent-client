import AdminAddCar from "@/pages/Admin/AdminAddCar.tsx";
import AdminCars from "@/pages/Admin/AdminCars.tsx";
import AdminEditCar from "@/pages/Admin/AdminEditCar.tsx";
import Login from "@/pages/Auth/Login.tsx";
import Register from "@/pages/Auth/Register.tsx";
import Home from "@/pages/Сommon/Home.tsx";
import Profile from "@/pages/Сommon/Profile.tsx";

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
    {path: "/add-car", element: <AdminAddCar/>},
    {path: "/edit-car/:id", element: <AdminEditCar/>},
];