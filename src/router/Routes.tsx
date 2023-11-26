import AdminAddCar from "@/pages/Admin/Cars/AdminAddCar.tsx";
import AdminCars from "@/pages/Admin/Cars/AdminCars.tsx";
import AdminEditCar from "@/pages/Admin/Cars/AdminEditCar.tsx";
import AdminAddRent from "@/pages/Admin/Rent/AdminAddRent.tsx";
import AdminEditRent from "@/pages/Admin/Rent/AdminEditRent.tsx";
import AdminRentals from "@/pages/Admin/Rent/AdminRentals.tsx";
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
    {path: "/rentals", element: <AdminRentals/>},
    {path: "/add-rent", element: <AdminAddRent/>},
    {path: "/edit-rent/:id", element: <AdminEditRent/>},
];