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
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registration } from "../../../Store/authSlice";

import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'

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

export default function Registration() {
  const data=useSelector((state)=>state.auth)
  console.log(data.status);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [user, setUser] = useState({
    name: "",
    mobile: "",
    email: "",
    password: "",
  });
  const { name, mobile, email, password } = user;
  const [photo,setPhoto]=useState()
  const [error, setError] = useState({});
  const validation = () => {
    const error = {};
    if (!name) {
      error.name = "name is required";
    }
    if (!mobile) {
      error.mobile = "mobile number is required";
    }
    if (!email) {
      error.email = "email is required";
    }
    if (!password) {
      error.password = "password is required";
    }
    if (!photo) {
      error.photo="photo is required"
      
    }
    return error;
  };
  const handelChange = (e) => {
    const { name, value } = e.target;
    if (name == "name") {
      if (value.length == 0) {
        setError({ ...error, name: "name is required" });
        setUser({ ...user, name: "" });
      } else {
        setError({ ...error, name: "" });
        setUser({ ...user, name: value });
      }
    }
    if (name == "mobile") {
      if (value.length == 0) {
        setError({ ...error, mobile: "mobile number is required" });
        setUser({ ...user, mobile: "" });
      } else {
        setError({ ...error, mobile: "" });
        setUser({ ...user, mobile: value });
      }
    }
    if (name == "email") {
      if (value.length == 0) {
        setError({ ...error, email: "email is required" });
        setUser({ ...user, email: "" });
      } else {
        setError({ ...error, email: "" });
        setUser({ ...user, email: value });
      }
    }
    if (name == "password") {
      if (value.length == 0) {
        setError({ ...error, password: "password is required" });
        setUser({ ...user, password: "" });
      } else {
        setError({ ...error, password: "" });
        setUser({ ...user, password: value });
      }
    }
  };
  const phandle = () => {
    setShow(!show);
  };

  const imageChange=(e)=>{
    const file=e.target.files[0]
    if (!file) {
      setError({...error,photo:"photo is required"})
      setPhoto(null)
      
    }
    else{
      setError({...error,photo:""})
      setPhoto(file)
    }
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    setError(validation());
    // const data = {
    //   name: name,
    //   mobile: mobile,
    //   email: email,
    //   password: password,
    // };
    const formData=new FormData();
    formData.append("name",name);
    formData.append("mobile",mobile);
    formData.append("email",email);
    formData.append("password",password);
    formData.append("photo",photo)
    dispatch(registration(formData));
    setUser({
      name: "",
      mobile: "",
      email: "",
      password: "",
    });
    setPhoto("")
  };

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
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="name"
                  required
                  fullWidth
                  id="name"
                  label="Name"
                  autoFocus
                  value={name}
                  onChange={handelChange}
                />
                <span style={{ color: "red", margin: "5px" }}>
                  {error.name}
                </span>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="mobile"
                  label="mobile Number"
                  name="mobile"
                  autoComplete="family-name"
                  type="tel"
                  value={mobile}
                  onChange={handelChange}
                />
               
                <span style={{ color: "red", margin: "5px" }}>
                  {error.mobile}
                </span>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={email}
                  onChange={handelChange}
                />
                <span style={{ color: "red", margin: "5px" }}>
                  {error.email}
                </span>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type={show ? "text" : "password"}
                  id="password"
                  autoComplete="new-password"
                  value={password}
                  onChange={handelChange}
                />
                <span style={{ color: "red", margin: "5px" }}>
                  {error.password}
                </span>
              </Grid>
              <div style={{marginLeft:"22px"}}>
                <input type="file" name="photo" id="photo" onChange={imageChange} />
                {photo!=="" && photo!=null && photo!=undefined?(<>
                <img src={URL.createObjectURL(photo)} alt=""  style={{height:"100px"}}/>
                </>):(<>{photo=== "" && <p>drag and drop image here</p>}</>)}
              </div>
              <span style={{ color: "red", margin: "5px" }}>
                  {error.photo}
                </span>
              <Button
                variant="text"
                size="small"
                onClick={phandle}
                sx={{ marginLeft: "15px" }}
              >
                Show Password
              </Button>
            </Grid>
           {data.status==="idle"?(<>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
           </>):(<>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Loading....
            </Button>
           </>)}

            <Grid container justifyContent="flex-end">
              <Grid item>
                <Button component={Link} to="/Login">
                Already have an account? Sign in
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Box>
       
      </Container>
    </ThemeProvider>
  );
}
