import Login from "@/pages/Login";
import Home from "@/pages/Home";
import Private from "@/pages/Private";
import Register from "@/pages/Register";

export const publicRoutes = [
    {path: "/", element: <Home/>},
    {path: "/login", element: <Login/>},
    {path: "/register", element: <Register/>},
];

export const privateRoutes = [
    {path: "/private", element: <Private/>},
];
