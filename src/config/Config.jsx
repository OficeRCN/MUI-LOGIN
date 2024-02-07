import React from "react";
// import to the sidebar in the dashboard
import { HomeOutlined } from "@mui/icons-material";
import SettingsIcon from "@mui/icons-material/Settings";
import ViewListIcon from "@mui/icons-material/ViewList";

// Imports to the navbar
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import LoginIcon from "@mui/icons-material/Login";

// imports to the routes
import LogIn from "../pages/LogIn";
import { Form } from "../pages/Form";
import { PageNotFound } from "../pages/PageNotFound";
// import Dashboard from '../components/Dashboard';
import Acceso from "../pages/Accesos";
import Cupo from "../pages/Cupos";
import Home from "../pages/Home";
import Configs from "../pages/Configuraciones";

export const configNavbar = [
  {
    title: "Formulario de registo",
    path: "/",
    icon: <AppRegistrationIcon />,
  },
  {
    title: "Log in",
    path: "/login",
    icon: <LoginIcon />,
  },
];

export const drawerLinks = [
  {
    title: "Home",
    path: "/home",
    element: <Home />,
    icon: <HomeOutlined />,
  },
  {
    title: "Cupos",
    path: "/cupos",
    element: <Cupo />,
    icon: <ViewListIcon />,
  },
  {
    title: "Accesos",
    path: "/accesos",
    element: <Acceso />,
    icon: <ViewListIcon />,
  },
  {
    title: "Configuraciones",
    path: "/configs",
    element: <Configs />,
    icon: <SettingsIcon />,
  },
];

export const publicRoutes = [
  {
    path: "/",
    element: <Form />,
  },
  {
    path: "/login",
    element: <LogIn />,
  },
  {
    path: "*",
    element: <PageNotFound />,
  },
];

export const privateRoutes = [
  {
    path: "/accesos",
    element: <Acceso />,
  },
  {
    path: "/cupos",
    element: <Cupo />,
  },
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/configs",
    element: <Configs />,
  },
  {
    path: "*",
    element: <PageNotFound />,
  },
];
