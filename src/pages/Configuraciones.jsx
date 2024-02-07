import Sidebar from "../components/Sidebar";
import { Box } from "@mui/material";
import NavBar from "../components/NavbarDashboard";
import ConfiguracionesCrud from "../components/ConfiguracionesCRUD";

export default function Configs() {
  return (
    <>
      <NavBar />
      <Box height={30} />
      <Box sx={{ display: "flex" }}>
        <Sidebar />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Box height={30} />
          <ConfiguracionesCrud />
        </Box>
      </Box>
    </>
  );
}
