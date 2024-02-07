import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { loginRequest } from "../api/Auth";
import { userRequest } from "../api/Auth";
import { useAuthStore } from "../store/auth";
import { useNavigate } from "react-router-dom";
import { Navbar } from "../components/navbar/Navbar";
import { useState } from "react";
import Snackbar, { SnackbarOrigin } from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

const defaultTheme = createTheme();

interface State extends SnackbarOrigin {
  open: boolean;
  message: string;
}

export default function LogIn() {
  const setToken = useAuthStore((state) => state.setToken);
  const setUsers = useAuthStore((state) => state.setUsers);
  const navigate = useNavigate();

  const [state, setState] = React.useState<State>({
    open: false,
    vertical: "bottom",
    horizontal: "left",
    message: "",
  });
  const { vertical, horizontal, open, message } = state;

  const handleClose = () => {
    setState({ ...state, open: false });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const usuario = (
        event.currentTarget.elements.namedItem("usuario") as HTMLInputElement
      ).value;
      const contrasenia = (
        event.currentTarget.elements.namedItem(
          "contrasenia"
        ) as HTMLInputElement
      ).value;

      const restLogin = await loginRequest(usuario, contrasenia);
      setToken(restLogin.data.token);

      const resUser = await userRequest();
      setUsers(resUser.data.user);

      navigate("/home");
    } catch (error: any) {
      console.log(error);
      setState({
        ...state,
        open: true,
        message: `Error: ${error.response.data.msg}`,
      });
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Navbar />
      <Box sx={{ height: "30px" }} />
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="usuario"
              label="Usuario"
              name="usuario"
              autoComplete="usuario"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="contrasenia"
              label="Contraseña"
              type="password"
              id="contrasenia"
              autoComplete="contrasenia"
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Iniciar sesión
            </Button>
          </Box>
        </Box>
      </Container>

      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        onClose={handleClose}
        key={vertical + horizontal}
      >
        <Alert
          onClose={handleClose}
          severity="error"
          variant="filled"
          sx={{ width: "100%" }}
        >
          {message}
        </Alert>
      </Snackbar>
    </ThemeProvider>
  );
}
