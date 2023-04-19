import React, { useState } from "react";
import Button from "@mui/material/Button";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import EmailIcon from "@mui/icons-material/Email";
import { TextField, Grid } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../../services/user-services";
import { useAuth } from "../../hooks/useAuth";
import { auth } from "../../services/user-services";

function Register() {
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [email, setEmail] = useState("");

  const passMatch = () => {
    return password === password2;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (passMatch()) {
      const regData = await register({
        username,
        email,
        password,
        profile: { is_premium: false },
      });
      if (regData) {
        const data = await auth({ username, password });
        setAuth(data);
        navigate("/account");
      }
    }
  };

  return (
    <div>
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
        <Grid container spacing={1} alignItems="flex-end">
          <Grid item>
            <VpnKeyIcon />
          </Grid>
          <Grid item>
            <TextField
              id="repeat-password-input-with-icon-grid"
              label="Repeat password"
              type="password"
              onChange={(e) => setPassword2(e.target.value)}
            />
          </Grid>
        </Grid>
        <Grid container spacing={1} alignItems="flex-end">
          <Grid item>
            <EmailIcon />
          </Grid>
          <Grid item>
            <TextField
              id="email-input-with-icon-grid"
              label="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </Grid>
        </Grid>
        <Button
          color="primary"
          variant="contained"
          onClick={(e) => handleRegister(e)}
        >
          Register
        </Button>
        <br />
        <Link to={"/"}>Back</Link>
      </React.Fragment>
    </div>
  );
}

export default Register;
