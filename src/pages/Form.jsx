import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import AssignmentIcon from "@mui/icons-material/Assignment";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { styled } from "@mui/material/styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import axios from "axios";
import { useState, useEffect } from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import { Navbar } from "../components/navbar/Navbar";

import { countState } from "../store/count";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://www.rednuevaconexion.net/">
        Red Nueva Conexión
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const defaultTheme = createTheme();

export function Form() {
  const [open, setOpen] = React.useState(false);
  const [alertSeverity, setAlertSeverity] = useState("success");
  const [alertMessage, setAlertMessage] = useState("");
  const [touchedFields, setTouchedFields] = useState({});
  const [count, setCount] = useState(0);

  const values = countState((state) => ({
    counter: state.count,
  }));

  const { getCupos, decrement } = countState();

  useEffect(() => {
    getCupos();
  }, []);

  const handleSetCount = (countTotal) => {
    setCount(countTotal);
  };

  const [formData, setFormData] = useState({
    nombres: "",
    apellidos: "",
    cedula: "",
    correo: "",
    telefono: "",
    imagen: "",
    esCliente: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === "telefono" && !/^\d{0,10}$/.test(value)) {
      return;
    }

    if (name === "cedula" && !/^\d{0,10}$/.test(value)) {
      return;
    }

    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setFormData({
      ...formData,
      imagen: file,
    });
  };

  const handleEsClienteChange = (event) => {
    setFormData({
      ...formData,
      esCliente: event.target.value,
    });
  };

  const handleOpenAlert = (alertSeverity, alertMessage) => {
    setAlertSeverity(alertSeverity);
    setAlertMessage(alertMessage);
    setOpen(true);
  };

  const handleCloseAlert = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const handleFieldTouch = (fieldName) => {
    setTouchedFields({
      ...touchedFields,
      [fieldName]: true,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const data = await axios.post("http://localhost:3000/cupos", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      handleOpenAlert(
        "success",
        "¡Se ha agregado exitosamente!. Revise su correo con el mensaje de confirmación."
      );

      setFormData({
        nombres: "",
        apellidos: "",
        cedula: "",
        correo: "",
        telefono: "",
        imagen: "",
        esCliente: "",
      });
    } catch (error) {
      handleOpenAlert(
        "error",
        error.response.data.msg
          ? error.response.data.msg
          : "Hubo un error en la solicitud."
      );
    }
  };

  const areAllFieldsFilled = () => {
    return Object.values(formData).every((value) => value !== "");
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
          <Stack direction="row" spacing={1}>
            <Chip label="Cupos disponibles: " variant="outlined" />
            <Chip id="disponibles" name="disponibles" label={values.counter} />
          </Stack>

          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  autoComplete="given-name"
                  name="nombres"
                  value={formData.nombres}
                  onChange={handleChange}
                  fullWidth
                  id="nombres"
                  label="Nombre"
                  onBlur={() => handleFieldTouch("nombres")}
                  error={touchedFields.nombres && formData.nombres === ""}
                />
                {touchedFields.nombres && formData.nombres === ""
                  ? "Este campo es obligatorio"
                  : " "}
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="apellidos"
                  label="Apellidos"
                  name="apellidos"
                  value={formData.apellidos}
                  onChange={handleChange}
                  autoComplete="family-name"
                  onBlur={() => handleFieldTouch("apellidos")}
                  error={touchedFields.apellidos && formData.apellidos === ""}
                />
                {touchedFields.apellidos && formData.apellidos === ""
                  ? "Este campo es obligatorio"
                  : " "}
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="cedula"
                  label="Cédula"
                  name="cedula"
                  value={formData.cedula}
                  onChange={handleChange}
                  onBlur={() => handleFieldTouch("cedula")}
                  error={touchedFields.cedula && formData.cedula === ""}
                />
                {touchedFields.cedula && formData.cedula === ""
                  ? "Este campo es obligatorio"
                  : " "}
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="correo"
                  label="Correo"
                  name="correo"
                  value={formData.correo}
                  onChange={handleChange}
                  autoComplete="email"
                  onBlur={() => handleFieldTouch("correo")}
                  error={touchedFields.correo && formData.correo === ""}
                  helperText={
                    touchedFields.correo && formData.correo === ""
                      ? "Este campo es obligatorio"
                      : " "
                  }
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="telefono"
                  value={formData.telefono}
                  onChange={handleChange}
                  label="Telefono"
                  id="telefono"
                  onBlur={() => handleFieldTouch("telefono")}
                  error={touchedFields.telefono && formData.telefono === ""}
                  helperText={
                    touchedFields.telefono && formData.telefono === ""
                      ? "Este campo es obligatorio"
                      : " "
                  }
                />
              </Grid>

              <Grid item xs={12}>
                <Button
                  component="label"
                  onChange={handleFileChange}
                  variant="contained"
                  startIcon={<CloudUploadIcon />}
                  fullWidth
                >
                  Seleccionar factura
                  <VisuallyHiddenInput type="file" />
                </Button>
              </Grid>

              <Grid item xs={12}>
                <InputLabel id="label">Cliente Mensualizado</InputLabel>
                <Select
                  labelId="esCliente"
                  id="esCliente"
                  value={formData.esCliente}
                  label="esCliente"
                  onChange={handleEsClienteChange}
                  fullWidth
                  onBlur={() => handleFieldTouch("esCliente")}
                  error={touchedFields.esCliente && formData.esCliente === ""}
                >
                  <MenuItem value={1}>Sí</MenuItem>
                  <MenuItem value={0}>No</MenuItem>
                </Select>
                {touchedFields.esCliente && formData.esCliente === ""
                  ? "Este campo es obligatorio"
                  : " "}
              </Grid>

            </Grid>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={!areAllFieldsFilled() || values.counter === 0}
              onClick={() => {
                decrement();
              }}
            >
              Enviar
            </Button>
          </Box>
        </Box>

        <Snackbar
          open={open}
          autoHideDuration={6000}
          onClose={handleCloseAlert}
        >
          <Alert
            elevation={6}
            variant="filled"
            onClose={handleCloseAlert}
            severity={alertSeverity}
          >
            {alertMessage}
          </Alert>
        </Snackbar>

        <Copyright sx={{ mt: 5 }} />
      </Container>
      <Box sx={{ height: "30px" }} />
    </ThemeProvider>
  );
}
