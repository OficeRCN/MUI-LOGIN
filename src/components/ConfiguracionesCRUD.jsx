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
import AddCircleIcon from "@mui/icons-material/AddCircle";
import EditIcon from "@mui/icons-material/Edit";

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

export default function ConfiguracionesCrud() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [rows, setRows] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [openAlert, setOpenAlert] = React.useState(false);
  const [alertSeverity, setAlertSeverity] = useState("success");
  const [alertMessage, setAlertMessage] = useState("");
  const [imagenData, setImagenData] = useState(null);
  const [initialValues, setInitialValues] = useState({
    cantidadCupos: "",
    linkReuniones: "",
    id: ""
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
    setOpen(true);
    setInitialValues({
      cantidadCupos: props.cantidadCupos,
      linkReuniones: props.linkReuniones,
      id: props.id
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

  const getConfigs = async () => {
    try {
      const configs = await axios.get("http://localhost:3000/allconfigs");
      setRows(configs.data);
    } catch (error) {
      handleOpenAlert(
        "error",
        "No te preocupes, nuestro Oompa Loompa lo solucionará pronto"
      );
    }
  };

  useEffect(() => {
    getConfigs();
  }, []);

  const filterData = (v) => {
    if (v) {
      setRows([v]);
    } else {
      setRows([]);
      getCupos();
    }
  };

  const updateConfigs = async (event, values, { setSubmitting, resetForm }) => {
    event.preventDefault();
    try {
      await axios.put("http://localhost:3000/configs/", values);
      handleClose();
      getConfigs();
      handleOpenAlert("success", "La configuración ha sido actualizada");
    } catch (error) {
      console.log(error);
      handleOpenAlert(
        "error",
        "Ha ocurrido un error, nuestro Oompa Loompa ya se encuentra en el área de los hechos"
      );
    }
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <Box height={10} />
      <Stack direction="row" spacing={2} style={{ padding: "0 20px 0 20px" }}>
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={rows}
          sx={{ width: 300 }}
          onChange={(e, v) => filterData(v)}
          getOptionLabel={(rows) => rows.cantidadCupos || ""}
          renderInput={(params) => (
            <TextField {...params} size="small" label="Buscar acceso" />
          )}
        />
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1 }}
        ></Typography>
      </Stack>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell align="center" style={{ minWidth: "100px" }}>
                Cupos
              </TableCell>
              <TableCell align="center" style={{ minWidth: "100px" }}>
                Links
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
                  <TableCell align="center">{row.cantidadCupos}</TableCell>
                  <TableCell align="center">{row.linkReuniones}</TableCell>
                  <TableCell align="center">
                    <Stack spacing={2} direction="row" justifyContent="center">
                      <IconButton onClick={() => handleOpen(row)}>
                        <EditIcon />
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
                updateConfigs(event, values, { setSubmitting, resetForm });
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
                    ACTUALIZAR CONFIGURACIÓN
                  </Typography>
                  <Divider />

                  <Box sx={{ maxHeight: "25em", overflowY: "scroll" }}>
                    <input type="hidden" value={values.id} />
                    <TextField
                      margin="normal"
                      fullWidth
                      id="cantidadCupos"
                      label="Cantidad Cupos"
                      name="cantidadCupos"
                      autoComplete="cantidadCupos"
                      value={values.cantidadCupos}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <TextField
                      margin="normal"
                      fullWidth
                      id="linkReuniones"
                      label="Link Reuniones"
                      name="linkReuniones"
                      autoComplete="linkReuniones"
                      value={values.linkReuniones}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
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
                      type="submit"
                      color="success"
                      fullWidth
                      variant="contained"
                      sx={{ mt: 3, mb: 2 }}
                    >
                      Editar
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
