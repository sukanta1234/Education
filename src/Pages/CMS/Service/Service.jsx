import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { serviceApi } from "../../../Store/homeSlice";
import { Box, Container } from "@mui/material";
import Grid from "@mui/material/Grid";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import AlbumIcon from "@mui/icons-material/Album";
import randomColor from "randomcolor";

const Service = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.home);
  const color = randomColor();
  // console.log(data.sdata);
  useEffect(() => {
    dispatch(serviceApi());
  }, []);
  return (
    <Box sx={{ backgroundColor: "#f7f7f7" }}>
      <Container>
        <Typography
          variant="h4"
          sx={{
            textAlign: "center",
            fontWeight: "700",
            margin: "20px",
            paddingTop: "70px",
          }}
          className="Sp"
        >
          Service
        </Typography>
        <hr
          style={{
            width: "60px",
            fontWeight: "bold",
            color: "#20b13c",
            border: "2px solid green",
            margin: "0 auto",
          }}
        />
        <Grid container>
          {data.sdata.map((item) => (
            <Grid item lg={4} md={4} sm={6} xs={12}>
              <Card
                sx={{
                  maxWidth: 345,
                  height: "350px",
                  marginTop: "20px",
                  marginLeft: "10px",
                  marginBottom: "60px",
                }}
              >
                <CardActionArea>
                  <Typography sx={{ textAlign: "center", margin: "20px" }}>
                    <AlbumIcon
                      sx={{
                        color: color,
                        height: "80px",
                        width: "100px",
                        "&:hover": {
                          transform: "scale(1.6)",
                          color:randomColor()
                        },
                      }}
                    />
                  </Typography>
                  <CardContent>
                    <Typography
                      gutterBottom
                      variant="h5"
                      component="div"
                      sx={{ textAlign: "center", fontWeight: "600" }}
                    >
                      {item.name}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ textAlign: "center" }}
                    >
                      {item.details}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Service;
