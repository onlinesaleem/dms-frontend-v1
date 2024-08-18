import { Divider, Drawer, IconButton, Link, List, ListItem, ListItemText, ListItemButton } from "@mui/material";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import { Link as RouterLink } from "react-router-dom";

// src/components/SideMenu.tsx
const SideMenu: React.FC = () => {
    const [open, setOpen] = useState(true);
  
    const toggleDrawer = () => {
      setOpen(!open);
    };
  
    return (
      <Drawer
        variant="permanent"
        anchor="left"
        open={open}
        PaperProps={{
          style: {
            width: open ? 240 : 60,
            backgroundColor: "#333", // Dark grey background
            color: "#fff", // White text
            transition: "width 0.3s ease",
            overflowX: "hidden",
          },
        }}
      >
        <div style={{ display: "flex", justifyContent: "flex-end", padding: 8 }}>
          <IconButton onClick={toggleDrawer} style={{ color: "#fff" }}>
            {open ? <ChevronLeft /> : <ChevronRight />}
          </IconButton>
        </div>
        <Divider style={{ backgroundColor: "#555" }} />
        <List>
          <ListItemButton component={RouterLink} to="/documents">
            <ListItemText primary="Documents" style={{ display: open ? "block" : "none" }} />
          </ListItemButton>
          <ListItemButton component={RouterLink} to="/upload">
            <ListItemText primary="Upload Document" style={{ display: open ? "block" : "none" }} />
          </ListItemButton>
          <ListItemButton component={RouterLink} to="/logout">
            <ListItemText primary="Logout" style={{ display: open ? "block" : "none" }} />
          </ListItemButton>
        </List>
      </Drawer>
    );
  };
  
  export default SideMenu;
