import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import { useState, useEffect } from "react";
import axios from "axios";
import KeyIcon from "@mui/icons-material/Key";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import Chip from "@mui/material/Chip";
import { Select, MenuItem, FormControl, InputLabel } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

export default function Cupos() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [rows, setRows] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [openAlert, setOpenAlert] = React.useState(false);
  const [alertSeverity, setAlertSeverity] = useState("success");
  const [alertMessage, setAlertMessage] = useState("");
  const [imagenData, setImagenData] = useState(null);
  const [initialValues, setInitialValues] = useState({
    nombres: "",
    apellidos: "",
    cedula: "",
    correo: "",
    telefono: "",
    imagen: "",
    esCliente: "",
  });
  const [accesosUse, setAccesos] = useState([]);
  const [selectedIp, setSelectedIp] = useState("");

  const handleOpenAlert = (alertSeverity, alertMessage) => {
    setAlertSeverity(alertSeverity);
    setAlertMessage(alertMessage);
    setOpenAlert(true);
  };
  const handleCloseAlert = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenAlert(false);
  };

  const handleOpen = async (props) => {
    const nombreImagen = props.imagen;
    try {
      const data = await axios.get(
        `http://localhost:3000/imagen/${nombreImagen}`,
        {
          responseType: "arraybuffer",
        }
      );
      const blob = new Blob([data.data], { type: "image/png" });
      const imageUrl = URL.createObjectURL(blob);
      setImagenData(imageUrl);
    } catch (error) {
      handleOpenAlert(
        "error",
        "¡Algo ha ocurrido al intentar obtener la imagen! Vuelva a intentarlo"
      );
    }
    setOpen(true);
    setInitialValues({
      nombres: props.nombres,
      apellidos: props.apellidos,
      cedula: props.cedula,
      correo: props.correo,
      telefono: props.telefono,
      imagen: nombreImagen,
      esCliente: props.esCliente ? "Si" : "No",
    });
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const getCupos = async () => {
    try {
      const cupos = await axios.get("http://localhost:3000/allcupos");
      setRows(cupos.data);
    } catch (error) {
      handleOpenAlert(
        "error",
        "No te preocupes, nuestro Oompa Loompa lo solucionará pronto"
      );
    }
  };

  const getAccesos = async () => {
    try {
      const accesos = await axios.get("http://localhost:3000/allAccesos");
      setAccesos(accesos.data);
    } catch (error) {
      console.log(error);
    }
  };

  const filterData = (v) => {
    if (v) {
      setRows([v]);
    } else {
      setRows([]);
      getCupos();
    }
  };

  const updateCupos = async (event, values, { setSubmitting, resetForm }) => {
    event.preventDefault();
    try {
      await axios.put("http://localhost:3000/cupos/", values);
      handleClose();
      getCupos();
      handleOpenAlert("success", "El cupo ha sido aceptado");
    } catch (error) {
      {
        if (error.response.data.msg.detail.includes("Ya existe la llave")) {
          handleOpenAlert("error", "El acceso ya ha sido asignado");
        } else {
          handleOpenAlert(
            "error",
            "Ha ocurrido un error, nuestro Oompa Loompa ya se encuentra en el área de los hechos"
          );
        }
      }
    }
  };

  const deleteCupos = async (cedula, imageName, correo, nombres) => {
    try {
      await axios.delete(
        "http://localhost:3000/cupos/" +
          cedula +
          "/" +
          imageName +
          "/" +
          correo +
          "/" +
          nombres
      );
      handleClose();
      getCupos();
      handleOpenAlert("success", "El cupo rechazado ha sido eliminado");
    } catch (error) {
      handleOpenAlert(
        "error",
        "Algo ha salido mal, nuestros Oompa Loompas están trabajando para solucionarlo"
      );
    }
  };

  useEffect(() => {
    getCupos();
    getAccesos();
  }, []);

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <Typography
        gutterBottom
        variant="h5"
        component="div"
        sx={{ padding: "20px" }}
      >
        Cupos
      </Typography>
      <Divider />
      <Box height={10} />
      <Stack direction="row" spacing={2} style={{ padding: "0 20px 0 20px" }}>
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={rows}
          sx={{ width: 300 }}
          onChange={(e, v) => filterData(v)}
          getOptionLabel={(rows) => rows.cedula || ""}
          renderInput={(params) => (
            <TextField {...params} size="small" label="Buscar acceso" />
          )}
        />
      </Stack>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell align="center" style={{ minWidth: "100px" }}>
                Nombres
              </TableCell>
              <TableCell align="center" style={{ minWidth: "100px" }}>
                Apellidos
              </TableCell>
              <TableCell align="center" style={{ minWidth: "100px" }}>
                Cedula
              </TableCell>
              <TableCell align="center" style={{ minWidth: "100px" }}>
                Correo
              </TableCell>
              <TableCell align="center" style={{ minWidth: "100px" }}>
                Teléfono
              </TableCell>

              <TableCell align="center" style={{ minWidth: "100px" }}>
                Imágen
              </TableCell>

              <TableCell align="center" style={{ minWidth: "100px" }}>
                EsCliente
              </TableCell>
              <TableCell align="center" style={{ minWidth: "100px" }}>
                Cupos
              </TableCell>
              <TableCell align="center" style={{ minWidth: "100px" }}>
                Acciones
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <TableRow key={row.id} hover role="checkbox" tabIndex={-1}>
                  <TableCell align="center">{row.nombres}</TableCell>
                  <TableCell align="center">{row.apellidos}</TableCell>
                  <TableCell align="center">{row.cedula}</TableCell>
                  <TableCell align="center">{row.correo}</TableCell>
                  <TableCell align="center">{row.telefono}</TableCell>
                  <TableCell align="center">{row.imagen}</TableCell>
                  <TableCell align="center">
                    {console.log(row.esCliente)}
                    {row.esCliente === true ?(
                      <Chip
                        label="Es cliente"
                        color="success"
                        variant="outlined"
                      />
                    ) : (
                      <Chip label="No es Cliente" color="warning" />
                    )}
                  </TableCell>
                  <TableCell align="center">
                    {row.idAccesos != null ? (
                      <Chip
                        label="Asignado"
                        color="success"
                        variant="outlined"
                      />
                    ) : (
                      <Chip label="Sin asignar" color="error" />
                    )}
                  </TableCell>
                  <TableCell align="center">
                    <Stack spacing={2} direction="row" justifyContent="center">
                      <IconButton onClick={() => handleOpen(row)}>
                        <KeyIcon />
                      </IconButton>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      {/* Modal de añadir */}
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Formik
              initialValues={initialValues}
              onSubmit={(values, { setSubmitting, resetForm }) => {
                updateCupos(event, values, { setSubmitting, resetForm });
              }}
            >
              {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                setFieldValue,
              }) => (
                <Box
                  component="form"
                  onSubmit={(event) => handleSubmit(event, values)}
                  sx={{ mt: 1 }}
                >
                  <Typography variant="h5" align="center">
                    VALIDAR CUPO
                  </Typography>
                  <Divider />

                  <Box sx={{ maxHeight: "25em", overflowY: "scroll" }}>
                    <TextField
                      margin="normal"
                      disabled
                      fullWidth
                      id="nombres"
                      label="Nombres"
                      name="nombres"
                      autoComplete="nombres"
                      value={values.nombres}
                    />
                    <TextField
                      margin="normal"
                      disabled
                      fullWidth
                      id="apellidos"
                      label="Apellidos"
                      name="apellidos"
                      autoComplete="apellidos"
                      value={values.apellidos}
                    />
                    <TextField
                      margin="normal"
                      disabled
                      fullWidth
                      id="cedula"
                      label="Cedula"
                      name="cedula"
                      autoComplete="cedula"
                      value={values.cedula}
                    />
                    <TextField
                      margin="normal"
                      disabled
                      fullWidth
                      id="correo"
                      label="Correo"
                      name="correo"
                      autoComplete="correo"
                      value={values.correo}
                    />
                    <TextField
                      margin="normal"
                      disabled
                      fullWidth
                      id="telefono"
                      label="Telefono"
                      name="telefono"
                      autoComplete="telefono"
                      value={values.telefono}
                    />
                    {imagenData && (
                      <img
                        src={imagenData}
                        alt="No te preocupes, nuestro Oompa Loompa lo solucionará pronto"
                      />
                    )}
                    <TextField
                      margin="normal"
                      disabled
                      fullWidth
                      id="esCliente"
                      label="EsCliente"
                      name="esCliente"
                      autoComplete="esCliente"
                      value={values.esCliente}
                    />
                    <Box sx={{ height: "10px" }} />
                    <Typography variant="body2" color="#616161">
                      Seleccione un acceso para este cupo.
                    </Typography>
                    <Box sx={{ height: "10px" }} />
                    <FormControl fullWidth>
                      <InputLabel id="ip-label">Accesos</InputLabel>
                      <Field
                        as={Select}
                        labelId="ip-label"
                        label="Accesos"
                        name="ip"
                        onChange={(e) => {
                          const newValue = e.target.value;
                          // Update the value of the select field
                          setSelectedIp(newValue);
                          // Update the value of the 'id' field
                          setFieldValue(
                            "idAccesos",
                            accesosUse.find((acceso) => acceso.id === newValue)
                              .id
                          );
                        }}
                        value={selectedIp}
                      >
                        {accesosUse.map((acceso) => (
                          <MenuItem key={acceso.id} value={acceso.id}>
                            {acceso.ip}
                          </MenuItem>
                        ))}
                      </Field>
                    </FormControl>
                  </Box>
                  <Box sx={{ height: "30px" }} />
                  <Stack spacing={2} direction="row" justifyContent="center">
                    <Button
                      fullWidth
                      variant="contained"
                      color="primary"
                      sx={{ mt: 3, mb: 2 }}
                      onClick={() => handleClose()}
                    >
                      Cancelar
                    </Button>
                    <Button
                      color="error"
                      fullWidth
                      variant="contained"
                      sx={{ mt: 3, mb: 2 }}
                      onClick={() =>
                        deleteCupos(
                          values.cedula,
                          values.imagen,
                          values.correo,
                          values.nombres
                        )
                      }
                    >
                      Rechazar
                    </Button>
                    <Button
                      type="submit"
                      color="success"
                      fullWidth
                      variant="contained"
                      sx={{ mt: 3, mb: 2 }}
                    >
                      Confirmar
                    </Button>
                  </Stack>
                </Box>
              )}
            </Formik>
          </Box>
        </Fade>
      </Modal>
      
      {/* Mensajes de las consultas */}
      <Snackbar
        open={openAlert}
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
    </Paper>
  );
}
