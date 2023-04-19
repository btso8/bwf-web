import React, { useState } from "react";
import Button from "@mui/material/Button";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import { TextField, Grid } from "@mui/material";
import { auth } from "../../services/user-services";
import { useAuth } from "../../hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";
import User from "../user/user";

function Sidebar() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { authData, setAuth } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await auth({ username, password });
    setAuth(data);
  };
  const logout = () => {
    setAuth(null);
  };
  const account = () => {
    navigate("/account");
  };

  return (
    <div className="sidebar">
      {!authData ? (
        <React.Fragment>
          <Grid container spacing={1} alignItems="flex-end">
            <Grid item>
              <AccountCircleIcon />
            </Grid>
            <Grid item>
              <TextField
                id="username-input-with-icon-grid"
                label="Username"
                onChange={(e) => setUsername(e.target.value)}
              />
            </Grid>
          </Grid>
          <Grid container spacing={1} alignItems="flex-end">
            <Grid item>
              <VpnKeyIcon />
            </Grid>
            <Grid item>
              <TextField
                id="password-input-with-icon-grid"
                label="Password"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </Grid>
          </Grid>
          <Button
            color="primary"
            variant="contained"
            onClick={(e) => handleSubmit(e)}
          >
            Login
          </Button>
          <br />
          <Link to={"/register"}>
            Register here if you don't have an account
          </Link>
        </React.Fragment>
      ) : (
        <div>
          <User user={authData.user} />
          <br />
          <Button color="primary" variant="contained" onClick={() => logout()}>
            Logout
          </Button>
          <Button color="primary" variant="contained" onClick={() => account()}>
            My Account
          </Button>
        </div>
      )}
    </div>
  );
}

export default Sidebar;
