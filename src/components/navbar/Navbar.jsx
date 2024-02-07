import {
  Button,
  Container,
  Drawer,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
} from "@mui/material";
import { NavListDrawer } from "./NavListDrawer";
import { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { NavLink } from "react-router-dom";
import { configNavbar } from "../../config/Config";

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <AppBar
        position="fixed"
        style={{ background: "white", color: "#161A30" }}
      >
        <Toolbar>
          <IconButton
            sx={{ display: { sx: "flex", sm: "none" } }}
            variant="contained"
            onClick={() => setOpen(true)}
          >
            <MenuIcon style={{ color: "#161A30" }} />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1 }}></Typography>

          <Box sx={{ display: { xs: "none", sm: "flex" } }}>
            {configNavbar.map((item) => (
              <Button
                startIcon={item.icon}
                component={NavLink}
                to={item.path}
                key={item.title}
                style={{ color: "#161A30" }}
              >
                {item.title}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </AppBar>

      <Drawer open={open} anchor="left" onClose={() => setOpen(false)}>
        <NavListDrawer
          setOpen={setOpen}
          configNavbar={configNavbar}
          NavLink={NavLink}
        />
      </Drawer>
    </>
  );
}
