import {
  AppBar,
  getToolbarUtilityClass,
  List,
  ListItem,
  ListItemText,
  Toolbar,
  Typography,
  IconButton,
  ToggleButton,
  Button,
  Stack,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { User } from "../models/User";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import { Style } from "util";
import "../css/navbar.css";
//import { User } from "../models/user";

interface INavBarProps {
  currentUser: User | undefined;
  setCurrentUser: (nextUser: User | undefined) => void;
}

function Navbar(props: INavBarProps) {
  const navigate = useNavigate();

  function logout() {
    console.log("Logout not implemented yet");
  }

  function goTo(route: string) {
    navigate(route);
  }

  return (
    <AppBar position="static" id="navbar">
      <Toolbar id="nav2">
        <Typography
          className="nav-item"
          sx={{ flexGrow: 1 }}
          variant="h5"
          color="inherit"
          onClick={() => navigate("/")}
        >
          Ecommerce
        </Typography>
        <Stack direction="row">
          {props.currentUser ? (
            <>
              <ListItemText inset>
                <Typography
                  className="nav-item"
                  variant="h6"
                  color="inherit"
                  onClick={() => navigate("/dashboard")}
                >
                  Dashboard
                </Typography>
              </ListItemText>
              <ListItemText inset>
                <Typography
                  className="nav-item"
                  variant="h6"
                  color="inherit"
                  onClick={logout}
                >
                  Logout
                </Typography>
              </ListItemText>
              <ListItemText inset>
                <ShoppingBagIcon
                  className="nav-item"
                  id="bagicon"
                  onClick={() => navigate("/cart")}
                />{" "}
              </ListItemText>
            </>
          ) : (
            <>
              <ListItemText inset>
                <Typography
                  className="nav-item"
                  variant="h6"
                  color="inherit"
                  onClick={() => navigate("/auth")}
                >
                  Login
                </Typography>
              </ListItemText>
              <ListItemText inset>
                <Typography
                  className="nav-item"
                  variant="h6"
                  color="inherit"
                  onClick={() => navigate("/auth")}
                >
                  Register
                </Typography>
              </ListItemText>
              <ListItemText inset>
                <ShoppingBagIcon
                  className="nav-item"
                  id="bagicon"
                  onClick={() => navigate("/auth")}
                />
              </ListItemText>
            </>
          )}
        </Stack>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
