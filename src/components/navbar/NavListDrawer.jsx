import {
    Box,
    List,
    ListItem,
    ListItemText,
    ListItemIcon,
    Divider,
    ListItemButton
} from "@mui/material";

import { ListItemComponent } from "../ItemNavbar";

export function NavListDrawer({configNavbar, NavLink, setOpen}) {
    return (
        <Box sx={{ height:"100%", width: "250px", bgcolor: "white", color: "#161A30" }}>
            <nav>
                <List>
                    {
                        configNavbar.map(item =>(
                            <ListItemComponent NavLink={NavLink} text={item.title} icon={item.icon} pathApp={item.path} setOpen={setOpen} />
                        ))
                    }
    
                </List>
            </nav>
        </Box>
    );
}