import { ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";

export function ListItemComponent({icon, text, NavLink, pathApp, setOpen}) {
  return (
    <ListItem disablePadding>
      <ListItemButton component={NavLink} to={pathApp} onClick={()=>setOpen(false)}>
        <ListItemIcon>
          {icon}
        </ListItemIcon>
        <ListItemText primary={text}/>
      </ListItemButton>
    </ListItem>
  );
}
