import { AppBar, Container, Toolbar, Typography } from "@mui/material";
import SideMenu from "../components/SideMenu";

// src/components/Layout.tsx
const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
      <div style={{ display: "flex" }}>
        <SideMenu />
        <div style={{ flexGrow: 1, marginLeft: 240, transition: "margin-left 0.3s ease" }}>
          <AppBar position="static" style={{ backgroundColor: "#1976d2" }}>
            <Toolbar>
              <Typography variant="h6">Document Management System</Typography>
            </Toolbar>
          </AppBar>
          <Container style={{ marginTop: "20px", padding: "20px" }}>
            {children}
          </Container>
        </div>
      </div>
    );
  };

  export default Layout