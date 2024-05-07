import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { login } from "../../../Store/authSlice";
import AccountCircle from "@mui/icons-material/AccountCircle";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";


function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const defaultTheme = createTheme();

export default function SignIn() {
  const data=useSelector((state)=>state.auth)
  console.log(data.status);
  
 
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const navigate=useNavigate()
 

  const dispatch = useDispatch();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const { email, password } = user;
  const [error, setError] = useState("");
  const validation = () => {
    let error = {};
    if (!email) {
      error.email = "email is required";
    }
    if (!password) {
      error.password = "password is required";
    }
    return error;
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "email") {
      if (value.length === 0) {
        setError({ ...error, email: "email is required" });
        setUser({ ...user, email: "" });
      } else {
        setError({ ...error, email: "" });
        setUser({ ...user, email: value });
      }
    }
    if (name === "password") {
      if (value.length === 0) {
        setError({ ...error, password: "email is required" });
        setUser({ ...user, password: "" });
      } else {
        setError({ ...error, password: "" });
        setUser({ ...user, password: value });
      }
    }
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    setError(validation());
    let data = {
      email: email,
      password: password,
    };
    dispatch(login(data));
    
    setUser({
      email: "",
      password: "",
    });
  };
  useEffect(()=>{
    const Redirect=()=>{
      const token=localStorage.getItem("token");
      const  isLoginPage=window.location.pathname==="/Login";
      if (token) {
        return isLoginPage && navigate("/")
        
      }

    }
    Redirect()
  },[navigate,data.redirect])

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={handleChange}
              
            />
            <span style={{ color: "red" }}>
              {""}
              {error.email}
              {""}
            </span>

            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type={showPassword ? "text" : "password"}
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={handleChange}
              InputProps={{ 
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
           

            <span style={{ color: "red" }}>
              {""}
              {error.password}
              {""}
            </span>
           {data.status==="idle"?(<Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            
              
            >
              Sign In
            </Button>):(<Button variant="contained" color="primary" type="submit">
              Loading...
              
            </Button>)}
           
            <Grid container>
              
              <Grid item>
                <Button component={Link} to="/Registration">Don't have an account? Sign Up</Button>
              </Grid>
            </Grid>
          </Box>
        </Box>
      
      </Container>
      
    </ThemeProvider>
  );
}
