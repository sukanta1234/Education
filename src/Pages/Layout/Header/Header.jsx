import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { handleLogout } from "../../../Store/authSlice";

const drawerWidth = 240;
const navItems = ["About", "Courses", "Blog", "Contact"];

export default function Header(props) {
  const dispatch = useDispatch();
  const { isloggedIn } = useSelector((state) => state.auth);
  // console.log("isloggedIn", isloggedIn);

  const handleclick = () => {
    dispatch(handleLogout());
  };

  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        EduCare
      </Typography>
      <Divider />
      <List>
        <ListItem>
        <ListItemButton  component={Link} to="/" sx={{ justifyContent: "center" }}>
              Home
            </ListItemButton>

        </ListItem>
        {navItems.map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton sx={{ textAlign: "center" }} component={Link}
                to={`/${item}`} >
              <ListItemText primary={item} />
            </ListItemButton>
          </ListItem>
        ))}
        <ListItem>
        {isloggedIn ? (
              <ListItemButton
              sx={{ justifyContent: "center" }}
                component={Link}
                to="/Login"
                onClick={() => handleclick()}
              >
                Logout
              </ListItemButton>
            ) : (
              <ListItemButton sx={{ justifyContent: "center" }} component={Link} to="/Login">
                Login
              </ListItemButton>
            )}

        </ListItem>
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar component="nav" sx={{ height: "80px" }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{
              flexGrow: 1,
              display: { xs: "none", sm: "block" },
              paddingTop: "20px",
            }}
          >
            EduCare
          </Typography>
          <Box
            sx={{ display: { xs: "none", sm: "block" }, paddingTop: "20px" }}
          >
            <Button sx={{ color: "#fff" }} component={Link} to="/">
              Home
            </Button>
            {navItems.map((item) => (
              <Button
                key={item}
                sx={{ color: "#fff" }}
                component={Link}
                to={`/${item}`}
              >
                {item}
              </Button>
            ))}
            {/* <Button sx={{ color: "#fff" }} component={Link} to="/Login" onClick={handleClick}>

            {token?"Logout":"Login"}
          </Button> */}
            {isloggedIn ? (
              <Button
                sx={{ color: "#fff" }}
                component={Link}
                to="/Login"
                onClick={() => handleclick()}
              >
                Logout
              </Button>
            ) : (
              <Button sx={{ color: "#fff" }} component={Link} to="/Login">
                Login
              </Button>
            )}
          </Box>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
      <Box component="main">
        <Toolbar />
      </Box>
    </Box>
  );
}
