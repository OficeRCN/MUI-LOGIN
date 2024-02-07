import { Typography } from "@mui/material";
import { Link } from "react-router-dom";

export function Copyright(props) {

    console.log(props);

    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" to="https://rednuevaconexion.net" target="_blank">
                Red Nueva Conexión
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}
