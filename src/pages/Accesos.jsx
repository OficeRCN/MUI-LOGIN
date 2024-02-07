import Sidebar from "../components/Sidebar";
import { Box } from "@mui/material"
import Typography from '@mui/material/Typography';
import { styled, useTheme } from '@mui/material/styles';
import NavBar from "../components/NavbarDashboard";
import Accesos from "../components/AccesosCRUD";

export default function Acceso(){
    return (
        <>
        <NavBar/>
        <Box height={30}/>
        <Box sx={{display: "flex"}}>
            <Sidebar/>
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
            <Box height={30}/>
                <Accesos/>
            </Box>
        </Box>

        </>
    )
}