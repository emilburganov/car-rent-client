import Login from "@/pages/Login";
import Home from "@/pages/Home";
import Profile from "@/pages/Profile.tsx";
import Register from "@/pages/Register";

export const publicRoutes = [
    {path: "/", element: <Home/>},
    {path: "/login", element: <Login/>},
    {path: "/register", element: <Register/>},
];

export const privateRoutes = [
    {path: "/profile", element: <Profile/>},
];
