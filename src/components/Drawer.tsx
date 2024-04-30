import * as React from "react";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import BuildIcon from "@mui/icons-material/Build";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeIcon from "@mui/icons-material/Home";
import { useNavigate } from "react-router-dom";

type Props = {
  open: boolean;
  setDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function TemporaryDrawer({ open, setDrawerOpen }: Props) {
  const navigate = useNavigate();

  const toggleDrawer = (newOpen: boolean) => () => {
    setDrawerOpen(newOpen);
  };

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        {[{ label: "Home", path: "/" }].map((link) => (
          <ListItem key={link.label} disablePadding>
            <ListItemButton onClick={() => navigate(link.path)}>
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary={link.label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {["High Grade", "Master Grade", "Real Grade", "Other"].map(
          (text) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <BuildIcon />
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          )
        )}
      </List>

      <div className="footer">
        <Divider />
        <h4>Adrick-Dev &copy; 2024</h4>
        <div className="icons">
          <Link to="https://github.com/Adrick1210">
            <img
              src="https://cdn-icons-png.flaticon.com/512/25/25231.png"
              alt="github"
            />
          </Link>

          <Link to="https://www.linkedin.com/in/christianalexander23/">
            <img
              src="https://www.iconpacks.net/icons/1/free-linkedin-icon-112-thumb.png"
              alt="linkedIn"
            />
          </Link>

          <Link to="#">
            <img
              src="https://i.pinimg.com/736x/75/4e/8c/754e8c492a38f895e08b0fee65e13309.jpg"
              alt="Instagram"
            />
          </Link>
        </div>
      </div>
    </Box>
  );
  return (
    <div>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </div>
  );
}
