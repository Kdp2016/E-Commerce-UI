import {
    AppBar,
    getToolbarUtilityClass,
    List,
    ListItem,
    ListItemText,
    Toolbar,
    Typography,
  } from "@mui/material";
  import { useNavigate } from "react-router-dom";
import { User } from "../models/User";
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
      <AppBar color="primary" position="static">
        <Toolbar>
          <Typography variant="h5" color="inherit">
            <List component="nav">
              <ListItem>
                <Typography
                  variant="h5"
                  color="inherit"
                  onClick={() => navigate("/")}
                >
                  Ecommerce
                </Typography>
                {props.currentUser ? (
                  <>
                    <ListItemText inset>
                      <Typography
                        variant="h6"
                        color="inherit"
                        onClick={() => navigate("/dashboard")}
                      >
                        Dashboard
                      </Typography>
                    </ListItemText>
                    <ListItemText inset>
                      <Typography
                        variant="h6"
                        color="inherit"
                        onClick={() => logout()}
                      >
                        Logout
                      </Typography>
                    </ListItemText>
                  </>
                ) : (
                  <>
                    <ListItemText inset>
                      <Typography
                        variant="h6"
                        color="inherit"
                        onClick={() => navigate("/login")}
                      >
                        Login
                      </Typography>
                    </ListItemText>
                    <ListItemText inset>
                      <Typography
                        variant="h6"
                        color="inherit"
                        onClick={() => navigate("/register")}
                      >
                        Register
                      </Typography>
                    </ListItemText>
                  </>
                )}
              </ListItem>
            </List>
          </Typography>
        </Toolbar>
      </AppBar>
    );
  }
  
  export default Navbar;