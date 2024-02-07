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
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { Formik, Form, Field, ErrorMessage } from "formik";
import CloseIcon from "@mui/icons-material/Close";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

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

export default function Accesos() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [rows, setRows] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [openAlert, setOpenAlert] = React.useState(false);
  const [openEdit, setOpenEdit] = React.useState(false);
  const [openDelete, setOpenDelete] = React.useState(false);
  const [selectedDeleteId, setSelectedDeleteId] = useState(null);
  const [selectedEditId, setSelectedEditId] = useState(null);
  const [alertSeverity, setAlertSeverity] = useState("success");
  const [alertMessage, setAlertMessage] = useState("");
  const [initialValues, setInitialValues] = useState({
    ip: "",
    usuario: "",
    contrasenia: "",
  });

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

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleOpenEdit = (props) => {
    setInitialValues({
      ip: props.ip,
      usuario: props.usuario,
      contrasenia: props.contrasenia,
    });
    setOpenEdit(true);
  };
  const handleCloseEdit = () => {
    setOpenEdit(false);
  };

  const handleOpenDelete = (id) => {
    setOpenDelete(true);
    setSelectedDeleteId(id);
  };
  const handleCloseDelete = () => {
    setOpenDelete(false);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const getAccesos = async () => {
    try {
      const accesos = await axios.get("http://localhost:3000/allAccesos");
      setRows(accesos.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAccesos();
  }, []);

  const filterData = (v) => {
    if (v) {
      setRows([v]);
    } else {
      setRows([]);
      getAccesos();
    }
  };

  const addAccess = async (event, values, { setSubmitting, resetForm }) => {
    event.preventDefault();
    try {
      await axios.post("http://localhost:3000/accesos/", values);
      handleOpenAlert("success", "¡Se ha añadido exitosamente el acceso!");
      handleClose();
      getAccesos();
    } catch (error) {
      handleOpenAlert("error", "¡Algo ha ocurrido! Vuelva a intentarlo");
    } finally {
      setSubmitting(false);
    }
  };

  const editarAcceso = async (event, values, { setSubmitting, resetForm }) => {
    event.preventDefault();
    try {
      await axios.put("http://localhost:3000/accesos/", values);
      handleOpenAlert("success", "¡Se ha editado exitosamente el acceso!");
      handleCloseEdit();
      getAccesos();
    } catch (error) {
      handleOpenAlert("error", "¡Algo ha ocurrido! Vuelva a intentarlo");
    } finally {
      setSubmitting(false);
    }
  };

  const eliminarAcceso = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/accesos/${id}`);
      handleOpenAlert("success", "¡Se ha eliminado exitosamente el acceso!");
      handleCloseDelete();
      getAccesos();
    } catch (error) {
      handleOpenAlert("error", "¡Algo ha ocurrido! Vuelva a intentarlo");
    }
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <Typography
        gutterBottom
        variant="h5"
        component="div"
        sx={{ padding: "20px" }}
      >
        Accesos
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
          getOptionLabel={(rows) => rows.ip || ""}
          renderInput={(params) => (
            <TextField {...params} size="small" label="Buscar acceso" />
          )}
        />
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1 }}
        ></Typography>
        <Button
          variant="contained"
          endIcon={<AddCircleIcon />}
          onClick={handleOpen}
        >
          Añadir
        </Button>
      </Stack>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell align="center" style={{ minWidth: "100px" }}>
                Ip
              </TableCell>
              <TableCell align="center" style={{ minWidth: "100px" }}>
                Usuario
              </TableCell>
              <TableCell align="center" style={{ minWidth: "100px" }}>
                Contraseña
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
                  <TableCell align="center">{row.ip}</TableCell>
                  <TableCell align="center">{row.usuario}</TableCell>
                  <TableCell align="center">{row.contrasenia}</TableCell>
                  <TableCell align="center">
                    <Stack spacing={2} direction="row" justifyContent="center">
                      <IconButton onClick={() => handleOpenEdit(row)}>
                        <EditIcon />
                      </IconButton>
                      <IconButton onClick={() => handleOpenDelete(row.id)}>
                        <DeleteOutlineIcon />
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
              initialValues={{
                ip: "",
                usuario: "",
                contrasenia: "",
              }}
              validate={(values) => {
                const errors = {};
                if (!values.ip) {
                  errors.ip = (
                    <Typography variant="body2" color="red">
                      *Este campo es requerido*
                    </Typography>
                  );
                } else {
                  const ipRegex = /^([0-9]{1,3}\.){3}[0-9]{1,3}$/;
                  if (!ipRegex.test(values.ip)) {
                    errors.ip = (
                      <Typography variant="body2" color="red">
                        *Formato de IP incorrecto*
                      </Typography>
                    );
                  }
                }
                if (!values.usuario) {
                  errors.usuario = (
                    <Typography variant="body2" color="red">
                      *Este campo es requerido*
                    </Typography>
                  );
                } else if (values.usuario.length < 5) {
                  errors.usuario = (
                    <Typography variant="body2" color="red">
                      *El usuario debe contener más de cinco caracteres*
                    </Typography>
                  );
                }

                if (!values.contrasenia) {
                  errors.contrasenia = (
                    <Typography variant="body2" color="red">
                      *Este campo es requerido*
                    </Typography>
                  );
                } else if (values.contrasenia.length < 5) {
                  errors.contrasenia = (
                    <Typography variant="body2" color="red">
                      *La contraseña debe tener más de cinco caracteres*
                    </Typography>
                  );
                }
                return errors;
              }}
              onSubmit={(values, { setSubmitting, resetForm }) => {
                addAccess(event, values, { setSubmitting, resetForm });
              }}
            >
              {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting,
              }) => (
                <Box
                  component="form"
                  onSubmit={(event) => handleSubmit(event, values)}
                  sx={{ mt: 1 }}
                >
                  <Typography variant="h5" align="center">
                    AÑADIR ACCESO
                  </Typography>
                  <Divider />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="ip"
                    label="Ip"
                    name="ip"
                    autoComplete="ip"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.ip}
                  />
                  {errors.ip && touched.ip && <div>{errors.ip}</div>}
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="usuario"
                    label="Usuario"
                    name="usuario"
                    autoComplete="usuario"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.usuario}
                  />
                  {errors.usuario && touched.usuario && (
                    <div>{errors.usuario}</div>
                  )}
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="contrasenia"
                    label="Contraseña"
                    type="password"
                    id="contrasenia"
                    autoComplete="contrasenia"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.contrasenia}
                  />
                  {errors.contrasenia && touched.contrasenia && (
                    <div>{errors.contrasenia}</div>
                  )}
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Guardar
                  </Button>
                </Box>
              )}
            </Formik>
          </Box>
        </Fade>
      </Modal>

      {/* Modal de editar */}
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={openEdit}
        onClose={handleCloseEdit}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={openEdit}>
          <Box sx={style}>
            <Formik
              initialValues={initialValues}
              validate={(values) => {
                const errors = {};
                if (!values.ip) {
                  errors.ip = (
                    <Typography variant="body2" color="red">
                      *Este campo es requerido*
                    </Typography>
                  );
                } else {
                  const ipRegex = /^([0-9]{1,3}\.){3}[0-9]{1,3}$/;
                  if (!ipRegex.test(values.ip)) {
                    errors.ip = (
                      <Typography variant="body2" color="red">
                        *Formato de IP incorrecto*
                      </Typography>
                    );
                  }
                }
                if (!values.usuario) {
                  errors.usuario = (
                    <Typography variant="body2" color="red">
                      *Este campo es requerido*
                    </Typography>
                  );
                } else if (values.usuario.length < 5) {
                  errors.usuario = (
                    <Typography variant="body2" color="red">
                      *El usuario debe contener más de cinco caracteres*
                    </Typography>
                  );
                }

                if (!values.contrasenia) {
                  errors.contrasenia = (
                    <Typography variant="body2" color="red">
                      *Este campo es requerido*
                    </Typography>
                  );
                } else if (values.contrasenia.length < 5) {
                  errors.contrasenia = (
                    <Typography variant="body2" color="red">
                      *La contraseña debe tener más de cinco caracteres*
                    </Typography>
                  );
                }
                return errors;
              }}
              onSubmit={(values, { setSubmitting, resetForm }) => {
                editarAcceso(event, values, { setSubmitting, resetForm });
              }}
            >
              {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting,
              }) => (
                <Box
                  component="form"
                  onSubmit={(event) => handleSubmit(event, values)}
                  sx={{ mt: 1 }}
                >
                  <Typography variant="h5" align="center">
                    EDITAR ACCESO
                  </Typography>
                  <Divider />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="ip"
                    label="Ip"
                    name="ip"
                    autoComplete="ip"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.ip}
                  />
                  {errors.ip && touched.ip && <div>{errors.ip}</div>}
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="usuario"
                    label="Usuario"
                    name="usuario"
                    autoComplete="usuario"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.usuario}
                  />
                  {errors.usuario && touched.usuario && (
                    <div>{errors.usuario}</div>
                  )}
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="contrasenia"
                    label="Contraseña"
                    type="password"
                    id="contrasenia"
                    autoComplete="contrasenia"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.contrasenia}
                  />
                  {errors.contrasenia && touched.contrasenia && (
                    <div>{errors.contrasenia}</div>
                  )}
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Editar
                  </Button>
                </Box>
              )}
            </Formik>
          </Box>
        </Fade>
      </Modal>

      {/* Modal de eliminar */}
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={openDelete}
        onClose={handleCloseDelete}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={openDelete}>
          <Box sx={style}>
            <Box sx={{ height: "30px" }} />
            <Typography variant="h6" align="center">
              ¿Está seguro que desea eliminar este usuario?
            </Typography>
            <Box sx={{ height: "30px" }} />
            <Divider />
            <Box sx={{ height: "30px" }} />
            <Stack spacing={2} direction="row" justifyContent="center">
              <Button
                variant="contained"
                color="error"
                startIcon={<CloseIcon />}
                onClick={handleCloseDelete}
              >
                Cancelar
              </Button>
              <Button
                variant="contained"
                color="success"
                startIcon={<EditIcon />}
                onClick={() => eliminarAcceso(selectedDeleteId)}
              >
                Eliminar
              </Button>
            </Stack>
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
