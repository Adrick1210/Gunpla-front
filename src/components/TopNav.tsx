import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
// import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Drawer from "./Drawer";
import { useState } from "react";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Badge } from "@mui/material";

export default function ButtonAppBar() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={() => setDrawerOpen(!drawerOpen)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <div className="header">
              <p>Gunpla</p>{" "}
              <img
                className="header-icon"
                src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/eaf6dddd-3f9e-4524-86b3-013c7cd3ce3e/dglz9jz-761ba957-c385-4adb-a4c4-119ea2f2c8ba.png/v1/fit/w_414,h_311/gundam_wing_no_outline_by_tahoeanime_dglz9jz-414w.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9NzY5IiwicGF0aCI6IlwvZlwvZWFmNmRkZGQtM2Y5ZS00NTI0LTg2YjMtMDEzYzdjZDNjZTNlXC9kZ2x6OWp6LTc2MWJhOTU3LWMzODUtNGFkYi1hNGM0LTExOWVhMmYyYzhiYS5wbmciLCJ3aWR0aCI6Ijw9MTAyNCJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl19.xfbhm4yN8hwtIklD41OAcuYTuEt_RiHGY-B6QXmwc-E"
                alt="header-icon"
              />{" "}
              <p>Galaxy</p>
            </div>
          </Typography>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <Badge badgeContent={4} color="secondary">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer open={drawerOpen} setDrawerOpen={setDrawerOpen} />
    </Box>
  );
}
