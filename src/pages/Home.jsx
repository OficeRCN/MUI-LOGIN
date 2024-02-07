import Sidebar from "../components/Sidebar";
import { Box } from "@mui/material";
import NavBar from "../components/NavbarDashboard";
import Grid from "@mui/material/Unstable_Grid2";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Stack from "@mui/material/Stack";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import DoDisturbIcon from "@mui/icons-material/DoDisturb";
import AddTaskIcon from "@mui/icons-material/AddTask";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { AccordionDash } from "../components/AccordionDash";
import { BarChart } from "../components/charts/BarChart";
import CountUp from "react-countup";
import Typography from "@mui/material/Typography";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Home() {
  
  const [accesosUse, setAccesos] = useState([]);
  const [usuarioUse, setUsuario] = useState([]);
  const [cuposUse, setCupo] = useState([]);
  
  const getAccesos = async () => {
    try {
      const accesos = await axios.get("http://localhost:3000/countAccesos");
      setAccesos(accesos.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getUsuarios = async () => {
    try {
      const data = await axios.get("http://localhost:3000/usercount");
      setUsuario( data.data.count);

    } catch (error) {
      console.log(error);
    }
  };

  const getCupos = async () => {
    try {
      const data = await axios.get("http://localhost:3000/countcupos");
      setCupo( data.data);

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAccesos();
    getUsuarios(); 
    getCupos(); 
  }, []);


  return (
    <>
      <NavBar />
      <Box height={30} />
      <Box sx={{ display: "flex" }}>
        <Sidebar />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Box height={30} />
          
          <Grid container spacing={2}>
            <Grid  xs={12} sm={8} md={8} lg={8}>
              <Stack spacing={6} direction="row">
                <Card sx={{ maxWidth: 60 + "%", height: 140 }}>
                  <CardContent>
                    <AddTaskIcon />
                    <Typography gutterBottom variant="h5" component="div">
                      Total Accesos creados
                    </Typography>
                    <Typography variant="body2" sx={{ color: "#ccd1d1" }}>
                      <CountUp end={accesosUse} duration={5} />
                    </Typography>
                  </CardContent>
                </Card>
                <Card sx={{ maxWidth: 60 + "%", height: 140 }}>
                  <CardContent>
                    <AccountCircleIcon />
                    <Typography gutterBottom variant="h5" component="div">
                      Total Usuarios Actuales
                    </Typography>
                    <Typography variant="body2" sx={{ color: "#ccd1d1" }}>
                      <CountUp end={usuarioUse} duration={5} />
                    </Typography>
                  </CardContent>
                </Card>
              </Stack>
            </Grid>
            <Grid  xs={12} sm={4} md={4}  lg={4}>
              <Stack spacing={2}>
                <Card sx={{ maxWidth: 345 }}>
                  <CardContent>
                    <Stack spacing={2} direction="row">
                      <CheckCircleOutlineIcon />
                      <div className="paddingAll">
                        <span>Total de cupos creados:</span>
                      </div>
                      <CountUp end={cuposUse} duration={5} />
                    </Stack>
                  </CardContent>
                </Card>
                {/* <Card sx={{ maxWidth: 345 }}>
                  <CardContent>
                    <Stack spacing={2} direction="row">
                      <DoDisturbIcon />
                      <div className="paddinga">
                        <span>Total de cupos rechazados:</span>
                      </div>
                      <CountUp end={10} duration={5} />
                    </Stack>
                  </CardContent>
                </Card> */}
              </Stack>
            </Grid>
          </Grid>

          {/* <Grid container spacing={2}>
            <Grid xs={8}>
              <Card sx={{ height: 60 + "vh" }}>
                <CardContent>
                  <BarChart />
                </CardContent>
              </Card>
            </Grid>
            <Grid xs={4}>
              <Card sx={{ height: 60 + "vh" }}>
                <CardContent>
                  <AccordionDash />
                </CardContent>
              </Card>
            </Grid>
          </Grid> */}

        </Box>
      </Box>
    </>
  );
}
