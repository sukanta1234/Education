import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState } from "react";
import { Email } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { contactApi } from "../../../Store/contactSlice";
import PlaceRoundedIcon from "@mui/icons-material/PlaceRounded";
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import LocalPhoneRoundedIcon from '@mui/icons-material/LocalPhoneRounded';
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

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function Contact() {
  const data=useSelector((state)=>state.contact)
  const dispatch = useDispatch();
  const [user, setUser] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });
  const [error, setError] = useState({});
  const { name, email, message, phone } = user;
  const validation = () => {
    const error = {};
    if (!name) {
      error.name = "name is required";
    }
    if (!email) {
      error.email = "email is required";
    }
    if (!phone) {
      error.phone = "phone number is required";
    }
    if (!message) {
      error.message = "message is required";
    }
    return error;
  };

  const handleChange = (e) => {
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
    if (name == "email") {
      if (value.length == 0) {
        setError({ ...error, email: "email is required" });
        setUser({ ...user, email: "" });
      } else {
        setError({ ...error, email: "" });
        setUser({ ...user, email: value });
      }
    }
    if (name == "phone") {
      if (value.length == 0) {
        setError({ ...error, phone: "phone is required" });
        setUser({ ...user, phone: "" });
      } else {
        setError({ ...error, phone: "" });
        setUser({ ...user, phone: value });
      }
    }
    if (name == "message") {
      if (value.length == 0) {
        setError({ ...error, message: "message is required" });
        setUser({ ...user, message: "" });
      } else {
        setError({ ...error, message: "" });
        setUser({ ...user, message: value });
      }
    }
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    setError(validation());
    const data = {
      name: name,
      email: email,
      phone: phone,
      message: message,
    };
    dispatch(contactApi(data));
    console.log(user);
    setUser({
      name: "",
      email: "",
      phone: "",
      message: "",
    });
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container>
        <Box sx={{ marginTop: "50px" }}>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d59022.686656014965!2d88.42707290472414!3d22.39445167637994!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a026da29682c63b%3A0xc7999b6c50073410!2sMalancha%20Mahi%20Nagar%2C%20Kolkata%2C%20West%20Bengal!5e0!3m2!1sen!2sin!4v1713070254611!5m2!1sen!2sin"
            width="100%"
            height="300px"
            style={{ border: 0 }}
            allowFullScreen="100%"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </Box>
      </Container>
      <Container sx={{ marginTop: "100px" }}>
        <Grid container>
          <Grid item lg={4}>
            <Box boxShadow={4} sx={{ margin: "20px" }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  paddingTop: "20px",
                }}
              >
                <Typography sx={{ paddingRight: "5px" }}>
                  <PlaceRoundedIcon
                    sx={{ color: "#37b03f", height: "50px", width: "80px" }}
                  />
                </Typography>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: "700",
                    textAlign: "center",
                    padding: "10px",
                  }}
                >
                  Location
                </Typography>
              </Box>
              <Typography
                variant="body2"
                sx={{ padding: "10px", textAlign: "center" }}
              >
                20 Cooper Square, New York, NY 10003, USA
              </Typography>
            </Box>
          </Grid>
          <Grid item lg={4}>
          <Box boxShadow={4} sx={{ margin: "20px" }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  paddingTop: "20px",
                }}
              >
                <Typography sx={{ paddingRight: "5px" }}>
                  <EmailRoundedIcon
                    sx={{ color: "#37b03f", height: "50px", width: "80px" }}
                  />
                </Typography>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: "700",
                    textAlign: "center",
                    padding: "10px",
                  }}
                >
                  Email
                </Typography>
              </Box>
              <Typography
                variant="body2"
                sx={{ padding: "10px", textAlign: "center" }}
              >
                info@gmail.com
              </Typography>
            </Box>
          </Grid>
          <Grid item lg={4}>
          <Box boxShadow={4} sx={{ margin: "20px" }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  paddingTop: "20px",
                }}
              >
                <Typography sx={{ paddingRight: "5px" }}>
                  <LocalPhoneRoundedIcon
                    sx={{ color: "#37b03f", height: "50px", width: "80px" }}
                  />
                </Typography>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: "700",
                    textAlign: "center",
                    padding: "10px",
                  }}
                >
                  Call
                </Typography>
              </Box>
              <Typography
                variant="body2"
                sx={{ padding: "10px", textAlign: "center" }}
              >
              +1 (555) 555-1234
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
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
            Contact Us
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
                  label="name"
                  autoFocus
                  value={name}
                  onChange={handleChange}
                />
                <span style={{ color: "red", margin: "5px" }}>
                  {error.name}
                </span>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email"
                  name="email"
                  autoComplete="family-name"
                  value={email}
                  onChange={handleChange}
                />
                <span style={{ color: "red", margin: "5px" }}>
                  {error.email}
                </span>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="phone"
                  label="Phone Number"
                  name="phone"
                  autoComplete="phone"
                  value={phone}
                  onChange={handleChange}
                />
                <span style={{ color: "red", margin: "5px" }}>
                  {error.phone}
                </span>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="message"
                  label="Message"
                  type="message"
                  id="message"
                  autoComplete="new-message"
                  rows={4}
                  multiline
                  value={message}
                  onChange={handleChange}
                />
                <span style={{ color: "red", margin: "5px" }}>
                  {error.message}
                </span>
              </Grid>
            </Grid>
            {data.status==="idle"?(<>
              <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Submit
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
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
