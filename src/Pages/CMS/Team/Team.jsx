import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

import { useDispatch } from "react-redux";
import { teamApi } from "../../../Store/homeSlice";
import { useSelector } from "react-redux";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";

import { CardActionArea } from "@mui/material";
import { team_pic } from "../../../Helper";

const Team = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.home);
  console.log(data.team);
  useEffect(() => {
    dispatch(teamApi());
  }, []);
  return (
    <Box>
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
          Our Team
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
        <Typography variant="body2" sx={{ textAlign: "center",marginTop:"50px",marginBottom:"30px" }}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam
          provident, pariatur illum iusto consectetur quam minus voluptatibus ad
          commodi consequatur nostrum reiciendis doloribus optio facere,
          corporis, distinctio dolor tenetur alias. Nostrum facere sunt incidunt
          ducimus, rerum perspiciatis minima suscipit distinctio eveniet quo.
          Porro incidunt minima, odit consequatur ut doloribus modi mollitia
          reprehenderit error voluptate pariatur impedit adipisci id aliquam
          nulla magnam blanditiis eligendi, veritatis possimus dolorum. Dolore
          nihil qui aperiam.
        </Typography>
        <Grid container>
          {data.team.map((item) => (
            <Grid item lg={4} md={4} sm={6} xs={12}>
              <Card
                sx={{
                  maxWidth: "300px",
                  height: "300px",
                  marginTop: "20px",
                  marginLeft: "10px",
                  marginBottom: "60px",
                  height: "450px",
                }}
              >
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="350px"
                    image={team_pic(item._id)}
                    alt="green iguana"
                  />
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
                      {item.possession}
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

export default Team;
